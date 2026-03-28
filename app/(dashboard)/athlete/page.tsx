"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { getStoredDemoTeamData } from "@/lib/demoData";
import { getStoredActiveAthleteId } from "@/lib/mockAuth";

const weekData = [
  { day: "Mon", score: 68 },
  { day: "Tue", score: 72 },
  { day: "Wed", score: 64 },
  { day: "Thu", score: 71 },
  { day: "Fri", score: 76 },
  { day: "Sat", score: 82 },
  { day: "Sun", score: 74 },
];

function DetailBubble({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-white/10 bg-white/5 p-4">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-400">{label}</p>
      <p className="mt-2 text-base font-medium text-white">{value}</p>
    </div>
  );
}

function getMoodWord(score: number) {
  if (score >= 80) return "Flowing";
  if (score >= 72) return "Balanced";
  if (score >= 64) return "Steady";
  return "Heavy";
}

function getMoodEmoji(score: number) {
  if (score >= 80) return "😤";
  if (score >= 72) return "😌";
  if (score >= 64) return "🙂";
  return "😔";
}

export default function AthleteDashboardPage() {
  const [selectedDay, setSelectedDay] = useState("Thu");
  const [athlete] = useState(() => {
    const team = getStoredDemoTeamData();
    const activeAthleteId = getStoredActiveAthleteId() ?? "a-101";
    return team.athletes.find((record) => record.id === activeAthleteId) ?? team.athletes[0];
  });

  const highlights = [
    {
      label: "Readiness pulse",
      value: `${athlete.mood * 10} / 100`,
      note: athlete.readiness === "High" ? "Strong and focused" : athlete.readiness === "Moderate" ? "Steady and buildable" : "Needs recovery support",
      tone: "from-emerald-300/35 to-teal-300/15",
      ring: "ring-emerald-300/35",
    },
    {
      label: "Today status",
      value: athlete.checkedInToday ? "Complete" : "Check-in due",
      note: athlete.checkedInToday ? "Submitted today" : "Quick mission below",
      tone: "from-cyan-300/35 to-sky-300/15",
      ring: "ring-cyan-300/35",
    },
    {
      label: "Streak",
      value: "12 days",
      note: "Keep the rhythm",
      tone: "from-fuchsia-300/35 to-violet-300/15",
      ring: "ring-fuchsia-300/35",
    },
  ];

  const averageMood = useMemo(() => {
    const total = weekData.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / weekData.length);
  }, []);

  const currentDay = weekData.find((item) => item.day === selectedDay) ?? weekData[3];

  return (
    <section className="mx-auto w-full max-w-[396px] space-y-4 sm:space-y-5">
      <style jsx>{`
        @keyframes auraDriftA {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(14px, -10px) scale(1.12); }
        }

        @keyframes auraDriftB {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-12px, 10px) scale(0.92); }
        }
      `}</style>

      <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-slate-900/75 p-6 shadow-[0_24px_55px_rgba(8,145,178,0.2)]">
        <div className="pointer-events-none absolute -right-12 -top-14 h-48 w-48 rounded-full bg-cyan-300/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-10 bottom-0 h-36 w-36 rounded-full bg-fuchsia-300/15 blur-3xl" />
        <p className="relative text-xs uppercase tracking-[0.14em] text-cyan-200">Player Dashboard</p>
        <h2 className="relative mt-2 text-2xl font-semibold text-slate-100 sm:text-3xl">Welcome back, {athlete.name.split(" ")[0]}</h2>
        <p className="relative mt-2 max-w-2xl text-sm leading-6 text-slate-300">
          Simple goal today: check in, train smart, and keep your streak alive.
        </p>
        <div className="relative mt-4 inline-flex items-center rounded-full border border-emerald-300/45 bg-emerald-300/10 px-3 py-1 text-xs font-medium text-emerald-200">
          You are on track this week
        </div>
      </div>

      <div className="mx-auto grid w-full grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-2.5">
        {highlights.map((item, index) => (
          <article
            key={item.label}
            className={`relative overflow-hidden rounded-xl bg-slate-900/80 p-2.5 ring-1 sm:rounded-2xl sm:p-4 ${
              index === 2 ? "col-span-2 sm:col-span-1" : ""
            } ${item.ring}`}
          >
            <div className={`pointer-events-none absolute -right-7 -top-7 h-24 w-24 rounded-full bg-gradient-to-br ${item.tone} blur-2xl`} />
            <p className="text-[9px] uppercase tracking-[0.07em] text-slate-400 sm:text-[11px] sm:tracking-[0.08em]">{item.label}</p>
            <p className="mt-1 text-base font-semibold leading-tight text-slate-100 sm:mt-1.5 sm:text-2xl">{item.value}</p>
            <p className="mt-1 text-[10px] leading-snug text-slate-300 sm:text-xs">{item.note}</p>
          </article>
        ))}
      </div>

      <Link
        href="/athlete/check-in"
        className="group relative mx-auto block w-full max-w-[396px] overflow-hidden rounded-3xl border border-cyan-300/40 bg-gradient-to-br from-[#151a3a] via-[#0f1d38] to-[#2a1747] p-4 shadow-[0_20px_40px_rgba(56,189,248,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_28px_55px_rgba(56,189,248,0.28)] sm:rounded-[30px] sm:p-7"
      >
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cyan-300/30 blur-2xl [animation:auraDriftA_5.5s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute -left-6 bottom-0 h-24 w-24 rounded-full bg-violet-300/30 blur-2xl [animation:auraDriftB_6.2s_ease-in-out_infinite]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(251,191,36,0.22),transparent_45%)]" />

        <div className="relative flex flex-col gap-3 sm:gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[10px] uppercase tracking-[0.14em] text-cyan-200 sm:text-xs sm:tracking-[0.18em]">Quick mission</p>
            <p className="mt-1.5 text-xl font-semibold text-white sm:mt-2 sm:text-3xl">Complete check-in</p>
            <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-200/90 sm:mt-2 sm:text-base sm:leading-6">
              1 minute. Drag your mood, confirm your energy, submit.
            </p>
          </div>

          <div className="self-start rounded-xl border border-white/15 bg-white/5 px-2.5 py-2 sm:self-auto sm:rounded-2xl sm:px-4 sm:py-3">
            <span className="text-[10px] uppercase tracking-[0.12em] text-slate-200/80 sm:text-xs sm:tracking-[0.14em]">Tap to start now</span>
            <span className="ml-2 text-lg text-cyan-200 transition group-hover:translate-x-0.5">→</span>
          </div>
        </div>
      </Link>

      <div className="mx-auto w-full max-w-[396px] rounded-2xl border border-slate-800 bg-slate-900/75 p-4 sm:p-5">
        <div className="-mx-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max justify-center gap-2 px-1.5">
            {weekData.map((item) => (
              <button
                key={item.day}
                type="button"
                onClick={() => setSelectedDay(item.day)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition ${
                  selectedDay === item.day
                    ? "border-cyan-300/55 bg-cyan-300/15 text-cyan-100"
                    : "border-slate-700 bg-slate-900/70 text-slate-300 hover:border-slate-500"
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <div className="rounded-[36px] border border-white/10 bg-slate-900/70 p-5 md:p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-400">
              Day Detail
            </p>

            <div className="mt-4 rounded-[30px] border border-white/10 bg-gradient-to-br from-amber-400/10 via-cyan-400/10 to-violet-400/10 p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-semibold text-white">{currentDay.day}</h2>
                  <p className="mt-2 text-slate-300">
                    Your energy felt {getMoodWord(currentDay.score).toLowerCase()} this day.
                  </p>
                </div>

                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-2xl">
                  {getMoodEmoji(currentDay.score)}
                </div>
              </div>

              <div className="mt-8">
                <div className="flex items-end justify-between">
                  <span className="text-sm text-slate-400">Mood score</span>
                  <span className="text-5xl font-semibold tracking-tight text-white">{currentDay.score}</span>
                </div>

                <div className="mt-4 h-4 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-300 via-cyan-300 to-violet-400"
                    style={{ width: `${currentDay.score}%` }}
                  />
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <DetailBubble label="Readiness" value={currentDay.score >= 75 ? "Strong" : "Okay"} />
                <DetailBubble label="Energy" value={currentDay.score >= 72 ? "High" : "Steady"} />
                <DetailBubble
                  label="Compared to avg"
                  value={currentDay.score >= averageMood ? "Above" : "Below"}
                />
                <DetailBubble label="Week vibe" value={getMoodWord(currentDay.score)} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[396px] grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        <Link
          href="/athlete/history"
          className="rounded-xl border border-slate-700 bg-slate-900/75 p-3.5 transition hover:border-slate-500 sm:rounded-2xl sm:p-5"
        >
          <p className="text-[10px] uppercase tracking-[0.08em] text-slate-400 sm:text-xs sm:tracking-[0.1em]">Your history</p>
          <p className="mt-1.5 text-base font-semibold leading-tight text-slate-100 sm:mt-2 sm:text-lg">See your trend and consistency</p>
          <p className="mt-1.5 text-xs text-slate-300 sm:mt-2 sm:text-sm">Look for patterns, not perfection</p>
        </Link>
        <Link
          href="/athlete/profile"
          className="rounded-xl border border-slate-700 bg-slate-900/75 p-3.5 transition hover:border-slate-500 sm:rounded-2xl sm:p-5"
        >
          <p className="text-[10px] uppercase tracking-[0.08em] text-slate-400 sm:text-xs sm:tracking-[0.1em]">Coaching style</p>
          <p className="mt-1.5 text-base font-semibold leading-tight text-slate-100 sm:mt-2 sm:text-lg">Update how you like feedback</p>
          <p className="mt-1.5 text-xs text-slate-300 sm:mt-2 sm:text-sm">Help your coach support you better</p>
        </Link>
      </div>
    </section>
  );
}
