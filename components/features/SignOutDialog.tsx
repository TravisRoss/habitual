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

export default function SignOutDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="font-nunito font-semibold text-muted-foreground hover:text-brand hover:bg-transparent gap-1.5">
          <LogOut className="h-3.5 w-3.5" />
          Logout
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Sign out</DialogTitle>
          <DialogDescription>Are you sure you want to sign out?</DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
          <form action={signOutAction}>
            <Button type="submit" variant="destructive">Sign out</Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
