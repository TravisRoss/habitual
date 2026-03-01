"use client";

import HabitsList from "@/components/features/HabitsList";
import { formatDate } from "../../_lib/utils";
import { DateStrip } from "@/components/features/DateStrip";
import { useState } from "react";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(formatDate());

  return (
    <>
      <div className="flex flex-col gap-2">
        <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
        <HabitsList date={selectedDate} />
      </div>
    </>
  );
}
