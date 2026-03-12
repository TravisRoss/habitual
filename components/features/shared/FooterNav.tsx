"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navLinks } from "@/app/_config/nav";
import { useTranslations } from "next-intl";
import { NAV_LABEL_KEYS } from "@/app/_lib/constants";
import { haptic } from "@/app/_lib/haptics";

export default function FooterNav() {
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className="md:hidden bg-card border-t border-border pb-[env(safe-area-inset-bottom)]">
      <ul className="flex py-2">
        {navLinks.map(({ href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                prefetch={true}
                onTouchStart={() => haptic()}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 w-full py-1 text-xs font-nunito font-semibold transition-colors touch-manipulation select-none",
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
