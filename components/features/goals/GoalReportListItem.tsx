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
import { useTranslations } from "next-intl";

type GoalReportListItemProps = {
  goal: Goal;
  habits?: Habit[];
};

export default function GoalReportListItem({ goal }: GoalReportListItemProps) {
  const { data: completionCount = 0 } = useCompletionCountForHabit(
    goal.habit_id,
  );
  const completionPercentage = calcPercentage(
    completionCount,
    goal.target_completions,
  );
  const tStatus = useTranslations("goals.status");
  const tGoals = useTranslations("goals");

  const isAchieved = completionCount >= goal.target_completions;

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
            {tGoals("progress", {
              completions: String(completionCount),
              target: String(goal.target_completions),
            })}
          </ItemDescription>
        </ItemContent>
        <ItemActions>
          <Badge
            variant="outline"
            className={isAchieved ? "bg-green-500 text-white" : ""}
          >
            {isAchieved ? tStatus("achieved") : tStatus("inProgress")}
          </Badge>
        </ItemActions>
      </Item>
    </Link>
  );
}
