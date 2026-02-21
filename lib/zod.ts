import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirm: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, "Passwords don't match");

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
