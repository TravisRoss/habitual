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
import { WeeklyTargetSelect } from "../shared/WeeklyTargetSelect";
import { inputClass } from "@/app/_lib/constants";
import type { HabitFormValues } from "@/lib/zod";
import { useTranslations } from "next-intl";

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
                if (v === "weekly") setValue("weekly_target", 1);
                if (v === "custom") setValue("target_days", []);
              }}
            >
              <SelectTrigger id="frequency" className={inputClass}>
                <SelectValue placeholder={tFields("frequencyPlaceholder")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">{tFreq("daily")}</SelectItem>
                <SelectItem value="weekly">{tFreq("weekly")}</SelectItem>
                <SelectItem value="custom">{tFreq("customDays")}</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        <FieldError errors={[errors.frequency]} />
      </Field>

      {frequency === "weekly" && (
        <Field>
          <FieldLabel htmlFor="weekly_target">{tFields("timesPerWeek")}</FieldLabel>
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
