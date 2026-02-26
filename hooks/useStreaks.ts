import { useQuery } from "@tanstack/react-query";
import { fetchStreaksAction } from "@/app/_lib/actions";
import type { Streak } from "@/types";

export const STREAKS_KEY = ["streaks"];

export function useStreaks() {
  return useQuery({ queryKey: STREAKS_KEY, queryFn: fetchStreaksAction });
}

export function useStreakMap(): Map<string, Streak> {
  const { data: streaks = [] } = useStreaks();
  return new Map(streaks.map((s) => [s.habit_id, s]));
}
