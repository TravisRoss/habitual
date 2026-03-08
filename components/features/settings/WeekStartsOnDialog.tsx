"use client";

import { updateWeekStartsOnAction } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import SettingItem, { itemCls } from "./SettingItem";

const OPTIONS = [
  { label: "Sunday", value: 0 },
  { label: "Monday", value: 1 },
] as const;

type Props = { defaultValue: 0 | 1 };

export function WeekStartsOnDialog({ defaultValue }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SettingItem
          icon={CalendarDays}
          label="Week Starts On"
          value={defaultValue === 0 ? "Sunday" : "Monday"}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Week Starts On</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          {OPTIONS.map(({ label, value }) => (
            <Button
              key={label}
              variant="ghost"
              className={itemCls}
              onClick={() => {
                updateWeekStartsOnAction(value);
                setOpen(false);
              }}
            >
              {label}
            </Button>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
