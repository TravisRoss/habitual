"use client";

import { useTranslations } from "next-intl";
import CircularProgress from "../progress/CircularProgress";
import { Quote } from "@/types";

type BannerProps = {
  habitsCount: number;
  completionsCount: number;
  quote?: Quote;
};

export default function Banner({
  habitsCount,
  completionsCount,
  quote,
}: BannerProps) {
  const t = useTranslations("banner");
  const tHabits = useTranslations("habits");

  const percentage =
    habitsCount === 0 ? 0 : Math.round((completionsCount / habitsCount) * 100);

  return (
    <div className="flex items-center bg-brand rounded-2xl p-6 gap-6">
      <CircularProgress
        className="shrink-0"
        value={percentage}
        fillColor="white"
        textColor="white"
      />
      <div className="text-white">
        {habitsCount === 0 ? (
          <p className="md:text-2xl text-sm font-bold">
            {tHabits("empty.noHabits")}
          </p>
        ) : completionsCount === 0 ? (
          <>
            <p className="md:text-2xl text-sm font-bold">{t("noCompletions")}</p>
            {quote && (
              <p className="md:text-lg text-xs">
                &ldquo;{quote.q}&rdquo; &mdash; {quote.a}
              </p>
            )}
          </>
        ) : (
          <>
            <p className="md:text-2xl text-sm font-bold">
              {t("progress", {
                completed: String(completionsCount),
                total: String(habitsCount),
              })}
            </p>
            <p className="md:text-lg text-xs">{t("completedToday")}</p>
          </>
        )}
      </div>
    </div>
  );
}
