import mongoose, { type Document, Schema } from "mongoose";
import type { Bookmark, IReadingProgress, ReadingContext } from "@/types/db";

// ---------------------------------------------------------------------------
// ReadingProgressDocument
//
// Tracks reading position for a user in a specific reading context.
// Two mutually exclusive contexts, enforced by two PARTIAL unique indexes:
//
//   "canonical" — reading the original book
//     Unique on: { userId, bookId } WHERE readingContext = "canonical"
//     personalCopyId: MUST be absent
//
//   "personal"  — reading the user's personal copy
//     Unique on: { userId, personalCopyId } WHERE readingContext = "personal"
//     personalCopyId: REQUIRED
//
// The conditional personalCopyId requirement is enforced by a Mongoose
// validate callback so it applies at the schema level, not just in Zod.
// ---------------------------------------------------------------------------

export interface ReadingProgressDocument extends IReadingProgress, Document {
  _id: mongoose.Types.ObjectId;
}

const BookmarkSchema = new Schema<Bookmark>(
  {
    chapterNumber: { type: Number, required: true },
    scrollPosition: { type: Number, required: true, default: 0 },
    label: { type: String, trim: true },
    createdAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const ReadingProgressSchema = new Schema<ReadingProgressDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "bookId is required"],
    },
    personalCopyId: {
      type: Schema.Types.ObjectId,
      ref: "PersonalBookCopy",
      // Required when context is "personal", must be absent when "canonical".
      // Enforced in the validate callback below.
      validate: {
        validator(this: ReadingProgressDocument, value: unknown): boolean {
          if (this.readingContext === "personal") {
            return value != null;
          }
          // For canonical context, personalCopyId must be absent/null.
          return value == null;
        },
        message(props: { path: string }) {
          return (
            `${props.path}: must be present when readingContext is "personal" ` +
            'and absent when readingContext is "canonical"'
          );
        },
      },
    },
    readingContext: {
      type: String,
      enum: ["canonical", "personal"] satisfies ReadingContext[],
      required: [true, "readingContext is required"],
    },
    currentChapterNumber: {
      type: Number,
      default: 1,
      min: 1,
    },
    scrollPosition: {
      type: Number,
      default: 0,
      min: 0,
    },
    completionPercentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    bookmarks: {
      type: [BookmarkSchema],
      default: [],
    },
    lastReadAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// ---------------------------------------------------------------------------
// Partial unique indexes — context-specific uniqueness
// ---------------------------------------------------------------------------

// Canonical context: at most one progress record per user per canonical book.
ReadingProgressSchema.index(
  { userId: 1, bookId: 1 },
  {
    unique: true,
    partialFilterExpression: { readingContext: "canonical" },
    name: "progress_canonical_unique",
  },
);

// Personal context: at most one progress record per user per personal copy.
ReadingProgressSchema.index(
  { userId: 1, personalCopyId: 1 },
  {
    unique: true,
    partialFilterExpression: { readingContext: "personal" },
    name: "progress_personal_unique",
  },
);

// Continue Reading shelf — all contexts, sorted by most recently read.
ReadingProgressSchema.index({ userId: 1, lastReadAt: -1 });

const ReadingProgress =
  (mongoose.models
    .ReadingProgress as mongoose.Model<ReadingProgressDocument>) ??
  mongoose.model<ReadingProgressDocument>(
    "ReadingProgress",
    ReadingProgressSchema,
  );

export default ReadingProgress;
