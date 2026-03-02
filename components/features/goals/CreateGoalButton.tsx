"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useHabits } from "@/hooks/useHabits";
import { GoalFormValues } from "@/lib/zod";
import { useCreateGoal } from "@/hooks/useGoals";
import { GoalDialog } from "./GoalDialog";

export function CreateGoalButton() {
  const [open, setOpen] = useState(false);
  const createGoalMutation = useCreateGoal();
  const { data: habits } = useHabits();

  function handleOnSubmit(data: GoalFormValues) {
    return createGoalMutation.mutateAsync(data).then((result) => ({
      error: result.error ?? undefined,
    }));
  }

  return (
    <>
      <CirclePlus
        className="fixed bottom-20 right-6 md:bottom-6 h-12 w-12 rounded-full bg-brand text-white p-3 shadow-lg cursor-pointer hover:bg-brand-dim transition-colors duration-300"
        onClick={() => setOpen(true)}
      />
      <GoalDialog
        action="create"
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleOnSubmit}
        habits={habits ?? []}
      />
    </>
  );
}
