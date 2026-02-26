import { Period } from "@/types";

export const inputClass =
  "bg-white border-border focus-visible:ring-brand focus-visible:border-brand text-foreground aria-invalid:border-red-400";

export const COLORS = [
  "#F59E0B",
  "#3B82F6",
  "#10B981",
  "#8B5CF6",
  "#F43F5E",
  "#64748B",
] as const;

export const DAYS = [
  [0, "Sun"],
  [1, "Mon"],
  [2, "Tue"],
  [3, "Wed"],
  [4, "Thu"],
  [5, "Fri"],
  [6, "Sat"],
] as const;

export const PERIODS = [
  { label: "1 week", days: 7 },
  { label: "2 weeks", days: 14 },
  { label: "1 month", days: 30 },
  { label: "3 months", days: 90 },
  { label: "6 months", days: 180 },
  { label: "1 year", days: 365 },
] as const satisfies Period[];
