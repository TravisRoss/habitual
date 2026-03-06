import { describe, expect, it } from "vitest";
import {
  calcPercentage,
  dateToDayNumber,
  dateToIsoStr,
  formatIsoDate,
  getWindowDates,
  getReportPeriodDates,
  calculateHabitCompletionRate,
  calculateOverallCompletionRate,
  getEffectiveStart,
  getMonthIndexesBetweenDates,
} from "./utils";
import { Habit, Completion } from "@/types";

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

describe("dateToIsoStr", () => {
  it("formats a date in YYYY-MM-DD format", () => {
    expect(dateToIsoStr(new Date("2026-02-24"))).toEqual("2026-02-24");
  });

  it("handles start of month", () => {
    expect(dateToIsoStr(new Date("2026-03-01"))).toEqual("2026-03-01");
  });

  it("handles end of year", () => {
    expect(dateToIsoStr(new Date("2026-12-31"))).toEqual("2026-12-31");
  });

  it("defaults to today when no date is provided", () => {
    expect(dateToIsoStr()).toEqual(new Date().toISOString().slice(0, 10));
  });
});

describe("calcPercentage", () => {
  it("returns 0 when total is 0", () => {
    expect(calcPercentage(0, 0)).toEqual(0);
  });

  it("returns 0 when value is 0", () => {
    expect(calcPercentage(0, 10)).toEqual(0);
  });

  it("rounds the result to the nearest integer", () => {
    expect(calcPercentage(1, 3)).toEqual(33);
  });

  it("returns 100 when value equals total", () => {
    expect(calcPercentage(8, 8)).toEqual(100);
  });

  it("caps at 100 when value exceeds total", () => {
    expect(calcPercentage(10, 8)).toEqual(100);
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

describe("getReportPeriodDates", () => {
  it("returns weekly period from Sunday to Saturday when period is 'weekly'", () => {
    const mockDate = new Date("2024-03-13T00:00:00Z"); // Wednesday
    const result = getReportPeriodDates("Weekly", mockDate);

    expect(dateToIsoStr(result.start)).toEqual("2024-03-10");
    expect(dateToIsoStr(result.end)).toEqual("2024-03-16");
  });

  it("returns monthly period from 1st to last day", () => {
    const mockDate = new Date("2024-03-15");
    const result = getReportPeriodDates("Monthly", mockDate);

    expect(dateToIsoStr(result.start)).toEqual("2024-03-01");
    expect(dateToIsoStr(result.end)).toEqual("2024-03-31");
  });

  it("handles February correctly in leap year", () => {
    const mockDate = new Date("2024-02-15"); // Leap year
    const result = getReportPeriodDates("Monthly", mockDate);

    expect(result.start.getDate()).toEqual(1);
    expect(result.end.getDate()).toEqual(29); // February has 29 days in leap year
  });

  it("returns yearly period from Jan 1st to Dec 31st", () => {
    const mockDate = new Date("2024-06-15");
    const result = getReportPeriodDates("Yearly", mockDate);

    expect(dateToIsoStr(result.start)).toEqual("2024-01-01");
    expect(dateToIsoStr(result.end)).toEqual("2024-12-31");
  });

  it("handles leap year correctly", () => {
    const mockDate = new Date("2024-02-15"); // Leap year

    const result = getReportPeriodDates("Yearly", mockDate);
    expect(result.start.getFullYear()).toEqual(2024);
    expect(result.end.getFullYear()).toEqual(2024);
  });
});

describe("calculateHabitCompletionRate", () => {
  const mockHabit: Habit = {
    id: "habit-1",
    user_id: "user-1",
    name: "Test Habit",
    frequency: "daily",
    description: null,
    color: null,
    weekly_target: null,
    target_days: [0, 1, 2, 3, 4, 5, 6],
  };

  it("calculates 100% for perfect daily habit completion", () => {
    const startDate = new Date("2024-03-10");
    const endDate = new Date("2024-03-12"); // 3 days
    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-10",
      },
      {
        id: "2",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-11",
      },
      {
        id: "3",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-12",
      },
    ];

    const result = calculateHabitCompletionRate(
      mockHabit,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(100);
  });

  it("calculates 0% for no completions", () => {
    const startDate = new Date("2024-03-10");
    const endDate = new Date("2024-03-12");
    const completions: Completion[] = [];

    const result = calculateHabitCompletionRate(
      mockHabit,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(0);
  });

  it("calculates correct percentage for partial completion", () => {
    const startDate = new Date("2024-03-10");
    const endDate = new Date("2024-03-12"); // 3 days
    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-10",
      },
      {
        id: "2",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-12",
      },
    ];

    const result = calculateHabitCompletionRate(
      mockHabit,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(67); // 2/3 * 100 = 66.67, rounded to 67
  });

  it("handles custom frequency habits", () => {
    const customHabit: Habit = {
      ...mockHabit,
      frequency: "custom",
      target_days: [1, 3, 5, 6], // Monday, Wednesday, Friday, Saturday
    };

    const startDate = new Date("2024-03-11"); // Monday
    const endDate = new Date("2024-03-16"); // Saturday
    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-11",
      }, // Monday
      {
        id: "2",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-13",
      }, // Wednesday
    ];

    const result = calculateHabitCompletionRate(
      customHabit,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(50);
  });

  it("ignores completions outside date range", () => {
    const startDate = new Date("2024-03-10");
    const endDate = new Date("2024-03-12");
    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-09",
      }, // Before
      {
        id: "2",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-10",
      }, // In range
      {
        id: "3",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-13",
      }, // After
    ];

    const result = calculateHabitCompletionRate(
      mockHabit,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(33);
  });

  describe("when frequency is weekly", () => {
    it("returns 100 when frequency is 'weekly' and all days are completed", () => {
      const weeklyHabit: Habit = {
        ...mockHabit,
        frequency: "weekly",
      };

      const startDate = new Date("2024-03-04"); // Monday
      const endDate = new Date("2024-03-10"); // Sunday (1 week)
      const completions: Completion[] = [
        {
          id: "1",
          habit_id: "habit-1",
          user_id: "user-1",
          completed_on: "2024-03-05",
        }, // Monday
      ];

      const result = calculateHabitCompletionRate(
        weeklyHabit,
        completions,
        startDate,
        endDate,
      );
      expect(result).toEqual(100);
    });

    it("returns 0 when frequency is 'weekly' and no days are completed ", () => {
      const weeklyHabit: Habit = {
        ...mockHabit,
        frequency: "weekly",
      };

      const startDate = new Date("2024-03-04"); // Monday
      const endDate = new Date("2024-03-10"); // Sunday (1 week)
      const completions: Completion[] = [];

      const result = calculateHabitCompletionRate(
        weeklyHabit,
        completions,
        startDate,
        endDate,
      );
      expect(result).toEqual(0);
    });
  });
});

describe("getEffectiveStart", () => {
  const periodStart = new Date("2024-03-10");

  it("returns periodStart when createdAt is null", () => {
    expect(getEffectiveStart(periodStart, null)).toEqual(periodStart);
  });

  it("returns periodStart when createdAt is undefined", () => {
    expect(getEffectiveStart(periodStart, undefined)).toEqual(periodStart);
  });

  it("returns periodStart when createdAt is before the period", () => {
    expect(getEffectiveStart(periodStart, "2024-03-05")).toEqual(periodStart);
  });

  it("returns periodStart when createdAt equals periodStart", () => {
    expect(getEffectiveStart(periodStart, "2024-03-10")).toEqual(periodStart);
  });

  it("returns createdAt date when createdAt is after periodStart", () => {
    const result = getEffectiveStart(periodStart, "2024-03-12");
    expect(result).toEqual(new Date("2024-03-12"));
  });
});

describe("calculateOverallCompletionRate", () => {
  const startDate = new Date("2024-03-10"); // Sun
  const endDate = new Date("2024-03-12"); // Tue

  it("calculates average of multiple habits", () => {
    const habits: Habit[] = [
      {
        id: "habit-1",
        user_id: "user-1",
        name: "Habit 1",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
      },
      {
        id: "habit-2",
        user_id: "user-1",
        name: "Habit 2",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
      },
    ];

    const completions: Completion[] = [
      // Habit 1: 2/3 completions = 67%
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-10",
      },
      {
        id: "2",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-11",
      },
      // Habit 2: 1/3 completions = 33%
      {
        id: "3",
        habit_id: "habit-2",
        user_id: "user-1",
        completed_on: "2024-03-10",
      },
    ];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(50); // (67 + 33) / 2 = 50
  });

  it("returns 0 when no habits", () => {
    const habits: Habit[] = [];
    const completions: Completion[] = [];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(0);
  });

  it("filters habits created after period end", () => {
    const habits: Habit[] = [
      {
        id: "habit-1",
        user_id: "user-1",
        name: "Old Habit",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
        created_at: "2024-03-05", // Created before period, counts
      },
      {
        id: "habit-2",
        user_id: "user-1",
        name: "New Habit",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
        created_at: "2024-03-15", // Created after period, does not count
      },
    ];

    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-10",
      },
      {
        id: "2",
        habit_id: "habit-2",
        user_id: "user-1",
        completed_on: "2024-03-11",
      },
    ];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(33); // Only habit-1 counted: 1/3 * 100 = 33
  });

  it("includes habits created during the period", () => {
    const habits: Habit[] = [
      {
        id: "habit-1",
        user_id: "user-1",
        name: "Period Habit",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
        created_at: "2024-03-11", // Created during period, counts
      },
    ];

    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-11",
      },
      {
        id: "2",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-12",
      },
    ];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    // effective start = Mar 11 (created_at), scheduled days = Mar 11–12 = 2, completions = 2 → 100%
    expect(result).toEqual(100);
  });

  it("handles habits without created_at for backward compatibility", () => {
    const habits: Habit[] = [
      {
        id: "habit-1",
        user_id: "user-1",
        name: "Legacy Habit",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
        // No created_at field
      },
    ];

    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-10",
      },
    ];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(33); // 1/3 * 100 = 33.33, rounded to 33
  });

  it("returns 0 when no relevant habits", () => {
    const habits: Habit[] = [
      {
        id: "habit-1",
        user_id: "user-1",
        name: "Future Habit",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
        created_at: "2024-03-15", // Created after period
      },
    ];

    const completions: Completion[] = [];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(0);
  });

  it("uses created_at as effective start for habits created mid-period", () => {
    // Period: Mar 10 (Sun) – Mar 12 (Tue), habit created Mar 12 (Tue)
    // Scheduled days should be 1 (only Mar 12), not 3 (the full period)
    const habits: Habit[] = [
      {
        id: "habit-1",
        user_id: "user-1",
        name: "Mid-Period Habit",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
        created_at: "2024-03-12",
      },
    ];

    const completions: Completion[] = [
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-12",
      },
    ];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(100); // 1/1 = 100%, not 1/3 = 33% (old bug)
  });

  it("handles mixed habit frequencies correctly", () => {
    const habits: Habit[] = [
      {
        id: "habit-1",
        user_id: "user-1",
        name: "Daily Habit",
        frequency: "daily",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [0, 1, 2, 3, 4, 5, 6],
      },
      {
        id: "habit-2",
        user_id: "user-1",
        name: "Custom Habit",
        frequency: "custom",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [1, 3, 5], // Mon, Wed, Fri
      },
      {
        id: "habit-3",
        user_id: "user-1",
        name: "Weekly Habit",
        frequency: "weekly",
        description: null,
        color: null,
        weekly_target: null,
        target_days: [2], // Tue, within range
      },
    ];

    const completions: Completion[] = [
      // Daily habit: 2/3 = 67%
      {
        id: "1",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-10",
      }, // Sun
      {
        id: "2",
        habit_id: "habit-1",
        user_id: "user-1",
        completed_on: "2024-03-11",
      }, // Mon
      // Custom habit: 1/1 = 100% (only Mon in range — Wed Mar 13 is outside)
      {
        id: "3",
        habit_id: "habit-2",
        user_id: "user-1",
        completed_on: "2024-03-11",
      }, // Mon
      // Weekly habit: 1/1 = 100% (Tue Mar 12 is in range)
      {
        id: "4",
        habit_id: "habit-3",
        user_id: "user-1",
        completed_on: "2024-03-12",
      }, // Tue
    ];

    const result = calculateOverallCompletionRate(
      habits,
      completions,
      startDate,
      endDate,
    );
    expect(result).toEqual(89); // (67 + 100 + 100) / 3 = 89
  });
});

