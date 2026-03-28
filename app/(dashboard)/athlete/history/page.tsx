const historyRows = [
  { day: "Sun", mood: "7.2", energy: "6.9", readiness: "Ready", note: "Solid reset day" },
  { day: "Sat", mood: "7.6", energy: "7.4", readiness: "Ready", note: "Great consistency" },
  { day: "Fri", mood: "7.4", energy: "7.0", readiness: "Ready", note: "Strong finish" },
  { day: "Thu", mood: "7.1", energy: "6.6", readiness: "Steady", note: "Normal training load" },
  { day: "Wed", mood: "6.4", energy: "5.8", readiness: "Watch", note: "Short sleep last night" },
];

export default function AthleteHistoryPage() {
  const avgMood = (
    historyRows.reduce((sum, row) => sum + Number.parseFloat(row.mood), 0) / historyRows.length
  ).toFixed(1);
  const moodValues = historyRows.map((row) => Number.parseFloat(row.mood)).reverse();
  const minMood = Math.min(...moodValues);
  const maxMood = Math.max(...moodValues);
  const sparkPoints = moodValues
    .map((value, index) => {
      const x = (index / (moodValues.length - 1 || 1)) * 100;
      const normalized = maxMood === minMood ? 0.5 : (value - minMood) / (maxMood - minMood);
      const y = 30 - normalized * 24;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <section className="mx-auto w-full max-w-[396px] space-y-4 sm:space-y-5">
      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-slate-900/75 p-6 shadow-[0_22px_50px_rgba(8,145,178,0.18)]">
        <div className="pointer-events-none absolute -right-10 -top-12 h-40 w-40 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-12 bottom-0 h-32 w-32 rounded-full bg-violet-300/15 blur-3xl" />
        <p className="relative text-xs uppercase tracking-[0.12em] text-cyan-200">History</p>
        <h2 className="relative mt-2 text-2xl font-semibold text-slate-100">Recent check-ins</h2>
        <p className="relative mt-2 text-sm text-slate-300">Your last few entries, simplified for quick pattern spotting.</p>
        <div className="relative mt-4 rounded-xl border border-slate-700/80 bg-slate-950/40 p-3">
          <div className="mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.08em] text-slate-400">
            <span>Mood trend</span>
            <span>Wed to Sun</span>
          </div>
          <svg viewBox="0 0 100 30" className="h-12 w-full" role="img" aria-label="Mood trend sparkline">
            <polyline
              points={sparkPoints}
              fill="none"
              stroke="rgba(56,189,248,0.95)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <div className="relative mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-3 py-1 text-cyan-200">Avg mood {avgMood}</span>
          <span className="rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 text-emerald-200">Streak 12 days</span>
          <span className="rounded-full border border-fuchsia-300/40 bg-fuchsia-300/10 px-3 py-1 text-fuchsia-200">Best day Sat</span>
        </div>
      </div>

      <div className="space-y-3">
        {historyRows.map((row) => (
          <article key={row.day} className="rounded-2xl border border-slate-800 bg-slate-900/80 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.08em] text-slate-500">{row.day}</p>
              <span
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                  row.readiness === "Ready"
                    ? "bg-emerald-300/15 text-emerald-200"
                    : row.readiness === "Steady"
                      ? "bg-cyan-300/15 text-cyan-200"
                      : "bg-amber-300/15 text-amber-200"
                }`}
              >
                {row.readiness}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Mood</p>
                <p className="font-medium text-slate-100">{row.mood}/10</p>
              </div>
              <div>
                <p className="text-slate-400">Energy</p>
                <p className="font-medium text-slate-100">{row.energy}/10</p>
              </div>
            </div>
            <p className="mt-3 text-sm text-slate-300">{row.note}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
