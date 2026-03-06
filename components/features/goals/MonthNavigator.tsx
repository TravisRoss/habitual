import { MONTH_NAMES } from "@/app/_lib/constants";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

type MonthNavigatorProps = {
  months: string[];
};

export default function MonthNavigator({ months }: MonthNavigatorProps) {
  const [monthIndex, setMonthIndex] = useState(0);

  function incrementMonth() {
    if (monthIndex >= months.length - 1) {
      setMonthIndex(0);
    } else {
      setMonthIndex(monthIndex + 1);
    }
  }

  function decrementMonth() {
    if (monthIndex <= 0) {
      setMonthIndex(months.length - 1);
    } else {
      setMonthIndex(monthIndex - 1);
    }
  }

  if (months.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center justify-between select-none">
      {months.length > 1 && (
        <>
          <ChevronLeft
            onClick={() => decrementMonth()}
            className="cursor-pointer"
          />
          <p className="w-20 sm:w-28 text-center text-sm sm:text-base truncate">
            {MONTH_NAMES[monthIndex]}
          </p>
          <ChevronRight
            onClick={() => incrementMonth()}
            className="cursor-pointer"
          />
        </>
      )}
      {months.length === 1 && (
        <p className="w-20 sm:w-28 text-center text-sm sm:text-base truncate">
          {months[0]}
        </p>
      )}
    </div>
  );
}
