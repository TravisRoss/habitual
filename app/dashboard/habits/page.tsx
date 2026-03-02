"use client";

import HabitsList from "@/components/features/HabitsList";
import { formatDate } from "../../_lib/utils";
import { DateStrip } from "@/components/features/DateStrip";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

export default function Page() {
  const [selectedDate, setSelectedDate] = useState(formatDate());

  return (
    <>
      <div className="flex flex-col gap-2">
        <Button
          asChild
          variant="link"
          size="sm"
          className="w-max hover:text-brand"
        >
          <Link href="/dashboard">
            <MoveLeft className="w-2 h-2 mr-1" />
            Back to Dashboard
          </Link>
        </Button>
        <DateStrip selectedDate={selectedDate} onSelect={setSelectedDate} />
        <HabitsList date={selectedDate} />
      </div>
    </>
  );
}
