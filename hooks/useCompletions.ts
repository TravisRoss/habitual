import {
  createCompletionAction,
  deleteCompletionAction,
  fetchCompletionsForDateAction,
} from "@/app/_lib/actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const COMPLETIONS_KEY = ["completions"];

export function useCompletionsForDate(date: string) {
  return useQuery({
    queryKey: [...COMPLETIONS_KEY, date],
    queryFn: () => fetchCompletionsForDateAction(date),
  });
}

export function useCreateCompletion() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      habit_id,
      user_id,
    }: {
      habit_id: string;
      user_id: string;
    }) => createCompletionAction(habit_id, user_id),
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
    }: {
      habit_id: string;
      user_id: string;
    }) => deleteCompletionAction(habit_id, user_id),
    onSuccess: () => {
      toast.success("Habit marked as incomplete!");
      queryClient.invalidateQueries({ queryKey: COMPLETIONS_KEY });
    },
    onError: () => {
      toast.error("Failed to unmark habit as complete. Please try again.");
    },
  });
}
