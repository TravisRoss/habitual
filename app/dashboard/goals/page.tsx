"use client";

import dynamic from "next/dynamic";
import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import PageLayout from "@/components/features/shared/PageLayout";
import { useTranslations } from "next-intl";

const GoalsList = dynamic(
  () => import("@/components/features/goals/GoalsList"),
  { ssr: false },
);

export default function Page() {
  const t = useTranslations("goals");
  const tCommon = useTranslations("common");

  return (
    <PageLayout title={t("title")} back={tCommon("backToDashboard")}>
      <GoalsList />
      <CreateGoalButton />
    </PageLayout>
  );
}
