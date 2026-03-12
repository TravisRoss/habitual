"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { ReportPeriod } from "@/types";
import SeeAllButton from "@/components/features/shared/SeeAllButton";
import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const OverallCompletionCard = dynamic(
  () => import("@/components/features/goals/OverallCompletionCard"),
  {
    loading: () => <Skeleton className="h-60" />,
  },
);

const GoalReportPreviewCard = dynamic(
  () => import("@/components/features/goals/GoalReportPreviewCard"),
  {
    loading: () => <Skeleton className="h-50" />,
  },
);

const ReportSelect = dynamic(
  () => import("@/components/features/progress/ProgressSelect"),
  { ssr: false },
);

export function ProgressPage() {
  const [period, setPeriod] = useState<ReportPeriod>("Weekly");
  const t = useTranslations("progress");

  return (
    <PageLayout
      title={t("title")}
      titleAction={<ReportSelect value={period} onChange={setPeriod} />}
    >
      <DashboardCard title={t("yourGoals")}>
        <OverallCompletionCard period={period} />
      </DashboardCard>

      <DashboardCard
        title={t("yourProgress")}
        action={<SeeAllButton href="/dashboard/progress/goals" />}
      >
        <GoalReportPreviewCard />
      </DashboardCard>
      <CreateGoalButton />
    </PageLayout>
  );
}
