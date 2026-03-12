import {
  createCompletionAction,
  deleteCompletionAction,
  fetchCompletionsForDateAction,
  fetchCompletionsForDateRangeAction,
  fetchCompletionsForHabitAction,
  fetchHabitsAction,
} from "@/app/_lib/actions";
import {
  calculateOverallCompletionRate,
  dateToIsoStr,
  getReportPeriodDates,
} from "@/app/_lib/utils";
import { Completion, ReportPeriod } from "@/types";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { fetchCompletionsForUser } from "@/app/_lib/actions";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const COMPLETIONS_KEY = ["completions"];

/**
 * Fetch all completions for the currently logged in user.
 *
 * @returns A query hook that fetches all completions for the currently logged in user.
 */
export function useCompletions() {
  return useQuery({
    queryKey: [...COMPLETIONS_KEY],
    queryFn: () => fetchCompletionsForUser(),
  });
}

export function useCompletionsForDate(date: string) {
  return useQuery({
    queryKey: [...COMPLETIONS_KEY, date],
    queryFn: () => fetchCompletionsForDateAction(date),
  });
}

export function useCompletionsForHabit(habit_id: string) {
  return useQuery({
    queryKey: [...COMPLETIONS_KEY, habit_id],
    queryFn: () => fetchCompletionsForHabitAction(habit_id),
  });
}

export function useCompletionCountForHabit(habit_id: string) {
  return useQuery({
    queryKey: [...COMPLETIONS_KEY, "count", habit_id],
    queryFn: () =>
      fetchCompletionsForHabitAction(habit_id).then((res) => res.length),
  });
}

type CompletionVars = { habit_id: string; user_id: string; date: string; done: boolean };

export function useToggleCompletion() {
  const t = useTranslations("habits.toasts");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ habit_id, user_id, date, done }: CompletionVars) =>
      done
        ? createCompletionAction(habit_id, user_id, date)
        : deleteCompletionAction(habit_id, user_id, date),
    onMutate: ({ habit_id, user_id, date, done }) => {
      queryClient.setQueryData<Completion[]>([...COMPLETIONS_KEY, date], (old = []) =>
        done
          ? [...old, { id: "optimistic", habit_id, user_id, completed_on: date }]
          : old.filter((c) => c.habit_id !== habit_id),
      );
    },
    onError: (_err, { done }) => toast.error(t(done ? "errorComplete" : "errorUncomplete")),
    onSettled: (_data, _err, { date }) => {
      queryClient.invalidateQueries({ queryKey: [...COMPLETIONS_KEY, date] });
    },
  });
}

export function useOverallCompletionRate(period: ReportPeriod) {
  const { start, end } = getReportPeriodDates(period);
  const startDate = dateToIsoStr(start);
  const endDate = dateToIsoStr(end);

  return useQuery({
    queryKey: [COMPLETIONS_KEY, period],
    queryFn: async () => {
      // Fetch both habits and completions in parallel
      const [habits, completions] = await Promise.all([
        fetchHabitsAction(),
        fetchCompletionsForDateRangeAction(startDate, endDate),
      ]);

      if (!habits || habits.length === 0) return 0;

      return calculateOverallCompletionRate(habits, completions, start, end);
    },
    placeholderData: keepPreviousData,
  });
}
