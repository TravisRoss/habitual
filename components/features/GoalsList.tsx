"use client";

import GoalItem from "./GoalItem";
import { useDeleteGoal, useEditGoal, useGoals } from "@/hooks/useGoals";
import { useHabits } from "@/hooks/useHabits";
import ListSkeleton from "./ListSkeleton";

type GoalsListProps = {
  isPreview?: boolean;
};

export default function GoalsList({ isPreview = false }: GoalsListProps) {
  const { data: goals = [], isLoading } = useGoals();
  const { data: habits = [] } = useHabits();
  const editMutation = useEditGoal();
  const deleteMutation = useDeleteGoal();
  const goalsPreview = goals.slice(0, 3);
  const goalList = isPreview ? goalsPreview : goals;

  if (isLoading) {
    return <ListSkeleton count={goals.length} />;
  }

  return (
    <ul className="flex flex-col gap-2">
      {goals.length === 0 && (
        <li className="text-sm text-muted-foreground">
          No goals yet. Create some to stay motivated!
        </li>
      )}
      {goalList.map((goal) => (
        <li key={goal.id}>
          <GoalItem
            goal={goal}
            habits={habits}
            onEdit={(data) =>
              editMutation.mutateAsync({
                goal_id: goal.id,
                habit_id: goal.habit_id,
                start_date: goal.start_date,
                ...data,
              })
            }
            onDelete={() => deleteMutation.mutate(goal.id)}
          />
        </li>
      ))}
    </ul>
  );
}
