"use client";

import HabitItem from "@/components/features/habits/HabitItem";
import {
  useDeleteHabit,
  useEditHabit,
  useHabits,
  useHabitsForDate,
} from "@/hooks/useHabits";
import { useToggleCompletion } from "@/hooks/useCompletions";
import { useCompletionsForDate } from "@/hooks/useCompletions";
import { useStreakMap } from "@/hooks/useStreaks";
import ListSkeleton from "../shared/ListSkeleton";
import { useTranslations } from "next-intl";

type HabitsListProps = {
  date: string;
  isPreview?: boolean;
};

export default function HabitsList({
  date,
  isPreview = false,
}: HabitsListProps) {
  const { data: todaysHabits = [], isLoading: habitsLoading } =
    useHabitsForDate(date);
  const { data: allHabits = [] } = useHabits();
  const { data: completions = [], isLoading: completionsLoading } =
    useCompletionsForDate(date);

  const isLoading = habitsLoading || completionsLoading;

  const editMutation = useEditHabit();
  const deleteMutation = useDeleteHabit();
  const toggleCompletion = useToggleCompletion();

  const completedHabitIds = new Set(completions.map((c) => c.habit_id));
  const streakMap = useStreakMap();
  const previewHabits = todaysHabits.slice(0, 3);
  const habitList = isPreview ? previewHabits : todaysHabits;

  const t = useTranslations("habits.empty");

  if (isLoading) {
    return <ListSkeleton count={todaysHabits.length} />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {allHabits.length === 0 ? (
        <>
          <li className="text-sm text-muted-foreground">
            {t("noHabits")} {t("noHabitsDescription")}
          </li>
          <li className="text-sm text-muted-foreground"></li>
        </>
      ) : todaysHabits.length === 0 ? (
        <li className="text-sm text-muted-foreground">{t("noHabitsToday")}</li>
      ) : null}
      {habitList.map((habit) => (
        <HabitItem
          key={habit.id}
          habit={habit}
          isCompleted={completedHabitIds.has(habit.id)}
          streak={streakMap.get(habit.id)}
          onToggleComplete={(done) =>
            toggleCompletion.mutate({
              habit_id: habit.id,
              user_id: habit.user_id,
              date,
              done,
            })
          }
          onEdit={(data) =>
            editMutation.mutateAsync({ habit_id: habit.id, ...data })
          }
          onDelete={() => deleteMutation.mutate(habit.id)}
        />
      ))}
    </ul>
  );
}
