"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportPeriod } from "@/types";

const ReportPeriods: ReportPeriod[] = ["Weekly", "Monthly", "Yearly"];

type ReportSelect = {
  value: ReportPeriod;
  onChange: (value: ReportPeriod) => void;
};

export function ReportSelect({ value, onChange }: ReportSelect) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id="progressSelect" className="w-full max-w-[200px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent className="w-full max-w-[200px]" position="popper">
        {ReportPeriods.map((option) => (
          <SelectItem className="w-full max-w-[200px]" key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
