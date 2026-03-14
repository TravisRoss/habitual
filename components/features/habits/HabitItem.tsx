"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemActions,
} from "@/components/ui/item";
import { cn } from "@/lib/utils";
import type { Habit, Streak } from "@/types";
import type { HabitFormValues } from "@/lib/zod";
import { HabitDialog } from "./HabitDialog";
import { AddHabitGoalDialog } from "../goals/AddHabitGoalDialog";
import BurgerMenu from "../shared/BurgerMenu";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { HabitCheckbox } from "./HabitCheckbox";
import { useTranslations } from "next-intl";
import { haptic } from "@/app/_lib/haptics";

type HabitItemProps = {
  habit: Habit;
  isCompleted: boolean;
  streak?: Streak;
  onToggleComplete: (completed: boolean) => void;
  onEdit: (data: HabitFormValues) => Promise<{ error?: string }>;
  onDelete: () => void;
};

export default function HabitItem({
  habit,
  isCompleted,
  streak,
  onToggleComplete,
  onEdit,
  onDelete,
}: HabitItemProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  const tDelete = useTranslations("habits.delete");
  const tStreak = useTranslations("habits");

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleCheckboxChange = (val: boolean) => {
    setCompleted(val);
    onToggleComplete(val);
    haptic();
  };

  return (
    <Item
      className={cn(
        "relative overflow-hidden border-l-4 transition-colors duration-300",
        completed ? "bg-habit-done-bg" : "bg-card",
      )}
      style={{
        borderLeftColor: habit.color ?? "var(--color-habit-border-default)",
      }}
    >
      <ItemContent>
        <ItemTitle
          className={cn(
            "font-nunito",
            completed && "line-through text-muted-foreground",
          )}
        >
          {habit.name}
        </ItemTitle>
        <ItemDescription className="flex items-center gap-1.5">
          <Badge variant="outline" className="text-xs">
            {habit.frequency}
          </Badge>
          {streak && streak.streak_length >= 2 && (
            <span className="text-xs text-muted-foreground">
              {tStreak("streak", { count: String(streak.streak_length) })}
            </span>
          )}
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        <HabitCheckbox
          checked={completed}
          onCheckedChange={handleCheckboxChange}
        />
        <BurgerMenu
          onEdit={() => setEditOpen(true)}
          onDelete={() => setDeleteOpen(true)}
        />
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title={tDelete("title")}
          description={tDelete("description")}
          confirmLabel={tDelete("confirm")}
          onConfirm={onDelete}
        />
        <HabitDialog
          habit={habit}
          action="edit"
          open={editOpen}
          onOpenChange={setEditOpen}
          onSubmit={onEdit}
        />
      </ItemActions>
    </Item>
  );
}
