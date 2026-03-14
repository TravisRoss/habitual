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
import BurgerMenu from "../shared/BurgerMenu";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { HabitCheckbox } from "./HabitCheckbox";
import { useTranslations } from "next-intl";
import { haptic } from "@/app/_lib/haptics";
import { Flame } from "lucide-react";
import { habitBgColor } from "@/app/_lib/utils";

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
  const tDelete = useTranslations("habits.delete");

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleCheckboxChange = (val: boolean) => {
    setCompleted(val);
    onToggleComplete(val);
    haptic();
  };

  return (
    <Item className="relative overflow-hidden">
      <div
        className={cn(
          "absolute inset-0 pointer-events-none transition-[opacity,filter] duration-300",
          completed && "opacity-75 saturate-75",
        )}
        style={{
          backgroundColor: habitBgColor(habit.color),
        }}
      />
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
            <span className="flex items-center gap-0.5 text-xs text-orange-500">
              <Flame className="h-4 w-4" fill="currentColor" />
              {streak.streak_length}
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
