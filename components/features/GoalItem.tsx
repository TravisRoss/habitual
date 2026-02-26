"use client";

import { GoalFormValues } from "@/lib/zod";
import { Goal, Habit } from "@/types";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "../ui/item";
import BurgerMenu from "./BurgerMenu";
import { Progress } from "../ui/progress";
import { useState } from "react";
import { GoalDialog } from "./GoalDialog";

type GoalItemProps = {
  goal: Goal;
  habits?: Habit[];
  onEdit: (data: GoalFormValues) => Promise<{ error?: string }>;
  onDelete: () => void;
};

export default function GoalItem({
  goal,
  habits,
  onEdit,
  onDelete,
}: GoalItemProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <Item
      className="relative overflow-hidden border-l-4 transition-colors duration-300"
      style={{
        borderLeftColor: goal.color ?? "var(--color-habit-border-default)",
      }}
    >
      <ItemContent>
        <ItemTitle>{goal.name}</ItemTitle>
        <Progress value={7} max={10} className="mt-1" />
        <ItemDescription>
          <span>
            5 of {goal.target} {goal.unit} target
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <BurgerMenu onEdit={() => setEditOpen(true)} onDelete={onDelete} />
        <GoalDialog
          goal={goal}
          habits={habits}
          action="edit"
          open={editOpen}
          onOpenChange={setEditOpen}
          onSubmit={onEdit}
        />
      </ItemActions>
    </Item>
  );
}
