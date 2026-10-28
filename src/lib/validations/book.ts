import { z } from "zod";

// ---------------------------------------------------------------------------
// Book validation schemas (for admin book creation/update)
// ---------------------------------------------------------------------------

export const CreateBookSchema = z.object({
  title: z.string().min(1, "Title is required").max(500).trim(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .trim()
    .toLowerCase()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      "Slug must be lowercase letters, numbers, and hyphens only",
    ),
  author: z.string().min(1, "Author is required").max(300).trim(),
  description: z.string().max(2000).trim().optional(),
  coverImage: z.string().url().optional(),
  category: z.string().max(100).trim().optional(),
  tags: z.array(z.string().max(50).trim()).max(20).default([]),
  isPublished: z.boolean().default(false),
});

export const UpdateBookSchema = CreateBookSchema.partial().extend({
  isPublished: z.boolean().optional(),
  publishedAt: z.date().optional(),
});

// ---------------------------------------------------------------------------
// Chapter validation schemas
// ---------------------------------------------------------------------------

export const CreateChapterSchema = z.object({
  bookId: z.string().min(1, "bookId is required"),
  chapterNumber: z.number().int().min(1),
  title: z.string().min(1, "Title is required").max(500).trim(),
  slug: z
    .string()
    .min(1)
    .max(200)
    .trim()
    .toLowerCase()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be URL-safe"),
  // content is validated separately via validateContentDoc()
});

export const UpdateChapterSchema = CreateChapterSchema.partial().omit({
  bookId: true,
  chapterNumber: true,
});

export type CreateBookInput = z.infer<typeof CreateBookSchema>;
export type UpdateBookInput = z.infer<typeof UpdateBookSchema>;
export type CreateChapterInput = z.infer<typeof CreateChapterSchema>;
export type UpdateChapterInput = z.infer<typeof UpdateChapterSchema>;
