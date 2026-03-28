"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import AthletePreferencePreview from "@/components/coach/AthletePreferencePreview";
import CoachDailyAwarenessCards from "@/components/coach/CoachDailyAwarenessCards";
import { getStoredDemoTeamData } from "@/lib/demoData";

export default function CoachAthleteDetailPage() {
  const params = useParams<{ athleteId: string }>();
  const athleteId = params?.athleteId ?? "a-101";
  const [teamData] = useState(() => getStoredDemoTeamData());

  const athleteName =
    teamData.athletes.find((athlete) => athlete.id === athleteId)?.name ?? `Athlete ${athleteId}`;

  const history = useMemo(
    () =>
      teamData.historyByAthleteId[athleteId] ?? [
        { day: "Fri", mood: 8, energy: 7, stress: 3, readiness: "High" },
        { day: "Thu", mood: 7, energy: 6, stress: 4, readiness: "Moderate" },
        { day: "Wed", mood: 5, energy: 5, stress: 6, readiness: "Watch" },
        { day: "Tue", mood: 6, energy: 5, stress: 5, readiness: "Moderate" },
      ],
    [athleteId, teamData.historyByAthleteId],
  );

  return (
    <section className="mx-auto w-full max-w-[396px] space-y-5 sm:space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Athlete Detail</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">{athleteName}</h2>
        <p className="mt-2 text-sm text-slate-300">Support context view with mood-trend history for {athleteId}.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
        <h3 className="text-lg font-semibold text-slate-100">Recent Check-In History</h3>
        <CoachDailyAwarenessCards history={history} />
      </div>

      <AthletePreferencePreview />
    </section>
  );
}
