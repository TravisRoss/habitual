import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHabit,
  deleteHabitAction,
  editHabitAction,
  fetchHabitsAction,
} from "@/app/_lib/actions";
import type { HabitFormValues } from "@/lib/zod";

export const HABITS_KEY = ["habits"];

export function useHabits() {
  return useQuery({ queryKey: HABITS_KEY, queryFn: fetchHabitsAction });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HabitFormValues) => createHabit(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: HABITS_KEY }),
  });
}

export function useEditHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { habit_id: string } & HabitFormValues) =>
      editHabitAction(data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: HABITS_KEY }),
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (habit_id: string) => deleteHabitAction(habit_id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: HABITS_KEY }),
  });
}
