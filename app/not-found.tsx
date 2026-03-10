import Link from "next/link";
import { TriangleAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <main className="min-h-screen bg-page-bg flex items-center justify-center px-6">
      <div className="w-full max-w-93.75 flex flex-col gap-8 py-12">
        <div className="size-14 rounded-2xl flex items-center justify-center btn-primary">
          <TriangleAlert className="size-7 text-white" />
        </div>

        <div className="flex flex-col gap-3">
          <h1 className="font-nunito font-bold text-[44px] leading-tight text-foreground">
            {t("title")}
          </h1>
          <p className="font-nunito font-semibold text-sm text-muted-foreground max-w-70">
            {t("description")}
          </p>
        </div>

        <Button asChild className="w-full h-12.25 font-nunito font-extrabold text-sm text-white border-0 btn-primary">
          <Link href="/">{t("goHome")}</Link>
        </Button>
      </div>
    </main>
  );
}
