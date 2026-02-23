"use client";

import { useHabits } from "@/hooks/useHabits";
import HabitItem from "@/components/features/HabitItem";

export default function HabitsList() {
  const { data: habits = [] } = useHabits();
  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </ul>
  );
}
