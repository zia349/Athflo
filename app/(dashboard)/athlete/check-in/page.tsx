const questions = [
  "Mood rating",
  "Energy level",
  "Stress level",
  "Sleep quality",
  "Practice readiness",
];

export default function AthleteCheckInPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-emerald-300/30 bg-slate-900/70 p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-emerald-200">Daily Check-In</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">Complete in under 30 seconds</h2>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
        <ul className="space-y-3 text-sm text-slate-300">
          {questions.map((question) => (
            <li key={question} className="rounded-xl border border-slate-800 bg-slate-950/60 px-4 py-3">
              {question}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
