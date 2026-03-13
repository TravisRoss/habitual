import { Habit, Completion, Period, ReportPeriod } from "@/types";
import { DAY_MS, MONTH_INDEXES } from "./constants";

/** Converts a date string (e.g. "2026-02-24") to a day number (0 = Sunday, 6 = Saturday) */
export function dateToDayNumber(date: string): number {
  const d = new Date(date);
  return d.getDay();
}

/** Returns a date as a string in YYYY-MM-DD format (e.g. "2026-02-24"). By default it returns today's date */
export function dateToIsoStr(date: Date = new Date()): string {
  return date.toISOString().slice(0, 10);
}

/** Formats an ISO date string (e.g. "2026-03-06") as a localised date (e.g. "6 Mar 2026").
 *  Appends T00:00:00 to parse as local midnight and avoid UTC-offset date shifts. */
export function formatIsoDate(iso: string, locale?: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/** Calculates the end date based on the start date and the period (in days) */
export function calcEndDate(start_date: string, period: Period): string {
  const start = new Date(start_date);
  const end = start.getTime() + parseInt(period) * 24 * 60 * 60 * 1000; // period is in days, convert to milliseconds
  return dateToIsoStr(new Date(end));
}

/** Calculates the percentage of a value relative to a total, capped at 100% */
export function calcPercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round(Math.min((value / total) * 100, 100));
}

/** Returns an array of 7 dates centered on the given date */
export function getWindowDates(centerDate: string): string[] {
  const centerMs = new Date(centerDate).getTime();
  return Array.from({ length: 7 }, (_, i) =>
    new Date(centerMs + (i - 3) * DAY_MS).toISOString().slice(0, 10),
  );
}

/** Returns the indexes of the months between two dates */
export function getMonthIndexesBetweenDates(
  startDate: Date,
  endDate: Date,
): number[] {
  const startMonthIndex = startDate.getMonth();
  const endMonthIndex = endDate.getMonth();
  const yearDifference = endDate.getFullYear() - startDate.getFullYear();

  if (yearDifference === 0) {
    return MONTH_INDEXES.slice(startMonthIndex, endMonthIndex + 1);
  }

  const monthsFromStartYear = MONTH_INDEXES.slice(startMonthIndex);
  const monthsFromEndYear = MONTH_INDEXES.slice(0, endMonthIndex + 1);

  const numberOfFullYearsBetween = yearDifference - 1;

  const monthsFromFullYears = Array.from(
    { length: numberOfFullYearsBetween },
    () => MONTH_INDEXES,
  ).flat();

  return [...monthsFromStartYear, ...monthsFromFullYears, ...monthsFromEndYear];
}

/**
 * Returns a start and end date pair for the specified report period
 * @param {ReportPeriod} period - The period type (Weekly, Monthly, Yearly)
 * @returns {{ start: Date, end: Date }} An object containing the start and end dates.
 */
export function getReportPeriodDates(
  period: ReportPeriod,
  now: Date = new Date(),
): {
  start: Date;
  end: Date;
} {
  const start = new Date(now);
  const end = new Date(now);

  switch (period) {
    case "Weekly": {
      const dayOfWeek = now.getDay();

      start.setDate(now.getDate() - dayOfWeek);
      start.setHours(0, 0, 0, 0);

      end.setDate(start.getDate() + 6);
      end.setHours(23, 59, 59, 999);
      break;
    }

    case "Monthly": {
      start.setDate(1);
      start.setHours(0, 0, 0, 0);

      end.setMonth(now.getMonth() + 1, 0);
      end.setHours(23, 59, 59, 999);
      break;
    }

    case "Yearly": {
      start.setMonth(0, 1);
      start.setHours(0, 0, 0, 0);

      end.setMonth(11, 31);
      end.setHours(23, 59, 59, 999);
      break;
    }
  }

  return { start, end };
}

/**
 * Calculates the completion rate of a single habit within a date range.
 * For weekly habits, uses number of whole weeks as the denominator.
 * For daily/custom habits, counts scheduled days in the range.
 * Returns a 0–100 integer.
 */
export function calculateHabitCompletionRate(
  habit: Habit,
  completions: Completion[],
  startDate: Date,
  endDate: Date,
): number {
  const completedCount = completions.filter(({ completed_on }) => {
    const date = new Date(completed_on);
    return date >= startDate && date <= endDate;
  }).length;

  let scheduledDays = 0;
  const current = new Date(startDate);

  while (current <= endDate) {
    const isScheduled =
      habit.frequency === "daily" ||
      habit.target_days?.includes(current.getDay());

    if (isScheduled) scheduledDays++;
    current.setDate(current.getDate() + 1);
  }

  if (scheduledDays === 0) return 0;
  return calcPercentage(completedCount, scheduledDays);
}

/**
 * Returns the later of periodStart and the habit's creation date.
 * Prevents counting scheduled days before the habit existed.
 */
export function getEffectiveStart(
  periodStart: Date,
  createdAt?: string | null,
): Date {
  if (createdAt && new Date(createdAt) > periodStart)
    return new Date(createdAt);
  return periodStart;
}

/**
 * Calculates the overall completion rate across all habits for a date range.
 * Habits created after endDate are excluded. For habits created mid-period,
 * scheduled days are counted from their creation date, not the period start.
 * Returns the average per-habit rate as a 0–100 integer.
 */
export function calculateOverallCompletionRate(
  habits: Habit[],
  allCompletions: Completion[],
  startDate: Date,
  endDate: Date,
): number {
  const relevantHabits = habits.filter((habit) => {
    if (!habit.created_at) return true;
    const habitCreatedDate = new Date(habit.created_at);
    return habitCreatedDate <= endDate;
  });

  if (relevantHabits.length === 0) return 0;

  const completionRates = relevantHabits.map((habit) => {
    const habitCompletions = allCompletions.filter(
      (completion) => completion.habit_id === habit.id,
    );
    const effectiveStart = getEffectiveStart(startDate, habit.created_at);
    return calculateHabitCompletionRate(
      habit,
      habitCompletions,
      effectiveStart,
      endDate,
    );
  });

  const totalRate = completionRates.reduce((sum, rate) => sum + rate, 0);
  return Math.round(totalRate / relevantHabits.length);
}

export const pluralDays = (n: number) => `${n} Day${n !== 1 ? "s" : ""}`;
