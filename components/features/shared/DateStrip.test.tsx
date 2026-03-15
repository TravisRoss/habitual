import { describe, it, expect, vi, afterEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  within,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(cleanup);
import { NextIntlClientProvider } from "next-intl";
import messages from "@/messages/en.json";
import { DateStrip } from "./DateStrip";

function renderDateStrip(selectedDate: string, onSelect = vi.fn()) {
  const result = render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <DateStrip selectedDate={selectedDate} onSelect={onSelect} />
    </NextIntlClientProvider>,
  );
  // AnimatePresence leaves ghost elements in jsdom (no real animation timing),
  // so scope all queries to the first rendered strip.
  const strip = result.container.querySelector(
    '[data-testid="date-strip"]',
  ) as HTMLElement;
  return { onSelect, strip };
}

describe("DateStrip", () => {
  const SELECTED = "2024-01-15";

  it("renders 7 day buttons centred on the selected date", () => {
    const { strip } = renderDateStrip(SELECTED);
    // Jan 12–18
    ["12", "13", "14", "15", "16", "17", "18"].forEach((day) => {
      expect(within(strip).getByText(day)).toBeInTheDocument();
    });
  });

  it("clicking a day calls onSelect with that date", () => {
    const { strip, onSelect } = renderDateStrip(SELECTED);
    fireEvent.click(within(strip).getByText("16"));
    expect(onSelect).toHaveBeenCalledWith("2024-01-16");
  });

  it("hides the back-to-today button when viewing today", () => {
    const today = new Date().toISOString().slice(0, 10);
    renderDateStrip(today);
    // BackToTodayButton uses tabIndex={-1} + invisible class when on today
    expect(screen.getByRole("button", { name: /today/i })).toHaveAttribute(
      "tabindex",
      "-1",
    );
  });

  it("shows the back-to-today button when not viewing today", () => {
    renderDateStrip(SELECTED);
    expect(screen.getByRole("button", { name: /today/i })).not.toHaveAttribute(
      "tabindex",
      "-1",
    );
  });
});
