import { describe, expect, it } from "vitest";
import { calcPercentage, dateToDayNumber, formatDate, getWindowDates } from "./utils";

describe("dateToDayNumber", () => {
  it("returns 0 for Sunday", () => {
    expect(dateToDayNumber("2026-02-22")).toEqual(0);
  });

  it("returns 1 for Monday", () => {
    expect(dateToDayNumber("2026-02-23")).toEqual(1);
  });

  it("returns 2 for Tuesday", () => {
    expect(dateToDayNumber("2026-02-24")).toEqual(2);
  });

  it("returns 3 for Wednesday", () => {
    expect(dateToDayNumber("2026-02-25")).toEqual(3);
  });

  it("returns 4 for Thursday", () => {
    expect(dateToDayNumber("2026-02-26")).toEqual(4);
  });

  it("returns 5 for Friday", () => {
    expect(dateToDayNumber("2026-02-27")).toEqual(5);
  });

  it("returns 6 for Saturday", () => {
    expect(dateToDayNumber("2026-02-28")).toEqual(6);
  });
});

describe("formatDate", () => {
  it("formats a date in YYYY-MM-DD format", () => {
    expect(formatDate(new Date("2026-02-24"))).toEqual("2026-02-24");
  });

  it("handles start of month", () => {
    expect(formatDate(new Date("2026-03-01"))).toEqual("2026-03-01");
  });

  it("handles end of year", () => {
    expect(formatDate(new Date("2026-12-31"))).toEqual("2026-12-31");
  });

  it("defaults to today when no date is provided", () => {
    expect(formatDate()).toEqual(new Date().toISOString().slice(0, 10));
  });
});

describe("calcPercentage", () => {
  it("returns 0 when total is 0", () => {
    expect(calcPercentage(0, 0)).toBe(0);
  });

  it("returns 0 when value is 0", () => {
    expect(calcPercentage(0, 10)).toBe(0);
  });

  it("calculates a standard percentage", () => {
    expect(calcPercentage(3, 8)).toBeCloseTo(37.5);
  });

  it("returns 100 when value equals total", () => {
    expect(calcPercentage(8, 8)).toBe(100);
  });

  it("caps at 100 when value exceeds total", () => {
    expect(calcPercentage(10, 8)).toBe(100);
  });

  it("handles decimal values", () => {
    expect(calcPercentage(1, 3)).toBeCloseTo(33.33);
  });

  it("rounds the result to the nearest integer", () => {
    expect(calcPercentage(1, 3)).toBe(33);
  });
});

describe("getWindowDates", () => {
  it("returns exactly 7 dates", () => {
    const result = getWindowDates("2024-05-10");
    expect(result.length).toEqual(7);
  });

  it("places the center date in the middle of the array", () => {
    const result = getWindowDates("2024-05-10");
    expect(result[3]).toEqual("2024-05-10");
  });

  it("returns the correct 3 days before and after", () => {
    const result = getWindowDates("2024-05-10");
    expect(result).toEqual([
      "2024-05-07",
      "2024-05-08",
      "2024-05-09",
      "2024-05-10",
      "2024-05-11",
      "2024-05-12",
      "2024-05-13",
    ]);
  });

  it("handles month boundaries", () => {
    const result = getWindowDates("2024-03-01");
    expect(result).toEqual([
      "2024-02-27",
      "2024-02-28",
      "2024-02-29", // leap year
      "2024-03-01",
      "2024-03-02",
      "2024-03-03",
      "2024-03-04",
    ]);
  });

  it("handles year boundaries", () => {
    const result = getWindowDates("2025-01-01");
    expect(result).toEqual([
      "2024-12-29",
      "2024-12-30",
      "2024-12-31",
      "2025-01-01",
      "2025-01-02",
      "2025-01-03",
      "2025-01-04",
    ]);
  });
});
