import { auth } from "@/app/_lib/auth";
import AccountForm from "@/components/features/settings/AccountForm";
import SubPageLayout from "@/components/features/shared/SubPageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <SubPageLayout title="Account" label="Back to Settings">
      <DashboardCard>
        <AccountForm
          defaultValues={{ name: user?.name || "", email: user?.email || "" }}
        />
      </DashboardCard>
    </SubPageLayout>
  );
}
