import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-page-bg flex items-center justify-center px-6">
      <div className="w-full max-w-[375px] flex flex-col gap-8 py-12">
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center btn-primary">
          <TriangleAlert className="w-7 h-7 text-white" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-nunito font-bold text-[44px] leading-tight text-foreground">
            Page not found.
          </h1>
          <p className="font-nunito font-semibold text-sm text-muted-foreground max-w-[280px]">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Button asChild className="w-full h-[49px] font-nunito font-extrabold text-sm text-white border-0 btn-primary">
          <Link href="/">Go home</Link>
        </Button>
      </div>
    </main>
  );
}
