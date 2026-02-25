"use client";

import HabitItem from "@/components/features/HabitItem";
import { useDeleteHabit, useEditHabit } from "@/hooks/useHabits";
import {
  useCreateCompletion,
  useDeleteCompletion,
} from "@/hooks/useCompletions";
import { Completion, Habit } from "@/types";

type HabitsListProps = {
  habits: Habit[];
  completions: Completion[];
};

export default function HabitsList({ habits, completions }: HabitsListProps) {
  const editMutation = useEditHabit();
  const deleteMutation = useDeleteHabit();
  const createCompletionMutation = useCreateCompletion();
  const deleteCompletionMutation = useDeleteCompletion();

  const completedHabitIds = new Set(completions.map((c) => c.habit_id));

  return (
    <ul className="flex flex-col gap-2">
      {habits.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isCompleted={completedHabitIds.has(habit.id)}
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
