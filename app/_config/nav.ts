import {
  LayoutDashboard,
  BarChart2,
  Settings,
  CircleUserRound,
} from "lucide-react";

export const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/progress", label: "Progress", icon: BarChart2 },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export const settingsNavLinks = [
  { label: "Account", href: "settings/account", icon: CircleUserRound },
];
