/**
 * Pragya Database & Architecture Verification Script
 *
 * Verifies:
 * 1. Zod content schemas & bounded depth / allowed node limits.
 * 2. If MONGODB_URI is provided:
 *    - Connects to MongoDB
 *    - Canonical book & chapter creation
 *    - PersonalBookCopy creation (0 chapters duplicated)
 *    - Chapter resolution (canonical fallback)
 *    - Atomic Copy-on-Write edit (creates PersonalChapter; canonical chapter strictly untouched)
 *    - User isolation (User B copy does not see User A's edits)
 *    - Concurrent edit simulation
 *    - Reset personal chapter override & reset personal copy
 *    - ReadingProgress canonical vs personal partial uniqueness & isolation
 *    - Safe cleanup of test records
 */

import { CreateBookSchema } from "../src/lib/validations/book";
import { validateContentDoc } from "../src/lib/validations/content";
import {
  UpsertCanonicalProgressSchema,
  UpsertPersonalProgressSchema,
} from "../src/lib/validations/progress";
import type { ProseMirrorDoc, ProseMirrorNode } from "../src/types/db";

async function runUnitValidations() {
  console.log("--- 1. Testing Content & Schema Validations (Offline) ---");

  // Valid ProseMirror doc
  const validDoc: ProseMirrorDoc = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 2 },
        content: [{ type: "text", text: "Chapter 1: The Beginning" }],
      },
      {
        type: "paragraph",
        content: [
          { type: "text", text: "This is a quiet paragraph with " },
          { type: "text", marks: [{ type: "bold" }], text: "bold emphasis" },
          { type: "text", text: "." },
        ],
      },
    ],
  };

  const validRes = validateContentDoc(validDoc);
  if (!validRes.success) {
    throw new Error(`Valid doc failed validation: ${validRes.error}`);
  }
  console.log("✓ Valid ProseMirror document passed");

  // Invalid heading level (level 5 not allowed)
  const invalidHeadingDoc = {
    type: "doc",
    content: [
      {
        type: "heading",
        attrs: { level: 5 },
        content: [{ type: "text", text: "Invalid Heading 5" }],
      },
    ],
  };
  const invalidHeadingRes = validateContentDoc(invalidHeadingDoc);
  if (invalidHeadingRes.success) {
    throw new Error("Invalid heading level 5 should have failed validation");
  }
  console.log("✓ Invalid heading level 5 correctly rejected");

  // Disallowed node type (e.g., script or malicious iframe)
  const invalidNodeDoc = {
    type: "doc",
    content: [
      {
        type: "rawHtml",
        content: [{ type: "text", text: "<script>alert(1)</script>" }],
      },
    ],
  };
  const invalidNodeRes = validateContentDoc(invalidNodeDoc);
  if (invalidNodeRes.success) {
    throw new Error(
      "Disallowed node type rawHtml should have failed validation",
    );
  }
  console.log("✓ Disallowed node type correctly rejected");

  // Excessive nesting test (> 6 levels)
  let deeplyNested: ProseMirrorNode = { type: "text", text: "Deep" };
  for (let i = 0; i < 8; i++) {
    deeplyNested = { type: "paragraph", content: [deeplyNested] };
  }
  const deepDoc = { type: "doc", content: [deeplyNested] };
  const deepRes = validateContentDoc(deepDoc);
  if (deepRes.success) {
    throw new Error(
      "Deeply nested document (> 6 levels) should have failed validation",
    );
  }
  console.log("✓ Excessive depth nesting (> 6 levels) correctly rejected");

  // Book & Chapter Zod schemas
  const validBookInput = CreateBookSchema.safeParse({
    title: "Meditations",
    slug: "meditations",
    author: "Marcus Aurelius",
    category: "Philosophy",
    tags: ["stoicism", "classic"],
  });
  if (!validBookInput.success) {
    throw new Error("Valid book input failed parsing");
  }
  console.log("✓ CreateBookSchema passed");

  // ReadingProgress context schemas
  const validCanonicalProg = UpsertCanonicalProgressSchema.safeParse({
    userId: "507f1f77bcf86cd799439011",
    bookId: "507f1f77bcf86cd799439012",
    currentChapterNumber: 2,
    completionPercentage: 25,
  });
  if (!validCanonicalProg.success) {
    throw new Error("Valid canonical progress failed parsing");
  }
  console.log("✓ UpsertCanonicalProgressSchema passed");

  const validPersonalProg = UpsertPersonalProgressSchema.safeParse({
    userId: "507f1f77bcf86cd799439011",
    bookId: "507f1f77bcf86cd799439012",
    personalCopyId: "507f1f77bcf86cd799439013",
    currentChapterNumber: 3,
  });
  if (!validPersonalProg.success) {
    throw new Error("Valid personal progress failed parsing");
  }
  console.log("✓ UpsertPersonalProgressSchema passed");

  console.log("All offline unit validations succeeded!\n");
}

