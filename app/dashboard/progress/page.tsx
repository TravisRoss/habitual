"use client";

import CircularProgress from "@/components/features/progress/CircularProgress";
import { ReportSelect } from "@/components/features/progress/ProgressSelect";
import { ReportPeriod } from "@/types";
import { useState } from "react";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import GoalReportList from "@/components/features/goals/GoalReportList";
import SeeAllButton from "@/components/features/shared/SeeAllButton";
import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import { useOverallCompletionRate } from "@/hooks/useCompletions";
import { useTranslations } from "next-intl";

export default function Page() {
  const [period, setPeriod] = useState<ReportPeriod>("Weekly");
  const { data: overallRate = 0 } = useOverallCompletionRate(period);
  const t = useTranslations("progress");

  return (
    <PageLayout
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
        action={<SeeAllButton href="/dashboard/progress/goals" />}
      >
        <GoalReportList isPreview={true} />
      </DashboardCard>
      <CreateGoalButton />
    </PageLayout>
  );
}
