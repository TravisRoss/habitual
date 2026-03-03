"use client";

import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface BackButtonProps {
  label?: string;
}

export default function BackButton({ label = "Back" }: BackButtonProps) {
  const router = useRouter();

  return (
    <Button variant="link" size="sm" className="w-max hover:text-brand" onClick={() => router.back()}>
      <MoveLeft className="w-4 h-4 mr-1" />
      {label}
    </Button>
  );
}
