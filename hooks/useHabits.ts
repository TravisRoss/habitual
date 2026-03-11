import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createHabit,
  deleteHabitAction,
  editHabitAction,
  fetchHabitsAction,
  fetchHabitsForDateAction,
} from "@/app/_lib/actions";
import type { HabitFormValues } from "@/lib/zod";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const HABITS_KEY = ["habits"];

export function useHabits() {
  return useQuery({ queryKey: HABITS_KEY, queryFn: fetchHabitsAction });
}

export function useHabitsForDate(date: string) {
  return useQuery({
    queryKey: [...HABITS_KEY, date],
    queryFn: () => fetchHabitsForDateAction(date),
  });
}

export function useCreateHabit() {
  const t = useTranslations("habits.toasts");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: HabitFormValues) =>
      createHabit({ ...data, target_days: data.target_days || [] }),
    onSuccess: () => {
      toast.success(t("created"));
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error(t("errorCreate"));
    },
  });
}

export function useEditHabit() {
  const t = useTranslations("habits.toasts");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { habit_id: string } & HabitFormValues) =>
      editHabitAction({ ...data, target_days: data.target_days || [] }),
    onSuccess: () => {
      toast.success(t("updated"));
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error(t("errorUpdate"));
    },
  });
}

export function useDeleteHabit() {
  const t = useTranslations("habits.toasts");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (habit_id: string) => deleteHabitAction(habit_id),
    onSuccess: () => {
      toast.success(t("deleted"));
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error(t("errorDelete"));
    },
  });
}
