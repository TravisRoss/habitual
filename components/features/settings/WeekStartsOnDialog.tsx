"use client";

import { updateWeekStartsOnAction } from "@/app/_lib/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";
import { useState } from "react";
import SettingItem, { itemCls } from "./SettingItem";
import { useTranslations } from "next-intl";

type Props = { defaultValue: 0 | 1 };

export function WeekStartsOnDialog({ defaultValue }: Props) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("settings");

  const OPTIONS = [
    { label: t("days.sunday"), value: 0 },
    { label: t("days.monday"), value: 1 },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SettingItem
          icon={CalendarDays}
          label={t("weekStartsOn")}
          value={defaultValue === 0 ? t("days.sunday") : t("days.monday")}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("weekStartsOn")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          {OPTIONS.map(({ label, value }) => (
            <Button
              key={value}
              variant="ghost"
              className={itemCls}
              onClick={() => {
                updateWeekStartsOnAction(value);
                setOpen(false);
              }}
            >
              {label}
            </Button>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
