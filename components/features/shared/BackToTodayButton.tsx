import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarDays } from "lucide-react";

type BackToTodayButtonProps = {
  isViewingToday: boolean;
  onClick: () => void;
};

export default function BackToTodayButton({
  isViewingToday,
  onClick,
}: BackToTodayButtonProps) {
  return (
    <Button
      variant="outline"
      size="sm"
      onClick={onClick}
      className={cn(
        "transition-opacity duration-200",
        isViewingToday ? "invisible" : "opacity-100",
      )}
      tabIndex={isViewingToday ? -1 : 0}
    >
      <CalendarDays />
      Back to today
    </Button>
  );
}
