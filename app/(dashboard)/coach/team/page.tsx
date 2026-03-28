import Link from "next/link";

const athletes = [
  { id: "a-101", name: "Jordan Mitchell", mood: "8", energy: "7", readiness: "High", status: "Good" },
  { id: "a-204", name: "Tara Nguyen", mood: "6", energy: "5", readiness: "Moderate", status: "Watch" },
  { id: "a-317", name: "Maya Thompson", mood: "4", energy: "4", readiness: "Low", status: "Concern" },
];

export default function CoachTeamPage() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">Team Roster</h2>
        <p className="mt-2 text-sm text-slate-300">Open an athlete profile to view supportive trend context.</p>
      </div>

      <div className="space-y-3 md:hidden">
        {athletes.map((athlete) => (
          <article key={athlete.id} className="rounded-2xl border border-slate-800 bg-slate-900/75 p-4">
            <div className="flex items-center justify-between gap-2">
              <Link href={`/coach/team/${athlete.id}`} className="text-base font-semibold text-cyan-200 hover:text-cyan-100">
                {athlete.name}
              </Link>
              <span
                className={[
                  "rounded-full px-2 py-0.5 text-xs font-medium",
                  athlete.status === "Concern"
                    ? "bg-rose-300/15 text-rose-200"
                    : athlete.status === "Watch"
                      ? "bg-amber-300/15 text-amber-200"
                      : "bg-emerald-300/15 text-emerald-200",
                ].join(" ")}
              >
                {athlete.status}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
              <div>
                <p className="text-slate-400">Mood</p>
                <p className="font-medium text-slate-100">{athlete.mood}</p>
              </div>
              <div>
                <p className="text-slate-400">Energy</p>
                <p className="font-medium text-slate-100">{athlete.energy}</p>
              </div>
              <div>
                <p className="text-slate-400">Readiness</p>
                <p className="font-medium text-slate-100">{athlete.readiness}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="hidden overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900/75 md:block">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">Athlete</th>
              <th className="px-4 py-3 font-medium">Mood</th>
              <th className="px-4 py-3 font-medium">Energy</th>
              <th className="px-4 py-3 font-medium">Readiness</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {athletes.map((athlete) => (
              <tr key={athlete.id} className="border-t border-slate-800 text-slate-200">
                <td className="px-4 py-3">
                  <Link href={`/coach/team/${athlete.id}`} className="text-cyan-200 hover:text-cyan-100">
                    {athlete.name}
                  </Link>
                </td>
                <td className="px-4 py-3">{athlete.mood}</td>
                <td className="px-4 py-3">{athlete.energy}</td>
                <td className="px-4 py-3">{athlete.readiness}</td>
                <td className="px-4 py-3">{athlete.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
