import Link from "next/link";
import { redirect } from "next/navigation";
import Navigation from "@/components/features/Navigation";
import { auth } from "./_lib/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <>
      <Navigation />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-4">
        <h1 className="text-4xl font-bold text-center">
          Build better habits, one day at a time
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          Track your progress and stay consistent with Habitual.
        </p>
        <Button asChild size="lg">
          <Link href="/login">Get started</Link>
        </Button>
      </main>
    </>
  );
}
