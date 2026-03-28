import Link from "next/link";

const summaryCards = [
  { label: "Average Mood", value: "7.6 / 10", note: "Teamwide today" },
  { label: "Check-Ins", value: "26 / 31", note: "Submitted before practice" },
  { label: "Flagged", value: "3", note: "Needs a supportive follow-up" },
  { label: "Readiness", value: "81%", note: "Average confidence score" },
];

export default function CoachDashboardPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/70 p-6 shadow-[0_20px_45px_rgba(8,145,178,0.18)]">
        <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">Coach Dashboard</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">Welcome, Coach Rivera</h2>
        <p className="mt-2 text-sm text-slate-300">Women&apos;s Lacrosse • Team wellness pulse overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <article key={card.label} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
            <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{card.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{card.value}</p>
            <p className="mt-1 text-sm text-slate-300">{card.note}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/coach/team"
          className="rounded-2xl border border-cyan-300/40 bg-cyan-300/10 p-5 transition hover:bg-cyan-300/15"
        >
          <p className="text-xs uppercase tracking-[0.1em] text-cyan-200">Roster</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">Open team view</p>
        </Link>
        <Link
          href="/coach/trends"
          className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:border-slate-700"
        >
          <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Insights</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">See trend context</p>
        </Link>
        <Link
          href="/coach/alerts"
          className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:border-slate-700"
        >
          <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Support</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">Review active alerts</p>
        </Link>
      </div>
    </section>
  );
}
