"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
  href?: string;
}

export default function BackButton({ label = "Back", href }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button
      variant="link"
      size="sm"
      className="w-max hover:text-brand"
      onClick={() => (href ? router.push(href) : router.back())}
    >
      <MoveLeft className="w-4 h-4 mr-1" />
      {label}
    </Button>
  );
}
