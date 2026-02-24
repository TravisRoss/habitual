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
} from "@/lib/data-service";
import type { Completion, Habit } from "@/types";

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

export async function createHabit(data: {
  name: string;
  description?: string;
  frequency?: "daily" | "weekly" | "custom";
  color?: string;
  weekly_target?: number;
  target_days: number[];
}): Promise<{ error?: string }> {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: "You must be logged in to create a habit." };
  }

  const { error } = await insertHabit({
    user_id: session.user.id,
    name: data.name,
    description: data.description || null,
    frequency: data.frequency,
    color: data.color,
    weekly_target:
      data.frequency === "weekly" ? (data.weekly_target ?? null) : null,
    target_days: data.frequency === "custom" ? data.target_days : [],
  });

  if (error) {
    return { error: "Failed to create habit. Please try again." };
  }

  return {};
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

export async function fetchCompletionsForDateAction(
  date: string,
): Promise<Completion[]> {
  const session = await auth();
  if (!session?.user?.id) return [];
  return (await getCompletionsByUserIdAndDate(session.user.id, date)) ?? [];
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
  frequency?: "daily" | "weekly" | "custom";
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
): Promise<{ error?: string }> {
  const { error } = await insertCompletion(habit_id, user_id);

  if (error) {
    return { error: "Failed to mark habit as complete. Please try again." };
  }

  return {};
}

export async function deleteCompletionAction(
  habit_id: string,
  user_id: string,
): Promise<{ error?: string }> {
  const { error } = await deleteCompletion(habit_id, user_id);

  if (error) {
    return { error: "Failed to unmark habit as complete. Please try again." };
  }

  return {};
}
