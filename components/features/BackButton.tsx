import { Button } from "../ui/button";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

interface BackButtonProps {
  href: string;
  label: string;
}

export default function BackButton({ href, label }: BackButtonProps) {
  return (
    <Button asChild variant="link" size="sm" className="w-max hover:text-brand">
      <Link href={href}>
        <MoveLeft className="w-4 h-4 mr-1" />
        {label}
      </Link>
    </Button>
  );
}
