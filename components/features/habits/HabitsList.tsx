"use client";

import HabitItem from "@/components/features/habits/HabitItem";
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
import ListSkeleton from "../shared/ListSkeleton";

type HabitsListProps = {
  date: string;
  isPreview?: boolean;
};

export default function HabitsList({
  date,
  isPreview = false,
}: HabitsListProps) {
  const { data: habits = [], isLoading: habitsLoading } =
    useHabitsForDate(date);
  const { data: completions = [], isLoading: completionsLoading } =
    useCompletionsForDate(date);

  const isLoading = habitsLoading || completionsLoading;

  const editMutation = useEditHabit();
  const deleteMutation = useDeleteHabit();
  const createCompletionMutation = useCreateCompletion();
  const deleteCompletionMutation = useDeleteCompletion();

  const completedHabitIds = new Set(completions.map((c) => c.habit_id));
  const streakMap = useStreakMap();
  const previewHabits = habits.slice(0, 3);
  const habitList = isPreview ? previewHabits : habits;

  if (isLoading) {
    return <ListSkeleton count={habits.length} />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {habits.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No habits yet for today. Create some to track your progress!
        </p>
      )}
      {habitList.map((habit) => (
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
                date,
              });
            } else {
              deleteCompletionMutation.mutate({
                habit_id: habit.id,
                user_id: habit.user_id,
                date,
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
