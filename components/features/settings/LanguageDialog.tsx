"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import SettingItem, { itemCls } from "./SettingItem";
import { useTranslations } from "next-intl";
import { setLocale } from "@/app/_lib/actions";
import { Languages } from "lucide-react";

export function LanguageDialog({ currentLocale }: { currentLocale: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("settings");

  const OPTIONS = [
    { label: t("languages.en"), value: "en" },
    { label: t("languages.es"), value: "es" },
    { label: t("languages.de"), value: "de" },
    { label: t("languages.ja"), value: "ja" },
  ] as const;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SettingItem
          icon={Languages}
          label={t("language")}
          value={currentLocale}
        />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("language")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          {OPTIONS.map(({ label, value }) => (
            <Button
              key={value}
              variant="ghost"
              className={itemCls}
              onClick={() => {
                setLocale(value);
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
