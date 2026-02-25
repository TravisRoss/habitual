"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { habitSchema, type HabitFormValues } from "@/lib/zod";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./ColorPicker";
import { TargetDaysCheckboxes } from "./TargetDaysCheckboxes";
import { WeeklyTargetSelect } from "./WeeklyTargetSelect";
import { inputClass } from "@/app/_lib/constants";

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
    register,
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

  const frequency = watch("frequency");

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
    <form onSubmit={handleSubmit(onFormSubmit)} noValidate>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="name">Name</FieldLabel>
          <Input
            id="name"
            type="text"
            placeholder="e.g. Morning run"
            aria-invalid={!!errors.name}
            className={inputClass}
            {...register("name")}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="description">Description (optional)</FieldLabel>
          <Textarea
            id="description"
            placeholder="Add notes or motivation..."
            aria-invalid={!!errors.description}
            className={cn(inputClass, "resize-none")}
            {...register("description")}
          />
          <FieldError errors={[errors.description]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="frequency">Frequency</FieldLabel>
          <Controller
            name="frequency"
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  if (v === "weekly") setValue("weekly_target", 1);
                  if (v === "custom") setValue("target_days", []);
                }}
              >
                <SelectTrigger id="frequency" className={inputClass}>
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
            <FieldLabel htmlFor="weekly_target">Times per week</FieldLabel>
            <Controller
              name="weekly_target"
              control={control}
              render={({ field }) => (
                <WeeklyTargetSelect
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            <FieldError errors={[errors.weekly_target]} />
          </Field>
        )}

        {frequency === "custom" && (
          <Field>
            <FieldLabel>Days of the week</FieldLabel>
            <Controller
              name="target_days"
              control={control}
              render={({ field }) => (
                <TargetDaysCheckboxes
                  value={field.value ?? []}
                  onChange={field.onChange}
                />
              )}
            />
            <FieldError errors={[errors.target_days]} />
          </Field>
        )}

        <Field>
          <FieldLabel>Color (optional)</FieldLabel>
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorPicker value={field.value} onChange={field.onChange} />
            )}
          />
        </Field>

        {errors.root && (
          <p
            role="alert"
            className="text-center font-nunito text-sm text-red-500"
          >
            {errors.root.message}
          </p>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary border-0 font-nunito text-sm font-extrabold text-white"
          >
            {isSubmitting ? <Spinner className="size-4" /> : submitLabel}
          </Button>
          {onCancel ? (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="font-nunito text-sm font-semibold"
            >
              Cancel
            </Button>
          ) : (
            <Button
              variant="outline"
              asChild
              className="font-nunito text-sm font-semibold"
            >
              <Link href="/dashboard">Cancel</Link>
            </Button>
          )}
        </div>
      </FieldGroup>
    </form>
  );
}
