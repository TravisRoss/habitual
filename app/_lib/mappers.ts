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

/**
 * Maps a stored Goal to its edit form representation.
 * The habit is always mapped as "existing" since a persisted goal
 * always has a saved habit — the "new" branch only exists during creation.
 * The period is derived by diffing start/end dates back into days.
 */
export function goalToFormValues(goal: Goal): GoalFormValues {
  return {
    name: goal.name,
    habit: {
      type: "existing",
      id: goal.habit_id,
    },
    period: goal.period,
    target: goal.target,
    unit: goal.unit,
    start_date: goal.start_date,
  };
}
