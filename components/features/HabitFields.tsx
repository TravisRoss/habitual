"use client";

import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./ColorPicker";
import { TargetDaysCheckboxes } from "./TargetDaysCheckboxes";
import { WeeklyTargetSelect } from "./WeeklyTargetSelect";
import { inputClass } from "@/app/_lib/constants";
import type { HabitFormValues } from "@/lib/zod";

type HabitFieldsProps = {
  control: Control<HabitFormValues>;
  errors: FieldErrors<HabitFormValues>;
  watch: UseFormWatch<HabitFormValues>;
  setValue: UseFormSetValue<HabitFormValues>;
};

export function HabitFields({ control, errors, watch, setValue }: HabitFieldsProps) {
  const frequency = watch("frequency");

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <Controller
          name="name"
          control={control}
          render={({ field: f }) => (
            <Input
              id="name"
              type="text"
              placeholder="e.g. Morning run"
              aria-invalid={!!errors.name}
              className={inputClass}
              {...f}
            />
          )}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
        <Controller
          name="description"
          control={control}
          render={({ field: f }) => (
            <Textarea
              id="description"
              placeholder="Add notes or motivation..."
              aria-invalid={!!errors.description}
              className={cn(inputClass, "resize-none")}
              {...f}
            />
          )}
        />
        <FieldError errors={[errors.description]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
        <Controller
          name="frequency"
          control={control}
          render={({ field: f }) => (
            <Select
              value={f.value}
              onValueChange={(v) => {
                f.onChange(v);
                if (v === "weekly") setValue("weekly_target", 1);
                if (v === "custom") setValue("target_days", []);
              }}
            >
              <SelectTrigger id="frequency" className={inputClass}>
                <SelectValue placeholder="Select frequency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Daily</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom days</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.frequency]} />
      </Field>

      {frequency === "weekly" && (
        <Field>
          <FieldLabel htmlFor="weekly_target">Times per week</FieldLabel>
          <Controller
            name="weekly_target"
            control={control}
            render={({ field: f }) => (
              <WeeklyTargetSelect value={f.value} onChange={f.onChange} />
            )}
          />
          <FieldError errors={[errors.weekly_target]} />
        </Field>
      )}

      {frequency === "custom" && (
        <Field>
          <FieldLabel>Days of the week</FieldLabel>
          <Controller
            name="target_days"
            control={control}
            render={({ field: f }) => (
              <TargetDaysCheckboxes
                value={f.value ?? []}
                onChange={f.onChange}
              />
            )}
          />
          <FieldError errors={[errors.target_days]} />
        </Field>
      )}

      <Field>
        <FieldLabel>Color (optional)</FieldLabel>
        <Controller
          name="color"
          control={control}
          render={({ field: f }) => (
            <ColorPicker value={f.value} onChange={f.onChange} />
          )}
        />
      </Field>
    </FieldGroup>
  );
}
