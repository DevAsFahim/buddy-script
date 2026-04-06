import z from "zod";

export const likeValidationSchema = z.object({
  body: z.object({
    targetId: z.string({ error: "Target ID is required" }),
    targetModel: z.enum(["Post", "Comment"]),
  }),
});