"use client";

import { useEffect, useState } from "react";

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
    <div className="space-y-2">
      <p className="text-xs uppercase tracking-[0.1em] text-slate-400">{label}</p>
      <div className="grid gap-2 sm:grid-cols-3">
        {options.map((option) => {
          const selected = option === value;
          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={`rounded-xl border px-3 py-2 text-sm font-medium transition ${
                selected
                  ? "border-cyan-300/60 bg-cyan-300/15 text-cyan-100"
                  : "border-slate-700 bg-slate-900/75 text-slate-300 hover:border-slate-500"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function AthleteProfilePage() {
  const [prefs, setPrefs] = useState<CoachingPrefs>(defaultPrefs);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as Partial<CoachingPrefs>;
      setPrefs((current) => ({ ...current, ...parsed }));
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const savePrefs = () => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1500);
  };

  return (
    <section className="mx-auto w-full max-w-5xl space-y-5 sm:space-y-6">
      <div className="rounded-3xl border border-cyan-300/35 bg-slate-900/75 p-6 shadow-[0_16px_40px_rgba(6,182,212,0.16)]">
        <p className="text-xs uppercase tracking-[0.12em] text-cyan-200">Player Profile</p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-100">Jordan Mitchell</h2>
        <p className="mt-2 text-sm text-slate-300">Update your coaching style preferences so support feels right for you.</p>
      </div>

      <div className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900/75 p-5 sm:p-6">
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
            className="min-h-24 w-full rounded-xl border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm text-slate-100 outline-none transition focus:border-cyan-300/60"
            placeholder="Share what helps you train and recover best"
          />
        </div>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            type="button"
            onClick={savePrefs}
            className="rounded-xl border border-cyan-300/60 bg-cyan-300/15 px-4 py-2 text-sm font-semibold text-cyan-100 transition hover:bg-cyan-300/20"
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
