"use client";

import { GoalFormValues } from "@/lib/zod";
import { Goal, Habit } from "@/types";
import { Item, ItemContent, ItemDescription, ItemTitle, ItemActions } from "@/components/ui/item";
import BurgerMenu from "../shared/BurgerMenu";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";
import { GoalDialog } from "./GoalDialog";
import { cn } from "@/lib/utils";
import { useCompletionsForHabit } from "@/hooks/useCompletions";
import { calcPercentage } from "@/app/_lib/utils";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { useTranslations } from "next-intl";

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
  const [deleteOpen, setDeleteOpen] = useState(false);
  const tDelete = useTranslations("goals.delete");
  const tGoals = useTranslations("goals");

  const habitCompletions = useCompletionsForHabit(goal.habit_id);
  const completionCount = habitCompletions.data?.length ?? 0;
  const completionPercentage = calcPercentage(completionCount, goal.target_completions);

  return (
    <Item
      className={cn(
        "relative overflow-hidden border-l-4 transition-colors duration-300",
        "bg-card",
      )}
      style={{
        borderLeftColor: goal.color ?? "var(--color-habit-border-default)",
      }}
    >
      <ItemContent>
        <ItemTitle>{goal.name}</ItemTitle>
        <Progress value={completionPercentage} />
        <ItemDescription>
          <span>
            {tGoals("progress", { completions: String(completionCount), target: String(goal.target_completions) })}
          </span>
        </ItemDescription>
      </ItemContent>
      <ItemActions>
        <BurgerMenu onEdit={() => setEditOpen(true)} onDelete={() => setDeleteOpen(true)} />
        <ConfirmDialog
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
          title={tDelete("title")}
          description={tDelete("description")}
          confirmLabel={tDelete("confirm")}
          onConfirm={onDelete}
        />
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
