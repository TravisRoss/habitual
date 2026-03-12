"use client";

import dynamic from "next/dynamic";
import { settingsNavLinks } from "@/app/_config/nav";
import DashboardCard from "@/components/features/shared/DashboardCard";
import PageLayout from "@/components/features/shared/PageLayout";
import { itemCls } from "@/components/features/settings/SettingItem";
import { Skeleton } from "@/components/ui/skeleton";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { version } from "@/package.json";
import { SETTINGS_LABEL_KEYS } from "@/app/_lib/constants";
import { useLocale, useTranslations } from "next-intl";

const SettingsDialogs = dynamic(
  () => import("@/components/features/settings/SettingsDialogs"),
  {
    ssr: false,
    loading: () => (
      <div className="space-y-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-14 w-full rounded-md" />
        ))}
      </div>
    ),
  },
);

export default function Page() {
  const locale = useLocale();
  const t = useTranslations("settings");
  const tCommon = useTranslations("common");

  return (
    <PageLayout title={t("title")} back={tCommon("backToDashboard")}>
      <div className="space-y-4">
        <DashboardCard>
          <div className="space-y-4">
            {settingsNavLinks.map(({ href, icon: Icon }) => (
              <Link key={href} href={href} className={itemCls}>
                <Icon className="size-5 shrink-0" />
                <span className="flex-1">{t(SETTINGS_LABEL_KEYS[href])}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="space-y-4">
            <SettingsDialogs currentLocale={locale} />
          </div>
        </DashboardCard>

        <p className="px-1 text-xs text-muted-foreground">
          {t("version", { version })}
        </p>
      </div>
    </PageLayout>
  );
}
