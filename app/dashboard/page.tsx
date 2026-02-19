import EmptyMessage from "@/components/features/EmptyMessage";

export default async function Dashboard() {
  const habits: unknown[] = [];

  return (
    <>
      <div>Dashboard</div>
      {habits.length === 0 && <EmptyMessage />}
    </>
  );
}
