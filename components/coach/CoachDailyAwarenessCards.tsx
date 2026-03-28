"use client";

import { useState } from "react";

type HistoryEntry = {
  day: string;
  mood: number;
  energy: number;
  stress: number;
  readiness: string;
};

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

function getTrendSummary(entry: HistoryEntry, previous?: HistoryEntry) {
  if (!previous) {
    return "No prior day trend available yet.";
  }

  const moodDelta = entry.mood - previous.mood;

  if (moodDelta >= 2) {
    return `Mood improved by +${moodDelta} from the previous day.`;
  }

  if (moodDelta <= -2) {
    return `Mood dropped by ${Math.abs(moodDelta)} from the previous day.`;
  }

  if (moodDelta > 0) {
    return `Mood is slightly up (+${moodDelta}) from the previous day.`;
  }

  if (moodDelta < 0) {
    return `Mood is slightly down (${moodDelta}) from the previous day.`;
  }

  return "Mood is stable compared with the previous day.";
}

function getRiskSummary(entry: HistoryEntry) {
  if (entry.mood <= 5 || entry.stress >= 6) {
    return "Awareness: elevated strain signals today - approach with extra support and flexibility.";
  }

  if (entry.readiness.toLowerCase() === "high" && entry.energy >= 7) {
    return "Awareness: athlete shows strong readiness and can handle focused challenge.";
  }

  return "Awareness: moderate readiness - keep expectations clear and check response mid-session.";
}

function getCoachingApproach(entry: HistoryEntry, prefs: CoachingPrefs) {
  const communicationLead = prefs.communicationStyle === "Direct"
    ? "Use concise, direct cues"
    : prefs.communicationStyle === "Supportive"
      ? "Use affirming and supportive language"
      : "Blend direct cues with reassurance";

  const intensityGuide = entry.stress >= 6 || entry.mood <= 5
    ? "Start with a lighter load, then reassess after warm-up."
    : "Use planned session intensity and monitor quality, not just output.";

  const timingGuide = `Give key feedback ${prefs.feedbackTiming.toLowerCase()}.`;

  return {
    communicationLead,
    intensityGuide,
    timingGuide,
  };
}

export default function CoachDailyAwarenessCards({ history }: { history: HistoryEntry[] }) {
  const [openDay, setOpenDay] = useState<string | null>(null);
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

  const [latest, ...past] = history;

  if (!latest) {
    return null;
  }

  const renderSummary = (entry: HistoryEntry, previous?: HistoryEntry) => {
    const isOpen = openDay === entry.day;
    const trendSummary = getTrendSummary(entry, previous);
    const riskSummary = getRiskSummary(entry);
    const approach = getCoachingApproach(entry, prefs);

    return (
      <>
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{entry.day}</p>
            <p className="mt-2 text-sm text-slate-200">Mood: {entry.mood}/10</p>
            <p className="text-sm text-slate-200">Energy: {entry.energy}/10</p>
            <p className="text-sm text-slate-200">Stress: {entry.stress}/10</p>
            <p className="text-sm text-slate-300">Readiness: {entry.readiness}</p>
          </div>

          <button
            type="button"
            onClick={() => setOpenDay(isOpen ? null : entry.day)}
            className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-cyan-300/40 bg-cyan-300/10 text-cyan-100 transition hover:bg-cyan-300/20"
            aria-label={`Toggle awareness summary for ${entry.day}`}
          >
            <span className={`text-sm transition-transform ${isOpen ? "rotate-90" : "rotate-0"}`}>▶</span>
          </button>
        </div>

        {isOpen ? (
          <div className="mt-3 rounded-xl border border-cyan-300/25 bg-gradient-to-br from-cyan-400/10 to-violet-400/10 p-3">
            <p className="text-[10px] uppercase tracking-[0.12em] text-cyan-200">Auto awareness summary (demo)</p>
            <p className="mt-1.5 text-sm text-slate-200">{trendSummary}</p>
            <p className="mt-1 text-sm text-slate-300">{riskSummary}</p>

            <div className="mt-2.5 space-y-1.5 rounded-lg border border-white/10 bg-white/5 p-2.5">
              <p className="text-[10px] uppercase tracking-[0.12em] text-slate-400">Coaching approach today</p>
              <p className="text-sm text-slate-200">{approach.communicationLead}.</p>
              <p className="text-sm text-slate-200">{approach.intensityGuide}</p>
              <p className="text-sm text-slate-200">{approach.timingGuide}</p>
            </div>
          </div>
        ) : null}
      </>
    );
  };

  return (
    <div className="mt-4 space-y-4">
      <article className="relative overflow-hidden rounded-2xl border border-cyan-300/35 bg-gradient-to-br from-[#0d1c3d]/90 via-[#13294a]/80 to-[#2a1845]/85 px-4 py-3 shadow-[0_16px_36px_rgba(34,211,238,0.18)]">
        <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-cyan-300/30 blur-2xl" />
        <div className="pointer-events-none absolute -left-4 bottom-0 h-16 w-16 rounded-full bg-violet-300/25 blur-2xl" />

        <div className="mb-2 flex items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1 rounded-full border border-cyan-300/45 bg-cyan-300/12 px-2.5 py-1">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-200" />
            <span className="text-[10px] uppercase tracking-[0.14em] text-cyan-100">Newest</span>
          </div>
          <span className="text-[10px] uppercase tracking-[0.12em] text-slate-300">Updated today</span>
        </div>

        <p className="mb-2 text-[10px] uppercase tracking-[0.14em] text-cyan-200">Most recent day</p>
        {renderSummary(latest, past[0])}
      </article>

      <div>
        <p className="mb-2 text-xs uppercase tracking-[0.12em] text-slate-400">Past mood history</p>
        <div className="-mx-1.5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-3 px-1.5">
            {past.map((entry, index) => (
              <article
                key={entry.day}
                className="w-[230px] shrink-0 rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-3"
              >
                {renderSummary(entry, past[index + 1])}
              </article>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
