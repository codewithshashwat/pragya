import mongoose, { type Document, Schema } from "mongoose";
import type { IChapter, ProseMirrorDoc } from "@/types/db";

// ---------------------------------------------------------------------------
// ChapterDocument — canonical chapter content.
// Created and edited by administrators only. Never written to by user flows.
// ---------------------------------------------------------------------------

export interface ChapterDocument extends IChapter, Document {
  _id: mongoose.Types.ObjectId;
}

const ChapterSchema = new Schema<ChapterDocument>(
  {
    bookId: {
      type: Schema.Types.ObjectId,
      ref: "Book",
      required: [true, "bookId is required"],
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
    slug: {
      type: String,
      required: [true, "Slug is required"],
      lowercase: true,
      trim: true,
    },
    // Content is stored as a ProseMirror-compatible JSON document.
    // Validated at the service layer via Zod before reaching Mongoose.
    // Using Mixed allows the nested structure while keeping the schema simple.
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

// Primary read path: load chapter N of book X
ChapterSchema.index({ bookId: 1, chapterNumber: 1 }, { unique: true });
// URL routing: /books/[bookSlug]/[chapterSlug]
ChapterSchema.index({ bookId: 1, slug: 1 }, { unique: true });

const Chapter =
  (mongoose.models.Chapter as mongoose.Model<ChapterDocument>) ??
  mongoose.model<ChapterDocument>("Chapter", ChapterSchema);

export default Chapter;
