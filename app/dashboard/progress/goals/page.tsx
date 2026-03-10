"use client";

import GoalReportList from "@/components/features/goals/GoalReportList";
import BackButton from "@/components/features/shared/BackButton";
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
  const t = useTranslations("progress.goalsPage.filters");
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
    <>
      <div className="flex justify-between items-center mb-2">
        <BackButton label={tDetail("backToProgress")} href="/dashboard/progress" />
        <Select
          value={searchParams.get("status") || "all"}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder={t("all")} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t("all")}</SelectItem>
            <SelectItem value="active">{t("active")}</SelectItem>
            <SelectItem value="completed">{t("completed")}</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <GoalReportList />
    </>
  );
}
