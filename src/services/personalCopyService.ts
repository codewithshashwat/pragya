import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { validateContentDoc } from "@/lib/validations/content";
import { Chapter, PersonalBookCopy, PersonalChapter } from "@/models";
import type { ChapterDocument } from "@/models/Chapter";
import type { PersonalBookCopyDocument } from "@/models/PersonalBookCopy";
import type { PersonalChapterDocument } from "@/models/PersonalChapter";
import { estimateWordCount } from "@/services/bookService";
import type { ProseMirrorDoc } from "@/types/db";

// ---------------------------------------------------------------------------
// personalCopyService
//
// Implements the private personal editable copy system with Copy-on-Write:
// - Users can create a personal copy of any published canonical book.
// - PersonalBookCopy is lightweight header only; NO chapters are cloned.
// - Edits to a chapter create/update a PersonalChapter document via atomic upsert.
// - Canonical Chapter documents are NEVER touched by any user editing flow.
// - User isolation is strictly enforced by scoping queries to userId.
// ---------------------------------------------------------------------------

/**
 * Gets an existing personal copy for a user and book, or creates a new one.
 * Concurrency-safe: handles duplicate key errors if two requests race to create.
 */
export async function getOrCreatePersonalCopy(
  userId: string,
  bookId: string,
): Promise<PersonalBookCopyDocument> {
  await connectToDatabase();

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(bookId)
  ) {
    throw new Error("Invalid userId or bookId format");
  }

  const userObjectId = new mongoose.Types.ObjectId(userId);
  const bookObjectId = new mongoose.Types.ObjectId(bookId);

  // Check existing copy
  const existing = await PersonalBookCopy.findOne({
    userId: userObjectId,
    originalBookId: bookObjectId,
  });

  if (existing) {
    return existing;
  }

  try {
    const newCopy = new PersonalBookCopy({
      userId: userObjectId,
      originalBookId: bookObjectId,
      lastEditedAt: new Date(),
    });
    return await newCopy.save();
  } catch (error: unknown) {
    // If a concurrent request created the copy first, fetch and return it
    if ((error as { code?: number })?.code === 11000) {
      const raceWinner = await PersonalBookCopy.findOne({
        userId: userObjectId,
        originalBookId: bookObjectId,
      });
      if (raceWinner) return raceWinner;
    }
    throw error;
  }
}

/**
 * Fetch a specific personal copy by ID, enforcing user ownership.
 */
export async function getPersonalCopyById(
  userId: string,
  personalCopyId: string,
): Promise<PersonalBookCopyDocument | null> {
  await connectToDatabase();

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(personalCopyId)
  ) {
    return null;
  }

  return PersonalBookCopy.findOne({
    _id: new mongoose.Types.ObjectId(personalCopyId),
    userId: new mongoose.Types.ObjectId(userId),
  }).exec();
}

/**
 * Fetch all personal copies owned by a user, ordered by most recently edited.
 */
export async function getUserPersonalCopies(
  userId: string,
): Promise<PersonalBookCopyDocument[]> {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return [];
  }

  return PersonalBookCopy.find({
    userId: new mongoose.Types.ObjectId(userId),
  })
    .sort({ lastEditedAt: -1 })
    .populate("originalBookId", "title author coverImage slug")
    .exec();
}

/**
 * Update optional custom metadata (title, description, cover image) on a personal copy.
 */
export async function updatePersonalCopyMetadata(
  userId: string,
  personalCopyId: string,
  metadata: {
    customTitle?: string;
    customDescription?: string;
    customCoverImage?: string;
  },
): Promise<PersonalBookCopyDocument | null> {
  await connectToDatabase();

  if (
    !mongoose.Types.ObjectId.isValid(userId) ||
    !mongoose.Types.ObjectId.isValid(personalCopyId)
  ) {
    return null;
  }

  const update: Record<string, unknown> = {
    lastEditedAt: new Date(),
  };

  if (metadata.customTitle !== undefined)
    update.customTitle = metadata.customTitle;
  if (metadata.customDescription !== undefined)
    update.customDescription = metadata.customDescription;
  if (metadata.customCoverImage !== undefined)
    update.customCoverImage = metadata.customCoverImage;

  return PersonalBookCopy.findOneAndUpdate(
    {
      _id: new mongoose.Types.ObjectId(personalCopyId),
      userId: new mongoose.Types.ObjectId(userId),
    },
    { $set: update },
    { new: true },
  ).exec();
}

export type ResolvedChapter =
  | { source: "personal"; chapter: PersonalChapterDocument }
  | { source: "canonical"; chapter: ChapterDocument };

/**
 * Resolves chapter content for a personal copy reader/editor:
 * 1. Checks if a PersonalChapter override exists.
 * 2. If found, returns { source: "personal", chapter: personalChapter }.
 * 3. If not found, falls back to canonical Chapter: { source: "canonical", chapter: canonicalChapter }.
 */
