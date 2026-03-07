import { formatIsoDate, pluralDays } from "@/app/_lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Goal, Habit } from "@/types";

type GoalTableProps = {
  goal: Goal;
  habit: Habit;
  completionCount: number;
};

export default function GoalTable({
  goal,
  habit,
  completionCount,
}: GoalTableProps) {
  const daysRemaining = Math.max(0, goal.target - completionCount);

  const rows = [
    { label: "Habit Name:", value: habit?.name },
    { label: "Target:", value: pluralDays(goal.target) },
    {
      label: "Days complete:",
      value: `${completionCount} from ${pluralDays(goal.target)}`,
    },
    { label: "Days failed:", value: pluralDays(daysRemaining) },
    { label: "Habit type:", value: habit?.frequency },
    {
      label: "Created on:",
      value: habit?.created_at
        ? formatIsoDate(habit.created_at.slice(0, 10))
        : "N/A",
    },
  ];

  return (
    <Table>
      <TableBody>
        {rows.map(({ label, value }) => (
          <TableRow
            key={label}
            className={cn(
              "flex justify-between",
              label === "Habit Name:" && "font-semibold",
            )}
          >
            <TableCell>{label}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
