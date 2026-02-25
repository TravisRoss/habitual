"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { useCreateHabit } from "@/hooks/useHabits";
import { HabitDialog } from "./HabitDialog";
import { HabitFormValues } from "@/lib/zod";

export function CreateHabitButton() {
  const [open, setOpen] = useState(false);
  const createMutation = useCreateHabit();

  function handleOnSubmit(data: HabitFormValues) {
    return createMutation.mutateAsync(data).then((result) => ({
      error: result.error ?? undefined,
    }));
  }

  return (
    <>
      <CirclePlus
        className="fixed bottom-20 right-6 md:bottom-6 h-12 w-12 rounded-full bg-brand text-white p-3 shadow-lg cursor-pointer hover:bg-brand-dim transition-colors duration-300"
        onClick={() => setOpen(true)}
      />
      <HabitDialog
        action="create"
        open={open}
        onOpenChange={setOpen}
        onSubmit={handleOnSubmit}
      />
    </>
  );
}
