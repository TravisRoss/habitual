/** Converts a date string (e.g. "2026-02-24") to a day number (0 = Sunday, 6 = Saturday) */
export function dateToDayNumber(date: string): number {
  const d = new Date(date);
  return d.getDay();
}

/** Returns today's date as a string in YYYY-MM-DD format (e.g. "2026-02-24") */
export function getToday(): string {
  return new Date().toISOString().slice(0, 10);
}
