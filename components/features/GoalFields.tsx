"use client";

import { Controller } from "react-hook-form";
import type { Control, UseFormRegister, FieldErrors } from "react-hook-form";
import {
  Field,
  FieldError,
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
import type { GoalFormValues } from "@/lib/zod";
import { inputClass } from "@/app/_lib/constants";

const PERIOD_OPTIONS = [
  { value: "7", label: "7 days" },
  { value: "14", label: "14 days" },
  { value: "30", label: "30 days" },
  { value: "90", label: "90 days" },
  { value: "180", label: "180 days" },
  { value: "365", label: "365 days" },
];

const UNIT_OPTIONS = [
  { value: "times", label: "Times" },
  { value: "hours", label: "Hours" },
  { value: "minutes", label: "Minutes" },
  { value: "pages", label: "Pages" },
  { value: "kg", label: "kg" },
  { value: "custom", label: "Custom" },
];

type GoalFieldsProps = {
  control: Control<GoalFormValues>;
  register: UseFormRegister<GoalFormValues>;
  errors: FieldErrors<GoalFormValues>;
};

export function GoalFields({ control, register, errors }: GoalFieldsProps) {
  return (
    <>
      <Field>
        <FieldLabel htmlFor="name">Goal name</FieldLabel>
        <Input
          id="name"
          type="text"
          placeholder="e.g. Run every day"
          aria-invalid={!!errors.name}
          className={inputClass}
          {...register("name")}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="start_date">Start date</FieldLabel>
        <Input
          id="start_date"
          type="date"
          aria-invalid={!!errors.start_date}
          className={inputClass}
          {...register("start_date")}
        />
        <FieldError errors={[errors.start_date]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="period">Duration</FieldLabel>
        <Controller
          name="period"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger id="period" className={inputClass}>
                <SelectValue placeholder="Select duration" />
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

      <div className="flex gap-3">
        <Field className="flex-1">
          <FieldLabel htmlFor="target">Target</FieldLabel>
          <Input
            id="target"
            type="number"
            min={1}
            aria-invalid={!!errors.target}
            className={inputClass}
            {...register("target", { valueAsNumber: true })}
          />
          <FieldError errors={[errors.target]} />
        </Field>

        <Field className="flex-1">
          <FieldLabel htmlFor="unit">Unit</FieldLabel>
          <Controller
            name="unit"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="unit" className={inputClass}>
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  {UNIT_OPTIONS.map((o) => (
                    <SelectItem key={o.value} value={o.value}>
                      {o.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          <FieldError errors={[errors.unit]} />
        </Field>
      </div>
    </>
  );
}
