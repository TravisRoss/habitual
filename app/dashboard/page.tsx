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
} from "@/lib/data-service";
import { HABITS_KEY } from "@/hooks/useHabits";
import { GOALS_KEY } from "@/hooks/useGoals";
import HabitsList from "@/components/features/HabitsList";
import { CreateHabitButton } from "@/components/features/CreateHabitButton";
import { Banner } from "@/components/features/Banner";
import { formatDate } from "../_lib/utils";
import GoalsList from "@/components/features/GoalsList";
import { COMPLETIONS_KEY } from "@/hooks/useCompletions";

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
  ]);

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <p className="text-2xl font-bold mb-1">
        Hello, {session?.user?.name ?? "Guest"}!
      </p>
      <Banner />
      <p className="text-lg font-semibold mb-4 mt-4">Today&apos;s Habits</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HabitsList date={today} />
        <GoalsList />
      </HydrationBoundary>
      <CreateHabitButton />
    </div>
  );
}
