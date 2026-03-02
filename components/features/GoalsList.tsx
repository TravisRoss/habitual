"use client";

import GoalItem from "./GoalItem";
import { useDeleteGoal, useEditGoal, useGoals } from "@/hooks/useGoals";
import { useHabits } from "@/hooks/useHabits";
import ListSkeleton from "./ListSkeleton";

export default function GoalsList() {
  const { data: goals = [], isLoading } = useGoals();
  const { data: habits = [] } = useHabits();
  const editMutation = useEditGoal();
  const deleteMutation = useDeleteGoal();

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
      {goals.map((goal) => (
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
