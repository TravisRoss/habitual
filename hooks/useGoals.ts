import {
  createGoalAction,
  deleteGoalAction,
  fetchGoalsAction,
  updateGoalAction,
} from "@/app/_lib/actions";
import { GoalFormValues } from "@/lib/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { HABITS_KEY } from "./useHabits";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

export const GOALS_KEY = ["goals"];

export function useGoals() {
  return useQuery({ queryKey: GOALS_KEY, queryFn: fetchGoalsAction });
}

export function useCreateGoal() {
  const t = useTranslations("goals.toasts");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoalFormValues) => createGoalAction(data),
    onSuccess: () => {
      toast.success(t("created"));
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error(t("errorCreate"));
    },
  });
}

export function useDeleteGoal() {
  const t = useTranslations("goals.toasts");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goal_id: string) => deleteGoalAction(goal_id),
    onSuccess: () => {
      toast.success(t("deleted"));
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
    },
    onError: () => {
      toast.error(t("errorDelete"));
    },
  });
}

export function useEditGoal() {
  const t = useTranslations("goals.toasts");
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      goal_id,
      habit_id,
      start_date,
      ...data
    }: {
      goal_id: string;
      habit_id: string;
      start_date: string;
    } & GoalFormValues) =>
      updateGoalAction(goal_id, habit_id, start_date, data),
    onSuccess: () => {
      toast.success(t("updated"));
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
      queryClient.invalidateQueries({ queryKey: HABITS_KEY });
    },
    onError: () => {
      toast.error(t("errorUpdate"));
    },
  });
}
