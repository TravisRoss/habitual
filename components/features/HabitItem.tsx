"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
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
import BurgerMenu from "./BurgerMenu";

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

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleCheckboxChange = (val: boolean) => {
    setCompleted(val);
    onToggleComplete(val);
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
              🔥 {streak.streak_length}
            </span>
          )}
        </ItemDescription>
      </ItemContent>

      <ItemActions>
        <div
          className={cn(
            "transition-transform duration-150",
            completed && "scale-110",
          )}
        >
          <Checkbox
            checked={completed}
            onCheckedChange={(val) => handleCheckboxChange(Boolean(val))}
            className="h-5 w-5"
          />
        </div>
        <BurgerMenu onEdit={() => setEditOpen(true)} onDelete={onDelete} />
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
