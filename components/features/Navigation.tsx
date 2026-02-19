"use client";
import Link from "next/link";
import { useSession } from "next-auth/react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { LogOut, BarChart3, Settings } from "lucide-react";
import { signOutAction } from "@/app/_lib/actions";

export default function Navigation() {
  const { data: session } = useSession();

  return (
    <NavigationMenu className="max-w-screen-2xl mx-auto px-4">
      <NavigationMenuList className="flex gap-2 container mx-auto">
        {/* Logo */}
        <NavigationMenuItem className="mr-8">
          <Link
            href={session ? "/dashboard" : "/"}
            className="font-bold text-xl bg-gradient-to-r from-zinc-900 to-zinc-700 bg-clip-text text-transparent"
          >
            Habitual
          </Link>
        </NavigationMenuItem>

        {/* Desktop Links */}
        {session && (
          <>
            <NavigationMenuItem>
              <Link href="/dashboard" className={navigationMenuTriggerStyle()}>
                Dashboard
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Habits</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-48 p-4 gap-2">
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/habits"
                        className="block p-2 rounded-md hover:bg-zinc-100"
                      >
                        All Habits
                      </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <Link
                        href="/dashboard/habits/new"
                        className="block p-2 rounded-md hover:bg-zinc-100"
                      >
                        + New Habit
                      </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/dashboard/analytics"
                className={navigationMenuTriggerStyle()}
              >
                <BarChart3 className="mr-2 h-4 w-4" />
                Analytics
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link
                href="/dashboard/settings"
                className={navigationMenuTriggerStyle()}
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </NavigationMenuItem>
          </>
        )}

        {/* Right Side CTAs */}
        <NavigationMenuItem className="ml-auto">
          {session ? (
            <form action={signOutAction}>
              <Button type="submit" variant="ghost" size="sm" className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </form>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Login
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Get Started</Button>
              </Link>
            </>
          )}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
