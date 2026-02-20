import EmptyMessage from "@/components/features/EmptyMessage";

export default async function Dashboard() {
  const habits: unknown[] = [];

  return (
    <>
      {habits.length === 0 && <EmptyMessage />}
    </>
  );
}
