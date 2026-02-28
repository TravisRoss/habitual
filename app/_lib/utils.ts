import { Period } from "@/types";

/** Converts a date string (e.g. "2026-02-24") to a day number (0 = Sunday, 6 = Saturday) */
export function dateToDayNumber(date: string): number {
  const d = new Date(date);
  return d.getDay();
}

/** Returns a date as a string in YYYY-MM-DD format (e.g. "2026-02-24"). By default it returns today's date */
export function formatDate(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Calculates the end date based on the start date and the period (in days) */
export function calcEndDate(start_date: string, period: Period): string {
  const start = new Date(start_date);
  const end = start.getTime() + parseInt(period) * 24 * 60 * 60 * 1000; // period is in days, convert to milliseconds
  return formatDate(new Date(end));
}

/** Calculates the percentage of a value relative to a total, capped at 100% */
export function calcPercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.min((value / total) * 100, 100);
}
