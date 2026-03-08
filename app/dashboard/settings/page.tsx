import { settingsNavLinks } from "@/app/_config/nav";
import DashboardCard from "@/components/features/shared/DashboardCard";
import SubPageLayout from "@/components/features/shared/SubPageLayout";
import { AppearanceDialog } from "@/components/features/settings/AppearanceDialog";
import { itemCls } from "@/components/features/settings/SettingItem";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <SubPageLayout title="Settings">
      <DashboardCard>
        <div className="space-y-4">
          {settingsNavLinks.map(({ label, href, icon: Icon }) => (
            <Link key={href} href={href} className={itemCls}>
              <Icon className="size-5 shrink-0" />
              <span className="flex-1">{label}</span>
              <ChevronRight className="size-4 text-muted-foreground" />
            </Link>
          ))}
          <AppearanceDialog />
        </div>
      </DashboardCard>
    </SubPageLayout>
  );
}
