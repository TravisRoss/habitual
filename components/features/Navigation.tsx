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
import SignOutDialog from "@/components/features/SignOutDialog";
import { navLinks } from "@/app/_config/nav";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { DarkModeToggle } from "@/components/features/DarkModeToggle";
import Image from "next/image";

const linkClass =
  "font-nunito font-semibold text-muted-foreground hover:text-brand hover:bg-transparent focus:bg-transparent";

export default function Navigation({ session }: { session: Session | null }) {
  const pathName = usePathname();

  return (
    <nav className="hidden md:block bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-2">
        <Link
          href={session ? "/dashboard" : "/"}
          className="font-nunito font-extrabold text-lg text-brand mr-4 flex items-center gap-1 cursor-auto"
        >
          <Image
            src="/logo.png"
            alt="Habitual Logo"
            width={24}
            height={24}
            className="inline-block mr-2"
          />
          Habitual
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
                    <Link href={link.href}>{link.label}</Link>
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
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
