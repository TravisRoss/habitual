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

export const DAY_MS = 86_400_000;

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTH_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const PREVIEW_LIMIT = 3;
