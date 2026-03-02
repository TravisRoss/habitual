import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
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
import HabitsList from "@/components/features/habits/HabitsList";
import { Banner } from "@/components/features/shared/Banner";
import { formatDate } from "../_lib/utils";
import GoalsList from "@/components/features/goals/GoalsList";
import { COMPLETIONS_KEY } from "@/hooks/useCompletions";
import { CreateGoalButton } from "@/components/features/goals/CreateGoalButton";
import SeeAllButton from "@/components/features/shared/SeeAllButton";
import DashboardLayout from "@/components/features/shared/DashboardLayout";
import DashboardSection from "@/components/features/shared/DashboardSection";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;
  const today = formatDate();

  if (!userId) throw new Error("Unauthorized");

  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [...HABITS_KEY, today],
      queryFn: () => getHabitsByUserIdAndDate(userId, today) ?? [],
    }),
    queryClient.prefetchQuery({
      queryKey: [...COMPLETIONS_KEY, today],
      queryFn: () => getCompletionsByUserIdAndDate(userId, today) ?? [],
    }),
    queryClient.prefetchQuery({
      queryKey: GOALS_KEY,
      queryFn: () => getGoalsByUserId(userId) ?? [],
    }),
    queryClient.prefetchQuery({
      queryKey: STREAKS_KEY,
      queryFn: () => getActiveStreaksByUserId(userId) ?? [],
    }),
  ]);

  return (
    <DashboardLayout title={`Hello, ${session?.user?.name ?? "Guest"}!`}>
      <Banner />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <DashboardSection 
          title="Today's Habits" 
          action={<SeeAllButton href="/dashboard/habits" />}
        >
          <HabitsList date={today} isPreview={true} />
        </DashboardSection>

        <DashboardSection 
          title="Your Goals" 
          action={<SeeAllButton href="/dashboard/goals" />}
        >
          <GoalsList isPreview={true} />
        </DashboardSection>
      </HydrationBoundary>
      <CreateGoalButton />
    </DashboardLayout>
  );
}
