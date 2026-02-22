import EmptyMessage from "@/components/features/EmptyMessage";
import { auth } from "../_lib/auth";
import { getHabitsByUserId } from "@/lib/data-service";
import HabitsList from "@/components/features/Habits";

export const metadata = {
  title: "Dashboard",
};

export default async function Dashboard() {
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("Unauthorized");

  const habits = (await getHabitsByUserId(userId)) ?? [];

  return (
    <>
      <p className="flex justify-center text-2xl font-bold mb-4">
        Hello, {session?.user?.name ?? "Guest"}!
      </p>
      {habits.length > 0 ? <HabitsList habits={habits} /> : <EmptyMessage />}
    </>
  );
}
