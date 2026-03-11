import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProfileAction,
  updateWeekStartsOnAction,
} from "@/app/_lib/actions";

export const PROFILE_KEY = ["profile"];

export function useProfile() {
  return useQuery({ queryKey: PROFILE_KEY, queryFn: fetchProfileAction });
}

export function useUpdateWeekStartsOn() {
  const queryClient = useQueryClient();
  return async (weekStartsOn: 0 | 1) => {
    await updateWeekStartsOnAction(weekStartsOn);
    queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
  };
}
