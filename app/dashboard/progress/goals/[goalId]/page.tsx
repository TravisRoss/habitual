"use client";

import { calcEndDate, getMonthIndexesBetweenDates } from "@/app/_lib/utils";
import MonthNavigator from "@/components/features/goals/MonthNavigator";
import BackButton from "@/components/features/shared/BackButton";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Table, TableCell, TableRow } from "@/components/ui/table";
import { useCompletionCountForHabit } from "@/hooks/useCompletions";
import { useGoals } from "@/hooks/useGoals";
import { cn } from "@/lib/utils";
import { use } from "react";

export default function Page({
  params,
}: {
  params: Promise<{ goalId: string }>;
}) {
  const { goalId } = use(params);
  const { data: goals = [] } = useGoals();
  const { data: completionCount = 0 } = useCompletionCountForHabit(goalId);
  const goal = goals.find((goal) => goal.id === goalId);
  if (!goal) {
    return (
      <>
        <h1>Goal not found</h1>
        <BackButton label="Back to Goals" href="/dashboard/progress/goals" />
      </>
    );
  }
  const isAchieved = completionCount >= goal?.target;

  const rows = [
    { label: "Habit Name:", value: "TODO: get habit name" },
    { label: "Target:", value: `${goal.target}` },
    { label: "Days completed:", value: `${completionCount}` },
    { label: "Days remaining:", value: `${goal.target - completionCount}` },
    { label: "Habit frequency:", value: "TODO: get habit frequency" },
    { label: "Created on:", value: "TODO: get created on date" },
  ];

  const endDate = calcEndDate(goal.start_date, goal.period);

  return (
    <>
      <DashboardCard>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <p>Start date</p>
            <time dateTime={goal.start_date}>{goal.start_date}</time>
          </div>
          <MonthNavigator
            monthIndexes={getMonthIndexesBetweenDates(
              new Date(goal.start_date),
              new Date(endDate),
            )}
          />
          <div className="flex flex-col">
            <p>End date</p>
            <time dateTime={endDate}>{endDate}</time>
          </div>
        </div>
      </DashboardCard>
      <DashboardCard
        title={goal?.name}
        action={
          <Badge variant="outline">
            {isAchieved ? "Achieved" : "In Progress"}
          </Badge>
        }
      >
        <Table>
          {rows.map((row) => (
            <TableRow
              key={row.label}
              className={cn(
                "flex justify-between",
                row.label === "Habit Name:" ? "font-semibold" : "",
              )}
            >
              <TableCell>{row.label}</TableCell>
              <TableCell>{row.value}</TableCell>
            </TableRow>
          ))}
        </Table>
      </DashboardCard>
    </>
  );
}
