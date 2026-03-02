import { auth } from "@/app/_lib/auth";
import Navigation from "@/components/features/Navigation";
import FooterNav from "@/components/features/FooterNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <div className="min-h-screen bg-page-bg">
      <Navigation session={session} />
      <main className="container mx-auto px-4">{children}</main>
      <FooterNav />
    </div>
  );
}
