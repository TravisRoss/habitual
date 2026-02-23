import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHabit,
  deleteHabitAction,
  editHabitAction,
  fetchHabitsAction,
} from "@/app/_lib/actions";
import type { HabitFormValues } from "@/lib/zod";
import toast from "react-hot-toast";

export const HABITS_KEY = ["habits"];

export function useHabits() {
  return useQuery({ queryKey: HABITS_KEY, queryFn: fetchHabitsAction });
}

export function useCreateHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HabitFormValues) => createHabit(data),
    onSuccess: () => {
      toast.success("Habit created successfully!");
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error("Failed to create habit. Please try again.");
    },
  });
}

export function useEditHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { habit_id: string } & HabitFormValues) =>
      editHabitAction(data),
    onSuccess: () => {
      toast.success("Habit updated successfully!");
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error("Failed to update habit. Please try again.");
    },
  });
}

export function useDeleteHabit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (habit_id: string) => deleteHabitAction(habit_id),
    onSuccess: () => {
      toast.success("Habit deleted successfully!");
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error("Failed to delete habit. Please try again.");
    },
  });
}
