"use client";

import HabitItem from "@/components/features/HabitItem";
import {
  useDeleteHabit,
  useEditHabit,
  useHabitsForDate,
} from "@/hooks/useHabits";
import {
  useCreateCompletion,
  useDeleteCompletion,
} from "@/hooks/useCompletions";
import { useCompletionsForDate } from "@/hooks/useCompletions";
import { useStreakMap } from "@/hooks/useStreaks";

type HabitsListProps = {
  date: string;
};

export default function HabitsList({ date }: HabitsListProps) {
  const { data: habits = [] } = useHabitsForDate(date);
  const { data: completions = [] } = useCompletionsForDate(date);

  const editMutation = useEditHabit();
  const deleteMutation = useDeleteHabit();
  const createCompletionMutation = useCreateCompletion();
  const deleteCompletionMutation = useDeleteCompletion();

  const completedHabitIds = new Set(completions.map((c) => c.habit_id));
  const streakMap = useStreakMap();

  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isCompleted={completedHabitIds.has(habit.id)}
          streak={streakMap.get(habit.id)}
          onToggleComplete={(done) => {
            if (done) {
              createCompletionMutation.mutate({
                habit_id: habit.id,
                user_id: habit.user_id,
              });
            } else {
              deleteCompletionMutation.mutate({
                habit_id: habit.id,
                user_id: habit.user_id,
              });
            }
          }}
          onEdit={(data) =>
            editMutation.mutateAsync({ habit_id: habit.id, ...data })
          }
          onDelete={() => deleteMutation.mutate(habit.id)}
        />
      ))}
    </ul>
  );
}
