"use client";

import { useHabitsForDate } from "@/hooks/useHabits";
import HabitItem from "@/components/features/HabitItem";
import { formatDate } from "@/app/_lib/utils";

export default function HabitsList() {
  const today = formatDate();
  const { data: habits = [] } = useHabitsForDate(today);

  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </ul>
  );
}
