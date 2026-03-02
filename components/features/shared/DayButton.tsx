import { cn } from "@/lib/utils";

type DayButtonProps = {
  dateStr: string;
  isSelected: boolean;
  isToday: boolean;
  onClick: () => void;
};

export function DayButton({
  dateStr,
  isSelected,
  isToday,
  onClick,
}: DayButtonProps) {
  const dayNum = new Date(dateStr).getUTCDate();
  const day = new Date(dateStr).toLocaleDateString(undefined, { weekday: "short" });

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center rounded-xl py-2 flex-1 transition-colors",
        isSelected
          ? "bg-primary/10 text-primary font-semibold"
          : "text-muted-foreground hover:bg-muted",
      )}
    >
      <span
        className={cn(
          "text-sm leading-tight",
          isToday && !isSelected && "font-semibold text-foreground",
        )}
      >
        {day}
      </span>
      <span className="text-lg">{dayNum}</span>
    </button>
  );
}
