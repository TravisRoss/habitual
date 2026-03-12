import { getTranslations } from "next-intl/server";
import GoalsList from "@/components/features/goals/GoalsList";
import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import PageLayout from "@/components/features/shared/PageLayout";

export default async function Page() {
  const [t, tCommon] = await Promise.all([
    getTranslations("goals"),
    getTranslations("common"),
  ]);

  return (
    <PageLayout title={t("title")} back={tCommon("backToDashboard")}>
      <GoalsList />
      <CreateGoalButton />
    </PageLayout>
  );
}
