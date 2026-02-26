"use client";

import GoalItem from "./GoalItem";
import { useDeleteGoal, useEditGoal, useGoals } from "@/hooks/useGoals";

export default function GoalsList() {
  const { data: goals = [] } = useGoals();
  const editMutation = useEditGoal();
  const deleteMutation = useDeleteGoal();

  return (
    <ul className="flex flex-col gap-2">
      {goals.map((goal) => (
        <li key={goal.id}>
          <GoalItem
            goal={goal}
            onEdit={(data) =>
              editMutation.mutateAsync({ goal_id: goal.id, ...data })
            }
            onDelete={() => deleteMutation.mutate(goal.id)}
          />
        </li>
      ))}
    </ul>
  );
}
