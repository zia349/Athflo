"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getStoredDemoTeamData } from "@/lib/demoData";

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
  const [filter, setFilter] = useState<"all-risk" | "concern" | "watch">("all-risk");
  const [athletes] = useState(() => getStoredDemoTeamData().athletes);

  const flaggedAthletes = useMemo(
    () => athletes.filter((athlete) => athlete.status === "Concern" || athlete.status === "Watch"),
    [athletes],
  );

  const visibleFlaggedAthletes = useMemo(() => {
    if (filter === "concern") {
      return flaggedAthletes.filter((athlete) => athlete.status === "Concern");
    }

    if (filter === "watch") {
      return flaggedAthletes.filter((athlete) => athlete.status === "Watch");
    }

    return flaggedAthletes;
  }, [filter, flaggedAthletes]);

  return (
    <section className="mx-auto w-full max-w-[396px] space-y-5 sm:space-y-6">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-6">
        <h2 className="text-2xl font-semibold text-slate-100">Support Alerts</h2>
        <p className="mt-2 text-sm text-slate-300">Signals intended to guide respectful support and communication.</p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-900/75 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.12em] text-slate-400">Flagged athletes</p>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value as "all-risk" | "concern" | "watch")}
            className="rounded-lg border border-slate-700 bg-slate-950/90 px-2.5 py-1.5 text-xs text-slate-100 outline-none"
          >
            <option value="all-risk">Red + Yellow</option>
            <option value="concern">Red only</option>
            <option value="watch">Yellow only</option>
          </select>
        </div>

        {visibleFlaggedAthletes.length > 0 ? (
          <div className="mt-3 space-y-2">
            {visibleFlaggedAthletes.map((athlete) => (
              <Link
                key={athlete.id}
                href={`/coach/team/${athlete.id}`}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/70 px-3 py-2"
              >
                <span className="text-sm text-slate-100">{athlete.name}</span>
                <span
                  className={[
                    "rounded-full px-2 py-0.5 text-xs font-medium",
                    athlete.status === "Concern"
                      ? "bg-rose-300/15 text-rose-200"
                      : "bg-amber-300/15 text-amber-200",
                  ].join(" ")}
                >
                  {athlete.status}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-3 text-sm text-slate-400">No athletes in this alert level right now.</p>
        )}
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
