"use client";

import CircularProgress from "./CircularProgress";

interface BannerProps {
  completed: number;
  total: number;
}

export default function Banner({ completed, total }: BannerProps) {
  const percentage = Math.round((completed / total) * 100);

  return (
    <div className="bg-brand rounded-2xl p-6 flex items-center gap-6">
      <CircularProgress value={percentage} />
      <div className="text-white">
        <p className="text-2xl font-bold">
          {completed} of {total} habits
        </p>
        <p className="text-lg">completed today!</p>
      </div>
    </div>
  );
}
