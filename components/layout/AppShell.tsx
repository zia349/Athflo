"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import TopBar from "@/components/layout/TopBar";
import Sidebar from "@/components/layout/Sidebar";
import { getPageTitle } from "@/lib/navigation";
import { getStoredMockRole } from "@/lib/mockAuth";
import { AppRole, resolveRoleFromPathname } from "@/lib/roles";

const DRAWER_WIDTH = 288;

type AppShellProps = {
  children: React.ReactNode;
};

export default function AppShell({ children }: AppShellProps) {
  const pathname = usePathname() ?? "/athlete";
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [drawerTranslate, setDrawerTranslate] = useState<number | null>(null);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const touchMode = useRef<"opening" | "closing" | null>(null);

  const role = useMemo<AppRole>(() => {
    const routeRole = resolveRoleFromPathname(pathname);
    const storedRole = getStoredMockRole();

    if (storedRole && pathname === "/") {
      return storedRole;
    }

    return routeRole;
  }, [pathname]);

  const title = getPageTitle(pathname);
  const isRootPage = pathname === "/athlete" || pathname === "/coach";

  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setDrawerTranslate(null);
      }
    };

    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, []);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    touchStartX.current = touch.clientX;
    touchStartY.current = touch.clientY;

    if (mobileMenuOpen) {
      touchMode.current = "closing";
      return;
    }

    touchMode.current = touch.clientX <= 24 ? "opening" : null;
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchMode.current || touchStartX.current === null || touchStartY.current === null) {
      return;
    }

    const touch = event.touches[0];
    const dx = touch.clientX - touchStartX.current;
    const dy = touch.clientY - touchStartY.current;

    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) {
      touchMode.current = null;
      setDrawerTranslate(null);
      return;
    }

    if (touchMode.current === "opening") {
      const next = Math.max(-DRAWER_WIDTH, Math.min(0, -DRAWER_WIDTH + dx));
      setDrawerTranslate(next);
      return;
    }

    const next = Math.max(-DRAWER_WIDTH, Math.min(0, dx));
    setDrawerTranslate(next);
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!touchMode.current || touchStartX.current === null) {
      setDrawerTranslate(null);
      return;
    }

    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStartX.current;

    if (touchMode.current === "opening") {
      setMobileMenuOpen(dx > 70);
    } else {
      setMobileMenuOpen(!(dx < -70));
    }

    touchMode.current = null;
    touchStartX.current = null;
    touchStartY.current = null;
    setDrawerTranslate(null);
  };

  const effectiveTranslate = drawerTranslate ?? (mobileMenuOpen ? 0 : -DRAWER_WIDTH);
  const openProgress = 1 - Math.abs(effectiveTranslate) / DRAWER_WIDTH;
  const drawerInteractive = mobileMenuOpen || drawerTranslate !== null;
  const contentScale = 1 - openProgress * 0.015;
  const contentShift = openProgress * 6;

  return (
    <div
      className="min-h-screen bg-slate-950 text-slate-100 safe-bottom"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="relative mx-auto w-full max-w-[430px] overflow-hidden border-x border-slate-800/70">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(14,165,233,0.18),transparent_45%),radial-gradient(circle_at_90%_15%,rgba(16,185,129,0.12),transparent_35%)]" />

        <div className="relative flex min-h-[100dvh]">
          <div
            className={`absolute inset-0 z-40 transition-[visibility] duration-300 ${
              drawerInteractive ? "visible" : "invisible"
            }`}
            role="presentation"
          >
            <button
              type="button"
              className="absolute inset-0 bg-slate-950/55 backdrop-blur-[2px] transition-opacity duration-300"
              style={{ opacity: openProgress }}
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close sidebar menu"
            />
            <div
              className="relative h-full w-72 max-w-[85vw] transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
              style={{
                transform: `translateX(${effectiveTranslate}px)`,
                boxShadow: "16px 0 40px rgba(2,6,23,0.45)",
              }}
            >
              <Sidebar
                role={role}
                pathname={pathname}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </div>
          </div>

          <div
            className="flex min-h-[100dvh] flex-1 flex-col transition-transform duration-300 [transition-timing-function:cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: `translateX(${contentShift}px) scale(${contentScale})`,
              transformOrigin: "left center",
            }}
          >
            <TopBar
              title={title}
              roleLabel={role === "coach" ? "Coach" : "Athlete"}
              pathname={pathname}
              showBackButton={!isRootPage}
              onBack={() => {
                if (window.history.length > 1) {
                  router.back();
                  return;
                }

                router.push(role === "coach" ? "/coach" : "/athlete");
              }}
              onOpenMenu={() => setMobileMenuOpen(true)}
            />
            <main className="mx-auto flex w-full flex-1 flex-col px-3 py-4 sm:px-4 sm:py-5">
              {children}
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
