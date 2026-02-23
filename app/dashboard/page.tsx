import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { auth } from "../_lib/auth";
import { getHabitsByUserId } from "@/lib/data-service";
import { HABITS_KEY } from "@/hooks/useHabits";
import HabitsList from "@/components/features/HabitsList";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: HABITS_KEY,
    queryFn: () => getHabitsByUserId(userId),
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <p className="text-2xl font-bold mb-1">
        Hello, {session?.user?.name ?? "Guest"}!
      </p>
      <p className="text-lg font-semibold mb-4">Today's Habits</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HabitsList />
      </HydrationBoundary>
    </div>
  );
}
