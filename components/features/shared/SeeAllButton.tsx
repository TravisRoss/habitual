import Link from "next/link";
import { Button } from "@/components/ui/button";

type SeeAllButtonProps = {
  href: string;
};

export default function SeeAllButton({ href }: SeeAllButtonProps) {
  return (
    <Button variant="link" size="sm" className="px-0 mb-2">
      <Link
        href={href}
        className="text-sm text-muted-foreground hover:text-brand"
      >
        See all
      </Link>
    </Button>
  );
}
