import Link from "next/link";

const athletes = [
  { id: "a-101", name: "Jordan Mitchell", mood: "8", energy: "7", readiness: "High", status: "Good" },
  { id: "a-204", name: "Tara Nguyen", mood: "6", energy: "5", readiness: "Moderate", status: "Watch" },
  { id: "a-317", name: "Maya Thompson", mood: "4", energy: "4", readiness: "Low", status: "Concern" },
];

export default function CoachTeamPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">Team Roster</h2>
        <p className="mt-2 text-sm text-slate-300">Open an athlete profile to view supportive trend context.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/75">
        <table className="w-full text-left text-sm">
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
