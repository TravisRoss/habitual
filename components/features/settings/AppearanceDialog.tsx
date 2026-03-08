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
import { useTheme } from "next-themes";

const THEMES = ["Light", "Dark", "System"] as const;

const itemCls =
  "flex h-auto w-full items-center justify-between rounded-md bg-muted/50 p-4 text-sm font-normal transition-colors hover:bg-accent hover:text-brand active:opacity-90";

export function AppearanceDialog() {
  const { setTheme } = useTheme();

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className={itemCls}>
          Appearance
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Appearance</DialogTitle>
        </DialogHeader>
        <DialogDescription className="space-y-2">
          {THEMES.map((theme) => (
            <Button
              key={theme}
              variant="ghost"
              onClick={() => setTheme(theme.toLowerCase())}
              className={itemCls}
            >
              {theme}
            </Button>
          ))}
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
