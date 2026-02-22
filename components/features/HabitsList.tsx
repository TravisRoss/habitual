import HabitItem from "@/components/features/HabitItem";
import type { Habit } from "@/types";

export default function HabitsList({ habits }: { habits: Habit[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => (
        <HabitItem key={habit.id} habit={habit} />
      ))}
    </ul>
  );
}
