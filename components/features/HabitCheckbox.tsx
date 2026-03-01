import { cn } from "@/lib/utils";
import { Checkbox } from "../ui/checkbox";

type HabitCheckboxProps = {
  checked: boolean;
  onCheckedChange: (val: boolean) => void;
};

export function HabitCheckbox({ checked, onCheckedChange }: HabitCheckboxProps) {
  return (
    <div
      className={cn(
        "transition-transform duration-150",
        checked && "scale-110",
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => onCheckedChange(Boolean(val))}
        className="h-5 w-5"
      />
    </div>
  );
}