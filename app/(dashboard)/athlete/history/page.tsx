const historyRows = [
  { day: "Fri", mood: "8/10", energy: "7/10", readiness: "Ready" },
  { day: "Thu", mood: "7/10", energy: "6/10", readiness: "Ready" },
  { day: "Wed", mood: "6/10", energy: "5/10", readiness: "Watch" },
];

export default function AthleteHistoryPage() {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">Recent Check-In History</h2>
        <p className="mt-2 text-sm text-slate-300">A quick look at your recent wellness entries.</p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/75">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-900 text-slate-300">
            <tr>
              <th className="px-4 py-3 font-medium">Day</th>
              <th className="px-4 py-3 font-medium">Mood</th>
              <th className="px-4 py-3 font-medium">Energy</th>
              <th className="px-4 py-3 font-medium">Readiness</th>
            </tr>
          </thead>
          <tbody>
            {historyRows.map((row) => (
              <tr key={row.day} className="border-t border-slate-800 text-slate-200">
                <td className="px-4 py-3">{row.day}</td>
                <td className="px-4 py-3">{row.mood}</td>
                <td className="px-4 py-3">{row.energy}</td>
                <td className="px-4 py-3">{row.readiness}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
