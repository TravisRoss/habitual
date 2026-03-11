"use client";

import HabitsList from "@/components/features/habits/HabitsList";
import { dateToIsoStr } from "../../_lib/utils";
import { DateStrip } from "@/components/features/shared/DateStrip";
import { useState } from "react";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { useTranslations } from "next-intl";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(dateToIsoStr());
  const t = useTranslations("habits");
  const tCommon = useTranslations("common");

  return (
    <PageLayout title={t("title")} back={tCommon("backToDashboard")}>
      <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
      <DashboardCard>
        <HabitsList date={selectedDate} />
      </DashboardCard>
    </PageLayout>
  );
}
