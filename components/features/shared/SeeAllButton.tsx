"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

type SeeAllButtonProps = {
  href: string;
};

export default function SeeAllButton({ href }: SeeAllButtonProps) {
  const t = useTranslations("dashboard");

  return (
    <Button variant="link" size="sm" className="px-0 mb-2">
      <Link
        href={href}
        className="text-sm text-muted-foreground hover:text-brand"
      >
        {t("seeAll")}
      </Link>
    </Button>
  );
}
