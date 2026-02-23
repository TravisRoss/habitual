"use client";

import { COLORS } from "@/app/_lib/constants";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ColorPickerProps = {
  value?: string;
  onChange: (value?: string) => void;
};

export function ColorPicker({ value, onChange }: ColorPickerProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {COLORS.map((hex) => (
        <Button
          key={hex}
          type="button"
          variant="ghost"
          size="icon-sm"
          onClick={() => onChange(value === hex ? undefined : hex)}
          className={cn(
            "rounded-full border-2 border-transparent p-0 hover:border-[#E2E8F0] cursor-pointer",
            value === hex &&
              "border-[#0F172A] ring-2 ring-[#F59E0B] ring-offset-2",
          )}
          style={{ backgroundColor: hex }}
          aria-pressed={value === hex}
          aria-label={`Select color ${hex}`}
        />
      ))}
    </div>
  );
}
