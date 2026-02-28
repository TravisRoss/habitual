"use client";

import { Controller } from "react-hook-form";
import type {
  Control,
  UseFormRegister,
  FieldErrors,
  UseFormWatch,
  UseFormSetValue,
} from "react-hook-form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { GoalFormValues } from "@/lib/zod";
import { inputClass, DAYS } from "@/app/_lib/constants";
import { TargetDaysCheckboxes } from "./TargetDaysCheckboxes";

const PERIOD_OPTIONS = [
  { value: "7", label: "1 Week (7 Days)" },
  { value: "14", label: "2 Weeks (14 Days)" },
  { value: "30", label: "1 Month (30 Days)" },
  { value: "90", label: "3 Months (90 Days)" },
  { value: "180", label: "6 Months (180 Days)" },
  { value: "365", label: "1 Year (365 Days)" },
];

type GoalFieldsProps = {
  control: Control<GoalFormValues>;
  register: UseFormRegister<GoalFormValues>;
  errors: FieldErrors<GoalFormValues>;
  watch: UseFormWatch<GoalFormValues>;
  setValue: UseFormSetValue<GoalFormValues>;
};

export function GoalFields({
  control,
  register,
  errors,
  watch,
  setValue,
}: GoalFieldsProps) {
  const frequency = watch("habit_frequency");
  const targetDays = watch("habit_target_days");

  return (
    <>
      <Field>
        <FieldLabel htmlFor="name">Your Goal</FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="e.g. Run for 90 days"
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register("name")}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="habit_name">Habit Name</FieldLabel>
        <Input
          id="habit_name"
          type="text"
          placeholder="e.g. Run"
          aria-invalid={!!errors.habit_name}
          className={inputClass}
          {...register("habit_name")}
        />
        <FieldError errors={[errors.habit_name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="period">Period</FieldLabel>
        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="period" className={inputClass}>
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                {PERIOD_OPTIONS.map((o) => (
                  <SelectItem key={o.value} value={o.value}>
                    {o.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.period]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="habit_frequency">Habit Type</FieldLabel>
        <Controller
          name="habit_frequency"
          control={control}
          render={({ field: f }) => (
            <Select
              value={f.value}
              onValueChange={(v) => {
                f.onChange(v);
                setValue("habit_target_days", undefined);
              }}
            >
              <SelectTrigger id="habit_frequency" className={inputClass}>
                <SelectValue placeholder="Select habit type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Everyday</SelectItem>
                <SelectItem value="weekly">Weekly</SelectItem>
                <SelectItem value="custom">Custom days</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.habit_frequency as never]} />
      </Field>

      {frequency === "weekly" && (
        <Field>
          <FieldLabel htmlFor="habit_target_days_weekly">
            Day of the week
          </FieldLabel>
          <Select
            value={targetDays?.length === 1 ? String(targetDays[0]) : ""}
            onValueChange={(v) =>
              setValue("habit_target_days", v !== "" ? [Number(v)] : undefined)
            }
          >
            <SelectTrigger id="habit_target_days_weekly" className={inputClass}>
              <SelectValue placeholder="Select a day" />
            </SelectTrigger>
            <SelectContent>
              {DAYS.map(([index, label]) => (
                <SelectItem key={index} value={String(index)}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FieldError errors={[errors.habit_target_days as never]} />
        </Field>
      )}

      {frequency === "custom" && (
        <Field>
          <FieldLabel>Days of the week</FieldLabel>
          <Controller
            name="habit_target_days"
            control={control}
            render={({ field: f }) => (
              <TargetDaysCheckboxes
                value={f.value ?? []}
                onChange={f.onChange}
              />
            )}
          />
          <FieldError errors={[errors.habit_target_days as never]} />
        </Field>
      )}
    </>
  );
}
