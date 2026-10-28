import mongoose, { type Document, Schema } from "mongoose";
import type { IPersonalBookCopy } from "@/types/db";

// ---------------------------------------------------------------------------
// PersonalBookCopyDocument
//
// Lightweight header record. Created when a user opens a book for personal
// editing. Does NOT duplicate any chapter content — zero Chapter documents
// are copied on creation.
//
// Chapter content resolution (Copy-on-Write):
//   1. findOne PersonalChapter { personalCopyId, chapterNumber }
//      FOUND     → use PersonalChapter content
//      NOT FOUND → fall back to canonical Chapter
//
// The editedChapters array is intentionally omitted. The PersonalChapter
// unique index { personalCopyId, chapterNumber } is the single source of
// truth. A parallel array would create a dual-write consistency window.
// ---------------------------------------------------------------------------

export interface PersonalBookCopyDocument extends IPersonalBookCopy, Document {
  _id: mongoose.Types.ObjectId;
}

const PersonalBookCopySchema = new Schema<PersonalBookCopyDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    originalBookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "originalBookId is required"],
    },
    // Optional overrides — only stored when user explicitly changes them.
    customTitle: {
      type: String,
      trim: true,
    },
    customDescription: {
      type: String,
      trim: true,
    },
    customCoverImage: {
      type: String,
    },
    lastEditedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

// Unique compound: enforces one copy per user per book.
// Also the "does this user already have a copy?" existence check.
PersonalBookCopySchema.index(
  { userId: 1, originalBookId: 1 },
  { unique: true },
);

// Personal shelf: user's copies sorted by most recently edited.
PersonalBookCopySchema.index({ userId: 1, lastEditedAt: -1 });

const PersonalBookCopy =
  (mongoose.models
    .PersonalBookCopy as mongoose.Model<PersonalBookCopyDocument>) ??
  mongoose.model<PersonalBookCopyDocument>(
    "PersonalBookCopy",
    PersonalBookCopySchema,
  );

export default PersonalBookCopy;
