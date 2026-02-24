import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { auth } from "../_lib/auth";
import { getHabitsByUserIdAndDate } from "@/lib/data-service";
import { HABITS_KEY } from "@/hooks/useHabits";
import HabitsList from "@/components/features/HabitsList";
import { CreateHabitButton } from "@/components/features/CreateHabitButton";
import Banner from "@/components/features/Banner";
import { getToday } from "../_lib/utils";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;
  const today = getToday();

  if (!userId) throw new Error("Unauthorized");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [...HABITS_KEY, today],
    queryFn: () => getHabitsByUserIdAndDate(userId, today) ?? [],
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <p className="text-2xl font-bold mb-1">
        Hello, {session?.user?.name ?? "Guest"}!
      </p>
      <Banner completed={3} total={5} />
      <p className="text-lg font-semibold mb-4 mt-4">Today's Habits</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HabitsList />
      </HydrationBoundary>
      <CreateHabitButton />
    </div>
  );
}
