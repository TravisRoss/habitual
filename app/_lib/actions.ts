"use server";

import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  profileExistsByEmail,
  insertProfile,
  insertHabit,
  updateHabit,
  deleteHabit,
  getHabitsByUserId,
  getHabitsByUserIdAndDate,
  getCompletionsByUserIdAndDate,
  deleteCompletion,
  insertCompletion,
  updateGoal,
  getGoalsByUserId,
  insertGoal,
  deleteGoal,
  getCompletionsByUserIdAndHabitId,
  getActiveStreaksByUserId,
  getCompletionsByUserIdAndHabitIdForDateRange,
  getCompletionsByUserIdForDateRange,
  getCompletionsByUserId,
  updateProfile,
  updateWeekStartsOn,
  insertPasswordResetToken,
  getPasswordResetToken,
  deletePasswordResetToken,
  updatePasswordByEmail,
  getProfileById,
} from "@/lib/data-service";
import { getResend } from "@/lib/resend";
import type {
  Completion,
  Habit,
  HabitFrequency,
  Period,
  Profile,
  Streak,
  WeekStartsOn,
} from "@/types";
import { revalidatePath } from "next/cache";
import { GoalFormValues, GoalForHabitFormValues } from "@/lib/zod";
import { dateToIsoStr } from "@/app/_lib/utils";
import { cookies } from "next/headers";

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signInWithGitHub() {
  await signIn("github", { redirectTo: "/dashboard" });
}

export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

export async function signUpWithCredentials(data: {
  email: string;
  password: string;
  name: string;
}): Promise<{ error?: string }> {
  const exists = await profileExistsByEmail(data.email);
  if (exists) {
    return { error: "An account with this email already exists." };
  }

  const passwordHash = await bcrypt.hash(data.password, 12);
  const { error } = await insertProfile({
    email: data.email,
    full_name: data.name,
    password_hash: passwordHash,
  });

  if (error) {
    return { error: "Failed to create account. Please try again." };
  }

  return {};
}

export async function updateProfileAction(data: {
  name: string;
  email: string;
  password: string;
}) {
  const passwordHash = await bcrypt.hash(data.password, 12);
  const { error } = await updateProfile({
    email: data.email,
    full_name: data.name,
    password_hash: passwordHash,
  });

  if (error) {
    return { error: "Failed to update account. Please try again." };
  }

  return {};
}

export async function createHabit(data: {
  name: string;
  description?: string;
  frequency?: HabitFrequency;
  color?: string;
  weekly_target?: number;
  target_days: number[];
}): Promise<{ error?: string | null; id?: string | null }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create a habit." };
  }

  const { error, id } = await insertHabit({
    user_id: session.user.id,
    name: data.name,
    description: data.description || null,
    frequency: data.frequency,
    color: data.color,
    weekly_target: null,
    target_days: data.frequency === "custom" ? data.target_days : [],
  });

  if (error || !id) {
    return {
      error: "Failed to create habit. Please try again.",
      id: null,
    };
  }

  revalidatePath("/dashboard");

  return { error, id };
}

export async function fetchHabitsAction(): Promise<Habit[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await getHabitsByUserId(session.user.id)) ?? [];
}

export async function fetchHabitsForDateAction(date: string): Promise<Habit[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await getHabitsByUserIdAndDate(session.user.id, date)) ?? [];
}

export async function fetchCompletionsForHabitAction(
  habit_id: string,
): Promise<Completion[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (
    (await getCompletionsByUserIdAndHabitId(session.user.id, habit_id)) ?? []
  );
}

export async function fetchCompletionsForUser(): Promise<Completion[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await getCompletionsByUserId(session.user.id)) ?? [];
}

export async function fetchCompletionsForHabitInDateRangeAction(
  habit_id: string,
  startDate: string,
  endDate: string,
): Promise<Completion[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (
    (await getCompletionsByUserIdAndHabitIdForDateRange(
      session.user.id,
      habit_id,
      startDate,
      endDate,
    )) ?? []
  );
}

export async function fetchCompletionsForDateAction(
  date: string,
): Promise<Completion[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await getCompletionsByUserIdAndDate(session.user.id, date)) ?? [];
}

export async function fetchCompletionsForDateRangeAction(
  startDate: string,
  endDate: string,
): Promise<Completion[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (
    (await getCompletionsByUserIdForDateRange(
      session.user.id,
      startDate,
      endDate,
    )) ?? []
  );
}

export async function deleteHabitAction(
  habit_id: string,
): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to delete a habit." };
  }

  const { error } = await deleteHabit(habit_id);
  if (error) return { error: "Failed to delete habit. Please try again." };

  return {};
}

export async function editHabitAction(data: {
  habit_id: string;
  name?: string;
  description?: string;
  frequency?: HabitFrequency;
  color?: string;
  weekly_target?: number | null;
  target_days?: number[];
}): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to edit a habit." };
  }

  const { error } = await updateHabit(data.habit_id, {
    name: data.name,
    description: data.description,
    frequency: data.frequency,
    color: data.color,
    weekly_target: data.weekly_target ?? null,
    target_days: data.target_days,
  });

  if (error) {
    return { error: "Failed to edit habit. Please try again." };
  }

  return {};
}

export async function createCompletionAction(
  habit_id: string,
  user_id: string,
  date: string,
): Promise<{ error?: string }> {
  const { error } = await insertCompletion(habit_id, user_id, date);

  if (error) {
    return { error: "Failed to mark habit as complete. Please try again." };
  }

  return {};
}

