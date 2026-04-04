import z from "zod";

const userValidationSchema = z.object({
  body: z.object({
    firstName: z.string().trim().min(1, "First name is required"),
    lastName: z.string().trim().min(1, "Last name is required"),
    email: z.string().email("Invalid email"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(/[A-Z]/, "Must include uppercase in password")
      .regex(/[a-z]/, "Must include lowercase in password")
      .regex(/[^A-Za-z0-9]/, "Must include special character in password"),
  }),
});

export const userValidation = {
  userValidationSchema,
};
