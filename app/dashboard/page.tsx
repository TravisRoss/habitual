import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { auth } from "../_lib/auth";
import {
  getCompletionsByUserIdAndDate,
  getGoalsByUserId,
  getHabitsByUserIdAndDate,
  getActiveStreaksByUserId,
} from "@/lib/data-service";
import { HABITS_KEY } from "@/hooks/useHabits";
import { GOALS_KEY } from "@/hooks/useGoals";
import { STREAKS_KEY } from "@/hooks/useStreaks";
import { COMPLETIONS_KEY } from "@/hooks/useCompletions";
import HabitsList from "@/components/features/habits/HabitsList";
import { Banner } from "@/components/features/shared/Banner";
import { dateToIsoStr } from "../_lib/utils";
import GoalsList from "@/components/features/goals/GoalsList";
import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import SeeAllButton from "@/components/features/shared/SeeAllButton";
import PageLayout from "@/components/features/shared/PageLayout";
import DashboardCard from "@/components/features/shared/DashboardCard";
import { PREVIEW_LIMIT } from "../_lib/constants";
import { getTranslations } from "next-intl/server";

export const metadata = {
  title: "Dashboard",
};

async function prefetchDashboardData(
  queryClient: QueryClient,
  userId: string,
  today: string,
): Promise<{ habitCount: number; goalCount: number }> {
  const [habits, completions, goals, streaks] = await Promise.all([
    getHabitsByUserIdAndDate(userId, today),
    getCompletionsByUserIdAndDate(userId, today),
    getGoalsByUserId(userId),
    getActiveStreaksByUserId(userId),
  ]);

  queryClient.setQueryData([...HABITS_KEY, today], habits ?? []);
  queryClient.setQueryData([...COMPLETIONS_KEY, today], completions ?? []);
  queryClient.setQueryData(GOALS_KEY, goals ?? []);
  queryClient.setQueryData(STREAKS_KEY, streaks ?? []);

  return {
    habitCount: habits?.length ?? 0,
    goalCount: goals?.length ?? 0,
  };
}

export default async function Dashboard() {
  const t = await getTranslations("dashboard");
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) redirect("/login");

  const today = dateToIsoStr();
  const queryClient = new QueryClient();

  const { habitCount, goalCount } = await prefetchDashboardData(
    queryClient,
    userId,
    today,
  );

  const userName = session.user?.name ?? "";

  return (
    <PageLayout title={t("greeting", { name: userName })}>
      <Banner />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardCard
          title={t("todaysHabits")}
          action={
            habitCount > PREVIEW_LIMIT ? (
              <SeeAllButton href="/dashboard/habits" />
            ) : undefined
          }
        >
          <HabitsList date={today} isPreview />
        </DashboardCard>

        <DashboardCard
          title={t("yourGoals")}
          action={
            goalCount > PREVIEW_LIMIT ? (
              <SeeAllButton href="/dashboard/goals" />
            ) : undefined
          }
        >
          <GoalsList isPreview />
        </DashboardCard>
      </HydrationBoundary>

      <CreateGoalButton />
    </PageLayout>
  );
}
