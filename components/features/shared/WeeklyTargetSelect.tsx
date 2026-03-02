"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { inputClass } from "@/app/_lib/constants";

type WeeklyTargetSelectProps = {
  value?: number;
  onChange: (value?: number) => void;
};

export function WeeklyTargetSelect({
  value,
  onChange,
}: WeeklyTargetSelectProps) {
  return (
    <Select
      value={value != null ? String(value) : ""}
      onValueChange={(v) => onChange(v ? Number(v) : undefined)}
    >
      <SelectTrigger id="weekly_target" className={inputClass}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      <SelectContent>
        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
          <SelectItem key={n} value={String(n)}>
            {n} {n === 1 ? "time" : "times"} per week
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
