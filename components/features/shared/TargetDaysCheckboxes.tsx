"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DAYS } from "@/app/_lib/constants";

type TargetDaysCheckboxesProps = {
  value?: number[];
  onChange: (value: number[]) => void;
};

export function TargetDaysCheckboxes({
  value: selectedDays = [],
  onChange: onSelectedDaysChange,
}: TargetDaysCheckboxesProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {DAYS.map(([dayIndex, dayLabel]) => (
        <Label
          key={dayIndex}
          className="cursor-pointer font-nunito text-foreground"
        >
          <Checkbox
            checked={selectedDays.includes(dayIndex)}
            onCheckedChange={(isChecked) =>
              onSelectedDaysChange(
                isChecked === true
                  ? [...selectedDays, dayIndex]
                  : selectedDays.filter(
                      (selectedDay) => selectedDay !== dayIndex,
                    ),
              )
            }
            className="border-border data-[state=checked]:bg-brand data-[state=checked]:border-brand"
          />
          {dayLabel}
        </Label>
      ))}
    </div>
  );
}
