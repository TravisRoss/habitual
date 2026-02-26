import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean().optional(),
});

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters"),
    email: z.email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[0-9]/, "Must include a number"),
    confirm: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirm, "Passwords don't match")
  .refine(
    (data) => data.password.length >= 8,
    "Password must be at least 8 characters",
  );

export const habitSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(50, "Name must be less than 50 characters"),
    description: z
      .string()
      .max(100, "Description must be less than 100 characters")
      .optional(),
    frequency: z.enum(["daily", "weekly", "custom"]),
    color: z.string().optional(),
    weekly_target: z
      .number()
      .int()
      .min(1)
      .max(7, "Select how many days per week (1–7)")
      .optional(),
    target_days: z
      .array(z.number().int().min(0).max(6, "Select at least one day"))
      .optional(),
  })
  .refine(
    (data) => {
      if (data.frequency !== "weekly") return true;
      const n = data.weekly_target;
      return typeof n === "number" && n >= 1 && n <= 7;
    },
    { message: "Select how many days per week (1–7)", path: ["weekly_target"] },
  )
  .refine(
    (data) => {
      if (data.frequency !== "custom") return true;
      return Array.isArray(data.target_days) && data.target_days.length > 0;
    },
    { message: "Select at least one day", path: ["target_days"] },
  );

export const goalSchema = z.object({
  name: z
    .string()
    .min(1, "Goal name is required")
    .max(50, "Name must be less than 50 characters"),
  habit: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("existing"),
      id: z.string().min(1, "Please select a habit"),
    }),
    z.object({
      type: z.literal("new"),
      name: z.string().min(1, "Habit name is required"),
      description: z.string().optional(),
      frequency: z.enum(["daily", "weekly", "custom"]).optional(),
      color: z.string().optional(),
      weekly_target: z.number().optional(),
      target_days: z.array(z.number()).optional(),
    }),
  ]),
  period: z.enum(["7", "14", "30", "90", "180", "365"]),
  start_date: z.string().refine(
    (date) => {
      const today = new Date();
      const inputDate = new Date(date);
      return (
        inputDate >=
        new Date(today.getFullYear(), today.getMonth(), today.getDate())
      );
    },
    { message: "Start date cannot be in the past", path: ["start_date"] },
  ),
  target: z.number().min(1, "Target must be at least 1"),
  unit: z.enum(["times", "hours", "minutes", "pages", "kg", "custom"]),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignUpFormValues = z.infer<typeof signUpSchema>;
export type HabitFormValues = z.infer<typeof habitSchema>;
export type GoalFormValues = z.infer<typeof goalSchema>;
