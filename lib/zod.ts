import { z } from "zod";
import { HABIT_FREQUENCIES } from "@/types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type T = (key: any) => string;

export const createLoginSchema = (t: T) =>
  z.object({
    email: z.email(t("emailInvalid")),
    password: z.string().min(8, t("passwordMin")),
    remember: z.boolean().optional(),
  });

export const createSignUpSchema = (t: T) =>
  z
    .object({
      name: z.string().min(1, t("nameRequired")).max(50, t("nameMax")),
      email: z.email(t("emailInvalid")),
      password: z
        .string()
        .min(8, t("passwordMin"))
        .regex(/[A-Z]/, t("passwordUppercase"))
        .regex(/[0-9]/, t("passwordNumber")),
      confirm: z.string().min(8, t("passwordConfirm")),
    })
    .refine((data) => data.password === data.confirm, {
      message: t("passwordsNoMatch"),
      path: ["confirm"],
    })
    .refine((data) => data.password.length >= 8, t("passwordMin"));

export const createHabitSchema = (t: T) =>
  z
    .object({
      name: z.string().min(1, t("nameRequired")).max(50, t("nameMax")),
      description: z.string().max(100, t("descriptionMax")).optional(),
      frequency: z.enum(HABIT_FREQUENCIES),
      color: z.string().optional(),
      weekly_target: z
        .number()
        .int()
        .min(1)
        .max(7, t("weeklyTarget"))
        .optional(),
      target_days: z
        .array(z.number().int().min(0).max(6, t("selectDays")))
        .optional(),
    })
    .refine(
      (data) => {
        if (data.frequency !== "custom") return true;
        return Array.isArray(data.target_days) && data.target_days.length > 0;
      },
      { message: t("selectDays"), path: ["target_days"] },
    );

export const createGoalSchema = (t: T) =>
  z
    .object({
      name: z.string().min(1, t("goalNameRequired")).max(50, t("nameMax")),
      habit_name: z
        .string()
        .min(1, t("habitNameRequired"))
        .max(50, t("habitNameMax")),
      period: z.enum(["7", "14", "30", "90", "180", "365"]),
      habit_frequency: z.enum(["daily", "weekly", "custom"]),
      habit_target_days: z.array(z.number().int().min(0).max(6)).optional(),
    })
    .refine(
      (data) => {
        if (data.habit_frequency !== "weekly") return true;
        return (
          Array.isArray(data.habit_target_days) &&
          data.habit_target_days.length === 1
        );
      },
      { message: t("selectDay"), path: ["habit_target_days"] },
    )
    .refine(
      (data) => {
        if (data.habit_frequency !== "custom") return true;
        return (
          Array.isArray(data.habit_target_days) &&
          data.habit_target_days.length > 0
        );
      },
      { message: t("selectDays"), path: ["habit_target_days"] },
    );

export const createForgotPasswordSchema = (t: T) =>
  z.object({
    email: z.email(t("emailInvalid")),
  });

export const createResetPasswordSchema = (t: T) =>
  z
    .object({
      password: z
        .string()
        .min(8, t("passwordMin"))
        .regex(/[A-Z]/, t("passwordUppercase"))
        .regex(/[0-9]/, t("passwordNumber")),
      confirm: z.string().min(1, t("passwordConfirm")),
    })
    .refine((data) => data.password === data.confirm, {
      message: t("passwordsNoMatch"),
      path: ["confirm"],
    });

export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type SignUpFormValues = z.infer<ReturnType<typeof createSignUpSchema>>;
export type HabitFormValues = z.infer<ReturnType<typeof createHabitSchema>>;
export type GoalFormValues = z.infer<ReturnType<typeof createGoalSchema>>;
export type ForgotPasswordFormValues = z.infer<
  ReturnType<typeof createForgotPasswordSchema>
>;
export type ResetPasswordFormValues = z.infer<
  ReturnType<typeof createResetPasswordSchema>
>;
