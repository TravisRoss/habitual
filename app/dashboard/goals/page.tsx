import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import GoalsList from "@/components/features/goals/GoalsList";
import SubPageLayout from "@/components/features/shared/SubPageLayout";
import { getTranslations } from "next-intl/server";

export default async function page() {
  const t = await getTranslations("goals");

  return (
    <SubPageLayout title={t("title")}>
      <GoalsList />
      <CreateGoalButton />
    </SubPageLayout>
  );
}
