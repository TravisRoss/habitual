import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "./_lib/auth";
import { Button } from "@/components/ui/button";
import { Flame } from "lucide-react";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-page-bg flex items-center justify-center px-6">
      <div className="w-full max-w-93.75 flex flex-col gap-8 py-12">
        {/* Logo mark */}
        <Flame className="h-20 w-20 text-brand" />

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1 className="font-nunito font-bold text-[44px] leading-tight text-foreground">
            Build better habits.
          </h1>
          <p className="font-nunito font-semibold text-sm text-muted-foreground max-w-70">
            Track your progress and stay consistent, one day at a time.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4">
          <Button
            asChild
            className="w-full h-12.25 font-nunito font-extrabold text-sm text-white border-0 btn-primary"
          >
            <Link href="/signup">Get started</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full h-12.25 bg-card border-border font-nunito font-extrabold text-sm text-brand"
            style={{ boxShadow: "1px 1px 14px 6px rgba(124,58,237,0.08)" }}
          >
            <Link href="/login">Log in</Link>
          </Button>
        </div>

        {/* Footer note */}
        <p className="font-nunito text-sm text-muted-foreground text-center">
          Free to use. No credit card required.
        </p>
      </div>
    </main>
  );
}