export async function deleteCompletionAction(
  habit_id: string,
  user_id: string,
  date: string,
): Promise<{ error?: string }> {
  const { error } = await deleteCompletion(habit_id, user_id, date);

  if (error) {
    return { error: "Failed to unmark habit as complete. Please try again." };
  }

  return {};
}

export async function fetchStreaksAction(): Promise<Streak[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await getActiveStreaksByUserId(session.user.id)) ?? [];
}

export async function fetchGoalsAction() {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await getGoalsByUserId(session.user.id)) ?? [];
}

export async function createGoalAction(
  data: GoalFormValues,
): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create a goal." };
  }

  const { error: habitError, id: habitId } = await insertHabit({
    user_id: session.user.id,
    name: data.habit_name,
    frequency: data.habit_frequency,
    weekly_target: null,
    target_days:
      data.habit_frequency === "daily" ? [] : (data.habit_target_days ?? []),
  });

  if (habitError || !habitId) {
    return { error: "Failed to create habit. Please try again." };
  }

  const effectiveDurationDays =
    data.duration_days === "custom"
      ? data.custom_duration_days
      : data.duration_days;
  const daysPerWeek =
    data.habit_frequency === "daily"
      ? 7
      : (data.habit_target_days?.length ?? 1);
  const target_completions = Math.max(
    1,
    Math.floor((Number(effectiveDurationDays) / 7) * daysPerWeek),
  );

  const { error } = await insertGoal({
    user_id: session.user.id,
    name: data.name,
    habit_id: habitId,
    target_completions: target_completions,
    duration_days: effectiveDurationDays as Period,
    start_date: dateToIsoStr(new Date()),
  });

  revalidatePath("/dashboard");
  return error ? { error: `Failed to create goal: ${error}.` } : {};
}

export async function createGoalForHabitAction(
  habit: { id: string; frequency: HabitFrequency; target_days: number[] },
  data: GoalForHabitFormValues,
): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create a goal." };
  }

  const daysPerWeek =
    habit.frequency === "daily" ? 7 : (habit.target_days?.length ?? 1);
  const target_completions = Math.max(
    1,
    Math.floor((Number(data.duration_days) / 7) * daysPerWeek),
  );

  const { error } = await insertGoal({
    user_id: session.user.id,
    habit_id: habit.id,
    name: data.name,
    duration_days: data.duration_days as Period,
    target_completions: target_completions,
    start_date: dateToIsoStr(new Date()),
  });

  revalidatePath("/dashboard");
  return error ? { error: "Failed to create goal. Please try again." } : {};
}

export async function deleteGoalAction(
  goal_id: string,
): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to delete a goal." };
  }

  const { error } = await deleteGoal(goal_id);
  return error ? { error: "Failed to delete goal. Please try again." } : {};
}

export async function updateGoalAction(
  goal_id: string,
  habit_id: string,
  start_date: string,
  data: GoalFormValues,
): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to edit a goal." };
  }

  await updateHabit(habit_id, {
    name: data.habit_name,
    frequency: data.habit_frequency,
    weekly_target: null,
    target_days:
      data.habit_frequency === "daily" ? [] : (data.habit_target_days ?? []),
  });

  const effectivePeriod =
    data.duration_days === "custom" ? String(data.custom_duration_days) : data.duration_days;
  const { error } = await updateGoal({
    goal_id,
    name: data.name,
    duration_days: effectivePeriod as Period,
    start_date,
    unit: "times",
  });

  revalidatePath("/dashboard");
  return error ? { error: "Failed to edit goal. Please try again." } : {};
}

export async function fetchProfileAction(): Promise<Profile | null> {
  const session = await auth();
  if (!session?.user?.id) return null;
  return getProfileById(session.user.id);
}

export async function updateWeekStartsOnAction(
  weekStartsOn: WeekStartsOn,
): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Not authenticated." };

  const { error } = await updateWeekStartsOn(session.user.id, weekStartsOn);
  if (error) return { error: "Failed to update setting." };

  revalidatePath("/dashboard");
  return {};
}

export async function requestPasswordResetAction(
  email: string,
): Promise<{ error?: string }> {
  const exists = await profileExistsByEmail(email);
  if (!exists) return {}; // Don't reveal whether the email exists

  const token = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  const { error } = await insertPasswordResetToken(email, token, expiresAt);
  if (error) return { error: "Failed to generate reset token." };

  const resetUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/login/reset-password?token=${token}`;

  const { error: emailError } = await getResend().emails.send({
    from: "Habitual <noreply@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `
      <p>You requested a password reset for your Habitual account.</p>
      <p><a href="${resetUrl}">Click here to reset your password</a></p>
      <p>This link expires in 1 hour. If you didn't request this, you can ignore this email.</p>
    `,
  });

  if (emailError) return { error: "Failed to send email." };
  return {};
}

export async function resetPasswordAction(
  token: string,
  newPassword: string,
): Promise<{ error?: string }> {
  const record = await getPasswordResetToken(token);
  if (!record) return { error: "Invalid or expired reset link." };

  if (new Date() > new Date(record.expires_at)) {
    await deletePasswordResetToken(token);
    return { error: "This reset link has expired." };
  }

  const passwordHash = await bcrypt.hash(newPassword, 12);
  const { error } = await updatePasswordByEmail(record.email, passwordHash);
  if (error) return { error: "Failed to update password." };

  await deletePasswordResetToken(token);
  return {};
}

export async function setLocale(locale: string) {
  const store = await cookies();
  store.set("locale", locale, { path: "/", maxAge: 60 * 60 * 24 * 365 });
}
