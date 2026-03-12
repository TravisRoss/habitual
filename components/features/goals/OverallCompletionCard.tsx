"use client";

import { useTranslations } from "next-intl";
import CircularProgress from "@/components/features/progress/CircularProgress";
import { ReportPeriod } from "@/types";
import { useOverallCompletionRate } from "@/hooks/useCompletions";

export default function OverallCompletionCard({
  period,
}: {
  period: ReportPeriod;
}) {
  const { data: overallRate = 0 } = useOverallCompletionRate(period);
  const t = useTranslations("progress");

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <CircularProgress value={overallRate} size={200} thickness={25} />
      <p className="text-sm text-muted-foreground mt-4">
        {t("overallCompletion")}
      </p>
    </div>
  );
}
