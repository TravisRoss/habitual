"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import SignOutDialog from "@/components/features/SignOutDialog";

const linkClass = "font-nunito font-semibold text-[#64748B] hover:text-[#F59E0B] hover:bg-transparent focus:bg-transparent";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <nav className="bg-white border-b border-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-2">

        <Link
          href={session ? "/dashboard" : "/"}
          className="font-nunito font-extrabold text-lg text-[#F59E0B] mr-4"
        >
          Habitual
        </Link>

        {session && (
          <NavigationMenu>
            <NavigationMenuList>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${linkClass}`}>
                  <Link href="/dashboard">Dashboard</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className={linkClass}>Habits</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="flex flex-col w-40 p-1">
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard/habits" className="block px-3 py-2 text-sm font-nunito text-[#0F172A] rounded-sm hover:bg-[#FFFBEB] hover:text-[#F59E0B] transition-colors">
                          All Habits
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <Link href="/dashboard/habits/new" className="block px-3 py-2 text-sm font-nunito text-[#0F172A] rounded-sm hover:bg-[#FFFBEB] hover:text-[#F59E0B] transition-colors">
                          + New Habit
                        </Link>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${linkClass}`}>
                  <Link href="/dashboard/analytics">Analytics</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild className={`${navigationMenuTriggerStyle()} ${linkClass}`}>
                  <Link href="/dashboard/settings">Settings</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

            </NavigationMenuList>
          </NavigationMenu>
        )}

        <div className="ml-auto">
          {session ? (
            <SignOutDialog />
          ) : (
            <Button asChild size="sm" className="font-nunito font-extrabold text-white border-0 btn-primary">
              <Link href="/login">Get Started</Link>
            </Button>
          )}
        </div>

      </div>
    </nav>
  );
}
