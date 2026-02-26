"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { goalSchema, type GoalFormValues } from "@/lib/zod";
import { FormShell } from "./FormShell";
import { GoalFields } from "./GoalFields";
import { HabitSelect } from "./HabitSelect";
import { HabitFields } from "./HabitFields";
import { inputClass } from "@/app/_lib/constants";
import type { Habit } from "@/types";

type GoalFormProps = {
  defaultValues?: Partial<GoalFormValues>;
  existingHabits?: Habit[];
  onSubmit?: (data: GoalFormValues) => Promise<{ error?: string }>;
  submitLabel?: string;
  onCancel?: () => void;
};

const noop = async (): Promise<{ error?: string }> => ({});

export function GoalForm({
  defaultValues,
  existingHabits = [],
  onSubmit = noop,
  submitLabel = "Save",
  onCancel,
}: GoalFormProps) {
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<GoalFormValues>({
    resolver: zodResolver(goalSchema),
    defaultValues: {
      habit: { type: "existing", id: "" },
      period: "30",
      ...defaultValues,
    },
  });

  const habitType = watch("habit.type");
  const newHabitErrors =
    habitType === "new" && errors.habit
      ? (errors.habit as Record<string, unknown>)
      : {};

  async function onFormSubmit(data: GoalFormValues) {
    const result = await onSubmit(data);
    if (result.error) setError("root", { message: result.error });
  }

  function onHabitSelectChange(v: string) {
    if (v === "new") {
      setValue("habit", {
        type: "new",
        name: "",
        frequency: "daily",
        target_days: [],
      });
    } else {
      setValue("habit", { type: "existing", id: v });
    }
  }

  return (
    <FormShell
      onSubmit={handleSubmit(onFormSubmit)}
      isSubmitting={isSubmitting}
      rootError={errors.root?.message}
      submitLabel={submitLabel}
      onCancel={onCancel}
    >
      <FieldGroup>
        <GoalFields control={control} register={register} errors={errors} />

        <HabitSelect
          value={habitType === "existing" ? watch("habit.id") : "new"}
          onChange={onHabitSelectChange}
          habits={existingHabits}
        />

        {habitType === "existing" && (
          <Field>
            <FieldLabel htmlFor="habit-id">Select habit</FieldLabel>
            <Controller
              name="habit.id"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="habit-id" className={inputClass}>
                    <SelectValue placeholder="Choose a habit" />
                  </SelectTrigger>
                  <SelectContent>
                    {existingHabits.map((h) => (
                      <SelectItem key={h.id} value={h.id}>
                        {h.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.habit as never]} />
          </Field>
        )}

        {habitType === "new" && (
          <div className="rounded-lg border p-4">
            <HabitFields
              control={control}
              errors={newHabitErrors as never}
              watch={watch}
              setValue={setValue}
              prefix="habit"
            />
          </div>
        )}
      </FieldGroup>
    </FormShell>
  );
}
