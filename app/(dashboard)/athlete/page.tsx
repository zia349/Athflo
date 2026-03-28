import Link from "next/link";

const metrics = [
  { label: "Today Status", value: "Ready", note: "Check-in submitted" },
  { label: "Mood Trend", value: "+0.8", note: "Past 7 days" },
  { label: "Check-In Streak", value: "12", note: "Consecutive days" },
];

export default function AthleteDashboardPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-cyan-300/30 bg-slate-900/70 p-6 shadow-[0_20px_45px_rgba(8,145,178,0.18)]">
        <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">Athlete Dashboard</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">Welcome back, Jordan</h2>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Your daily check-in helps coaches support training and wellbeing with better context.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {metrics.map((item) => (
          <article
            key={item.label}
            className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5"
          >
            <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{item.label}</p>
            <p className="mt-2 text-3xl font-semibold text-slate-100">{item.value}</p>
            <p className="mt-1 text-sm text-slate-300">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Link
          href="/athlete/check-in"
          className="rounded-2xl border border-cyan-300/40 bg-cyan-300/10 p-5 transition hover:bg-cyan-300/15"
        >
          <p className="text-xs uppercase tracking-[0.1em] text-cyan-200">Next step</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">Complete daily check-in</p>
        </Link>
        <Link
          href="/athlete/history"
          className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:border-slate-700"
        >
          <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Review</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">View recent history</p>
        </Link>
        <Link
          href="/athlete/profile"
          className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5 transition hover:border-slate-700"
        >
          <p className="text-xs uppercase tracking-[0.1em] text-slate-400">Update</p>
          <p className="mt-2 text-lg font-semibold text-slate-100">Open profile details</p>
        </Link>
      </div>
    </section>
  );
}
