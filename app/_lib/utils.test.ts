import { describe, expect, it } from "vitest";
import { dateToDayNumber } from "./utils";

describe("dateToDayNumber", () => {
  it("returns 0 for Sunday", () => {
    expect(dateToDayNumber("2026-02-22")).toBe(0);
  });

  it("returns 1 for Monday", () => {
    expect(dateToDayNumber("2026-02-23")).toBe(1);
  });

  it("returns 2 for Tuesday", () => {
    expect(dateToDayNumber("2026-02-24")).toBe(2);
  });

  it("returns 3 for Wednesday", () => {
    expect(dateToDayNumber("2026-02-25")).toBe(3);
  });

  it("returns 4 for Thursday", () => {
    expect(dateToDayNumber("2026-02-26")).toBe(4);
  });

  it("returns 5 for Friday", () => {
    expect(dateToDayNumber("2026-02-27")).toBe(5);
  });

  it("returns 6 for Saturday", () => {
    expect(dateToDayNumber("2026-02-28")).toBe(6);
  });
});
