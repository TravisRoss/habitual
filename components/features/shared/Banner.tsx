"use client";

import { useHabitsForDate } from "@/hooks/useHabits";
import { useCompletionsForDate } from "@/hooks/useCompletions";
import { dateToIsoStr } from "@/app/_lib/utils";
import BannerUI from "./BannerUI";
import { Quote } from "@/types";

type BannerProps = {
  quote?: Quote;
};

export function Banner({ quote }: BannerProps) {
  const today = dateToIsoStr();
  const { data: habits = [] } = useHabitsForDate(today);
  const { data: completions = [] } = useCompletionsForDate(today);

  return (
    <BannerUI
      habitsCount={habits.length}
      completionsCount={completions.length}
      quote={quote}
    />
  );
}
