import { calcEndDate, dateToDayNumber } from "@/app/_lib/utils";
import { createAdminClient } from "@/lib/supabase/server";
import {
  Completion,
  Goal,
  Habit,
  Period,
  Profile,
  Streak,
  Unit,
} from "@/types";

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

export async function updateProfile(data: {
  email: string;
  full_name: string | null;
  password_hash: string;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("profiles").update(data).eq("email", data.email);

  return { error: error?.message ?? null };
}

export async function getProfileByEmail(
  email: string,
): Promise<Profile | null> {
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

export async function getProfileById(id: string): Promise<Profile | null> {
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("id, email, full_name, password_hash, week_starts_on")
    .eq("id", id)
    .single();

  return data;
}

export async function updateWeekStartsOn(
  userId: string,
  weekStartsOn: 0 | 1,
): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("profiles")
    .update({ week_starts_on: weekStartsOn })
    .eq("id", userId);

  return { error: error?.message ?? null };
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
  target_days: number[];
}): Promise<{ error: string | null; id: string | null }> {
  const supabase = createAdminClient();

  const { data: row, error } = await supabase
    .from("habits")
    .insert({
      user_id: data.user_id,
      name: data.name,
      frequency: data.frequency ?? "daily",
      description: data.description,
      color: data.color,
      weekly_target: data.weekly_target,
      target_days:
        data.frequency === "daily" ? [0, 1, 2, 3, 4, 5, 6] : data.target_days,
    })
    .select("id")
    .single();

  return { id: row?.id ?? null, error: error?.message ?? null };
}

export async function updateHabit(
  habit_id: string,
  data: {
    name?: string;
    frequency?: "daily" | "weekly" | "custom";
    description?: string | null;
    color?: string;
    weekly_target?: number | null;
    target_days?: number[];
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
      target_days:
        data.frequency === "daily" ? [0, 1, 2, 3, 4, 5, 6] : data.target_days,
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

export async function getHabitsByUserId(
  user_id: string,
): Promise<Habit[] | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("habits")
    .select(
      "id, user_id, name, frequency, description, color, weekly_target, target_days, created_at",
    )
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching habits:", error);
    return null;
  }

  return data;
}

export async function getHabitsByUserIdAndDate(userId: string, date: string) {
  const supabase = createAdminClient();
  const day = dateToDayNumber(date);

  const { data, error } = await supabase
    .from("habits")
    .select("*")
    .eq("user_id", userId)
    .or(`frequency.eq.daily,target_days.cs.{${day}}`)
    .lte("created_at", `${date}T23:59:59.999Z`);

  if (error) return null;
  return data;
}

export async function getCompletionsByUserId(user_id: string) {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("completions")
    .select("id, user_id, habit_id, completed_on")
    .eq("user_id", user_id);

  if (error) return null;
  return data;
}

export async function getCompletionsByUserIdAndDate(
  user_id: string,
  date: string,
): Promise<Completion[] | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("completions")
    .select("id, user_id, habit_id, completed_on")
    .eq("user_id", user_id)
    .eq("completed_on", date);

  if (error) {
    console.error("Error fetching completions:", error);
    return null;
  }

  return data;
}

export async function getCompletionsByUserIdAndHabitId(
  user_id: string,
  habit_id: string,
): Promise<Completion[] | null> {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("completions")
    .select("id, user_id, habit_id, completed_on")
    .eq("user_id", user_id)
    .eq("habit_id", habit_id);

  if (error) {
    console.error("Error fetching completions:", error);
    return null;
  }

  return data;
}

export async function getCompletionsByUserIdAndHabitIdForDateRange(
  userId: string,
  habitId: string,
  startDate: string,
  endDate: string,
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("completions")
    .select("id, user_id, habit_id, completed_on")
    .eq("user_id", userId)
    .eq("habit_id", habitId)
    .gte("completed_on", startDate)
    .lte("completed_on", endDate);

  if (error) {
    console.error("Error fetching completions:", error);
    return null;
  }

  return data;
}

export async function getCompletionsByUserIdForDateRange(
  userId: string,
  startDate: string,
  endDate: string,
) {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("completions")
    .select("id, user_id, habit_id, completed_on")
    .eq("user_id", userId)
    .gte("completed_on", startDate)
    .lte("completed_on", endDate);

  if (error) {
    console.error("Error fetching completions:", error);
    return null;
  }

  return data;
}

export async function insertCompletion(
  habit_id: string,
  user_id: string,
  date: string,
): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("completions").insert({
    id: crypto.randomUUID(),
    habit_id,
    user_id,
    completed_on: date,
  });

  return { error: error?.message ?? null };
}

export async function deleteCompletion(
  habit_id: string,
  user_id: string,
  date: string,
): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("completions")
    .delete()
    .eq("habit_id", habit_id)
    .eq("user_id", user_id)
    .eq("completed_on", date);

  return { error: error?.message ?? null };
}

export async function getGoalsByUserId(
  user_id: string,
): Promise<Goal[] | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("goals")
    .select(
      "id, user_id, habit_id, name, target, period, start_date, unit, color",
    )
    .eq("user_id", user_id);

  if (error) {
    console.error("Error fetching goals:", error);
    return null;
  }

  return data as Goal[];
}

export async function insertGoal(data: {
  user_id: string;
  name: string;
  habit_id: string;
  target: number;
  period: Period;
  start_date: string;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase.from("goals").insert({
    id: crypto.randomUUID(),
    user_id: data.user_id,
    name: data.name,
    habit_id: data.habit_id,
    target: data.target,
    period: data.period,
    start_date: data.start_date,
    end_date: calcEndDate(data.start_date, data.period),
  });

  return { error: error?.message ?? null };
}

export async function deleteGoal(
  goal_id: string,
): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { data: goal, error: fetchError } = await supabase
    .from("goals")
    .select("habit_id")
    .eq("id", goal_id)
    .single();

  if (fetchError || !goal.habit_id)
    return { error: fetchError?.message ?? "Goal has no associated habit." };

  const { error } = await supabase.from("goals").delete().eq("id", goal_id);

  // delete the associated habit as well to keep data consistent, since a goal must have a habit
  if (!error) {
    await supabase.from("habits").delete().eq("id", goal.habit_id);
  }

  return { error: error?.message ?? null };
}

export async function getActiveStreaksByUserId(
  user_id: string,
): Promise<Streak[] | null> {
  const supabase = createAdminClient();
  const { data, error } = await supabase
    .from("habit_streaks")
    .select(
      "habit_id, user_id, streak_length, streak_start, streak_end, is_active",
    )
    .eq("user_id", user_id)
    .eq("is_active", true);

  if (error) {
    console.error("Error fetching streaks:", error);
    return null;
  }

  return data as Streak[];
}

export async function updateGoal(data: {
  goal_id: string;
  name?: string;
  habit_id?: string;
  target?: number;
  unit: Unit;
  period?: Period;
  start_date?: string;
}): Promise<{ error: string | null }> {
  const supabase = createAdminClient();
  const { error } = await supabase
    .from("goals")
    .update({
      name: data.name,
      habit_id: data.habit_id,
      target: data.target,
      period: data.period,
      start_date: data.start_date,
      end_date: calcEndDate(data.start_date!, data.period!),
    })
    .eq("id", data.goal_id);

  return { error: error?.message ?? null };
}
