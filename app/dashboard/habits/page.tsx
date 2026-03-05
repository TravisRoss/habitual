"use client";

import HabitsList from "@/components/features/habits/HabitsList";
import { dateToIsoStr } from "../../_lib/utils";
import { DateStrip } from "@/components/features/shared/DateStrip";
import { useState } from "react";
import SubPageLayout from "@/components/features/shared/SubPageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(dateToIsoStr());

  return (
    <SubPageLayout title="Your Habits">
      <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
      <DashboardCard title="Your Habits for today">
        <HabitsList date={selectedDate} />
      </DashboardCard>
    </SubPageLayout>
  );
}