describe("getMonthIndexesBetweenDates", () => {
  it("returns single month index when startDate and endDate are same month", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2020-03-01"),
      new Date("2020-03-15"),
    );
    expect(result).toEqual([2]);
  });

  it("returns two months if startDate and endDate only one month apart", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2020-04-15"),
      new Date("2020-05-28"),
    );
    expect(result).toEqual([3, 4]);
  });

  it("returns month indexes between months (inclusive) when startDate and endDate are months apart", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2020-04-05"),
      new Date("2020-12-12"),
    );
    expect(result).toEqual([3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("returns single month index when startDate and endDate are the same day", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2021-07-10"),
      new Date("2021-07-10"),
    );
    expect(result).toEqual([6]);
  });

  it("includes months when dates span across a year boundary", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2020-11-15"),
      new Date("2021-02-10"),
    );
    expect(result).toEqual([10, 11, 0, 1]);
  });

  it("returns all month indexes when dates span an entire year", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2020-01-01"),
      new Date("2020-12-31"),
    );
    expect(result).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  it("returns correct months when startDate is end of month and endDate is start of next month", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2022-06-30"),
      new Date("2022-07-01"),
    );
    expect(result).toEqual([5, 6]);
  });

  it("handles multiple year span correctly", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2019-10-10"),
      new Date("2021-03-05"),
    );
    expect(result).toEqual([
      9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2,
    ]);
  });

  it("returns empty array if startDate is after endDate", () => {
    const result = getMonthIndexesBetweenDates(
      new Date("2021-05-01"),
      new Date("2021-03-01"),
    );
    expect(result).toEqual([]);
  });
});

describe("formatIsoDate", () => {
  describe("with explicit locale", () => {
    it("formats date in en-GB", () => {
      expect(formatIsoDate("2024-03-15", "en-GB")).toEqual("15 Mar 2024");
    });

    it("formats date in en-US", () => {
      expect(formatIsoDate("2024-03-15", "en-US")).toEqual("Mar 15, 2024");
    });

    it("handles start of year", () => {
      expect(formatIsoDate("2020-01-01", "en-GB")).toEqual("1 Jan 2020");
    });

    it("handles end of year", () => {
      expect(formatIsoDate("2023-12-31", "en-GB")).toEqual("31 Dec 2023");
    });
  });

  describe("edge cases", () => {
    it("handles leap year date", () => {
      expect(formatIsoDate("2024-02-29", "en-GB")).toEqual("29 Feb 2024");
    });

    it("returns 'Invalid Date' for invalid input", () => {
      const result = formatIsoDate("invalid-date", "en-GB");

      expect(result).toEqual("Invalid Date");
    });
  });
});
