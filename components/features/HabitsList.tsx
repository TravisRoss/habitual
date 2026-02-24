"use client";

import HabitItem from "@/components/features/HabitItem";
import { Completion, Habit } from "@/types";

export default function HabitsList({
  habits,
  completions,
}: {
  habits: Habit[];
  completions: Completion[];
}) {
  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => {
        const completedHabitIds = new Set(completions.map((c) => c.habit_id));
        const isCompleted = completedHabitIds.has(habit.id);
        return (
          <HabitItem key={habit.id} habit={habit} isCompleted={isCompleted} />
        );
      })}
    </ul>
  );
}
