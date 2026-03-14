import { GoalFormValues, HabitFormValues } from "@/lib/zod";
import { Goal, Habit, Period } from "@/types";

/** Maps a stored Habit to its edit form representation. */
export function habitToFormValues(habit: Habit): HabitFormValues {
  return {
    name: habit.name,
    frequency: habit.frequency,
    description: habit.description ?? undefined,
    color: habit.color ?? undefined,
    weekly_target: habit.weekly_target ?? undefined,
    target_days: habit.target_days,
  };
}

const STANDARD_PERIODS: Period[] = ["7", "14", "30", "90", "180", "365"];

/** Maps a stored Goal (and its associated Habit) to the edit form representation. */
export function goalToFormValues(goal: Goal, habit?: Habit): GoalFormValues {
  const frequency = habit?.frequency ?? "daily";
  const durationStr = String(goal.duration_days);
  const isCustom = !STANDARD_PERIODS.includes(durationStr as Period);

  return {
    name: goal.name,
    habit_name: habit?.name ?? "",
    duration_days: isCustom ? "custom" : (durationStr as Period),
    custom_duration_days: isCustom ? durationStr : undefined,
    habit_frequency: frequency,
    habit_target_days: frequency === "custom" ? habit?.target_days : undefined,
  };
}
