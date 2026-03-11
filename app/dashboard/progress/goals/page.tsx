"use client";

import GoalReportList from "@/components/features/goals/GoalReportList";
import PageLayout from "@/components/features/shared/PageLayout";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("progress.goalsPage");
  const tDetail = useTranslations("progress.goalDetail");

  function handleSelectChange(value: string) {
    const params = new URLSearchParams(searchParams);
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.push(`/dashboard/progress/goals?${params.toString()}`);
  }

  return (
    <PageLayout
      title={t("title")}
      back={tDetail("backToProgress")}
      backHref="/dashboard/progress"
      titleAction={
        <Select
          value={searchParams.get("status") || "all"}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("filters.all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("filters.all")}</SelectItem>
            <SelectItem value="active">{t("filters.active")}</SelectItem>
            <SelectItem value="completed">{t("filters.completed")}</SelectItem>
          </SelectContent>
        </Select>
      }
    >
      <GoalReportList />
    </PageLayout>
  );
}
