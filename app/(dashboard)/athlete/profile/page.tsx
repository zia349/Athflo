"use client";

import { useState } from "react";
import { getStoredDemoTeamData } from "@/lib/demoData";
import { getStoredActiveAthleteId } from "@/lib/mockAuth";

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

const communicationOptions = ["Direct", "Supportive", "Balanced"];
const feedbackOptions = ["Before practice", "After practice", "Game day only"];
const motivationOptions = ["Positive challenge", "Calm encouragement", "Clear accountability"];
const checkInToneOptions = ["Short and focused", "More conversation", "Only when needed"];

function ChoiceRow({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (next: string) => void;
}) {
  return (
    <div className="space-y-2.5">
      <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{label}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`relative flex min-h-16 items-center justify-center rounded-2xl border px-3 py-2 text-center text-sm font-medium leading-tight transition ${
                selected
                  ? "border-cyan-300/70 bg-gradient-to-br from-cyan-400/20 to-violet-400/15 text-cyan-100 shadow-[0_10px_24px_rgba(56,189,248,0.2)]"
                  : "border-slate-700 bg-slate-900/65 text-slate-300 hover:border-slate-500"
              }`}
            >
              {selected ? <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_20%_10%,rgba(56,189,248,0.18),transparent_45%)]" /> : null}
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AthleteProfilePage() {
  const [athleteName] = useState(() => {
    const team = getStoredDemoTeamData();
    const activeAthleteId = getStoredActiveAthleteId() ?? "a-101";
    return team.athletes.find((athlete) => athlete.id === activeAthleteId)?.name ?? "Athlete";
  });

  const [prefs, setPrefs] = useState<CoachingPrefs>(() => {
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
  const [saved, setSaved] = useState(false);

  const savePrefs = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  return (
    <section className="mx-auto w-full max-w-[396px] space-y-4 sm:space-y-5">
      <style jsx>{`
        @keyframes profileAuraA {
          0%,100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(10px, -8px) scale(1.08); }
        }

        @keyframes profileAuraB {
          0%,100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-10px, 8px) scale(0.95); }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-slate-900/75 p-5 shadow-[0_16px_40px_rgba(6,182,212,0.2)]">
        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-300/25 blur-2xl [animation:profileAuraA_6s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -left-8 bottom-0 h-20 w-20 rounded-full bg-violet-300/20 blur-2xl [animation:profileAuraB_7.2s_ease-in-out_infinite]" />
        <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">Player Profile</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">{athleteName}</h2>
        <p className="mt-2 text-sm text-slate-300">Update your coaching style preferences so support feels right for you.</p>
      </div>

      <div className="relative overflow-hidden space-y-5 rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900/85 via-[#071238]/85 to-[#14133a]/85 p-5">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_14%,rgba(34,211,238,0.08),transparent_40%),radial-gradient(circle_at_12%_88%,rgba(168,85,247,0.08),transparent_40%)]" />
        <ChoiceRow
          label="Communication style"
          value={prefs.communicationStyle}
          options={communicationOptions}
          onChange={(next) => setPrefs((prev) => ({ ...prev, communicationStyle: next }))}
        />

        <ChoiceRow
          label="When feedback helps most"
          value={prefs.feedbackTiming}
          options={feedbackOptions}
          onChange={(next) => setPrefs((prev) => ({ ...prev, feedbackTiming: next }))}
        />

        <ChoiceRow
          label="Motivation style"
          value={prefs.motivationStyle}
          options={motivationOptions}
          onChange={(next) => setPrefs((prev) => ({ ...prev, motivationStyle: next }))}
        />

        <ChoiceRow
          label="Check-in tone"
          value={prefs.checkInTone}
          options={checkInToneOptions}
          onChange={(next) => setPrefs((prev) => ({ ...prev, checkInTone: next }))}
        />

        <div className="space-y-2">
          <label htmlFor="coach-notes" className="text-xs uppercase tracking-[0.1em] text-slate-400">
            Notes for coaches
          </label>
          <textarea
            id="coach-notes"
            value={prefs.notes}
            onChange={(event) => setPrefs((prev) => ({ ...prev, notes: event.target.value }))}
            className="min-h-24 w-full rounded-2xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm leading-7 text-slate-100 outline-none transition focus:border-cyan-300/60"
            placeholder="Share what helps you train and recover best"
          />
        </div>

        <div className="flex flex-col items-center justify-center gap-2 pt-2 text-center">
          <button
            type="button"
            onClick={savePrefs}
            className="rounded-2xl border border-cyan-300/70 bg-gradient-to-r from-cyan-400/20 to-violet-400/20 px-5 py-2.5 text-sm font-semibold text-cyan-100 transition hover:from-cyan-400/30 hover:to-violet-400/30"
          >
            Save coaching preferences
          </button>
          {saved ? (
            <span className="text-sm font-medium text-emerald-300">Saved</span>
          ) : (
            <span className="text-sm text-slate-400">Your coach will see these updates.</span>
          )}
        </div>
      </div>
    </section>
  );
}
