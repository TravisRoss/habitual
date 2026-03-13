"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Goal, Habit } from "@/types";
import type { GoalFormValues } from "@/lib/zod";
import type { UseFormReturn } from "react-hook-form";
import { GoalForm } from "./GoalForm";
import { goalToFormValues } from "@/app/_lib/mappers";
import { useTranslations } from "next-intl";

type GoalDialogProps = {
  action: "create" | "edit";
  form?: UseFormReturn<GoalFormValues>;
  goal?: Goal;
  habits?: Habit[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GoalFormValues) => Promise<{ error?: string }>;
};

export function GoalDialog({
  form,
  goal,
  habits,
  action,
  open,
  onOpenChange,
  onSubmit,
}: GoalDialogProps) {
  const t = useTranslations("goals.dialog");

  async function handleOnSubmit(data: GoalFormValues) {
    const result = await onSubmit(data);
    if (!result.error) onOpenChange(false);
    return result;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {action === "edit" ? t("editTitle") : t("createTitle")}
          </DialogTitle>
        </DialogHeader>
        <GoalForm
          form={form}
          defaultValues={goal ? goalToFormValues(goal, habits?.find((h) => h.id === goal.habit_id)) : undefined}
          onSubmit={handleOnSubmit}
          submitLabel={action === "create" ? t("createButton") : t("saveButton")}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
