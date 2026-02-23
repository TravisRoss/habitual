"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import type { Habit } from "@/types";
import type { HabitFormValues } from "@/lib/zod";
import { habitToFormValues } from "@/app/_lib/mappers";
import { useEditHabit } from "@/hooks/useHabits";
import { EditHabitForm } from "./EditHabitForm";

type EditHabitDialogProps = {
  habit: Habit;
};

export function EditHabitDialog({ habit }: EditHabitDialogProps) {
  const [open, setOpen] = useState(false);
  const editMutation = useEditHabit();

  async function handleEditHabit(data: HabitFormValues) {
    const result = await editMutation.mutateAsync({ habit_id: habit.id, ...data });
    if (!result.error) setOpen(false);
    return result;
  }

  return (
    <>
      <DropdownMenuItem
        onSelect={(e) => {
          e.preventDefault();
          setOpen(true);
        }}
      >
        Edit
      </DropdownMenuItem>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Habit</DialogTitle>
          </DialogHeader>
          <EditHabitForm
            habit={habitToFormValues(habit)}
            onEditHabit={handleEditHabit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
