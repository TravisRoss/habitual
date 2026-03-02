"use client";

import { Goal, Habit } from "@/types";
import { Item, ItemContent, ItemDescription, ItemTitle, ItemActions } from "@/components/ui/item";
import { useCompletionsForHabit } from "@/hooks/useCompletions";
import { calcPercentage } from "@/app/_lib/utils";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "../progress/CircularProgress";

type GoalReportListItemProps = {
  goal: Goal;
  habits?: Habit[];
};

export default function GoalReportListItem({
  goal,
}: GoalReportListItemProps) {
  const habitCompletions = useCompletionsForHabit(goal.habit_id);
  const completionCount = habitCompletions.data?.length ?? 0;
  const completionPercentage = calcPercentage(
    completionCount,
    Number(goal.period),
  );
  const isAchieved = completionCount === goal.target;

  return (
    <Item
      className={
        "relative overflow-hidden border-l-4 transition-colors duration-300 bg-card"
      }
    >
      <ItemContent>
        <CircularProgress value={completionPercentage} />
        <ItemDescription>
          <span>
            {completionCount} of {goal.period} days target
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <Badge variant="outline" className={isAchieved ? "bg-green-500 text-white" : ""}>{isAchieved ? "Achieved" : "In Progress"}</Badge>
      </ItemActions>
    </Item>
  );
}
