"use client";

import Link from "next/link";
import { PlusCircle, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useTranslations } from "next-intl";

export default function EmptyMessage() {
  const t = useTranslations("habits.empty");
  const tHabits = useTranslations("habits");

  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia
          variant="icon"
          className="w-16 h-16 rounded-2xl btn-primary text-white"
        >
          <Sparkles className="h-7 w-7" />
        </EmptyMedia>
        <EmptyTitle className="font-nunito font-bold text-xl text-foreground">
          {t("noHabits")}
        </EmptyTitle>
        <EmptyDescription className="font-nunito text-muted-foreground max-w-60">
          {t("noHabitsDescription")}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          asChild
          className="font-nunito font-extrabold text-sm text-white border-0 gap-2 btn-primary"
        >
          <Link href="/dashboard/habits/new">
            <PlusCircle className="h-4 w-4" />
            {tHabits("createButton")}
          </Link>
        </Button>
      </EmptyContent>
    </Empty>
  );
}
