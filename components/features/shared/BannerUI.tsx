"use client";

import { useTranslations } from "next-intl";
import CircularProgress from "../progress/CircularProgress";

type BannerProps = {
  habitsCount: number;
  completionsCount: number;
};

export default function Banner({ habitsCount, completionsCount }: BannerProps) {
  const t = useTranslations("banner");

  const percentage =
    habitsCount === 0 ? 0 : Math.round((completionsCount / habitsCount) * 100);

  return (
    <div className="bg-brand rounded-2xl p-6 flex items-center gap-6">
      <CircularProgress
        value={percentage}
        fillColor="white"
        textColor="white"
      />
      <div className="text-white">
        {completionsCount === 0 ? (
          <>
            <p className="md:text-2xl text-sm font-bold">
              {t("noCompletions")}
            </p>
            <p className="md:text-lg text-xs">{t("letsGetStarted")}</p>
          </>
        ) : (
          <>
            <p className="text-2xl font-bold">
              {t("progress", {
                completed: String(completionsCount),
                total: String(habitsCount),
              })}
            </p>
            <p className="text-lg">{t("completedToday")}</p>
          </>
        )}
      </div>
    </div>
  );
}
