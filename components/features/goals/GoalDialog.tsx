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
  async function handleOnSubmit(data: GoalFormValues) {
    const result = await onSubmit(data);
    if (!result.error) onOpenChange(false);
    return result;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {action === "edit" ? "Edit Goal" : "Create New Habit Goal"}
          </DialogTitle>
        </DialogHeader>
        <GoalForm
          form={form}
          defaultValues={goal ? goalToFormValues(goal, habits?.find((h) => h.id === goal.habit_id)) : undefined}
          onSubmit={handleOnSubmit}
          submitLabel={action === "create" ? "Create New" : "Save"}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
