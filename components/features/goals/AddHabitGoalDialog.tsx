"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FormShell } from "../shared/FormShell";
import { createGoalForHabitSchema, type GoalForHabitFormValues } from "@/lib/zod";
import { useCreateGoalForHabit } from "@/hooks/useGoals";
import { inputClass } from "@/app/_lib/constants";
import { useTranslations } from "next-intl";
import type { Habit } from "@/types";

type AddHabitGoalDialogProps = {
  habit: Habit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddHabitGoalDialog({
  habit,
  open,
  onOpenChange,
}: AddHabitGoalDialogProps) {
  const tDialog = useTranslations("goals.dialog");
  const tFields = useTranslations("goals.fields");
  const tPeriods = useTranslations("goals.timePeriods");
  const tVal = useTranslations("validation");
  const createGoalMutation = useCreateGoalForHabit();

  const {
    register,
    control,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GoalForHabitFormValues>({
    resolver: zodResolver(createGoalForHabitSchema(tVal)),
    defaultValues: { period: "30" },
  });

  const PERIOD_OPTIONS = [
    { value: "7", label: tPeriods("1week") },
    { value: "14", label: tPeriods("2weeks") },
    { value: "30", label: tPeriods("1month") },
    { value: "90", label: tPeriods("3months") },
    { value: "180", label: tPeriods("6months") },
    { value: "365", label: tPeriods("1year") },
  ];

  async function onFormSubmit(data: GoalForHabitFormValues) {
    const result = await createGoalMutation.mutateAsync({
      habit: { id: habit.id, frequency: habit.frequency, target_days: habit.target_days },
      ...data,
    });
    if (result?.error) {
      setError("root", { message: result.error });
    } else {
      reset();
      onOpenChange(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{tDialog("addGoalTitle")}</DialogTitle>
        </DialogHeader>
        <FormShell
          onSubmit={handleSubmit(onFormSubmit)}
          isSubmitting={isSubmitting}
          rootError={errors.root?.message}
          submitLabel={tDialog("createButton")}
          onCancel={() => { reset(); onOpenChange(false); }}
        >
          <FieldGroup>
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
              <FieldLabel htmlFor="period">{tFields("timePeriod")}</FieldLabel>
              <Controller
                name="period"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger id="period" className={inputClass}>
                      <SelectValue placeholder={tFields("timePeriod")} />
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
          </FieldGroup>
        </FormShell>
      </DialogContent>
    </Dialog>
  );
}
