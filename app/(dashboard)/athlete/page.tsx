"use client";

import { useEffect, useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AthleteRecord, getStoredDemoTeamData } from "@/lib/demoData";
import { getStoredActiveAthleteId } from "@/lib/mockAuth";

const DAYS = [
  { label: "M", done: true },
  { label: "T", done: true },
  { label: "W", done: true },
  { label: "T", done: true },
  { label: "F", done: true },
  { label: "S", done: false },
  { label: "S", done: false },
];

const surface = "rgba(255,255,255,0.04)";
const border = "rgba(255,255,255,0.07)";
const muted = "rgba(255,255,255,0.28)";
const sub = "rgba(255,255,255,0.38)";
const blue = "#7dd3fc";
const indigo = "#818cf8";

function GlobalStyles() {
  return (
    <style>{`
      @keyframes slow   { 0%,100%{transform:translate(0,0) scale(1)}   50%{transform:translate(8px,-12px) scale(1.06)} }
      @keyframes slow2  { 0%,100%{transform:translate(0,0) scale(1)}   50%{transform:translate(-10px,8px) scale(0.96)} }
      @keyframes slow3  { 0%,100%{transform:translate(0,0)}             50%{transform:translate(6px,10px)} }
      @keyframes up     { from{opacity:0;transform:translateY(16px)}    to{opacity:1;transform:translateY(0)} }
      @keyframes blink  { 0%,100%{opacity:1}                            50%{opacity:0.35} }
      @keyframes borderGlow { 0%,100%{opacity:0.6} 50%{opacity:1} }
    `}</style>
  );
}

function AuraMesh() {
  return (
    <div style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      <div style={{ position: "absolute", width: 320, height: 320, top: -110, right: -90, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.09),transparent 68%)", animation: "slow 14s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 260, height: 260, top: 280, left: -90, borderRadius: "50%", background: "radial-gradient(circle,rgba(129,140,248,0.07),transparent 68%)", animation: "slow2 17s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 200, height: 200, bottom: 120, right: -50, borderRadius: "50%", background: "radial-gradient(circle,rgba(56,189,248,0.06),transparent 68%)", animation: "slow3 12s ease-in-out infinite -4s" }} />
    </div>
  );
}

function ReadinessCard({ value }: { value: number }) {
  const [filled, setFilled] = useState(false);
  const circ = 188.5;
  useEffect(() => { const t = setTimeout(() => setFilled(true), 350); return () => clearTimeout(t); }, []);

  return (
    <div style={{ margin: "20px 18px 0", borderRadius: 24, padding: "22px 22px 20px", background: surface, border: `1px solid ${border}`, position: "relative", overflow: "hidden", animation: "up 0.5s ease 0.08s both", display: "flex", alignItems: "center", gap: 20 }}>
      <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "linear-gradient(135deg,rgba(56,189,248,0.06) 0%,transparent 60%)", pointerEvents: "none" }} />
      <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
        <div style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", fontWeight: 500, marginBottom: 6 }}>Readiness pulse</div>
        <div style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-0.04em", color: "#fff", lineHeight: 1 }}>
          {value}<span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.3)", marginLeft: 2 }}>/100</span>
        </div>
        <div style={{ fontSize: 13, color: sub, marginTop: 6 }}>{value >= 70 ? "Steady and buildable" : "Needs recovery support"}</div>
        <div style={{ marginTop: 14, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.07)", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 2, background: `linear-gradient(to right,${blue},${indigo})`, width: filled ? `${value}%` : "0%", transition: "width 1.3s cubic-bezier(.4,0,.2,1)" }} />
        </div>
      </div>
      <div style={{ flexShrink: 0, position: "relative", width: 80, height: 80, zIndex: 1 }}>
        <svg width={80} height={80} viewBox="0 0 80 80">
          <defs>
            <linearGradient id="ag" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={blue} />
              <stop offset="100%" stopColor={indigo} />
            </linearGradient>
          </defs>
          <circle cx={40} cy={40} r={30} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={7} />
          <circle cx={40} cy={40} r={30} fill="none" stroke="url(#ag)" strokeWidth={7} strokeLinecap="round"
            strokeDasharray={circ} strokeDashoffset={filled ? circ * (1 - value / 100) : circ}
            transform="rotate(-90 40 40)" style={{ transition: "stroke-dashoffset 1.3s cubic-bezier(.4,0,.2,1)" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: "#fff" }}>{value}</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", fontWeight: 500, letterSpacing: "0.08em" }}>TODAY</div>
        </div>
      </div>
    </div>
  );
}

