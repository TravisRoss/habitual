"use client";

import { calcEndDate, formatIsoDate } from "@/app/_lib/utils";
import { CustomMonthCaption } from "@/components/features/goals/CustomMonthCaption";
import GoalTable from "@/components/features/goals/GoalTable";
import DashboardCard from "@/components/features/shared/DashboardCard";
import PageLayout from "@/components/features/shared/PageLayout";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Spinner } from "@/components/ui/spinner";
import { useCompletionsForHabit } from "@/hooks/useCompletions";
import { useGoals } from "@/hooks/useGoals";
import { useHabits } from "@/hooks/useHabits";
import { cn } from "@/lib/utils";
import { use } from "react";
import { useTranslations } from "next-intl";
import BackButton from "@/components/features/shared/BackButton";

export default function Page({
  params,
}: {
  params: Promise<{ goalId: string }>;
}) {
  const { goalId } = use(params);
  const { data: goals = [], isPending: goalsLoading } = useGoals();
  const goal = goals.find((g) => g.id === goalId);

  const { data: habits = [], isPending: habitsLoading } = useHabits();
  const habit = habits.find((h) => h.id === goal?.habit_id);

  const { data: completions = [] } = useCompletionsForHabit(habit?.id || "");

  const tDetail = useTranslations("progress.goalDetail");
  const tStatus = useTranslations("goals.status");

  if (goalsLoading || habitsLoading) {
    return <Spinner />;
  }

  if (!goal || !habit) {
    return (
      <>
        <h1>{tDetail("notFound")}</h1>
        <BackButton
          label={tDetail("backToGoals")}
          href="/dashboard/progress/goals"
        />
      </>
    );
  }

  const completionCount = completions.length;
  const endDate = calcEndDate(goal.start_date, String(goal.duration_days));
  const isAchieved = completionCount >= goal.target_completions;

  const badge = (
    <Badge
      variant="outline"
      className={cn(isAchieved && "border-green-500 bg-green-500 text-white")}
    >
      {isAchieved ? tStatus("achieved") : tStatus("inProgress")}
    </Badge>
  );

  return (
    <PageLayout
      title={goal.name}
      back={tDetail("backToGoals")}
      backHref="/dashboard/progress/goals"
    >
      <DashboardCard>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {tDetail("startDate")}
              </p>
              <time className="text-sm font-medium" dateTime={goal.start_date}>
                {formatIsoDate(goal.start_date)}
              </time>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">
                {tDetail("endDate")}
              </p>
              <time className="text-sm font-medium" dateTime={endDate}>
                {formatIsoDate(endDate)}
              </time>
            </div>
          </div>

          <Calendar
            className="w-full border-none bg-transparent max-h-75 overflow-auto"
            startMonth={new Date(goal.start_date)}
            endMonth={new Date(endDate)}
            classNames={{ today: "text-brand" }}
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

      <DashboardCard title={goal.name} action={badge}>
        <GoalTable
          goal={goal}
          habit={habit}
          completionCount={completionCount}
        />
      </DashboardCard>
    </PageLayout>
  );
}
