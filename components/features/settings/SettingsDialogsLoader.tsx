"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";

const SettingsDialogs = dynamic(() => import("./SettingsDialogs"), {
  ssr: false,
  loading: () => (
    <div className="space-y-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className="h-14 w-full rounded-md" />
      ))}
    </div>
  ),
});

export function SettingsDialogsLoader({ currentLocale }: { currentLocale: string }) {
  return <SettingsDialogs currentLocale={currentLocale} />;
}
