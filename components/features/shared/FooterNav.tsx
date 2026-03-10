"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/app/_config/nav";
import { useTranslations } from "next-intl";
import { NAV_LABEL_KEYS } from "@/app/_lib/constants";

export default function FooterNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className="md:hidden bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
      <ul className="flex justify-around p-2">
        {navLinks.map(({ href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 px-8 py-1 text-xs font-nunito font-semibold transition-colors",
                  isActive
                    ? "text-brand"
                    : "text-muted-foreground hover:text-brand",
                )}
              >
                <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
                {t(NAV_LABEL_KEYS[href])}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
