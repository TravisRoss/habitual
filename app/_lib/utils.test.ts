import { describe, expect, it } from "vitest";
import { dateToDayNumber, formatDate } from "./utils";

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
