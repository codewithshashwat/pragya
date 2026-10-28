import type { Types } from "mongoose";

// ---------------------------------------------------------------------------
// ProseMirror document model
// Editor-agnostic structured content format. Compatible with ProseMirror,
// TipTap, Milkdown, and Remirror. No editor package required.
// ---------------------------------------------------------------------------

export type AllowedNodeType =
  | "doc"
  | "paragraph"
  | "heading"
  | "blockquote"
  | "bulletList"
  | "orderedList"
  | "listItem"
  | "codeBlock"
  | "horizontalRule"
  | "hardBreak"
  | "text"
  | "image";

export type AllowedMarkType = "bold" | "italic" | "underline" | "code" | "link";

export interface ProseMirrorMark {
  type: AllowedMarkType;
  attrs?: {
    href?: string;
    target?: string;
    [key: string]: unknown;
  };
}

export interface HeadingAttrs {
  level: 1 | 2 | 3 | 4;
}

export interface ImageAttrs {
  src: string;
  alt?: string;
  title?: string;
}

export type NodeAttrs = HeadingAttrs | ImageAttrs | Record<string, unknown>;

export interface ProseMirrorNode {
  type: AllowedNodeType;
  attrs?: NodeAttrs;
  content?: ProseMirrorNode[];
  marks?: ProseMirrorMark[];
  text?: string;
}

export interface ProseMirrorDoc {
  type: "doc";
  content: ProseMirrorNode[];
}

// ---------------------------------------------------------------------------
// User
// ---------------------------------------------------------------------------

export type UserRole = "user" | "admin";

export interface IUser {
  _id: Types.ObjectId;
  name?: string;
  email: string;
  emailVerified?: Date;
  image?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Book (canonical)
// ---------------------------------------------------------------------------

export interface TocEntry {
  chapterNumber: number;
  title: string;
  slug: string;
  wordCount: number;
}

export interface IBook {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  author: string;
  description?: string;
  coverImage?: string;
  category?: string;
  tags: string[];
  isPublished: boolean;
  publishedAt?: Date;
  chapterCount: number;
  toc: TocEntry[];
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// Chapter (canonical content)
// ---------------------------------------------------------------------------

export interface IChapter {
  _id: Types.ObjectId;
  bookId: Types.ObjectId;
  chapterNumber: number;
  title: string;
  slug: string;
  content: ProseMirrorDoc;
  wordCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// PersonalBookCopy
// ---------------------------------------------------------------------------

export interface IPersonalBookCopy {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  originalBookId: Types.ObjectId;
  customTitle?: string;
  customDescription?: string;
  customCoverImage?: string;
  lastEditedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// PersonalChapter (Copy-on-Write override)
// ---------------------------------------------------------------------------

export interface IPersonalChapter {
  _id: Types.ObjectId;
  personalCopyId: Types.ObjectId;
  userId: Types.ObjectId;
  originalBookId: Types.ObjectId;
  chapterNumber: number;
  title: string;
  content: ProseMirrorDoc;
  wordCount: number;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------------------
// ReadingProgress
// ---------------------------------------------------------------------------

export type ReadingContext = "canonical" | "personal";

export interface Bookmark {
  chapterNumber: number;
  scrollPosition: number;
  label?: string;
  createdAt: Date;
}

export interface IReadingProgress {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  bookId: Types.ObjectId;
  personalCopyId?: Types.ObjectId;
  readingContext: ReadingContext;
  currentChapterNumber: number;
  scrollPosition: number;
  completionPercentage: number;
  bookmarks: Bookmark[];
  lastReadAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
