import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchProfileAction,
  updateWeekStartsOnAction,
} from "@/app/_lib/actions";
import { Profile, WeekStartsOn } from "@/types";

export const PROFILE_KEY = ["profile"];

export function useProfile() {
  return useQuery({ queryKey: PROFILE_KEY, queryFn: fetchProfileAction });
}

export function useUpdateWeekStartsOn() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (weekStartsOn: WeekStartsOn) =>
      updateWeekStartsOnAction(weekStartsOn),
    onMutate: async (weekStartsOn) => {
      await queryClient.cancelQueries({ queryKey: PROFILE_KEY });
      const previous = queryClient.getQueryData<Profile>(PROFILE_KEY);
      queryClient.setQueryData<Profile>(
        PROFILE_KEY,
        (old: Profile | undefined) =>
          old === undefined
            ? undefined
            : {
                ...old,
                week_starts_on: weekStartsOn,
              },
      );
      return { previous };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_KEY });
    },
    onError: (_error, _variables, context) => {
      queryClient.setQueryData(PROFILE_KEY, context?.previous);
    },
  });
}
