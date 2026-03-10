"use client";

import CircularProgress from "@/components/features/progress/CircularProgress";
import { ReportSelect } from "@/components/features/progress/ProgressSelect";
import { ReportPeriod } from "@/types";
import { useState } from "react";
import DashboardLayout from "@/components/features/shared/DashboardLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import GoalReportList from "@/components/features/goals/GoalReportList";
import SeeAllButton from "@/components/features/shared/SeeAllButton";
import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import { useOverallCompletionRate } from "@/hooks/useCompletions";
import { useGoals } from "@/hooks/useGoals";
import { PREVIEW_LIMIT } from "@/app/_lib/constants";
import { useTranslations } from "next-intl";

export default function Page() {
  const [period, setPeriod] = useState<ReportPeriod>("Weekly");
  const { data: overallRate = 0 } = useOverallCompletionRate(period);
  const { data: goals } = useGoals();
  const t = useTranslations("progress");

  return (
    <DashboardLayout
      title={t("title")}
      titleAction={<ReportSelect value={period} onChange={setPeriod} />}
    >
      <DashboardCard title={t("yourGoals")}>
        <div className="flex flex-col items-center justify-center py-4">
          <CircularProgress value={overallRate} size={200} thickness={25} />
          <p className="text-sm text-muted-foreground mt-4">
            {t("overallCompletion")}
          </p>
        </div>
      </DashboardCard>

      <DashboardCard
        title={t("yourProgress")}
        action={
          goals &&
          goals.length > PREVIEW_LIMIT && (
            <SeeAllButton href="/dashboard/progress/goals" />
          )
        }
      >
        <GoalReportList isPreview={true} />
      </DashboardCard>
      <CreateGoalButton />
    </DashboardLayout>
  );
}
