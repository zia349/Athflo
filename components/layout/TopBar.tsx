type TopBarProps = {
  title: string;
  roleLabel: string;
  onOpenMenu: () => void;
};

export default function TopBar({ title, roleLabel, onOpenMenu }: TopBarProps) {
  const initials = roleLabel === "Coach" ? "CO" : "AT";
  const userLabel = "Athflo User";
  const userSubLabel = "Role demo";

  return (
    <header className="safe-top sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/90 px-3 py-2.5 backdrop-blur sm:px-4 md:px-6 md:py-3">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-900 text-slate-100 transition hover:border-cyan-200/70 hover:text-cyan-100"
            aria-label="Open sidebar menu"
          >
            <span aria-hidden="true" className="text-xl leading-none">≡</span>
          </button>
          <div className="min-w-0">
            <h1 className="truncate font-[family-name:var(--font-athflo-display)] text-2xl uppercase leading-none tracking-[0.05em] text-slate-100 sm:text-3xl">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right sm:block">
            <p className="text-[13px] font-medium leading-tight tracking-[0.01em] text-slate-200">{userLabel}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-slate-500">{userSubLabel}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-200/60 bg-cyan-300/15 text-sm font-semibold text-cyan-100">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
