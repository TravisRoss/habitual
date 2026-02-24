"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

interface OAuthButtonProps {
  icon: React.ReactNode;
  label: string;
}

export function OAuthButton({ icon, label }: OAuthButtonProps) {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="outline"
      disabled={pending}
      aria-busy={pending}
      className="w-full h-[49px] bg-card border-border font-nunito font-extrabold text-sm text-foreground"
      style={{ boxShadow: "1px 1px 14px 6px rgba(124,58,237,0.08)" }}
    >
      {pending ? <Spinner className="size-4" /> : icon}
      {pending ? "Redirecting…" : label}
    </Button>
  );
}
