import Navigation from "@/components/features/Navigation";
import { auth } from "../_lib/auth";
import { redirect } from "next/navigation";
import EmptyMessage from "@/components/features/EmptyMessage";

export default async function Dashboard() {
  const session = await auth();
  if (!session) redirect("/login");

  const habits: unknown[] = [];

  return (
    <>
      <Navigation />
      <div>Dashboard</div>
      {habits.length === 0 && <EmptyMessage />}
    </>
  );
}
