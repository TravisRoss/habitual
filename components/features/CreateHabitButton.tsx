"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { HabitDialog } from "./HabitDialog";

export function CreateHabitButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CirclePlus
        className="fixed bottom-20 right-6 md:bottom-6 h-12 w-12 rounded-full bg-[#F59E0B] text-white p-3 shadow-lg cursor-pointer hover:bg-[#E59800] transition-colors duration-300"
        onClick={() => setOpen(true)}
      />
      <HabitDialog action="create" open={open} onOpenChange={setOpen} />
    </>
  );
}
