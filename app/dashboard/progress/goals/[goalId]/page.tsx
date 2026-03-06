"use client";

import { calcEndDate, getMonthIndexesBetweenDates } from "@/app/_lib/utils";
import MonthNavigator from "@/components/features/goals/MonthNavigator";
import BackButton from "@/components/features/shared/BackButton";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCompletionCountForHabit } from "@/hooks/useCompletions";
import { useGoals } from "@/hooks/useGoals";
import { useHabits } from "@/hooks/useHabits";
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
  const goal = goals.find((g) => g.id === goalId);
  const { data: habits = [] } = useHabits();

  if (!goal) {
    return (
      <>
        <h1>Goal not found</h1>
        <BackButton label="Back to Goals" href="/dashboard/progress/goals" />
      </>
    );
  }

  const habit = habits.find((h) => h.id === goal.habit_id);
  const endDate = calcEndDate(goal.start_date, goal.period);
  const isAchieved = completionCount >= goal.target;

  const monthIndexes = getMonthIndexesBetweenDates(
    new Date(goal.start_date),
    new Date(endDate),
  );

  const daysRemaining = goal.target - completionCount;

  const rows = [
    { label: "Habit Name:", value: habit?.name },
    { label: "Target:", value: goal.target },
    { label: "Days completed:", value: completionCount },
    { label: "Days remaining:", value: daysRemaining },
    { label: "Habit frequency:", value: habit?.frequency },
    {
      label: "Created on:",
      value: habit?.created_at ? habit.created_at.slice(0, 10) : "N/A",
    },
  ];

  return (
    <>
      <div className="space-y-4">
        <BackButton
          label="Back to goals"
          href="/dashboard/progress/goals"
        />
        <p className="text-lg font-bold">Goal: {goal.name}</p>
        <DashboardCard>
          <div className="flex justify-between">
            <div className="flex flex-col">
              <p>Start date</p>
              <time dateTime={goal.start_date}>{goal.start_date}</time>
            </div>

            <MonthNavigator monthIndexes={monthIndexes} />

            <div className="flex flex-col">
              <p>End date</p>
              <time dateTime={endDate}>{endDate}</time>
            </div>
          </div>
        </DashboardCard>

        <DashboardCard
          title={goal.name}
          action={
            <Badge variant="outline">
              {isAchieved ? "Achieved" : "In Progress"}
            </Badge>
          }
        >
          <Table>
            <TableBody>
              {rows.map(({ label, value }) => (
                <TableRow
                  key={label}
                  className={cn(
                    "flex justify-between",
                    label === "Habit Name:" && "font-semibold",
                  )}
                >
                  <TableCell>{label}</TableCell>
                  <TableCell>{value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DashboardCard>
      </div>
    </>
  );
}