export async function resolveChapter(
  userId: string,
  personalCopyId: string,
  chapterNumber: number,
): Promise<ResolvedChapter | null> {
  await connectToDatabase();

  const copy = await getPersonalCopyById(userId, personalCopyId);
  if (!copy) {
    throw new Error("Personal copy not found or access denied");
  }

  // 1. Check for personal chapter override
  const personalChapter = await PersonalChapter.findOne({
    personalCopyId: copy._id,
    chapterNumber,
    userId: copy.userId,
  }).exec();

  if (personalChapter) {
    return {
      source: "personal",
      chapter: personalChapter,
    };
  }

  // 2. Fall back to canonical chapter
  const canonicalChapter = await Chapter.findOne({
    bookId: copy.originalBookId,
    chapterNumber,
  }).exec();

  if (!canonicalChapter) {
    return null;
  }

  return {
    source: "canonical",
    chapter: canonicalChapter,
  };
}

/**
 * Saves personal chapter edits via Copy-on-Write (CoW).
 * - Canonical chapter is NEVER modified.
 * - Uses atomic findOneAndUpdate with upsert: true against { personalCopyId, chapterNumber }.
 * - Handles concurrent first-edit race conditions safely.
 */
export async function savePersonalChapter(
  userId: string,
  personalCopyId: string,
  chapterNumber: number,
  title: string,
  content: ProseMirrorDoc,
): Promise<PersonalChapterDocument> {
  await connectToDatabase();

  const copy = await getPersonalCopyById(userId, personalCopyId);
  if (!copy) {
    throw new Error("Personal copy not found or access denied");
  }

  // Validate content structure and size boundaries
  const validation = validateContentDoc(content);
  if (!validation.success) {
    throw new Error(validation.error ?? "Invalid chapter content format");
  }

  const wordCount = estimateWordCount(content);

  const filter = {
    personalCopyId: copy._id,
    chapterNumber,
  };

  const update = {
    $set: {
      title,
      content,
      wordCount,
      userId: copy.userId,
      originalBookId: copy.originalBookId,
    },
    $setOnInsert: {
      personalCopyId: copy._id,
      chapterNumber,
    },
  };

  let savedDoc: PersonalChapterDocument | null = null;

  try {
    savedDoc = await PersonalChapter.findOneAndUpdate(filter, update, {
      upsert: true,
      new: true,
      runValidators: true,
    }).exec();
  } catch (error: unknown) {
    // In rare race condition where two concurrent upserts collided on unique index:
    if ((error as { code?: number })?.code === 11000) {
      savedDoc = await PersonalChapter.findOneAndUpdate(
        filter,
        { $set: { title, content, wordCount } },
        { new: true, runValidators: true },
      ).exec();
    } else {
      throw error;
    }
  }

  if (!savedDoc) {
    throw new Error("Failed to save personal chapter");
  }

  // Update lastEditedAt on personal copy (non-critical header metadata)
  await PersonalBookCopy.findByIdAndUpdate(copy._id, {
    lastEditedAt: new Date(),
  }).exec();

  return savedDoc;
}

/**
 * Resets a single personal chapter override back to canonical.
 * Deleting the PersonalChapter causes subsequent resolves to fall back to the canonical Chapter.
 */
export async function resetPersonalChapter(
  userId: string,
  personalCopyId: string,
  chapterNumber: number,
): Promise<boolean> {
  await connectToDatabase();

  const copy = await getPersonalCopyById(userId, personalCopyId);
  if (!copy) {
    throw new Error("Personal copy not found or access denied");
  }

  const result = await PersonalChapter.deleteOne({
    personalCopyId: copy._id,
    chapterNumber,
    userId: copy.userId,
  }).exec();

  return result.deletedCount > 0;
}

/**
 * Resets the entire personal copy:
 * - Deletes all PersonalChapter overrides.
 * - Clears custom title, description, and cover image.
 */
export async function resetPersonalCopy(
  userId: string,
  personalCopyId: string,
): Promise<boolean> {
  await connectToDatabase();

  const copy = await getPersonalCopyById(userId, personalCopyId);
  if (!copy) {
    throw new Error("Personal copy not found or access denied");
  }

  // Delete all chapter overrides
  await PersonalChapter.deleteMany({
    personalCopyId: copy._id,
    userId: copy.userId,
  }).exec();

  // Reset custom metadata
  await PersonalBookCopy.findByIdAndUpdate(copy._id, {
    $unset: {
      customTitle: 1,
      customDescription: 1,
      customCoverImage: 1,
    },
    $set: {
      lastEditedAt: new Date(),
    },
  }).exec();

  return true;
}
