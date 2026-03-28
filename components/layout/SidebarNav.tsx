import Link from "next/link";
import { NavItem } from "@/lib/navigation";

type SidebarNavProps = {
  items: NavItem[];
  pathname: string;
  onNavigate?: () => void;
};

function isActive(pathname: string, href: string): boolean {
  if (href === pathname) {
    return true;
  }

  return href !== "/" && pathname.startsWith(`${href}/`);
}

export default function SidebarNav({ items, pathname, onNavigate }: SidebarNavProps) {
  return (
    <nav aria-label="Role-based navigation" className="mt-6 space-y-2">
      {items.map((item) => {
        const active = isActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={[
              "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition",
              active
                ? "border border-cyan-200/70 bg-cyan-300/15 text-cyan-100"
                : "border border-transparent text-slate-300 hover:border-slate-700 hover:bg-slate-800/70 hover:text-slate-100",
            ].join(" ")}
          >
            <span>{item.label}</span>
            <span
              className={[
                "h-2 w-2 rounded-full transition",
                active ? "bg-cyan-300" : "bg-slate-600 group-hover:bg-slate-400",
              ].join(" ")}
            />
          </Link>
        );
      })}
    </nav>
  );
}
