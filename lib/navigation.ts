import { AppRole } from "@/lib/roles";

export type NavItem = {
  label: string;
  href: string;
};

export const ROLE_NAV_ITEMS: Record<AppRole, NavItem[]> = {
  athlete: [
    { label: "Dashboard", href: "/athlete" },
    { label: "Daily Check-In", href: "/athlete/check-in" },
    { label: "History", href: "/athlete/history" },
    { label: "Profile", href: "/athlete/profile" },
  ],
  coach: [
    { label: "Dashboard", href: "/coach" },
    { label: "Team", href: "/coach/team" },
    { label: "Trends", href: "/coach/trends" },
    { label: "Alerts", href: "/coach/alerts" },
  ],
};

export function getNavItemsForRole(role: AppRole): NavItem[] {
  return ROLE_NAV_ITEMS[role];
}

const PAGE_TITLES: Record<string, string> = {
  "/athlete": "Athlete Dashboard",
  "/athlete/check-in": "Daily Check-In",
  "/athlete/history": "Check-In History",
  "/athlete/profile": "Athlete Profile",
  "/coach": "Coach Dashboard",
  "/coach/team": "Team Roster",
  "/coach/trends": "Team Trends",
  "/coach/alerts": "Support Alerts",
};

export function getPageTitle(pathname: string): string {
  const exactMatch = PAGE_TITLES[pathname];
  if (exactMatch) {
    return exactMatch;
  }

  const matchedPrefix = Object.keys(PAGE_TITLES)
    .sort((a, b) => b.length - a.length)
    .find((path) => pathname.startsWith(path));

  if (matchedPrefix) {
    return PAGE_TITLES[matchedPrefix];
  }

  return "Athflo";
}
