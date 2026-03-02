"use client";

import { ProgressSelect } from "@/components/features/progress/ProgressSelect";
import { PeriodOption } from "@/types";
import { useState } from "react";

export default function page() {
  const [period, setPeriod] = useState<PeriodOption>("Weekly");
  
  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">Your Progress</p>
      <div className="flex items-center justify-between">
        <p>Progress Report</p>
        <ProgressSelect value={period} onChange={setPeriod} />
      </div>
      <div className="flex flex-col gap-4">
        {/* your goals section with title "your goals", progress bar towards all goals for the given period */}
        
      </div>
    </div>
  );
}
