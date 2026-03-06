"use client";

import { calcEndDate, formatIsoDate } from "@/app/_lib/utils";
import { CustomMonthCaption } from "@/components/features/goals/CustomMonthCaption";
import BackButton from "@/components/features/shared/BackButton";
import DashboardCard from "@/components/features/shared/DashboardCard";
import DashboardLayout from "@/components/features/shared/DashboardLayout";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCompletionsForHabit } from "@/hooks/useCompletions";
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

  const goal = goals.find((g) => g.id === goalId);
  const { data: habits = [] } = useHabits();
  const habit = habits.find((h) => h.id === goal?.habit_id);
  const { data: completions = [] } = useCompletionsForHabit(habit?.id || "");

  if (!goal) {
    return (
      <>
        <h1>Goal not found</h1>
        <BackButton label="Back to Goals" href="/dashboard/progress/goals" />
      </>
    );
  }

  const completionCount = completions.length;
  const endDate = calcEndDate(goal.start_date, goal.period);
  const isAchieved = completionCount >= goal.target;
  const daysFailed = Math.max(0, goal.target - completionCount);

  const pluralDays = (n: number) => `${n} Day${n !== 1 ? "s" : ""}`;

  const rows = [
    { label: "Habit Name:", value: habit?.name },
    { label: "Target:", value: pluralDays(goal.target) },
    {
      label: "Days complete:",
      value: `${completionCount} from ${pluralDays(goal.target)}`,
    },
    { label: "Days failed:", value: pluralDays(daysFailed) },
    { label: "Habit type:", value: habit?.frequency },
    {
      label: "Created on:",
      value: habit?.created_at ? formatIsoDate(habit.created_at.slice(0, 10)) : "N/A",
    },
  ];

  const badge = (
    <Badge
      variant="outline"
      className={cn(isAchieved && "border-green-500 bg-green-500 text-white")}
    >
      {isAchieved ? "Achieved" : "In Progress"}
    </Badge>
  );

  return (
    <DashboardLayout title={goal.name} titleAction={badge}>
      <BackButton label="Back to goals" href="/dashboard/progress/goals" />
      <DashboardCard>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Start date</p>
              <time className="text-sm font-medium" dateTime={goal.start_date}>
                {formatIsoDate(goal.start_date)}
              </time>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">End date</p>
              <time className="text-sm font-medium" dateTime={endDate}>
                {formatIsoDate(endDate)}
              </time>
            </div>
          </div>

          <Calendar
            className="w-full rounded-lg border"
            classNames={{ root: "w-full" }}
            startMonth={new Date(goal.start_date)}
            endMonth={new Date(endDate)}
            modifiers={{
              goalRange: completions.map(
                (c) => new Date(c.completed_on + "T00:00:00"),
              ),
            }}
            modifiersClassNames={{
              goalRange: "![background-color:var(--habit-done-bg)]",
            }}
            components={{
              Nav: () => <></>,
              MonthCaption: CustomMonthCaption,
            }}
          />
        </div>
      </DashboardCard>

      <DashboardCard>
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
    </DashboardLayout>
  );
}
