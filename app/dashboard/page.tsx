"use client";

import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import { dateToIsoStr } from "../_lib/utils";
import SeeAllButton from "@/components/features/shared/SeeAllButton";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";

const Banner = dynamic(
  () => import("@/components/features/shared/Banner").then((m) => ({ default: m.Banner })),
  { ssr: false },
);
const HabitsList = dynamic(() => import("@/components/features/habits/HabitsList"), {
  ssr: false,
});
const GoalsList = dynamic(() => import("@/components/features/goals/GoalsList"), {
  ssr: false,
});
const CreateGoalButton = dynamic(
  () =>
    import("@/components/features/goals/CreateGoalButton").then((m) => ({
      default: m.CreateGoalButton,
    })),
  { ssr: false },
);

export default function Dashboard() {
  const { data: session } = useSession();
  const t = useTranslations("dashboard");
  const today = dateToIsoStr();
  const userName = session?.user?.name ?? "";

  return (
    <PageLayout title={t("greeting", { name: userName })}>
      <Banner />

      <DashboardCard
        title={t("todaysHabits")}
        action={<SeeAllButton href="/dashboard/habits" />}
      >
        <HabitsList date={today} isPreview />
      </DashboardCard>

      <DashboardCard
        title={t("yourGoals")}
        action={<SeeAllButton href="/dashboard/goals" />}
      >
        <GoalsList isPreview />
      </DashboardCard>

      <CreateGoalButton />
    </PageLayout>
  );
}
