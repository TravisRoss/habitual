import { settingsNavLinks } from "@/app/_config/nav";
import DashboardCard from "@/components/features/shared/DashboardCard";
import SubPageLayout from "@/components/features/shared/SubPageLayout";
import { AppearanceDialog } from "@/components/features/settings/AppearanceDialog";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Page() {
  return (
    <SubPageLayout title="Settings">
      <DashboardCard>
        <div className="space-y-4">
          {settingsNavLinks.map(({ label, href }) =>
            href ? (
              <Link
                key={href}
                href={href}
                className="flex items-center justify-between rounded-md bg-muted/50 p-4 text-sm transition-colors hover:bg-accent hover:text-brand active:opacity-90"
              >
                {label}
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            ) : (
              <AppearanceDialog key={label} />
            ),
          )}
        </div>
      </DashboardCard>
    </SubPageLayout>
  );
}
