"use client";

import { ProgressSelect } from "@/components/features/ProgressSelect";
import { useState } from "react";

export default function page() {
  const [period, setPeriod] = useState<"Weekly" | "Monthly" | "Yearly">("Weekly");
  
  return (
    <div className="space-y-4">
      <p className="text-2xl font-bold">Your Progress</p>
      <div className="flex items-center justify-between">
        <p>Progress Report</p>
        <ProgressSelect value={period} onChange={setPeriod} />
      </div>
    </div>
  );
}
