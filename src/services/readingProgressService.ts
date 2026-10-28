import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/db";
import { ReadingProgress } from "@/models";
import type { ReadingProgressDocument } from "@/models/ReadingProgress";
import type { Bookmark, ReadingContext } from "@/types/db";

// ---------------------------------------------------------------------------
// readingProgressService
//
// Manages reading position and bookmarks across two strongly-typed contexts:
// 1. "canonical" (reading the original book):
//    - Unique by { userId, bookId } where readingContext = "canonical"
//    - personalCopyId must NOT be present
//
// 2. "personal" (reading a personal copy):
//    - Unique by { userId, personalCopyId } where readingContext = "personal"
//    - personalCopyId IS required
// ---------------------------------------------------------------------------

export interface UpsertProgressParams {
  userId: string;
  bookId: string;
  currentChapterNumber?: number;
  scrollPosition?: number;
  completionPercentage?: number;
}

/**
 * Upsert reading progress in the canonical context.
 */
export async function upsertCanonicalProgress(
  params: UpsertProgressParams,
): Promise<ReadingProgressDocument> {
  await connectToDatabase();

  const userObjectId = new mongoose.Types.ObjectId(params.userId);
  const bookObjectId = new mongoose.Types.ObjectId(params.bookId);

  const filter = {
    userId: userObjectId,
    bookId: bookObjectId,
    readingContext: "canonical" as const,
  };

  const setFields: Record<string, unknown> = {
    lastReadAt: new Date(),
  };

  if (params.currentChapterNumber !== undefined) {
    setFields.currentChapterNumber = params.currentChapterNumber;
  }
  if (params.scrollPosition !== undefined) {
    setFields.scrollPosition = params.scrollPosition;
  }
  if (params.completionPercentage !== undefined) {
    setFields.completionPercentage = params.completionPercentage;
  }

  const update = {
    $set: setFields,
    $setOnInsert: {
      userId: userObjectId,
      bookId: bookObjectId,
      readingContext: "canonical",
    },
  };

  const doc = await ReadingProgress.findOneAndUpdate(filter, update, {
    upsert: true,
    new: true,
    runValidators: true,
  }).exec();

  return doc as ReadingProgressDocument;
}

/**
 * Upsert reading progress in the personal context.
 */
export async function upsertPersonalProgress(
  params: UpsertProgressParams & { personalCopyId: string },
): Promise<ReadingProgressDocument> {
  await connectToDatabase();

  const userObjectId = new mongoose.Types.ObjectId(params.userId);
  const bookObjectId = new mongoose.Types.ObjectId(params.bookId);
  const personalCopyObjectId = new mongoose.Types.ObjectId(
    params.personalCopyId,
  );

  const filter = {
    userId: userObjectId,
    personalCopyId: personalCopyObjectId,
    readingContext: "personal" as const,
  };

  const setFields: Record<string, unknown> = {
    bookId: bookObjectId,
    lastReadAt: new Date(),
  };

  if (params.currentChapterNumber !== undefined) {
    setFields.currentChapterNumber = params.currentChapterNumber;
  }
  if (params.scrollPosition !== undefined) {
    setFields.scrollPosition = params.scrollPosition;
  }
  if (params.completionPercentage !== undefined) {
    setFields.completionPercentage = params.completionPercentage;
  }

  const update = {
    $set: setFields,
    $setOnInsert: {
      userId: userObjectId,
      personalCopyId: personalCopyObjectId,
      readingContext: "personal",
    },
  };

  const doc = await ReadingProgress.findOneAndUpdate(filter, update, {
    upsert: true,
    new: true,
    runValidators: true,
  }).exec();

  return doc as ReadingProgressDocument;
}

/**
 * Retrieve reading progress for a user in either canonical or personal context.
 */
export async function getReadingProgress(
  userId: string,
  target:
    | {
        readingContext: "canonical";
        bookId: string;
      }
    | {
        readingContext: "personal";
        personalCopyId: string;
      },
): Promise<ReadingProgressDocument | null> {
  await connectToDatabase();

  const userObjectId = new mongoose.Types.ObjectId(userId);

  if (target.readingContext === "canonical") {
    return ReadingProgress.findOne({
      userId: userObjectId,
      bookId: new mongoose.Types.ObjectId(target.bookId),
      readingContext: "canonical",
    }).exec();
  }

  return ReadingProgress.findOne({
    userId: userObjectId,
    personalCopyId: new mongoose.Types.ObjectId(target.personalCopyId),
    readingContext: "personal",
  }).exec();
}

/**
 * Add a bookmark to reading progress in the appropriate context.
 */
export async function addBookmark(params: {
  userId: string;
  bookId: string;
  readingContext: ReadingContext;
  personalCopyId?: string;
  bookmark: Omit<Bookmark, "createdAt">;
}): Promise<ReadingProgressDocument | null> {
  await connectToDatabase();

  const userObjectId = new mongoose.Types.ObjectId(params.userId);
  const filter: Record<string, unknown> = {
    userId: userObjectId,
    readingContext: params.readingContext,
  };

  if (params.readingContext === "canonical") {
    filter.bookId = new mongoose.Types.ObjectId(params.bookId);
  } else {
    if (!params.personalCopyId) {
      throw new Error("personalCopyId is required for personal readingContext");
    }
    filter.personalCopyId = new mongoose.Types.ObjectId(params.personalCopyId);
  }

  const bookmarkData = {
    ...params.bookmark,
    createdAt: new Date(),
  };

  return ReadingProgress.findOneAndUpdate(
    filter,
    {
      $push: { bookmarks: bookmarkData },
      $set: { lastReadAt: new Date() },
    },
    { new: true },
  ).exec();
}

/**
 * Get recent reading activity for a user ("Continue Reading" shelf).
 */
export async function getUserRecentProgress(
  userId: string,
  limit = 5,
): Promise<ReadingProgressDocument[]> {
  await connectToDatabase();

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return [];
  }

  return ReadingProgress.find({
    userId: new mongoose.Types.ObjectId(userId),
  })
    .sort({ lastReadAt: -1 })
    .limit(limit)
    .populate("bookId", "title author coverImage slug")
    .populate("personalCopyId", "customTitle customCoverImage")
    .exec();
}
