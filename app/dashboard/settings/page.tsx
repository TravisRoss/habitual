import { getLocale, getTranslations } from "next-intl/server";
import { settingsNavLinks } from "@/app/_config/nav";
import DashboardCard from "@/components/features/shared/DashboardCard";
import PageLayout from "@/components/features/shared/PageLayout";
import { itemCls } from "@/components/features/settings/SettingItem";
import { SettingsDialogsLoader } from "@/components/features/settings/SettingsDialogsLoader";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { version } from "@/package.json";
import { SETTINGS_LABEL_KEYS } from "@/app/_lib/constants";

export default async function Page() {
  const [t, tCommon, locale] = await Promise.all([
    getTranslations("settings"),
    getTranslations("common"),
    getLocale(),
  ]);

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
            <SettingsDialogsLoader currentLocale={locale} />
          </div>
        </DashboardCard>

        <p className="px-1 text-xs text-muted-foreground">
          {t("version", { version })}
        </p>
      </div>
    </PageLayout>
  );
}
