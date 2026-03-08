import { auth } from "@/app/_lib/auth";
import AccountForm from "@/components/features/settings/AccountForm";
import SubPageLayout from "@/components/features/shared/SubPageLayout";

export default async function Page() {
  const session = await auth();
  const user = session?.user;

  return (
    <SubPageLayout title="Account" label="Back to Settings">
      <AccountForm
        defaultValues={{ name: user?.name || "", email: user?.email || "" }}
      />
    </SubPageLayout>
  );
}
