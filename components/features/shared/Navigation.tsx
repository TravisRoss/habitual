"use client";

import Link from "next/link";
import type { Session } from "next-auth";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SignOutDialog from "@/components/features/auth/SignOutDialog";
import { navLinks } from "@/app/_config/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/features/shared/DarkModeToggle";
import { Flame } from "lucide-react";
import { useTranslations } from "next-intl";
import { NAV_LABEL_KEYS } from "@/app/_lib/constants";

const linkClass =
  "font-nunito font-semibold text-muted-foreground hover:text-brand transition-colors bg-transparent";

export default function Navigation({ session }: { session: Session | null }) {
  const pathName = usePathname();
  const t = useTranslations("nav");

  return (
    <nav className="hidden md:block bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-2">
        <Link
          href={session ? "/dashboard" : "/"}
          className="font-nunito font-extrabold text-lg text-brand mr-4 flex items-center gap-1 cursor-pointer"
        >
          <Flame className="h-5 w-5" />
          {t("brand")}
        </Link>

        {session && (
          <NavigationMenu>
            <NavigationMenuList>
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      linkClass,
                      link.href === pathName && "text-brand",
                    )}
                  >
                    <Link href={link.href}>
                      {t(NAV_LABEL_KEYS[link.href] ?? (link.label as never))}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <DarkModeToggle />
            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="ml-auto">
          {session ? (
            <SignOutDialog />
          ) : (
            <Button
              asChild
              size="sm"
              className="font-nunito font-extrabold text-white border-0 btn-primary"
            >
              <Link href="/login">{t("getStarted")}</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
