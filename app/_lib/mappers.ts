import { GoalFormValues, HabitFormValues } from "@/lib/zod";
import { Goal, Habit } from "@/types";

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

/** Maps a stored Goal (and its associated Habit) to the edit form representation. */
export function goalToFormValues(goal: Goal, habit?: Habit): GoalFormValues {
  const frequency = habit?.frequency ?? "daily";
  const targetDays = habit?.target_days ?? [];

  return {
    name: goal.name,
    habit_name: habit?.name ?? "",
    period: goal.period,
    habit_frequency: frequency,
    habit_target_days:
      frequency === "weekly" || frequency === "custom" ? targetDays : undefined,
  };
}
