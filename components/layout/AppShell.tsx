"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import { getPageTitle } from "@/lib/navigation";
import { getStoredMockRole } from "@/lib/mockAuth";
import { AppRole, resolveRoleFromPathname } from "@/lib/roles";

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname() ?? "/athlete";
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const role = useMemo<AppRole>(() => {
    const routeRole = resolveRoleFromPathname(pathname);
    const storedRole = getStoredMockRole();

    if (storedRole && pathname === "/") {
      return storedRole;
    }

    return routeRole;
  }, [pathname]);

  const title = getPageTitle(pathname);

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 safe-x safe-bottom">
      <div className="relative">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_90%_15%,rgba(16,185,129,0.12),transparent_35%)]" />

        <div className="relative flex min-h-screen">
          <div className="hidden lg:block">
            <Sidebar role={role} pathname={pathname} />
          </div>

          {mobileMenuOpen ? (
            <div className="fixed inset-0 z-40 lg:hidden" role="presentation">
              <button
                type="button"
                className="absolute inset-0 bg-slate-950/70"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close sidebar menu"
              />
              <div className="relative h-full w-72">
                <Sidebar
                  role={role}
                  pathname={pathname}
                  onNavigate={() => setMobileMenuOpen(false)}
                />
              </div>
            </div>
          ) : null}

          <div className="flex min-h-screen flex-1 flex-col">
            <TopBar
              title={title}
              roleLabel={role === "coach" ? "Coach" : "Athlete"}
              onOpenMenu={() => setMobileMenuOpen(true)}
            />
            <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-3 py-5 sm:px-4 md:px-6 md:py-8">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
