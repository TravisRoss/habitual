"use client";

import { dateToIsoStr, getWindowDates, shiftDate } from "@/app/_lib/utils";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { DayButton } from "./DayButton";
import BackToTodayButton from "./BackToTodayButton";

type DateStripProps = {
  selectedDate: string;
  onSelect: (date: string) => void;
};

export function DateStrip({ selectedDate, onSelect }: DateStripProps) {
  const today = dateToIsoStr();
  const [direction, setDirection] = useState<1 | -1>(1); // 1 = forward, -1 = backward

  const handleSelect = (dateStr: string) => {
    setDirection(dateStr > selectedDate ? 1 : -1);
    onSelect(dateStr);
  };

  const dates = getWindowDates(selectedDate);
  const isViewingToday = selectedDate === today;

  return (
    <div className="space-y-2">
      <div data-testid="date-strip" className="relative overflow-hidden">
        <AnimatePresence mode="popLayout" initial={false} custom={direction}>
          <motion.div
            key={selectedDate}
            data-testid="date-strip-drag"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, { offset, velocity }) => {
              const swipe = Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500;
              if (!swipe) return;
              handleSelect(shiftDate(selectedDate, offset.x < 0 ? 7 : -7));
            }}
            custom={direction}
            variants={{
              enter: (dir: number) => ({ x: `${dir * 40}%`, opacity: 0 }),
              center: { x: 0, opacity: 1 },
              exit: (dir: number) => ({ x: `${dir * -40}%`, opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex gap-2 pb-1"
          >
            {dates.map((dateStr) => (
              <DayButton
                key={dateStr}
                dateStr={dateStr}
                isSelected={dateStr === selectedDate}
                isToday={dateStr === today}
                onClick={() => handleSelect(dateStr)}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="flex justify-center">
        <BackToTodayButton
          isViewingToday={isViewingToday}
          onClick={() => handleSelect(today)}
        />
      </div>
    </div>
  );
}
