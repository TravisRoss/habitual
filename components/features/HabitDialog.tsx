"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { Habit } from "@/types";
import type { HabitFormValues } from "@/lib/zod";
import { habitToFormValues } from "@/app/_lib/mappers";
import { useCreateHabit, useEditHabit } from "@/hooks/useHabits";
import { HabitForm } from "./HabitForm";

type HabitDialogProps =
  | { action: "edit"; habit: Habit; open: boolean; onOpenChange: (open: boolean) => void }
  | { action: "create"; habit?: never; open: boolean; onOpenChange: (open: boolean) => void };

export function HabitDialog({ habit, action, open, onOpenChange }: HabitDialogProps) {
  const editMutation = useEditHabit();
  const createMutation = useCreateHabit();

  async function handleOnSubmit(data: HabitFormValues) {
    if (action === "edit") {
      const result = await editMutation.mutateAsync({ habit_id: habit.id, ...data });
      if (!result.error) onOpenChange(false);
      return result;
    } else {
      const result = await createMutation.mutateAsync(data);
      if (!result.error) onOpenChange(false);
      return result;
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{action === "edit" ? "Edit Habit" : "Add Habit"}</DialogTitle>
        </DialogHeader>
        <HabitForm
          defaultValues={habit ? habitToFormValues(habit) : undefined}
          onSubmit={handleOnSubmit}
          onCancel={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
