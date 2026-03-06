"use client";

import { Goal, Habit } from "@/types";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
  ItemActions,
  ItemMedia,
} from "@/components/ui/item";
import { useCompletionCountForHabit } from "@/hooks/useCompletions";
import { calcPercentage } from "@/app/_lib/utils";
import { Badge } from "@/components/ui/badge";
import CircularProgress from "../progress/CircularProgress";
import Link from "next/link";

type GoalReportListItemProps = {
  goal: Goal;
  habits?: Habit[];
};

export default function GoalReportListItem({ goal }: GoalReportListItemProps) {
  const { data: completionCount = 0 } = useCompletionCountForHabit(
    goal.habit_id,
  );
  const completionPercentage = calcPercentage(completionCount, goal.target);

  const isAchieved = completionCount >= goal.target;

  return (
    <Link href={`/dashboard/progress/goals/${goal.id}`}>
      <Item
        className={
          "relative overflow-hidden border-l-4 transition-colors duration-300 bg-card"
        }
      >
        <ItemMedia>
          <CircularProgress value={completionPercentage} />
        </ItemMedia>
        <ItemContent>
          <ItemTitle>{goal.name}</ItemTitle>
          <ItemDescription>
            {completionCount} of {goal.target} completions
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge
            variant="outline"
            className={isAchieved ? "bg-green-500 text-white" : ""}
          >
            {isAchieved ? "Achieved" : "In Progress"}
          </Badge>
        </ItemActions>
      </Item>
    </Link>
  );
}
