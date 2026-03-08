import { auth } from "@/app/_lib/auth";
import { settingsNavLinks } from "@/app/_config/nav";
import DashboardCard from "@/components/features/shared/DashboardCard";
import SubPageLayout from "@/components/features/shared/SubPageLayout";
import { AppearanceDialog } from "@/components/features/settings/AppearanceDialog";
import { WeekStartsOnDialog } from "@/components/features/settings/WeekStartsOnDialog";
import { itemCls } from "@/components/features/settings/SettingItem";
import { getProfileById } from "@/lib/data-service";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { version } from "@/package.json";

export default async function Page() {
  const session = await auth();
  const profile = session?.user?.id
    ? await getProfileById(session.user.id)
    : null;
  const weekStartsOn = (profile?.week_starts_on ?? 0) as 0 | 1;

  return (
    <SubPageLayout title="Settings">
      <div className="space-y-4">
        <DashboardCard>
          <div className="space-y-4">
            {settingsNavLinks.map(({ label, href, icon: Icon }) => (
              <Link key={href} href={href} className={itemCls}>
                <Icon className="size-5 shrink-0" />
                <span className="flex-1">{label}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </DashboardCard>

        <DashboardCard>
          <div className="space-y-4">
            <AppearanceDialog />
            <WeekStartsOnDialog defaultValue={weekStartsOn} />
          </div>
        </DashboardCard>

        <p className="px-1 text-xs text-muted-foreground">v{version}</p>
      </div>
    </SubPageLayout>
  );
}
