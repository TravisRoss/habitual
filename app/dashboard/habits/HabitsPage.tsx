"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { dateToIsoStr } from "../../_lib/utils";
import { DateStrip } from "@/components/features/shared/DateStrip";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";

const HabitsList = dynamic(() => import("@/components/features/habits/HabitsList"), {
  ssr: false,
});

interface HabitsPageProps {
  title: string;
  back: string;
}

export function HabitsPage({ title, back }: HabitsPageProps) {
  const [selectedDate, setSelectedDate] = useState(dateToIsoStr());

  return (
    <PageLayout title={title} back={back}>
      <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
      <DashboardCard>
        <HabitsList date={selectedDate} />
      </DashboardCard>
    </PageLayout>
  );
}
