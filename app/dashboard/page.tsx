import EmptyMessage from "@/components/features/EmptyMessage";
import { auth } from "../_lib/auth";
import { getHabitsByUserId } from "@/lib/data-service";

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
      {habits.length > 0 ? (
        <ul className="space-y-4">
          {habits.map((habit) => (
            <li
              key={habit.id}
              className="p-4 bg-white rounded shadow flex items-center space-x-4"
            >
              <div
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: habit.color ?? "#ccc" }}
              />
              <div>
                <p className="font-semibold">{habit.name}</p>
                <p className="text-sm text-gray-500">{habit.frequency}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyMessage />
      )}
    </>
  );
}
