// ---------------------------------------------------------------------------
// Model re-export index with hot-reload guard
//
// All models are registered through this single entry point. The guard
// pattern in each model file (mongoose.models.X ?? mongoose.model(...))
// prevents "Cannot overwrite model once compiled" errors during Next.js HMR.
// ---------------------------------------------------------------------------

export type { BookDocument } from "./Book";
export { default as Book } from "./Book";
export type { ChapterDocument } from "./Chapter";
export { default as Chapter } from "./Chapter";
export type { PersonalBookCopyDocument } from "./PersonalBookCopy";
export { default as PersonalBookCopy } from "./PersonalBookCopy";
export type { PersonalChapterDocument } from "./PersonalChapter";
export { default as PersonalChapter } from "./PersonalChapter";
export type { ReadingProgressDocument } from "./ReadingProgress";
export { default as ReadingProgress } from "./ReadingProgress";
export type { UserDocument } from "./User";
export { default as User } from "./User";
