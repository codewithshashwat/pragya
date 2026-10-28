import { z } from "zod";

// ---------------------------------------------------------------------------
// ReadingProgress validation schemas
// ---------------------------------------------------------------------------

const BookmarkSchema = z.object({
  chapterNumber: z.number().int().min(1),
  scrollPosition: z.number().min(0).default(0),
  label: z.string().max(200).trim().optional(),
});

// Canonical progress — personalCopyId must be absent
export const UpsertCanonicalProgressSchema = z.object({
  userId: z.string().min(1),
  bookId: z.string().min(1),
  currentChapterNumber: z.number().int().min(1).optional(),
  scrollPosition: z.number().min(0).optional(),
  completionPercentage: z.number().min(0).max(100).optional(),
});

// Personal progress — personalCopyId is required
export const UpsertPersonalProgressSchema = z.object({
  userId: z.string().min(1),
  bookId: z.string().min(1),
  personalCopyId: z
    .string()
    .min(1, "personalCopyId is required for personal context"),
  currentChapterNumber: z.number().int().min(1).optional(),
  scrollPosition: z.number().min(0).optional(),
  completionPercentage: z.number().min(0).max(100).optional(),
});

export const AddBookmarkSchema = z.object({
  userId: z.string().min(1),
  bookId: z.string().min(1),
  readingContext: z.enum(["canonical", "personal"]),
  personalCopyId: z.string().optional(),
  bookmark: BookmarkSchema,
});

export type UpsertCanonicalProgressInput = z.infer<
  typeof UpsertCanonicalProgressSchema
>;
export type UpsertPersonalProgressInput = z.infer<
  typeof UpsertPersonalProgressSchema
>;
export type AddBookmarkInput = z.infer<typeof AddBookmarkSchema>;
