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
import { ColorPicker } from "../shared/ColorPicker";
import { TargetDaysCheckboxes } from "../shared/TargetDaysCheckboxes";
import { inputClass } from "@/app/_lib/constants";
import { HABIT_FREQUENCIES, type HabitFrequency } from "@/types";
import type { HabitFormValues } from "@/lib/zod";
import { useTranslations } from "next-intl";

const FREQ_TRANSLATION_KEY = { daily: "daily", custom: "customDays" } as const;

type HabitFieldsProps = {
  control: Control<HabitFormValues>;
  errors: FieldErrors<HabitFormValues>;
  watch: UseFormWatch<HabitFormValues>;
  setValue: UseFormSetValue<HabitFormValues>;
};

export function HabitFields({
  control,
  errors,
  watch,
  setValue,
}: HabitFieldsProps) {
  const frequency = watch("frequency");
  const tFields = useTranslations("habits.fields");
  const tFreq = useTranslations("habits.frequency");

  return (
    <FieldGroup>
      <Field>
        <FieldLabel htmlFor="name">{tFields("name")}</FieldLabel>
        <Controller
          name="name"
          control={control}
          render={({ field: f }) => (
            <Input
              id="name"
              type="text"
              placeholder={tFields("namePlaceholder")}
              aria-invalid={!!errors.name}
              className={inputClass}
              {...f}
            />
          )}
        />
        <FieldError errors={[errors.name]} />
      </Field>

      <Field>
        <FieldLabel htmlFor="frequency">{tFields("frequency")}</FieldLabel>
        <Controller
          name="frequency"
          control={control}
          render={({ field: f }) => (
            <Select
              value={f.value}
              onValueChange={(v) => {
                f.onChange(v);
                if (v === "custom") setValue("target_days", []);
              }}
            >
              <SelectTrigger id="frequency" className={inputClass}>
                <SelectValue placeholder={tFields("frequencyPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                {HABIT_FREQUENCIES.map((freq: HabitFrequency) => (
                  <SelectItem key={freq} value={freq}>
                    {tFreq(FREQ_TRANSLATION_KEY[freq])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.frequency]} />
      </Field>

      {frequency === "custom" && (
        <Field>
          <FieldLabel>{tFields("daysOfWeek")}</FieldLabel>
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
        <FieldLabel>{tFields("color")}</FieldLabel>
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
