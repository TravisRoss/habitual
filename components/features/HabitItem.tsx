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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreVertical, Pencil, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Habit } from "@/types";
import {
  useDeleteHabit,
} from "@/hooks/useHabits";
import { HabitDialog } from "./HabitDialog";
import { useCreateCompletion, useDeleteCompletion } from "@/hooks/useCompletions";

type HabitItemProps = {
  habit: Habit;
  isCompleted: boolean;
};

export default function HabitItem({ habit, isCompleted }: HabitItemProps) {
  const [completed, setCompleted] = useState(isCompleted);
  const [editOpen, setEditOpen] = useState(false);
  const deleteMutation = useDeleteHabit();
  const createCompletionMutation = useCreateCompletion();
  const deleteCompletionMutation = useDeleteCompletion();

  useEffect(() => {
    setCompleted(isCompleted);
  }, [isCompleted]);

  const handleCheckboxChange = (val: boolean, habit_id: string) => {
    setCompleted(!!val);
    if (val === true) {
      createCompletionMutation.mutate({ habit_id, user_id: habit.user_id });
    } else {
      deleteCompletionMutation.mutate({ habit_id, user_id: habit.user_id });
    }
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
        <ItemDescription>
          <Badge variant="outline" className="text-xs">
            {habit.frequency}
          </Badge>
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
            onCheckedChange={(val) =>
              handleCheckboxChange(Boolean(val), habit.id)
            }
            className="h-5 w-5"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center p-1 text-muted-foreground hover:text-foreground">
              <MoreVertical className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onSelect={(e) => {
                e.preventDefault();
                setEditOpen(true);
              }}
            >
              <Pencil className="h-4 w-4 mr-2" />
              <span aria-label="Edit habit">Edit</span>
            </DropdownMenuItem>
            <HabitDialog
              habit={habit}
              action="edit"
              open={editOpen}
              onOpenChange={setEditOpen}
            />
            <DropdownMenuItem
              className="text-destructive"
              onSelect={() => deleteMutation.mutate(habit.id)}
            >
              <Trash2 className="h-4 w-4 mr-2" />
              <span aria-label="Delete habit">Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </ItemActions>
    </Item>
  );
}
