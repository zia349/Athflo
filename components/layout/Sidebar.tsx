import { getNavItemsForRole } from "@/lib/navigation";
import { AppRole } from "@/lib/roles";
import SidebarNav from "@/components/layout/SidebarNav";
import Link from "next/link";

type SidebarProps = {
  role: AppRole;
  pathname: string;
  onNavigate?: () => void;
};

export default function Sidebar({ role, pathname, onNavigate }: SidebarProps) {
  const navItems = getNavItemsForRole(role);

  return (
    <aside className="flex h-full w-72 flex-col border-r border-slate-800 bg-slate-950/95 px-4 pb-4 pt-5 backdrop-blur-sm">
      <div className="rounded-2xl border border-cyan-300/35 bg-cyan-300/10 px-4 py-4 shadow-[0_18px_40px_rgba(34,211,238,0.12)]">
        <p className="font-[family-name:var(--font-athflo-display)] text-3xl uppercase tracking-[0.14em] text-cyan-200">
          Athflo
        </p>
        <p className="mt-1 text-xs uppercase tracking-[0.08em] text-slate-300">
          {role === "coach" ? "Coach Workspace" : "Athlete Workspace"}
        </p>
      </div>

      <SidebarNav items={navItems} pathname={pathname} onNavigate={onNavigate} />

      <div className="mt-auto rounded-xl border border-slate-800 bg-slate-900/70 px-4 py-3 text-xs leading-5 text-slate-300">
        <p className="font-semibold text-slate-100">Support-first insight</p>
        <p className="mt-1">Use trends to start respectful conversations, not judgments.</p>
        <Link
          href="/login"
          className="mt-3 inline-flex rounded-lg border border-slate-700 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-cyan-200/70 hover:text-cyan-100"
        >
          Switch role
        </Link>
      </div>
    </aside>
  );
}
