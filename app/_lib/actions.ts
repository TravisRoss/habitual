"use server";

import bcrypt from "bcryptjs";
import { auth, signIn, signOut } from "@/app/_lib/auth";
import {
  profileExistsByEmail,
  insertProfile,
  insertHabit,
} from "@/lib/data-service";

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
    weekly_target: data.frequency === "weekly" ? data.weekly_target ?? null : null,
    target_days: data.frequency === "custom" ? data.target_days ?? null : null,
  });

  if (error) {
    return { error: "Failed to create habit. Please try again." };
  }

  return {};
}
