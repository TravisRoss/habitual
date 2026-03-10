"use client";

import { formatIsoDate } from "@/app/_lib/utils";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Goal, Habit } from "@/types";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("goals.table");
  const daysRemaining = Math.max(0, goal.target - completionCount);

  const rows = [
    { label: t("habitName"), value: habit?.name, bold: true },
    { label: t("target"), value: t("pluralDays", { count: goal.target }) },
    {
      label: t("daysComplete"),
      value: t("daysCompleteValue", {
        completionCount: String(completionCount),
        target: t("pluralDays", { count: goal.target }),
      }),
    },
    {
      label: t("daysRemaining"),
      value: t("pluralDays", { count: daysRemaining }),
    },
    { label: t("habitType"), value: habit?.frequency },
    {
      label: t("createdOn"),
      value: habit?.created_at
        ? formatIsoDate(habit.created_at.slice(0, 10))
        : t("na"),
    },
  ];

  return (
    <Table>
      <TableBody>
        {rows.map(({ label, value, bold }) => (
          <TableRow
            key={label}
            className={cn("flex justify-between", bold && "font-semibold")}
          >
            <TableCell>{label}</TableCell>
            <TableCell>{value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
