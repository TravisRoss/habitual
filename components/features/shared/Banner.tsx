"use client";

import { useHabitsForDate } from "@/hooks/useHabits";
import { useCompletionsForDate } from "@/hooks/useCompletions";
import { dateToIsoStr } from "@/app/_lib/utils";
import BannerUI from "./BannerUI";

export function Banner() {
  const today = dateToIsoStr();
  const { data: habits = [] } = useHabitsForDate(today);
  const { data: completions = [] } = useCompletionsForDate(today);

  return (
    <BannerUI
      habitsCount={habits.length}
      completionsCount={completions.length}
    />
  );
}
