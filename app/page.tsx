import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "./_lib/auth";
import { Button } from "@/components/ui/button";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <main className="min-h-screen bg-[#FFFBEB] flex items-center justify-center px-6">
      <div className="w-full max-w-[375px] flex flex-col gap-8 py-12">

        {/* Logo mark */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center btn-primary"
        >
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
            <path
              d="M14 4C14 4 7 10 7 16a7 7 0 0014 0c0-6-7-12-7-12z"
              fill="white"
              opacity="0.9"
            />
            <circle cx="14" cy="16" r="3" fill="white" opacity="0.6" />
          </svg>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-3">
          <h1 className="font-[family-name:var(--font-nunito)] font-bold text-[44px] leading-tight text-[#0F172A]">
            Build better habits.
          </h1>
          <p className="font-[family-name:var(--font-nunito)] font-semibold text-sm text-[#64748B] max-w-[280px]">
            Track your progress and stay consistent, one day at a time.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-4">
          <Button
            asChild
            className="w-full h-[49px] font-[family-name:var(--font-nunito)] font-extrabold text-sm text-white border-0 btn-primary"
          >
            <Link href="/signup">Get started</Link>
          </Button>

          <Button
            asChild
            variant="outline"
            className="w-full h-[49px] bg-white border-[#E2E8F0] font-[family-name:var(--font-nunito)] font-extrabold text-sm text-[#F59E0B]"
            style={{ boxShadow: "1px 1px 14px 6px rgba(124,58,237,0.08)" }}
          >
            <Link href="/login">Log in</Link>
          </Button>
        </div>

        {/* Footer note */}
        <p className="font-[family-name:var(--font-nunito)] text-sm text-[#94A3B8] text-center">
          Free to use. No credit card required.
        </p>

      </div>
    </main>
  );
}
