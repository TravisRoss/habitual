"use client";

import { useCompletionsForDate } from "@/hooks/useCompletions";
import CircularProgress from "./CircularProgress";
import { useHabitsForDate } from "@/hooks/useHabits";
import { formatDate } from "@/app/_lib/utils";

export default function Banner() {
  const today = formatDate();
  const { data: habits = [] } = useHabitsForDate(today);
  const { data: completions = [] } = useCompletionsForDate(today);

  const completedIds = new Set(completions.map((c) => c.habit_id));
  const total = habits.length;
  const completed = habits.filter((h) => completedIds.has(h.id)).length;
  const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

  return (
    <div className="bg-brand rounded-2xl p-6 flex items-center gap-6">
      <CircularProgress value={percentage} />
      <div className="text-white">
        {completed === 0 ? (
          <>
            <p className="text-2xl font-bold">No habits yet!</p>
            <p className="text-lg">Let's get started 💪</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">
              {completed} of {total} habits
            </p>
            <p className="text-lg">completed today!</p>
          </>
        )}
      </div>
    </div>
  );
}
