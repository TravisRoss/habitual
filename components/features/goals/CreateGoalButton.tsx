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
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const commonClassNames = "bg-brand text-white p-3 cursor-pointer hover:bg-brand-dim transition-colors duration-300"

type CreateGoalButtonProps = {
  className?: string;
  label?: string;
};

export function CreateGoalButton({ className, label }: CreateGoalButtonProps) {
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
      {label ? (
        <Button className={cn(className, commonClassNames)} onClick={() => setOpen(true)}>
          {label}
        </Button>
      ) : (
        <CirclePlus
          className={
            className ??
            cn(
              "fixed bottom-[calc(5rem+env(safe-area-inset-bottom))] right-6 md:bottom-6 h-12 w-12 rounded-full",
              commonClassNames,
            )
          }
          onClick={() => setOpen(true)}
        />
      )}

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
