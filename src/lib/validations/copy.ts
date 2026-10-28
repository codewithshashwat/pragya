import { z } from "zod";

// ---------------------------------------------------------------------------
// PersonalBookCopy validation schemas
// ---------------------------------------------------------------------------

export const CreatePersonalCopySchema = z.object({
  originalBookId: z.string().min(1, "originalBookId is required"),
});

export const UpdatePersonalCopyMetaSchema = z
  .object({
    customTitle: z.string().min(1).max(500).trim().optional(),
    customDescription: z.string().max(2000).trim().optional(),
    customCoverImage: z.string().url().optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

// ---------------------------------------------------------------------------
// PersonalChapter validation schemas
// (content validated separately via validateContentDoc)
// ---------------------------------------------------------------------------

export const SavePersonalChapterSchema = z.object({
  personalCopyId: z.string().min(1, "personalCopyId is required"),
  chapterNumber: z.number().int().min(1),
  // title and content are validated in the service after copying from canonical
});

export type CreatePersonalCopyInput = z.infer<typeof CreatePersonalCopySchema>;
export type UpdatePersonalCopyMetaInput = z.infer<
  typeof UpdatePersonalCopyMetaSchema
>;
export type SavePersonalChapterInput = z.infer<
  typeof SavePersonalChapterSchema
>;
