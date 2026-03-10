import { auth } from "@/app/_lib/auth";
import AccountForm from "@/components/features/settings/AccountForm";
import SubPageLayout from "@/components/features/shared/SubPageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const t = await getTranslations("settings.accountPage");

  return (
    <SubPageLayout title={t("title")} label={t("back")}>
      <DashboardCard>
        <AccountForm
          defaultValues={{ name: user?.name || "", email: user?.email || "" }}
        />
      </DashboardCard>
    </SubPageLayout>
  );
}
