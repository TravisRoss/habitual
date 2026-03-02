"use client";

import CircularProgress from "../progress/CircularProgress";

type BannerProps = {
  habitsCount: number;
  completionsCount: number;
};

export default function Banner({ habitsCount, completionsCount }: BannerProps) {
  const percentage =
    habitsCount === 0 ? 0 : Math.round((completionsCount / habitsCount) * 100);

  return (
    <div className="bg-brand rounded-2xl p-6 flex items-center gap-6">
      <CircularProgress value={percentage} />
      <div className="text-white">
        {completionsCount === 0 ? (
          <>
            <p className="text-2xl font-bold">No habits completed yet!</p>
            <p className="text-lg">Let's get started 💪</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">
              {completionsCount} of {habitsCount} habits
            </p>
            <p className="text-lg">completed today!</p>
          </>
        )}
      </div>
    </div>
  );
}
