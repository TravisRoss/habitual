"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
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
import { createHabit } from "@/app/_lib/actions";
import {
  createHabitSchema,
  type CreateHabitFormValues,
} from "@/lib/zod";
import { cn } from "@/lib/utils";
import { ColorPicker } from "./ColorPicker";
import { TargetDaysCheckboxes } from "./TargetDaysCheckboxes";
import { WeeklyTargetSelect } from "./WeeklyTargetSelect";
import { inputClass } from "./constants";

export function CreateHabitForm() {
  const router = useRouter();
  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateHabitFormValues>({
    resolver: zodResolver(createHabitSchema),
    defaultValues: { frequency: "daily", weekly_target: 1, target_days: [] },
  });

  const frequency = watch("frequency");

  async function onSubmit(data: CreateHabitFormValues) {
    const result = await createHabit({
      ...data,
      // Keep a stable order in DB for predictable reads/comparisons.
      target_days:
        data.frequency === "custom" && data.target_days?.length
          ? [...data.target_days].sort((a, b) => a - b)
          : undefined,
    });

    if (result.error) {
      setError("root", { message: result.error });
      return;
    }
    router.push("/dashboard");
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-nunito text-2xl text-center">Create Habit</CardTitle>
        <CardDescription className="text-center">Add a new habit to track</CardDescription>
      </CardHeader>
      <CardContent >
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
              {/* Controller bridges RHF with custom components like Select. */}
              <Controller
                name="frequency"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value}
                    onValueChange={(v) => {
                      // Map Select's value changes into RHF form state.
                      field.onChange(v);
                      // Seed dependent fields when the frequency mode changes.
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
                  <ColorPicker
                    value={field.value}
                    onChange={field.onChange}
                  />
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
                {isSubmitting ? <Spinner className="size-4" /> : "Create"}
              </Button>
              <Button
                variant="outline"
                asChild
                className="font-nunito text-sm font-semibold"
              >
                <Link href="/dashboard">Cancel</Link>
              </Button>
            </div>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
