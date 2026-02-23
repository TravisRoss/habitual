import { HabitFormValues } from "@/lib/zod";
import { Habit } from "@/types";

export function habitToFormValues(habit: Habit): HabitFormValues {
  return {
    name: habit.name,
    frequency: habit.frequency,
    description: habit.description ?? undefined,
    color: habit.color ?? undefined,
    weekly_target: habit.weekly_target ?? undefined,
    target_days: habit.target_days ?? undefined,
  };
}
