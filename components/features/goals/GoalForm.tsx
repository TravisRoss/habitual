"use client";

import { useForm, type UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldGroup } from "@/components/ui/field";
import { createGoalSchema, type GoalFormValues } from "@/lib/zod";
import { useTranslations } from "next-intl";
import { FormShell } from "../shared/FormShell";
import { GoalFields } from "./GoalFields";

type GoalFormProps = {
  form?: UseFormReturn<GoalFormValues>;
  defaultValues?: Partial<GoalFormValues>;
  onSubmit?: (data: GoalFormValues) => Promise<{ error?: string }>;
  submitLabel?: string;
  onCancel?: () => void;
};

const noop = async (): Promise<{ error?: string }> => ({});

export function GoalForm({
  form: externalForm,
  defaultValues,
  onSubmit = noop,
  submitLabel = "Save",
  onCancel,
}: GoalFormProps) {
  const tVal = useTranslations("validation");
  const internalForm = useForm<GoalFormValues>({
    resolver: zodResolver(createGoalSchema(tVal)),
    defaultValues: {
      duration_days: "30",
      habit_frequency: "daily",
      ...defaultValues,
    },
  });

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = externalForm ?? internalForm;

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
