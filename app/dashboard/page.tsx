import EmptyMessage from "@/components/features/EmptyMessage";
import { auth } from "../_lib/auth";
import { getHabitsByUserId } from "@/lib/data-service";
import HabitsList from "@/components/features/HabitsList";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  // the middleware will redirect to login if not authenticated, but we throw here just in case to satisfy the type checker that userId is always a string below
  if (!userId) throw new Error("Unauthorized");

  const habits = (await getHabitsByUserId(userId)) ?? [];

  return (
    <>
      <p className="flex justify-left text-2xl font-bold mb-4">
        Hello, {session?.user?.name ?? "Guest"}!
      </p>
      <p className="flex justify-left text-1xl font-bold mb-4">Todays Habits</p>
      {habits.length > 0 ? <HabitsList habits={habits} /> : <EmptyMessage />}
    </>
  );
}
