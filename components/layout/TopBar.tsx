type TopBarProps = {
  title: string;
  roleLabel: string;
  pathname: string;
  showBackButton: boolean;
  onBack: () => void;
  onOpenMenu: () => void;
};

export default function TopBar({ title, roleLabel, pathname, showBackButton, onBack, onOpenMenu }: TopBarProps) {
  const initials = roleLabel === "Coach" ? "CO" : "AT";
  const userLabel = "Athflo User";
  const userSubLabel = "Role demo";
  const buttonLabel = showBackButton ? "Go back" : "Open sidebar menu";
  const compactTitle = showBackButton ? title : roleLabel;

  return (
    <header className="safe-top sticky top-0 z-20 border-b border-slate-800/80 bg-slate-950/92 px-4 py-2.5 backdrop-blur">
      <div className="mx-auto flex w-full max-w-[430px] items-center justify-between gap-3">
        <div className="flex w-[72px] items-center">
          <button
            type="button"
            onClick={showBackButton ? onBack : onOpenMenu}
            className="inline-flex h-[38px] w-[38px] items-center justify-center rounded-[11px] border border-slate-700/90 bg-slate-900/70 text-slate-100 transition hover:border-cyan-200/70 hover:text-cyan-100"
            aria-label={buttonLabel}
          >
            <span aria-hidden="true" className="text-xl leading-none">{showBackButton ? "←" : "≡"}</span>
          </button>
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-center text-center">
          <p className="truncate text-[11px] font-medium uppercase tracking-[0.16em] text-slate-400">{compactTitle}</p>
          {showBackButton ? (
            <p className="truncate text-[10px] text-slate-500">{pathname.replace("/", "").replaceAll("/", " / ")}</p>
          ) : null}
        </div>

        <div className="flex w-[72px] items-center justify-end gap-2">
          <div className="hidden text-right sm:block">
            <p className="text-[13px] font-medium leading-tight tracking-[0.01em] text-slate-200">{userLabel}</p>
            <p className="mt-0.5 text-[11px] leading-tight text-slate-500">{userSubLabel}</p>
          </div>
          <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-cyan-200/60 bg-cyan-300/15 text-sm font-semibold text-cyan-100">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
