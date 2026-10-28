import mongoose, { type Document, Schema } from "mongoose";
import type { IBook, TocEntry } from "@/types/db";

// ---------------------------------------------------------------------------
// BookDocument — canonical book record, managed by administrators only.
// Regular users have read-only access to published books.
// ---------------------------------------------------------------------------

export interface BookDocument extends IBook, Document {
  _id: mongoose.Types.ObjectId;
}

const TocEntrySchema = new Schema<TocEntry>(
  {
    chapterNumber: { type: Number, required: true },
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, lowercase: true, trim: true },
    wordCount: { type: Number, default: 0 },
  },
  { _id: false }, // embedded sub-document, no separate _id needed
);

const BookSchema = new Schema<BookDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author is required"],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    coverImage: {
      type: String,
    },
    category: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
    publishedAt: {
      type: Date,
    },
    chapterCount: {
      type: Number,
      default: 0,
      required: true,
    },
    toc: {
      type: [TocEntrySchema],
      default: [],
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "createdBy is required"],
    },
  },
  {
    timestamps: true,
  },
);

// Indexes (slug unique index created by field option above)
BookSchema.index({ isPublished: 1, createdAt: -1 });
BookSchema.index({ category: 1, isPublished: 1 });
BookSchema.index(
  { title: "text", author: "text", description: "text" },
  { name: "book_text_search" },
);

const Book =
  (mongoose.models.Book as mongoose.Model<BookDocument>) ??
  mongoose.model<BookDocument>("Book", BookSchema);

export default Book;
