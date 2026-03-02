"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Field, FieldLabel } from "@/components/ui/field";
import { inputClass } from "@/app/_lib/constants";
import type { Habit } from "@/types";

type HabitSelectProps = {
  value: string;
  onChange: (value: string) => void;
  habits: Habit[];
};

export function HabitSelect({ value, onChange, habits }: HabitSelectProps) {
  return (
    <Field>
      <FieldLabel htmlFor="habit">Habit</FieldLabel>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="habit" className={inputClass}>
          <SelectValue placeholder="Select or create a habit" />
        </SelectTrigger>
        <SelectContent>
          {habits.map((h) => (
            <SelectItem key={h.id} value={h.id}>
              {h.name}
            </SelectItem>
          ))}
          <SelectItem value="new">+ Create new habit</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  );
}
