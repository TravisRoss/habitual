"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { CalendarMonth, useDayPicker } from "react-day-picker";

export function CustomMonthCaption({
  calendarMonth,
}: {
  calendarMonth: CalendarMonth;
}) {
  const { goToMonth, nextMonth, previousMonth } = useDayPicker();
  const label = calendarMonth.date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
  return (
    <div className="flex w-full items-center justify-center gap-1">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => previousMonth && goToMonth(previousMonth)}
        disabled={!previousMonth}
        aria-label="Go to previous month"
      >
        <ChevronLeftIcon className="size-4" />
      </Button>
      <span className="select-none text-sm font-semibold text-brand">
        {label}
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => nextMonth && goToMonth(nextMonth)}
        disabled={!nextMonth}
        aria-label="Go to next month"
      >
        <ChevronRightIcon className="size-4" />
      </Button>
    </div>
  );
}
