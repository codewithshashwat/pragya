import { z } from "zod";
import type { AllowedMarkType, AllowedNodeType } from "@/types/db";

// ---------------------------------------------------------------------------
// Bounded ProseMirror document validator
//
// Enforces:
//   - Allowed node type allowlist
//   - Allowed mark type allowlist
//   - Heading levels 1–4 only
//   - Max nesting depth: 6 levels
//   - Max child nodes per node: 200
//   - Document byte-size ceiling: 512 KB (checked before calling this)
//
// This validator is called at the service layer before any write to MongoDB.
// Mongoose stores content as Mixed and does not re-validate structure.
// ---------------------------------------------------------------------------

const ALLOWED_NODE_TYPES: AllowedNodeType[] = [
  "doc",
  "paragraph",
  "heading",
  "blockquote",
  "bulletList",
  "orderedList",
  "listItem",
  "codeBlock",
  "horizontalRule",
  "hardBreak",
  "text",
  "image",
];

const ALLOWED_MARK_TYPES: AllowedMarkType[] = [
  "bold",
  "italic",
  "underline",
  "code",
  "link",
];

const MAX_DEPTH = 6;
const MAX_CHILDREN_PER_NODE = 200;
const MAX_CONTENT_BYTES = 512 * 1024; // 512 KB

// ---------------------------------------------------------------------------
// Mark schema
// ---------------------------------------------------------------------------

const ProseMirrorMarkSchema = z.object({
  type: z.enum(ALLOWED_MARK_TYPES as [AllowedMarkType, ...AllowedMarkType[]]),
  attrs: z
    .object({
      href: z.string().url().optional(),
      target: z.string().optional(),
    })
    .passthrough()
    .optional(),
});

// ---------------------------------------------------------------------------
// Recursive node schema (depth-limited)
// ---------------------------------------------------------------------------

function buildNodeSchema(depth: number): z.ZodType<unknown> {
  if (depth > MAX_DEPTH) {
    // At max depth, reject nodes that have content (no further nesting).
    return z.object({
      type: z.enum(
        ALLOWED_NODE_TYPES as [AllowedNodeType, ...AllowedNodeType[]],
      ),
      text: z.string().optional(),
      marks: z.array(ProseMirrorMarkSchema).optional(),
      // content must be absent or empty at max depth
      content: z.array(z.never()).max(0).optional(),
      attrs: z.record(z.unknown()).optional(),
    });
  }

  return z
    .object({
      type: z.enum(
        ALLOWED_NODE_TYPES as [AllowedNodeType, ...AllowedNodeType[]],
      ),
      attrs: z.record(z.unknown()).optional(),
      marks: z.array(ProseMirrorMarkSchema).optional(),
      text: z.string().optional(),
      content: z
        .array(z.lazy(() => buildNodeSchema(depth + 1)))
        .max(MAX_CHILDREN_PER_NODE)
        .optional(),
    })
    .superRefine((node, ctx) => {
      // Heading level constraint: only levels 1–4 are permitted.
      if (node.type === "heading") {
        const level = (node.attrs as Record<string, unknown> | undefined)
          ?.level;
        if (
          typeof level !== "number" ||
          !Number.isInteger(level) ||
          level < 1 ||
          level > 4
        ) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message:
              "Heading nodes must have attrs.level set to an integer between 1 and 4",
            path: ["attrs", "level"],
          });
        }
      }
    });
}

// ---------------------------------------------------------------------------
// Top-level document schema
// ---------------------------------------------------------------------------

export const ProseMirrorDocSchema = z.object({
  type: z.literal("doc"),
  content: z.array(z.lazy(() => buildNodeSchema(1))).max(MAX_CHILDREN_PER_NODE),
});

export type ProseMirrorDocInput = z.infer<typeof ProseMirrorDocSchema>;

// ---------------------------------------------------------------------------
// validateContentDoc
//
// Call this before saving chapter content to the database.
// Checks byte size first (cheap), then runs the recursive Zod schema.
// ---------------------------------------------------------------------------

export function validateContentDoc(content: unknown): {
  success: boolean;
  error?: string;
} {
  // 1. Byte size ceiling — serialize once, check before parsing.
  let serialized: string;
  try {
    serialized = JSON.stringify(content);
  } catch {
    return { success: false, error: "Content is not serializable JSON" };
  }

  const byteLength = Buffer.byteLength(serialized, "utf8");
  if (byteLength > MAX_CONTENT_BYTES) {
    return {
      success: false,
      error: `Content exceeds maximum size of ${MAX_CONTENT_BYTES / 1024} KB (got ${Math.round(byteLength / 1024)} KB)`,
    };
  }

  // 2. Recursive structural validation.
  const result = ProseMirrorDocSchema.safeParse(content);
  if (!result.success) {
    const firstError = result.error.errors[0];
    return {
      success: false,
      error: firstError
        ? `Content validation failed: ${firstError.path.join(".")} — ${firstError.message}`
        : "Content validation failed",
    };
  }

  return { success: true };
}
