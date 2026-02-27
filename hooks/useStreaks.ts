import { useQuery } from "@tanstack/react-query";
import { fetchStreaksAction } from "@/app/_lib/actions";
import type { Streak } from "@/types";

export const STREAKS_KEY = ["streaks"];

export function useStreaks() {
  return useQuery({
    queryKey: STREAKS_KEY,
    queryFn: async () => {
      const data = await fetchStreaksAction();
      return Array.isArray(data) ? data : [];
    },
  });
}

export function useStreakMap(): Map<string, Streak> {
  const { data, error } = useStreaks();

  if (error || !Array.isArray(data)) {
    console.error("Error fetching streaks:", error);
    return new Map();
  }

  return new Map(data.map((s) => [s.habit_id, s]));
}
