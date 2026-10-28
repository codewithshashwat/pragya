import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { validateContentDoc } from "@/lib/validations/content";
import { Book, Chapter } from "@/models";
import type { BookDocument } from "@/models/Book";
import type { ChapterDocument } from "@/models/Chapter";
import type { ProseMirrorDoc, TocEntry } from "@/types/db";

// ---------------------------------------------------------------------------
// bookService — canonical book queries
// All mutations require caller to verify user.role === "admin".
// This service does not check auth — that is the responsibility of the
// server action / route handler that calls these functions.
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Book queries
// ---------------------------------------------------------------------------

/** Fetch all published books for the public library catalog. */
export async function getPublishedBooks(
  options: { category?: string; limit?: number; skip?: number } = {},
): Promise<BookDocument[]> {
  await connectToDatabase();
  const filter: Record<string, unknown> = { isPublished: true };
  if (options.category) filter.category = options.category;

  return (await Book.find(filter)
    .sort({ createdAt: -1 })
    .skip(options.skip ?? 0)
    .limit(options.limit ?? 20)
    .lean()
    .exec()) as unknown as BookDocument[];
}

/** Fetch a single published book by slug. */
export async function getBookBySlug(
  slug: string,
): Promise<BookDocument | null> {
  await connectToDatabase();
  return (await Book.findOne({ slug, isPublished: true })
    .lean()
    .exec()) as unknown as BookDocument | null;
}

/** Fetch a book by ID (admin use — does not filter by isPublished). */
export async function getBookById(
  bookId: string,
): Promise<BookDocument | null> {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(bookId)) return null;
  return (await Book.findById(bookId)
    .lean()
    .exec()) as unknown as BookDocument | null;
}

/** Full-text book search against the text index. */
export async function searchBooks(
  query: string,
  options: { limit?: number } = {},
): Promise<BookDocument[]> {
  await connectToDatabase();
  return (await Book.find(
    { $text: { $search: query }, isPublished: true },
    { score: { $meta: "textScore" } },
  )
    .sort({ score: { $meta: "textScore" } })
    .limit(options.limit ?? 20)
    .lean()
    .exec()) as unknown as BookDocument[];
}

// ---------------------------------------------------------------------------
// Chapter queries
// ---------------------------------------------------------------------------

/** Load a single canonical chapter by book ID and chapter number. */
export async function getChapter(
  bookId: string,
  chapterNumber: number,
): Promise<ChapterDocument | null> {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(bookId)) return null;
  return (await Chapter.findOne({ bookId, chapterNumber })
    .lean()
    .exec()) as unknown as ChapterDocument | null;
}

/** Load a single canonical chapter by book ID and chapter slug. */
export async function getChapterBySlug(
  bookId: string,
  slug: string,
): Promise<ChapterDocument | null> {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(bookId)) return null;
  return (await Chapter.findOne({ bookId, slug })
    .lean()
    .exec()) as unknown as ChapterDocument | null;
}

/** Load all chapters for a book (without content — for TOC building). */
export async function getChapterList(
  bookId: string,
): Promise<
  Pick<
    ChapterDocument,
    "_id" | "chapterNumber" | "title" | "slug" | "wordCount"
  >[]
> {
  await connectToDatabase();
  if (!mongoose.Types.ObjectId.isValid(bookId)) return [];
  return (await Chapter.find({ bookId })
    .sort({ chapterNumber: 1 })
    .select("chapterNumber title slug wordCount")
    .lean()
    .exec()) as unknown as Pick<
    ChapterDocument,
    "_id" | "chapterNumber" | "title" | "slug" | "wordCount"
  >[];
}

// ---------------------------------------------------------------------------
// Admin mutations
// Callers must verify role === "admin" before invoking.
// ---------------------------------------------------------------------------

interface CreateBookInput {
  title: string;
  slug: string;
  author: string;
  description?: string;
  coverImage?: string;
  category?: string;
  tags?: string[];
  createdBy: string;
}

/** Create a canonical book (admin only). */
export async function createBook(
  input: CreateBookInput,
): Promise<BookDocument> {
  await connectToDatabase();
  const book = new Book({
    ...input,
    createdBy: new mongoose.Types.ObjectId(input.createdBy),
  });
  return book.save() as Promise<BookDocument>;
}

interface CreateChapterInput {
  bookId: string;
  chapterNumber: number;
  title: string;
  slug: string;
  content: ProseMirrorDoc;
}

/** Create a canonical chapter (admin only). Validates content before saving. */
export async function createChapter(
  input: CreateChapterInput,
): Promise<ChapterDocument> {
  await connectToDatabase();

  // Validate content structure before touching the database.
  const validation = validateContentDoc(input.content);
  if (!validation.success) {
    throw new Error(validation.error ?? "Invalid chapter content");
  }

  const wordCount = estimateWordCount(input.content);

  const session = await mongoose.startSession();
  let chapter: ChapterDocument;
  try {
    chapter = await session.withTransaction(async () => {
      const newChapter = new Chapter({
        bookId: new mongoose.Types.ObjectId(input.bookId),
        chapterNumber: input.chapterNumber,
        title: input.title,
        slug: input.slug,
        content: input.content,
        wordCount,
      });
      const saved = (await newChapter.save({ session })) as ChapterDocument;

      // Keep Book.toc and Book.chapterCount consistent.
      const tocEntry: TocEntry = {
        chapterNumber: input.chapterNumber,
        title: input.title,
        slug: input.slug,
        wordCount,
      };
      await Book.findByIdAndUpdate(
        input.bookId,
        {
          $pull: { toc: { chapterNumber: input.chapterNumber } },
        },
        { session },
      );
      await Book.findByIdAndUpdate(
        input.bookId,
        {
          $push: { toc: { $each: [tocEntry], $sort: { chapterNumber: 1 } } },
          $inc: { chapterCount: 1 },
        },
        { session },
      );

      return saved;
    });
  } finally {
    await session.endSession();
  }

  return chapter;
}

// ---------------------------------------------------------------------------
// Utility
// ---------------------------------------------------------------------------

/** Estimate word count from a ProseMirrorDoc by extracting text nodes. */
export function estimateWordCount(doc: ProseMirrorDoc): number {
  let count = 0;

  function traverse(
    nodes: { type: string; text?: string; content?: unknown[] }[],
  ): void {
    for (const node of nodes) {
      if (node.type === "text" && node.text) {
        count += node.text.trim().split(/\s+/).filter(Boolean).length;
      }
      if (node.content) {
        traverse(
          node.content as {
            type: string;
            text?: string;
            content?: unknown[];
          }[],
        );
      }
    }
  }

  traverse(
    doc.content as { type: string; text?: string; content?: unknown[] }[],
  );
  return count;
}
