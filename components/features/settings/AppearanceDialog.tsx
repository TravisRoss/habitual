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
import { Sun } from "lucide-react";
import { useTheme } from "next-themes";
import SettingItem from "./SettingItem";
import { useTranslations } from "next-intl";

const itemCls =
  "flex h-auto w-full items-center justify-between rounded-md bg-muted/50 p-4 text-sm font-normal transition-colors hover:bg-accent hover:text-brand active:opacity-90";

export function AppearanceDialog() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("settings");

  const THEMES = [
    { key: "light", label: t("theme.light") },
    { key: "dark", label: t("theme.dark") },
    { key: "system", label: t("theme.system") },
  ] as const;

  const currentTheme = THEMES.find((t) => t.key === theme)?.label;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <SettingItem icon={Sun} label={t("appearance")} value={currentTheme} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t("appearance")}</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          {THEMES.map(({ key, label }) => (
            <Button
              key={key}
              variant="ghost"
              onClick={() => setTheme(key)}
              className={itemCls}
            >
              {label}
            </Button>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
