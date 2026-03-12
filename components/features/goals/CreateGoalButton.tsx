"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useHabits } from "@/hooks/useHabits";
import { GoalFormValues, createGoalSchema } from "@/lib/zod";
import { useCreateGoal } from "@/hooks/useGoals";
import { GoalDialog } from "./GoalDialog";
import { useTranslations } from "next-intl";

export function CreateGoalButton() {
  const [open, setOpen] = useState(false);
  const createGoalMutation = useCreateGoal();
  const { data: habits } = useHabits();
  const tVal = useTranslations("validation");

  const form = useForm<GoalFormValues>({
    resolver: zodResolver(createGoalSchema(tVal)),
    defaultValues: { period: "30", habit_frequency: "daily" },
  });

  function handleOnSubmit(data: GoalFormValues) {
    return createGoalMutation.mutateAsync(data).then((result) => {
      if (!result.error) form.reset();
      return { error: result.error ?? undefined };
    });
  }

  return (
    <>
      <CirclePlus
        className="fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 md:bottom-6 h-12 w-12 rounded-full bg-brand text-white p-3 cursor-pointer hover:bg-brand-dim transition-colors duration-300"
        onClick={() => setOpen(true)}
      />
      <GoalDialog
        form={form}
        action="create"
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleOnSubmit}
        habits={habits ?? []}
      />
    </>
  );
}
