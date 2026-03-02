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
    <div className="max-w-lg mx-auto px-4 py-6">
      <p className="text-2xl font-bold mb-1">
        Hello, {session?.user?.name ?? "Guest"}!
      </p>
      <Banner />

      <HydrationBoundary state={dehydrate(queryClient)}>
        <div className="space-y-4 mt-4">
          <div className="bg-muted/50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-lg font-semibold mb-3">Today&apos;s Habits</p>
              <SeeAllButton href="/dashboard/habits" />
            </div>

            <HabitsList date={today} isPreview={true} />
          </div>

          <div className="bg-muted/50 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <p className="text-lg font-semibold mb-3">Your Goals</p>
              <SeeAllButton href="/dashboard/goals" />
            </div>
            <GoalsList isPreview={true} />
          </div>
        </div>
      </HydrationBoundary>
      <CreateGoalButton />
    </div>
  );
}
