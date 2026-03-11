import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import GoalsList from "@/components/features/goals/GoalsList";
import PageLayout from "@/components/features/shared/PageLayout";
import { getTranslations } from "next-intl/server";

export default async function page() {
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
