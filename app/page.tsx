import Link from "next/link";
import Navigation from "@/components/features/Navigation";
import { auth } from "./_lib/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();

  if (session) {
    return (
      <>
        <Navigation />
        <main className="container mx-auto px-4 py-8">Dashboard content</main>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-8 px-4">
        <h1 className="text-4xl font-bold text-center">
          Build better habits, one day at a time
        </h1>
        <p className="text-muted-foreground text-center max-w-md">
          Track your progress and stay consistent with Habitual.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/login">Sign in</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </main>
    </>
  );
}
