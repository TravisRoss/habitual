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
import { inputClass } from "@/app/_lib/constants";
import { TargetDaysCheckboxes } from "../shared/TargetDaysCheckboxes";
import { useTranslations } from "next-intl";

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
  const durationDays = watch("duration_days");
  const tFields = useTranslations("goals.fields");
  const tPeriods = useTranslations("goals.timePeriods");
  const tFreq = useTranslations("goals.frequency");

  const PERIOD_OPTIONS = [
    { value: "7", label: tPeriods("1week") },
    { value: "14", label: tPeriods("2weeks") },
    { value: "30", label: tPeriods("1month") },
    { value: "90", label: tPeriods("3months") },
    { value: "180", label: tPeriods("6months") },
    { value: "365", label: tPeriods("1year") },
    { value: "custom", label: tPeriods("custom") },
  ];

  return (
    <>
      <Field>
        <FieldLabel htmlFor="name">{tFields("goal")}</FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder={tFields("goalPlaceholder")}
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register("name")}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="habit_name">{tFields("habitName")}</FieldLabel>
        <Input
          id="habit_name"
          type="text"
          placeholder={tFields("habitNamePlaceholder")}
          aria-invalid={!!errors.habit_name}
          className={inputClass}
          {...register("habit_name")}
        />
        <FieldError errors={[errors.habit_name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="period">{tFields("durationDays")}</FieldLabel>
        <Controller
          name="duration_days"
          control={control}
          render={({ field }) => (
            <Select value={String(field.value)} onValueChange={field.onChange}>
              <SelectTrigger id="period" className={inputClass}>
                <SelectValue placeholder={tFields("durationDaysPlaceholder")} />
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
        <FieldError errors={[errors.duration_days]} />
      </Field>

      {durationDays === "custom" && (
        <Field>
          <FieldLabel>{tFields("customDurationDays")}</FieldLabel>
          <Input
            id="custom_duration_days"
            type="number"
            min={1}
            placeholder={tFields("customDurationDaysPlaceholder")}
            aria-invalid={!!errors.custom_duration_days}
            className={inputClass}
            {...register("custom_duration_days")}
          />
          <FieldError errors={[errors.custom_duration_days]} />
        </Field>
      )}

      <Field>
        <FieldLabel htmlFor="habit_frequency">
          {tFields("frequency")}
        </FieldLabel>
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
                <SelectValue placeholder={tFields("frequencyPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">{tFreq("everyday")}</SelectItem>
                <SelectItem value="custom">{tFreq("customDays")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.habit_frequency as never]} />
      </Field>

      {frequency === "custom" && (
        <Field>
          <FieldLabel>{tFields("daysOfWeek")}</FieldLabel>
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
