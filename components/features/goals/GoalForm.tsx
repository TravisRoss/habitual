"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { goalSchema, type GoalFormValues } from "@/lib/zod";
import { FormShell } from "../shared/FormShell";
import { GoalFields } from "./GoalFields";

type GoalFormProps = {
  defaultValues?: Partial<GoalFormValues>;
  onSubmit?: (data: GoalFormValues) => Promise<{ error?: string }>;
  submitLabel?: string;
  onCancel?: () => void;
};

const noop = async (): Promise<{ error?: string }> => ({});

export function GoalForm({
  defaultValues,
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
      period: "30",
      habit_frequency: "daily",
      ...defaultValues,
    },
  });

  async function onFormSubmit(data: GoalFormValues) {
    const result = await onSubmit(data);
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
      <FieldGroup>
        <GoalFields
          control={control}
          register={register}
          errors={errors}
          watch={watch}
          setValue={setValue}
        />
      </FieldGroup>
    </FormShell>
  );
}
