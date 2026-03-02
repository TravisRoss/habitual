"use client";

import CircularProgress from "@/components/features/progress/CircularProgress";
import { ProgressSelect } from "@/components/features/progress/ProgressSelect";
import { PeriodOption } from "@/types";
import { useState } from "react";
import DashboardLayout from "@/components/features/shared/DashboardLayout";
import DashboardSection from "@/components/features/shared/DashboardSection";
import GoalReportList from "@/components/features/goals/GoalReportList";

export default function page() {
  const [period, setPeriod] = useState<PeriodOption>("Weekly");
  
  return (
    <DashboardLayout title="Progress Report" titleAction={<ProgressSelect value={period} onChange={setPeriod} />}>
      <DashboardSection title="Your Goals">
        <div className="flex flex-col items-center justify-center py-4">
          <CircularProgress value={75} size={200} thickness={25} />
          <p className="text-sm text-muted-foreground mt-4">Overall completion rate</p>
        </div>
      </DashboardSection>

      <DashboardSection>
        <GoalReportList />
      </DashboardSection>
    </DashboardLayout>
  );
}
