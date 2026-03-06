import { MONTH_NAMES } from "@/app/_lib/constants";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type MonthNavigatorProps = {
  monthIndexes: number[];
};

export default function MonthNavigator({ monthIndexes }: MonthNavigatorProps) {
  const [currentPosition, setcurrentPosition] = useState(0);

  if (monthIndexes.length === 0) {
    return null;
  }

  const monthIndex = monthIndexes[currentPosition];
  const isAtStart = currentPosition === 0;
  const isAtEnd = currentPosition === monthIndexes.length - 1;

  function handleDecrement() {
    if (!isAtStart) setcurrentPosition((p) => p - 1);
  }

  function handleIncrement() {
    if (!isAtEnd) setcurrentPosition((p) => p + 1);
  }

  const showControls = monthIndexes.length > 1;

  return (
    <div className="flex items-center justify-between select-none">
      {showControls && (
        <ChevronLeft
          onClick={handleDecrement}
          className={cn(
            "cursor-pointer",
            isAtStart && "text-muted-foreground opacity-50 cursor-default",
          )}
        />
      )}
      <p className="w-20 sm:w-28 text-center text-sm sm:text-base truncate">
        {MONTH_NAMES[monthIndex]}
      </p>
      {showControls && (
        <ChevronRight
          onClick={handleIncrement}
          className={cn(
            "cursor-pointer",
            isAtEnd && "text-muted-foreground opacity-50 cursor-default",
          )}
        />
      )}
    </div>
  );
}
