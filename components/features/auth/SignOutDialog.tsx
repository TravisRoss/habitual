"use client";

import { useState } from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { signOutAction } from "@/app/_lib/actions";
import SettingItem from "../settings/SettingItem";
import { useTranslations } from "next-intl";

type SignOutDialogProps = {
  isSetting?: true;
};

export default function SignOutDialog({ isSetting }: SignOutDialogProps) {
  const [open, setOpen] = useState(false);
  const t = useTranslations("auth.signOut");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isSetting ? (
        <DialogTrigger asChild>
          <SettingItem icon={LogOut} label={t("title")} />
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="font-nunito font-semibold text-muted-foreground hover:text-brand hover:bg-transparent gap-1.5"
          >
            <LogOut className="h-3.5 w-3.5" />
            {t("title")}
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>{t("title")}</DialogTitle>
          <DialogDescription>
            {t("confirmation")}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="w-full">
            {t("cancel")}
          </Button>
          <form action={signOutAction}>
            <Button type="submit" variant="destructive" className="w-full">
              {t("confirm")}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
