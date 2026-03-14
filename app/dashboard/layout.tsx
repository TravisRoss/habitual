import { auth } from "@/app/_lib/auth";
import Navigation from "@/components/features/shared/Navigation";
import FooterNav from "@/components/features/shared/FooterNav";

export const metadata = { title: "Dashboard" };

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="flex flex-col h-dvh bg-page-bg">
      <Navigation session={session} />
      <main className="flex-1 min-h-0 overflow-auto px-4 py-8 pb-[calc(env(safe-area-inset-bottom)+4rem)] md:pb-8">
        {children}
      </main>
      <FooterNav />
    </div>
  );
}
