import {
  createGoalAction,
  deleteGoalAction,
  fetchGoalsAction,
  updateGoalAction,
} from "@/app/_lib/actions";
import { GoalFormValues } from "@/lib/zod";
import type { ExistingHabitInput } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const GOALS_KEY = ["goals"];

export function useGoals() {
  return useQuery({ queryKey: GOALS_KEY, queryFn: fetchGoalsAction });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: GoalFormValues) => createGoalAction(data),
    onSuccess: () => {
      toast.success("Goal created successfully!");
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
    },
    onError: () => {
      toast.error("Failed to create goal. Please try again.");
    },
  });
}

export function useDeleteGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (goal_id: string) => deleteGoalAction(goal_id),
    onSuccess: () => {
      toast.success("Goal deleted successfully!");
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
    },
    onError: () => {
      toast.error("Failed to delete goal. Please try again.");
    },
  });
}

export function useEditGoal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ goal_id, name, target, period, start_date, unit, habit }: { goal_id: string } & GoalFormValues) =>
      updateGoalAction(goal_id, { name, target, period, start_date, unit, habit: habit as ExistingHabitInput }),
    onSuccess: () => {
      toast.success("Goal updated successfully!");
      queryClient.invalidateQueries({ queryKey: GOALS_KEY });
    },
    onError: () => {
      toast.error("Failed to update goal. Please try again.");
    },
  });
}
