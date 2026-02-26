"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { habitSchema, type HabitFormValues } from "@/lib/zod";
import { FormShell } from "./FormShell";
import { HabitFields } from "./HabitFields";

type HabitFormProps = {
  defaultValues?: Partial<HabitFormValues>;
  onSubmit?: (data: HabitFormValues) => Promise<{ error?: string }>;
  submitLabel?: string;
  onCancel?: () => void;
};

const noop = async (): Promise<{ error?: string }> => ({});

export function HabitForm({
  defaultValues,
  onSubmit = noop,
  submitLabel = "Save",
  onCancel,
}: HabitFormProps) {
  const {
    control,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<HabitFormValues>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      frequency: "daily",
      weekly_target: 1,
      target_days: [],
      ...defaultValues,
    },
  });

  async function onFormSubmit(data: HabitFormValues) {
    const result = await onSubmit({
      ...data,
      target_days:
        data.frequency === "custom" && data.target_days?.length
          ? [...data.target_days].sort((a, b) => a - b)
          : undefined,
    });
    if (result.error) setError("root", { message: result.error });
  }

  return (
    <FormShell
      onSubmit={handleSubmit(onFormSubmit)}
      isSubmitting={isSubmitting}
      rootError={errors.root?.message}
      submitLabel={submitLabel}
      onCancel={onCancel}
    >
      <HabitFields
        control={control}
        errors={errors}
        watch={watch}
        setValue={setValue}
      />
    </FormShell>
  );
}
