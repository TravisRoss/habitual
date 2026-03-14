"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import { dateToIsoStr } from "../_lib/utils";
import SeeAllButton from "@/components/features/shared/SeeAllButton";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { useHabitsForDate } from "@/hooks/useHabits";
import { useGoals } from "@/hooks/useGoals";
import { Quote } from "@/types";

const Banner = dynamic(
  () =>
    import("@/components/features/shared/Banner").then((m) => ({
      default: m.Banner,
    })),
  { ssr: false },
);
const HabitsList = dynamic(
  () => import("@/components/features/habits/HabitsList"),
  {
    ssr: false,
  },
);
const GoalsList = dynamic(
  () => import("@/components/features/goals/GoalsList"),
  {
    ssr: false,
  },
);
const CreateGoalButton = dynamic(
  () =>
    import("@/components/features/goals/CreateGoalButton").then((m) => ({
      default: m.CreateGoalButton,
    })),
  { ssr: false },
);

interface DashboardProps {
  userName: string;
  quote?: Quote;
}

export function Dashboard({ userName, quote }: DashboardProps) {
  const t = useTranslations("dashboard");
  const today = dateToIsoStr();

  const { data: habits = [] } = useHabitsForDate(today);
  const { data: goals = [] } = useGoals();
  console.log(habits);

  return (
    <PageLayout title={t("greeting", { name: userName })}>
      <Banner quote={quote} />
      <DashboardCard
        title={t("todaysHabits")}
        action={habits.length > 0 && <SeeAllButton href="/dashboard/habits" />}
      >
        <HabitsList date={today} isPreview />
      </DashboardCard>
      <DashboardCard
        title={t("yourGoals")}
        action={goals.length > 0 && <SeeAllButton href="/dashboard/goals" />}
      >
        <GoalsList isPreview />
      </DashboardCard>
      <CreateGoalButton />
    </PageLayout>
  );
}
