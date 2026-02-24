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
  markHabitAsCompleted,
  unmarkHabitAsCompleted,
} from "@/lib/data-service";
import type { Habit } from "@/types";

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
  target_days?: number[];
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
    target_days:
      data.frequency === "custom" ? (data.target_days ?? null) : null,
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
  target_days?: number[] | null;
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
    target_days: data.target_days ?? null,
  });

  if (error) {
    return { error: "Failed to edit habit. Please try again." };
  }

  return {};
}

export async function markHabitAsCompletedAction(
  habit_id: string,
  user_id: string,
): Promise<{ error?: string }> {
  const { error } = await markHabitAsCompleted(habit_id, user_id);

  if (error) {
    return { error: "Failed to mark habit as complete. Please try again." };
  }

  return {};
}

export async function markHabitAsUncompletedAction(
  habit_id: string,
  user_id: string,
): Promise<{ error?: string }> {
  const { error } = await unmarkHabitAsCompleted(habit_id, user_id);

  if (error) {
    return { error: "Failed to unmark habit as complete. Please try again." };
  }

  return {};
}
