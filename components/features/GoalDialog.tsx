"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Goal, Habit } from "@/types";
import type { GoalFormValues } from "@/lib/zod";
import { GoalForm } from "./GoalForm";
import { goalToFormValues } from "@/app/_lib/mappers";

type GoalDialogProps = {
  action: "create" | "edit";
  goal?: Goal;
  habits?: Habit[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: GoalFormValues) => Promise<{ error?: string }>;
};

export function GoalDialog({
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
            {action === "edit" ? "Edit Goal" : "Add Goal"}
          </DialogTitle>
        </DialogHeader>
        <GoalForm
          defaultValues={goal ? goalToFormValues(goal) : undefined}
          existingHabits={habits}
          onSubmit={handleOnSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
