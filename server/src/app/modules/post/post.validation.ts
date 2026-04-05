import z from "zod";

const postValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1, "Content is required"),
    visibility: z.enum(["public", "private"]).optional().default("public"),
  }),
});

export const postValidation = {
  postValidationSchema,
};
