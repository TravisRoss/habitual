import { useGoals } from "@/hooks/useGoals";
import GoalReportListItem from "./GoalReportListItem";
import { useSearchParams } from "next/navigation";
import { useCompletions } from "@/hooks/useCompletions";

type GoalReportListProps = {
  isPreview?: boolean;
};

export default function GoalReportList({ isPreview }: GoalReportListProps) {
  const { data: goals } = useGoals();
  const { data: completions = [] } = useCompletions();
  const filteredStatus = useSearchParams().get("status");

  const filteredGoals = goals?.filter((goal) => {
    if (!filteredStatus || filteredStatus === "all") return true;

    const completionCount = completions.filter(
      (c) => c.habit_id === goal.habit_id,
    ).length;
    const target = Number(goal.period);

    if (filteredStatus === "active") return completionCount < target;
    if (filteredStatus === "complete") return completionCount >= target;
  });

  const goalList = isPreview ? goals?.slice(0, 3) : filteredGoals;

  return (
    <ul className="flex flex-col gap-2">
      {filteredGoals?.length === 0 && (
        <li className="text-sm text-muted-foreground">
          There are no {filteredStatus} goals
        </li>
      )}
      {goalList?.map((goal) => (
        <GoalReportListItem key={goal.id} goal={goal} />
      ))}
    </ul>
  );
}
