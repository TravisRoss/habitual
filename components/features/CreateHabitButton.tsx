"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { HabitDialog } from "./HabitDialog";

export function CreateHabitButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CirclePlus
        className="fixed bottom-20 right-6 md:bottom-6 h-12 w-12 rounded-full bg-brand text-white p-3 shadow-lg cursor-pointer hover:bg-brand-dim transition-colors duration-300"
        onClick={() => setOpen(true)}
      />
      <HabitDialog action="create" open={open} onOpenChange={setOpen} />
    </>
  );
}
