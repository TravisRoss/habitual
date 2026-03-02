"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PeriodOption } from "@/types";

const periodOptions: PeriodOption[] = ["Weekly", "Monthly", "Yearly"];

type ProgressSelectProps = {
  value: PeriodOption;
  onChange: (value: PeriodOption) => void;
};

export function ProgressSelect({ value, onChange }: ProgressSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id="progressSelect" className="w-full max-w-[200px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent className="w-full max-w-[200px]" position="popper">
        {periodOptions.map((option) => (
          <SelectItem className="w-full max-w-[200px]" key={option} value={option}>
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
