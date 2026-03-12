"use client";

import { AppearanceDialog } from "./AppearanceDialog";
import { WeekStartsOnDialog } from "./WeekStartsOnDialog";
import { LanguageDialog } from "./LanguageDialog";
import SignOutDialog from "@/components/features/auth/SignOutDialog";

export default function SettingsDialogs({ currentLocale }: { currentLocale: string }) {
  return (
    <>
      <AppearanceDialog />
      <WeekStartsOnDialog />
      <LanguageDialog currentLocale={currentLocale} />
      <SignOutDialog isSetting={true} />
    </>
  );
}
