import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { auth } from "../_lib/auth";
import {
  getCompletionsByUserIdAndDate,
  getHabitsByUserIdAndDate,
} from "@/lib/data-service";
import { HABITS_KEY } from "@/hooks/useHabits";
import HabitsList from "@/components/features/HabitsList";
import { CreateHabitButton } from "@/components/features/CreateHabitButton";
import Banner from "@/components/features/Banner";
import { formatDate } from "../_lib/utils";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;
  const today = formatDate();

  if (!userId) throw new Error("Unauthorized");

  const queryClient = new QueryClient();
  const todaysHabits = await queryClient.fetchQuery({
    queryKey: [...HABITS_KEY, today],
    queryFn: () => getHabitsByUserIdAndDate(userId, today) ?? [],
  });

  const completions = await queryClient.fetchQuery({
    queryKey: ["completions", today],
    queryFn: () => getCompletionsByUserIdAndDate(userId, today) ?? [],
  });

  return (
    <div className="max-w-lg mx-auto px-4 py-6">
      <p className="text-2xl font-bold mb-1">
        Hello, {session?.user?.name ?? "Guest"}!
      </p>
      <Banner />
      <p className="text-lg font-semibold mb-4 mt-4">Today's Habits</p>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <HabitsList
          habits={todaysHabits || []}
          completions={completions || []}
        />
      </HydrationBoundary>
      <CreateHabitButton />
    </div>
  );
}