function Tiles({ checkedIn }: { checkedIn: boolean }) {
  const tiles = [
    { eye: "Today", val: checkedIn ? "Complete" : "Due", valColor: blue, sub: checkedIn ? "Submitted today" : "Quick mission below", tint: "rgba(56,189,248,0.05)" },
    { eye: "Streak", val: "12 days", valColor: "#fff", sub: "Keep the rhythm", tint: "rgba(129,140,248,0.05)" },
  ];
  return (
    <div style={{ margin: "10px 18px 0", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, animation: "up 0.5s ease 0.15s both" }}>
      {tiles.map(t => (
        <div key={t.eye} style={{ borderRadius: 18, padding: "16px 16px 14px", background: surface, border: `1px solid ${border}`, position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: 18, background: `linear-gradient(135deg,${t.tint},transparent)`, pointerEvents: "none" }} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: muted, fontWeight: 500, marginBottom: 6 }}>{t.eye}</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: t.valColor, letterSpacing: "-0.02em", lineHeight: 1.15 }}>{t.val}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>{t.sub}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function StreakCard() {
  return (
    <div style={{ margin: "10px 18px 0", borderRadius: 18, padding: "16px 18px", background: surface, border: `1px solid ${border}`, animation: "up 0.5s ease 0.22s both" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 22, lineHeight: 1 }}>🔥</span>
        <div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em" }}>12-day streak</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 1 }}>You&apos;re building something real</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
        {DAYS.map((d, i) => (
          <div key={i} style={{
            width: 32, height: 32, borderRadius: 10,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 10, fontWeight: 600,
            background: d.done ? "rgba(251,146,60,0.12)" : surface,
            color: d.done ? "#fb923c" : "rgba(255,255,255,0.2)",
            border: d.done ? "1px solid rgba(251,146,60,0.28)" : `1px solid ${border}`,
          }}>
            {d.done ? "✓" : d.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function MissionCard() {
  const [hov, setHov] = useState(false);
  return (
    <div style={{ margin: "10px 18px 0", borderRadius: 24, padding: 1.5, position: "relative", animation: "up 0.5s ease 0.28s both" }}>
      <div style={{
        position: "absolute", inset: 0, borderRadius: 24,
        background: "linear-gradient(135deg,rgba(56,189,248,0.55),rgba(129,140,248,0.4),rgba(56,189,248,0.2))",
        animation: "borderGlow 3s ease-in-out infinite",
      }} />
      <Link
        href="/athlete/check-in"
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          borderRadius: 23, padding: "20px 20px 18px",
          background: hov ? "#0e1a2e" : "#0c1625",
          position: "relative", overflow: "hidden", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
          transition: "background 0.2s", textDecoration: "none",
        }}
      >
        <div style={{ position: "absolute", width: 180, height: 180, borderRadius: "50%", top: -60, right: -40, background: "radial-gradient(circle,rgba(56,189,248,0.12),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 130, height: 130, borderRadius: "50%", bottom: -40, left: -20, background: "radial-gradient(circle,rgba(129,140,248,0.1),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(125,211,252,0.7)", fontWeight: 600, marginBottom: 6 }}>Quick mission</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Complete<br />your check-in</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.38)", marginTop: 5, lineHeight: 1.5, maxWidth: 180 }}>1 min · drag mood · confirm energy · done</div>
        </div>

        <div style={{
          width: 48, height: 48, borderRadius: 14, flexShrink: 0, zIndex: 1, position: "relative",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          color: blue, transition: "all 0.2s",
          background: hov ? "rgba(125,211,252,0.18)" : "rgba(125,211,252,0.1)",
          border: hov ? "1px solid rgba(125,211,252,0.4)" : "1px solid rgba(125,211,252,0.22)",
        }}>→</div>
      </Link>
    </div>
  );
}

function BottomNav({ active }: { active: number }) {
  const router = useRouter();
  const nav = [
    { label: "Home", href: "/athlete" },
    { label: "History", href: "/athlete/history" },
    { label: "Profile", href: "/athlete/profile" },
  ];

  return (
    <div style={{ margin: "14px 18px 0", background: surface, border: `1px solid ${border}`, borderRadius: 20, padding: "12px 20px", display: "flex", justifyContent: "space-around", position: "relative", zIndex: 2 }}>
      {nav.map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={() => router.push(item.href)}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, cursor: "pointer", opacity: i === active ? 1 : 0.35, transition: "opacity 0.2s", background: "none", border: "none", color: "inherit" }}
        >
          <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: "0.05em", color: i === active ? blue : "rgba(255,255,255,0.6)" }}>{item.label}</div>
          {i === active && <div style={{ width: 4, height: 4, borderRadius: "50%", background: blue }} />}
        </button>
      ))}
    </div>
  );
}

export default function AthleteDashboardPage() {
  const hydrated = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const athlete = useMemo<AthleteRecord>(() => {
    const team = getStoredDemoTeamData();

    if (!hydrated) {
      return team.athletes[0];
    }

    const activeAthleteId = getStoredActiveAthleteId() ?? "a-101";
    return team.athletes.find((record) => record.id === activeAthleteId) ?? team.athletes[0];
  }, [hydrated]);

  const readinessValue = athlete.readiness === "High" ? 85 : athlete.readiness === "Moderate" ? 70 : 55;
  const firstName = athlete.name.split(" ")[0];

  return (
    <div style={{ minHeight: "100vh", background: "#080f1a", fontFamily: "'Outfit', sans-serif", color: "#fff" }}>
      <GlobalStyles />
      <div style={{ maxWidth: 390, margin: "0 auto", position: "relative", paddingBottom: 40 }}>
        <AuraMesh />

        <div style={{ padding: "18px 18px 0", position: "relative", zIndex: 2, animation: "up 0.5s ease both" }}>
          <div style={{ fontSize: 11, letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", fontWeight: 500, marginBottom: 8 }}>Good morning</div>
          <div style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "#fff" }}>
            Welcome back,<br /><span style={{ color: blue }}>{firstName}</span>
          </div>
          <div style={{ fontSize: 13, color: sub, marginTop: 6, lineHeight: 1.6, fontWeight: 400 }}>Check in, train smart, keep your streak alive.</div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 7, marginTop: 14, padding: "7px 14px", borderRadius: 30, background: "rgba(125,211,252,0.08)", border: "1px solid rgba(125,211,252,0.18)", fontSize: 12, fontWeight: 500, color: blue }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: blue, display: "block", animation: "blink 2s ease infinite", flexShrink: 0 }} />
            On track this week
          </div>
        </div>

        <ReadinessCard value={readinessValue} />
        <Tiles checkedIn={athlete.checkedInToday} />
        <StreakCard />
        <MissionCard />
        <BottomNav active={0} />
      </div>
    </div>
  );
}
