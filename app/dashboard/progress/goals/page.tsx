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

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();

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
        <BackButton label={"Back to Progress"} />
        <Select
          value={searchParams.get("status") || "all"}
          onValueChange={handleSelectChange}
        >
          <SelectTrigger>
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <GoalReportList />
    </>
  );
}
