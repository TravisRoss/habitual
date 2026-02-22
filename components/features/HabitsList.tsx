import HabitItem from "@/components/features/HabitItem";
import type { Habit } from "@/types";

export default function HabitsList({ habits }: { habits: Habit[] }) {
  return (
    <>
      <ul className="space-y-4">
        {habits.map((habit) => (
          <HabitItem key={habit.id} habit={habit} />
        ))}
      </ul>
    </>
  );
}
