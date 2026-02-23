/**
 * Data service for profile-related database operations.
 * Centralises all Supabase access so auth and server actions stay decoupled from the DB.
 */
import { createAdminClient } from "@/lib/supabase/server";
import { Habit, ProfileForCredentials } from "@/types";

export async function getProfileForCredentials(
  email: string,
): Promise<ProfileForCredentials | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, password_hash")
    .eq("email", email)
    .single();

  return data;
}

export async function getProfileIdByEmail(
  email: string,
): Promise<string | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  return data?.id ?? null;
}

export async function profileExistsByEmail(email: string): Promise<boolean> {
  const id = await getProfileIdByEmail(email);
  return id !== null;
}

/** Upserts a profile by email. Used by OAuth sign-in to create or update on each login. */
export async function upsertProfile(data: {
  email: string;
  full_name?: string | null;
  avatar_url?: string | null;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").upsert(
    {
      email: data.email,
      full_name: data.full_name ?? null,
      avatar_url: data.avatar_url ?? null,
    },
    { onConflict: "email" },
  );

  return { error: error?.message ?? null };
}

/** Inserts a new habit. */
export async function insertHabit(data: {
  user_id: string;
  name: string;
  frequency?: "daily" | "weekly" | "custom";
  description?: string | null;
  color?: string;
  weekly_target?: number | null;
  target_days?: number[] | null;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("habits").insert({
    user_id: data.user_id,
    name: data.name,
    frequency: data.frequency ?? "daily",
    description: data.description ?? null,
    color: data.color ?? undefined,
    weekly_target: data.weekly_target ?? null,
    target_days: data.target_days ?? null,
  });

  return { error: error?.message ?? null };
}

export async function updateHabit(
  habit_id: string,
  data: {
    name?: string;
    frequency?: "daily" | "weekly" | "custom";
    description?: string | null;
    color?: string;
    weekly_target?: number | null;
    target_days?: number[] | null;
  },
): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("habits")
    .update({
      name: data.name,
      frequency: data.frequency,
      description: data.description,
      color: data.color,
      weekly_target: data.weekly_target,
      target_days: data.target_days,
    })
    .eq("id", habit_id);

  return { error: error?.message ?? null };
}

/** Deletes a habit by ID. */
export async function deleteHabit(
  habit_id: string,
): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("habits").delete().eq("id", habit_id);

  return { error: error?.message ?? null };
}

/** Inserts a new profile. Used by email/password sign-up. */
export async function insertProfile(data: {
  email: string;
  full_name: string | null;
  password_hash: string;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").insert(data);

  return { error: error?.message ?? null };
}

export async function getHabitsByUserId(
  user_id: string,
): Promise<Habit[] | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("habits")
    .select(
      "id, name, frequency, description, color, weekly_target, target_days",
    )
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching habits:", error);
    return null;
  }

  return data;
}