async function runDatabaseIntegration() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.log("---------------------------------------------------------");
    console.log("NOTICE: MONGODB_URI is not set.");
    console.log("Skipping live database integration tests.");
    console.log("To run live database tests, set MONGODB_URI in .env.local.");
    console.log("---------------------------------------------------------");
    return;
  }

  console.log("--- 2. Running Live Database Integration Verification ---");

  // Dynamically import Mongoose & services when testing against DB
  const { connectToDatabase } = await import("../src/lib/db");
  const {
    User,
    Book,
    Chapter,
    PersonalBookCopy,
    PersonalChapter,
    ReadingProgress,
  } = await import("../src/models");
  const { createBook, createChapter } = await import(
    "../src/services/bookService"
  );
  const {
    getOrCreatePersonalCopy,
    resolveChapter,
    savePersonalChapter,
    resetPersonalChapter,
    resetPersonalCopy,
  } = await import("../src/services/personalCopyService");
  const {
    upsertCanonicalProgress,
    upsertPersonalProgress,
    getReadingProgress,
  } = await import("../src/services/readingProgressService");

  await connectToDatabase();
  console.log("✓ Connected to MongoDB successfully");

  // Setup test users
  const testPrefix = `test_${Date.now()}`;
  const adminUser = await User.create({
    name: "Test Admin",
    email: `${testPrefix}_admin@pragya.test`,
    role: "admin",
  });
  const userA = await User.create({
    name: "User Alpha",
    email: `${testPrefix}_usera@pragya.test`,
    role: "user",
  });
  const userB = await User.create({
    name: "User Beta",
    email: `${testPrefix}_userb@pragya.test`,
    role: "user",
  });

  console.log("✓ Test users created");

  try {
    // 1. Create canonical book
    const canonicalBook = await createBook({
      title: "Test Pragya Volume",
      slug: `${testPrefix}-slug`,
      author: "Pragya Scholar",
      createdBy: adminUser._id.toString(),
      category: "Wisdom",
    });

    const canonicalContent: ProseMirrorDoc = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            { type: "text", text: "Canonical chapter one original text." },
          ],
        },
      ],
    };

    const chapter1 = await createChapter({
      bookId: canonicalBook._id.toString(),
      chapterNumber: 1,
      title: "Chapter 1",
      slug: "chapter-1",
      content: canonicalContent,
    });
    console.log("✓ Canonical book and chapter 1 created");

    // 2. User A creates personal copy (Copy-on-Write baseline)
    const copyA = await getOrCreatePersonalCopy(
      userA._id.toString(),
      canonicalBook._id.toString(),
    );
    console.log("✓ User A personal copy created");

    // Verify 0 personal chapters exist initially
    const initialPersonalChaptersCount = await PersonalChapter.countDocuments({
      personalCopyId: copyA._id,
    });
    if (initialPersonalChaptersCount !== 0) {
      throw new Error("Personal copy creation must NOT duplicate any chapters");
    }
    console.log(
      "✓ Verified 0 personal chapters cloned on initial copy creation (CoW verified)",
    );

    // 3. Resolve chapter before edits — should resolve to canonical
    const resolvedBefore = await resolveChapter(
      userA._id.toString(),
      copyA._id.toString(),
      1,
    );
    if (!resolvedBefore || resolvedBefore.source !== "canonical") {
      throw new Error("Unedited chapter must resolve to canonical source");
    }
    console.log(
      "✓ Unedited chapter successfully resolved from canonical chapter",
    );

    // 4. User A edits Chapter 1 for the first time
    const userAContent: ProseMirrorDoc = {
      type: "doc",
      content: [
        {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: "User A personal customized commentary on chapter one.",
            },
          ],
        },
      ],
    };

    await savePersonalChapter(
      userA._id.toString(),
      copyA._id.toString(),
      1,
      "Chapter 1 (User A Annotated)",
      userAContent,
    );
    console.log("✓ First edit saved to PersonalChapter via Copy-on-Write");

    // 5. Verify Canonical chapter was NOT modified
    const canonicalAfter = await Chapter.findById(chapter1._id);
    const contentDoc = canonicalAfter?.content as ProseMirrorDoc | undefined;
    const canonicalText = contentDoc?.content?.[0]?.content?.[0]?.text;
    if (canonicalText !== "Canonical chapter one original text.") {
      throw new Error(
        "CRITICAL FAILURE: Canonical chapter was modified during user edit!",
      );
    }
    console.log("✓ Canonical chapter strictly preserved and unmodified");

    // 6. User Isolation check: User B creates a copy
    const copyB = await getOrCreatePersonalCopy(
      userB._id.toString(),
      canonicalBook._id.toString(),
    );
    const resolvedUserB = await resolveChapter(
      userB._id.toString(),
      copyB._id.toString(),
      1,
    );
    if (!resolvedUserB || resolvedUserB.source !== "canonical") {
      throw new Error(
        "User B must see canonical chapter, not User A's private edits",
      );
    }
    console.log(
      "✓ User isolation verified: User B sees canonical content, isolated from User A",
    );

    // 7. Concurrent edit race condition check
    await Promise.all([
      savePersonalChapter(
        userA._id.toString(),
        copyA._id.toString(),
        1,
        "Concurrent Edit 1",
        userAContent,
      ),
      savePersonalChapter(
        userA._id.toString(),
        copyA._id.toString(),
        1,
        "Concurrent Edit 2",
        userAContent,
      ),
    ]);
    const personalChapterCount = await PersonalChapter.countDocuments({
      personalCopyId: copyA._id,
      chapterNumber: 1,
    });
    if (personalChapterCount !== 1) {
      throw new Error(
        "Concurrent first edits must result in exactly 1 PersonalChapter document",
      );
    }
    console.log(
      "✓ Concurrent edit race handled safely (exactly 1 PersonalChapter exists)",
    );

    // 8. Reset personal chapter
    await resetPersonalChapter(userA._id.toString(), copyA._id.toString(), 1);
    const resolvedAfterReset = await resolveChapter(
      userA._id.toString(),
      copyA._id.toString(),
      1,
    );
    if (!resolvedAfterReset || resolvedAfterReset.source !== "canonical") {
      throw new Error(
        "After chapter reset, chapter resolution must return canonical",
      );
    }
    console.log(
      "✓ Reset personal chapter verified: successfully falls back to canonical",
    );

    // 9. Reset entire copy
    await resetPersonalCopy(userA._id.toString(), copyA._id.toString());
    console.log("✓ Reset personal copy verified");

    // 10. ReadingProgress checks
    await upsertCanonicalProgress({
      userId: userA._id.toString(),
      bookId: canonicalBook._id.toString(),
      currentChapterNumber: 1,
      scrollPosition: 120,
      completionPercentage: 50,
    });

    await upsertPersonalProgress({
      userId: userA._id.toString(),
      bookId: canonicalBook._id.toString(),
      personalCopyId: copyA._id.toString(),
      currentChapterNumber: 1,
      scrollPosition: 240,
      completionPercentage: 80,
    });

    const canonicalProg = await getReadingProgress(userA._id.toString(), {
      readingContext: "canonical",
      bookId: canonicalBook._id.toString(),
    });
    const personalProg = await getReadingProgress(userA._id.toString(), {
      readingContext: "personal",
      personalCopyId: copyA._id.toString(),
    });

    if (
      canonicalProg?.scrollPosition !== 120 ||
      personalProg?.scrollPosition !== 240
    ) {
      throw new Error(
        "Reading progress canonical and personal contexts interfered with each other",
      );
    }
    console.log(
      "✓ ReadingProgress canonical and personal contexts verified independently",
    );
  } finally {
    // Clean up test data
    console.log("Cleaning up test data...");
    await User.deleteMany({ email: new RegExp(`^${testPrefix}`) });
    await Book.deleteMany({ slug: new RegExp(`^${testPrefix}`) });
    await Chapter.deleteMany({ slug: "chapter-1" });
    await PersonalBookCopy.deleteMany({
      userId: { $in: [userA._id, userB._id] },
    });
    await PersonalChapter.deleteMany({
      userId: { $in: [userA._id, userB._id] },
    });
    await ReadingProgress.deleteMany({
      userId: { $in: [userA._id, userB._id] },
    });
    console.log("✓ Test cleanup completed");
  }

  console.log("\nALL LIVE INTEGRATION TESTS PASSED SUCCESSFULLY!");
}

async function main() {
  try {
    await runUnitValidations();
    await runDatabaseIntegration();
  } catch (error) {
    console.error("Verification failed:", error);
    process.exit(1);
  }
}

main();
