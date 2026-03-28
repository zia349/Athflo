import Link from "next/link";

const highlights = [
  {
    label: "Today status",
    value: "Ready",
    note: "Check-in submitted",
    tone: "from-emerald-300/35 to-teal-300/15",
    ring: "ring-emerald-300/35",
  },
  {
    label: "Mood trend",
    value: "+0.8",
    note: "Past 7 days",
    tone: "from-cyan-300/35 to-sky-300/15",
    ring: "ring-cyan-300/35",
  },
  {
    label: "Streak",
    value: "12 days",
    note: "Keep the rhythm",
    tone: "from-fuchsia-300/35 to-violet-300/15",
    ring: "ring-fuchsia-300/35",
  },
];

const moodRail = [
  { day: "Mon", score: 6.5 },
  { day: "Tue", score: 6.9 },
  { day: "Wed", score: 6.4 },
  { day: "Thu", score: 7.1 },
  { day: "Fri", score: 7.4 },
  { day: "Sat", score: 7.6 },
  { day: "Sun", score: 7.2 },
];

const actionCards = [
  {
    href: "/athlete/check-in",
    label: "Daily check-in",
    title: "Share how you feel in under 1 minute",
    hint: "Best done before practice",
    accent: "border-cyan-300/50 bg-cyan-300/10 hover:bg-cyan-300/15",
  },
  {
    href: "/athlete/history",
    label: "Your history",
    title: "See your trend and consistency",
    hint: "Look for patterns, not perfection",
    accent: "border-slate-700 bg-slate-900/75 hover:border-slate-500",
  },
  {
    href: "/athlete/profile",
    label: "Coaching style",
    title: "Update how you like feedback",
    hint: "Help your coach support you better",
    accent: "border-slate-700 bg-slate-900/75 hover:border-slate-500",
  },
];

export default function AthleteDashboardPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-slate-900/75 p-6 shadow-[0_24px_55px_rgba(8,145,178,0.2)]">
        <div className="pointer-events-none absolute -right-12 -top-14 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-fuchsia-300/15 blur-3xl" />
        <p className="relative text-xs uppercase tracking-[0.14em] text-cyan-200">Player Dashboard</p>
        <h2 className="relative mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">Welcome back, Jordan</h2>
        <p className="relative mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Simple goal today: check in, train smart, and keep your streak alive.
        </p>
        <div className="relative mt-4 inline-flex items-center rounded-full border border-emerald-300/45 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">
          You are on track this week
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {highlights.map((item) => (
          <article
            key={item.label}
            className={`relative overflow-hidden rounded-2xl bg-slate-900/80 p-5 ring-1 ${item.ring}`}
          >
            <div className={`pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full bg-gradient-to-br ${item.tone} blur-2xl`} />
            <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{item.value}</p>
            <p className="mt-1 text-sm text-slate-300">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 sm:p-6">
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Mood rail</p>
            <p className="mt-1 text-sm text-slate-300">Quick look at your week</p>
          </div>
          <span className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-200">
            avg 7.0
          </span>
        </div>
        <div className="flex items-end gap-2">
          {moodRail.map((point) => {
            const height = `${Math.round((point.score / 10) * 100)}%`;
            return (
              <div key={point.day} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-28 w-full items-end overflow-hidden rounded-xl bg-slate-800/45">
                  <div
                    className="w-full rounded-xl bg-gradient-to-t from-cyan-400 via-sky-300 to-emerald-300"
                    style={{ height }}
                  />
                </div>
                <span className="text-[10px] uppercase tracking-[0.08em] text-slate-500">{point.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {actionCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`rounded-2xl border p-5 transition ${card.accent}`}
          >
            <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{card.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-100">{card.title}</p>
            <p className="mt-2 text-sm text-slate-300">{card.hint}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
