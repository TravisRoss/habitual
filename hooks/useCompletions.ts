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
  formatDate,
  getReportPeriodDates,
} from "@/app/_lib/utils";
import { ReportPeriod } from "@/types";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const COMPLETIONS_KEY = ["completions"];

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

export function useCreateCompletion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      habit_id,
      user_id,
      date,
    }: {
      habit_id: string;
      user_id: string;
      date: string;
    }) => createCompletionAction(habit_id, user_id, date),
    onSuccess: () => {
      toast.success("Habit marked as complete!");
      queryClient.invalidateQueries({ queryKey: COMPLETIONS_KEY });
    },
    onError: () => {
      toast.error("Failed to mark habit as complete. Please try again.");
    },
  });
}

export function useDeleteCompletion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      habit_id,
      user_id,
      date,
    }: {
      habit_id: string;
      user_id: string;
      date: string;
    }) => deleteCompletionAction(habit_id, user_id, date),
    onSuccess: () => {
      toast.success("Habit marked as incomplete!");
      queryClient.invalidateQueries({ queryKey: COMPLETIONS_KEY });
    },
    onError: () => {
      toast.error("Failed to unmark habit as complete. Please try again.");
    },
  });
}

export function useOverallCompletionRate(period: ReportPeriod) {
  const { start, end } = getReportPeriodDates(period);
  const startDate = formatDate(start);
  const endDate = formatDate(end);

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
    placeholderData: keepPreviousData
  });
}
