"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ReportPeriod } from "@/types";
import { useTranslations } from "next-intl";

type ReportSelect = {
  value: ReportPeriod;
  onChange: (value: ReportPeriod) => void;
};

export function ReportSelect({ value, onChange }: ReportSelect) {
  const t = useTranslations("progress.periods");

  const ReportPeriods: { value: ReportPeriod; label: string }[] = [
    { value: "Weekly", label: t("weekly") },
    { value: "Monthly", label: t("monthly") },
    { value: "Yearly", label: t("yearly") },
  ];

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger id="progressSelect" className="w-full max-w-[200px]">
        <SelectValue placeholder={value} />
      </SelectTrigger>
      <SelectContent className="w-full max-w-[200px]" position="popper">
        {ReportPeriods.map((option) => (
          <SelectItem className="w-full max-w-[200px]" key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
