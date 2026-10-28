import mongoose, { type Document, Schema } from "mongoose";
import type { IPersonalChapter, ProseMirrorDoc } from "@/types/db";

// ---------------------------------------------------------------------------
// PersonalChapterDocument — Copy-on-Write chapter override.
//
// Created atomically via findOneAndUpdate + upsert ONLY when a user edits a
// chapter for the first time. The canonical Chapter is read once to provide
// the content baseline, then this document diverges independently.
//
// The canonical Chapter is NEVER written to by this or any user-facing flow.
//
// Concurrent first-edit safety:
//   Two simultaneous requests for the same (personalCopyId, chapterNumber)
//   both call findOneAndUpdate with upsert:true. The unique compound index
//   guarantees exactly one document is created. The loser receives E11000
//   and falls back to findOne to retrieve the winning document.
// ---------------------------------------------------------------------------

export interface PersonalChapterDocument extends IPersonalChapter, Document {
  _id: mongoose.Types.ObjectId;
}

const PersonalChapterSchema = new Schema<PersonalChapterDocument>(
  {
    personalCopyId: {
      type: Schema.Types.ObjectId,
      ref: "PersonalBookCopy",
      required: [true, "personalCopyId is required"],
    },
    // userId is redundant (derivable from PersonalBookCopy) but stored
    // explicitly for fast scoped queries without a join on PersonalBookCopy.
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
    chapterNumber: {
      type: Number,
      required: [true, "chapterNumber is required"],
      min: 1,
    },
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    content: {
      type: Schema.Types.Mixed,
      required: [true, "Content is required"],
      default: (): ProseMirrorDoc => ({ type: "doc", content: [] }),
    },
    wordCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

// Primary read/write path. Uniqueness here is the atomicity guarantee for
// Copy-on-Write: the DB will reject a second upsert for the same chapter.
PersonalChapterSchema.index(
  { personalCopyId: 1, chapterNumber: 1 },
  { unique: true },
);

// Scoped override resolution without joining PersonalBookCopy.
PersonalChapterSchema.index({ userId: 1, originalBookId: 1, chapterNumber: 1 });

const PersonalChapter =
  (mongoose.models
    .PersonalChapter as mongoose.Model<PersonalChapterDocument>) ??
  mongoose.model<PersonalChapterDocument>(
    "PersonalChapter",
    PersonalChapterSchema,
  );

export default PersonalChapter;
