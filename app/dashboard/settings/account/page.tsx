import { auth } from "@/app/_lib/auth";
import AccountForm from "@/components/features/settings/AccountForm";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { getTranslations } from "next-intl/server";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  const t = await getTranslations("settings.accountPage");

  return (
    <PageLayout title={t("title")} back={t("back")}>
      <DashboardCard>
        <AccountForm
          defaultValues={{ name: user?.name || "", email: user?.email || "" }}
        />
      </DashboardCard>
    </PageLayout>
  );
}
