const trendPoints = [7.1, 7.3, 7.0, 7.5, 7.8, 7.6, 7.7];

export default function CoachTrendsPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">Team Trends</h2>
        <p className="mt-2 text-sm text-slate-300">Mock trend line for team mood and readiness context.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="grid grid-cols-7 gap-2">
          {trendPoints.map((value, index) => (
            <div key={`${value}-${index}`} className="space-y-2 text-center">
              <div
                className="mx-auto w-8 rounded-md bg-cyan-300/40"
                style={{ height: `${Math.max(32, value * 14)}px` }}
                aria-label={`Day ${index + 1} mood ${value}`}
              />
              <p className="text-xs text-slate-400">D{index + 1}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
