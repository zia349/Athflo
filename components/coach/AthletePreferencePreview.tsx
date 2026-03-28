"use client";

import { useMemo, useState } from "react";

type CoachingPrefs = {
  communicationStyle: string;
  feedbackTiming: string;
  motivationStyle: string;
  checkInTone: string;
  notes: string;
};

const STORAGE_KEY = "athflo.coaching-style-preferences";

const defaultPrefs: CoachingPrefs = {
  communicationStyle: "Direct",
  feedbackTiming: "Before practice",
  motivationStyle: "Positive challenge",
  checkInTone: "Short and focused",
  notes: "A quick heads-up before tough drills helps me reset.",
};

function PreferenceTag({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-medium text-slate-100">{value}</p>
    </div>
  );
}

export default function AthletePreferencePreview() {
  const [prefs] = useState<CoachingPrefs>(() => {
    if (typeof window === "undefined") {
      return defaultPrefs;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return defaultPrefs;
    }

    try {
      const parsed = JSON.parse(raw) as Partial<CoachingPrefs>;
      return { ...defaultPrefs, ...parsed };
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
      return defaultPrefs;
    }
  });

  const coachSummary = useMemo(
    () => `${prefs.communicationStyle} • ${prefs.feedbackTiming} • ${prefs.motivationStyle}`,
    [prefs],
  );

  return (
    <section className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-gradient-to-br from-[#0b1635]/85 via-[#111738]/80 to-[#1b1438]/80 p-5 shadow-[0_18px_45px_rgba(34,211,238,0.14)]">
      <div className="pointer-events-none absolute -right-6 -top-8 h-24 w-24 rounded-full bg-cyan-300/25 blur-2xl" />
      <div className="pointer-events-none absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-violet-300/20 blur-2xl" />

      <p className="text-xs uppercase tracking-[0.14em] text-cyan-200">Athlete coaching preferences</p>
      <h3 className="mt-2 text-xl font-semibold text-slate-100">How this athlete wants support</h3>
      <p className="mt-2 text-sm text-slate-300">{coachSummary}</p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <PreferenceTag label="Communication" value={prefs.communicationStyle} />
        <PreferenceTag label="Feedback timing" value={prefs.feedbackTiming} />
        <PreferenceTag label="Motivation" value={prefs.motivationStyle} />
        <PreferenceTag label="Check-in tone" value={prefs.checkInTone} />
      </div>

      <div className="mt-4 rounded-2xl border border-white/12 bg-white/5 p-3">
        <p className="text-[10px] uppercase tracking-[0.14em] text-slate-400">Athlete note</p>
        <p className="mt-1 text-sm leading-6 text-slate-200">{prefs.notes}</p>
      </div>
    </section>
  );
}
