const alerts = [
  {
    id: "alt-1",
    title: "3 athletes reported sustained fatigue",
    note: "Consider lighter load in early drills and offer check-in support.",
    level: "watch",
  },
  {
    id: "alt-2",
    title: "2 athletes show repeated low readiness",
    note: "Plan private, supportive follow-up before team session.",
    level: "concern",
  },
];

export default function CoachAlertsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">Support Alerts</h2>
        <p className="mt-2 text-sm text-slate-300">Signals intended to guide respectful support and communication.</p>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => (
          <article
            key={alert.id}
            className={[
              "rounded-2xl border p-5",
              alert.level === "concern"
                ? "border-rose-300/40 bg-rose-300/10"
                : "border-amber-300/40 bg-amber-300/10",
            ].join(" ")}
          >
            <h3 className="text-lg font-semibold text-slate-100">{alert.title}</h3>
            <p className="mt-2 text-sm text-slate-200">{alert.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
