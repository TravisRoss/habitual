"use client";

import { Controller } from "react-hook-form";
import type {
  Control,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
  FieldValues,
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

// Supports both flat (HabitForm) and nested (GoalForm: "habit") field paths
type HabitFieldsProps<T extends FieldValues> = {
  control: Control<T>;
  errors: FieldErrors<HabitFormValues>;
  watch: UseFormWatch<T>;
  setValue: UseFormSetValue<T>;
  prefix?: string; // e.g. "habit" for GoalForm, undefined for HabitForm
};

function field(name: string, prefix?: string) {
  return (prefix ? `${prefix}.${name}` : name) as never;
}

export function HabitFields<T extends FieldValues>({
  control,
  errors,
  watch,
  setValue,
  prefix,
}: HabitFieldsProps<T>) {
  const frequencyPath = field("frequency", prefix);
  const frequency = watch(frequencyPath) as unknown as string;

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor={field("name", prefix)}>Name</FieldLabel>
        <Controller
          name={field("name", prefix)}
          control={control}
          render={({ field: f }) => (
            <Input
              id={field("name", prefix)}
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
        <FieldLabel htmlFor={field("description", prefix)}>
          Description (optional)
        </FieldLabel>
        <Controller
          name={field("description", prefix)}
          control={control}
          render={({ field: f }) => (
            <Textarea
              id={field("description", prefix)}
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
        <FieldLabel htmlFor={field("frequency", prefix)}>Frequency</FieldLabel>
        <Controller
          name={frequencyPath}
          control={control}
          render={({ field: f }) => (
            <Select
              value={f.value}
              onValueChange={(v) => {
                f.onChange(v);
                if (v === "weekly")
                  setValue(field("weekly_target", prefix), 1 as never);
                if (v === "custom")
                  setValue(field("target_days", prefix), [] as never);
              }}
            >
              <SelectTrigger
                id={field("frequency", prefix)}
                className={inputClass}
              >
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
          <FieldLabel htmlFor={field("weekly_target", prefix)}>
            Times per week
          </FieldLabel>
          <Controller
            name={field("weekly_target", prefix)}
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
            name={field("target_days", prefix)}
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
          name={field("color", prefix)}
          control={control}
          render={({ field: f }) => (
            <ColorPicker value={f.value} onChange={f.onChange} />
          )}
        />
      </Field>
    </FieldGroup>
  );
}
