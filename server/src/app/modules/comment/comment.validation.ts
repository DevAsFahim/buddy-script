import z from "zod";

export const commentValidationSchema = z.object({
  body: z.object({
    postId: z.string({ error: "Post ID is required" }),
    text: z.string().min(1, "Comment cannot be empty").max(1000),
    parentId: z.string().optional().nullable(),
  }),
});