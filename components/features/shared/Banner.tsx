"use client";

import { useHabitsForDate } from "@/hooks/useHabits";
import { useCompletionsForDate } from "@/hooks/useCompletions";
import { formatDate } from "@/app/_lib/utils";
import BannerUI from "./BannerUI";

export function Banner() {
  const today = formatDate();
  const { data: habits = [] } = useHabitsForDate(today);
  const { data: completions = [] } = useCompletionsForDate(today);

  return (
    habits.length > 0 && (
      <BannerUI
        habitsCount={habits.length}
        completionsCount={completions.length}
      />
    )
  );
}
