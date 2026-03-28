type AthleteDetailPageProps = {
  params: Promise<{ athleteId: string }>;
};

const history = [
  { day: "Fri", mood: 8, energy: 7, stress: 3, readiness: "High" },
  { day: "Thu", mood: 7, energy: 6, stress: 4, readiness: "Moderate" },
  { day: "Wed", mood: 5, energy: 5, stress: 6, readiness: "Watch" },
  { day: "Tue", mood: 6, energy: 5, stress: 5, readiness: "Moderate" },
];

export default async function CoachAthleteDetailPage({ params }: AthleteDetailPageProps) {
  const { athleteId } = await params;

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Athlete Detail</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">Athlete {athleteId}</h2>
        <p className="mt-2 text-sm text-slate-300">Support context view with mock trend history.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
        <h3 className="text-lg font-semibold text-slate-100">Recent Check-In History</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {history.map((entry) => (
            <article key={entry.day} className="rounded-xl border border-slate-800 bg-slate-950/70 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{entry.day}</p>
              <p className="mt-2 text-sm text-slate-200">Mood: {entry.mood}/10</p>
              <p className="text-sm text-slate-200">Energy: {entry.energy}/10</p>
              <p className="text-sm text-slate-200">Stress: {entry.stress}/10</p>
              <p className="text-sm text-slate-300">Readiness: {entry.readiness}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
