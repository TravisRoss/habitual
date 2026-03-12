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
import { HabitForm } from "./HabitForm";
import { useTranslations } from "next-intl";

type HabitDialogProps = {
  action: "create" | "edit";
  habit?: Habit;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: HabitFormValues) => Promise<{ error?: string }>;
};

export function HabitDialog({ habit, action, open, onOpenChange, onSubmit }: HabitDialogProps) {
  const t = useTranslations("habits.dialog");

  async function handleOnSubmit(data: HabitFormValues) {
    const result = await onSubmit(data);
    if (!result.error) onOpenChange(false);
    return result;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent onCloseAutoFocus={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>{action === "edit" ? t("editTitle") : t("createTitle")}</DialogTitle>
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
