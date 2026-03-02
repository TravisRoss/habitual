"use client";

import HabitsList from "@/components/features/habits/HabitsList";
import { formatDate } from "../../_lib/utils";
import { DateStrip } from "@/components/features/shared/DateStrip";
import { useState } from "react";
import SubPageLayout from "@/components/features/shared/SubPageLayout";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(formatDate());

  return (
    <SubPageLayout title="Your Habits">
      <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
      <HabitsList date={selectedDate} />
    </SubPageLayout>
  );
}
