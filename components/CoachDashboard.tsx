"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { getStoredDemoTeamData } from "@/lib/demoData";

interface RadarAxis {
  label: string;
  value: number;
  color: string;
}

interface StatCardProps {
  label: string;
  value: string;
  sub: string;
  glowColor: string;
  borderColor: string;
  textColor: string;
  onClick?: () => void;
}

const RADAR_AXES: RadarAxis[] = [
  { label: "Mood", value: 7.6, color: "#2dd4bf" },
  { label: "Energy", value: 6.9, color: "#a78bfa" },
  { label: "Stress", value: 4.2, color: "#fb7185" },
  { label: "Sleep", value: 7.1, color: "#fbbf24" },
  { label: "Readiness", value: 8.1, color: "#34d399" },
];

function RadarChart({ axes }: { axes: RadarAxis[] }) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 1200;
    const animate = (ts: number) => {
      if (!start) start = ts;
      const t = Math.min((ts - start) / duration, 1);
      setProgress(1 - Math.pow(1 - t, 3));
      if (t < 1) rafRef.current = requestAnimationFrame(animate);
    };
    const timer = setTimeout(() => {
      rafRef.current = requestAnimationFrame(animate);
    }, 300);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const cx = 125;
  const cy = 125;
  const maxR = 88;
  const n = axes.length;
  const angle = (i: number) => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i: number, r: number): [number, number] => [
    cx + Math.cos(angle(i)) * r,
    cy + Math.sin(angle(i)) * r,
  ];

  const dataPoints = axes.map((ax, i) => pt(i, (ax.value / 10) * maxR * progress));
  const dataStr = dataPoints.map(([x, y]) => `${x},${y}`).join(" ");
  const avgScore = Math.round((axes.reduce((s, a) => s + a.value, 0) / axes.length) * 10 * progress);

  return (
    <div style={{ display: "flex", gap: 24, alignItems: "center", justifyContent: "center", flexWrap: "wrap", width: "100%" }}>
      <svg width={250} height={250} viewBox="0 0 250 250">
        {[0.2, 0.4, 0.6, 0.8, 1].map((frac, wi) => (
          <polygon
            key={wi}
            points={axes.map((_, i) => pt(i, maxR * frac).join(",")).join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}
        {axes.map((_, i) => {
          const [x, y] = pt(i, maxR);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={x}
              y2={y}
              stroke="rgba(255,255,255,0.06)"
              strokeWidth={1}
            />
          );
        })}
        {axes.map((ax, i) => {
          const [lx, ly] = pt(i, maxR + 18);
          return (
            <text
              key={i}
              x={lx}
              y={ly + 4}
              textAnchor="middle"
              fill={ax.color}
              fontSize={11}
              fontFamily="Outfit, sans-serif"
              fontWeight={600}
            >
              {ax.label}
            </text>
          );
        })}
        {progress > 0 && (
          <>
            <polygon points={dataStr} fill="rgba(45,212,191,0.08)" />
            <polygon
              points={dataStr}
              fill="none"
              stroke="rgba(45,212,191,0.8)"
              strokeWidth={2}
              strokeLinejoin="round"
            />
          </>
        )}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p[0]}
            cy={p[1]}
            r={5}
            fill={axes[i].color}
            style={{ opacity: progress > 0.6 ? 1 : 0, transition: "opacity 0.4s" }}
          />
        ))}
      </svg>

      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, minWidth: 140 }}>
        {axes.map((ax) => (
          <div key={ax.label} style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{ width: 10, height: 10, borderRadius: "50%", background: ax.color, flexShrink: 0 }}
            />
            <div style={{ fontSize: 13, color: "#7a9fb0", fontWeight: 500, flex: 1 }}>{ax.label}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: ax.color }}>{ax.value}</div>
          </div>
        ))}
        <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "6px 0" }} />
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              fontSize: 44,
              fontWeight: 700,
              color: "#fff",
              lineHeight: 1,
              fontFamily: "Outfit, sans-serif",
            }}
          >
            {avgScore}
          </div>
          <div style={{ fontSize: 12, color: "#3d6878", marginTop: 4 }}>Team wellness score</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, glowColor, borderColor, textColor, onClick }: StatCardProps) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        background: "rgba(10,20,34,0.72)",
        borderRadius: 16,
        padding: 18,
        border: `1px solid ${borderColor}`,
        position: "relative",
        overflow: "hidden",
        cursor: onClick ? "pointer" : "default",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "transform 0.25s",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 80,
          height: 80,
          borderRadius: "50%",
          top: -20,
          right: -20,
          opacity: 0.22,
          filter: "blur(22px)",
          background: glowColor,
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: "#2a5060",
          marginBottom: 8,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: textColor,
          lineHeight: 1,
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {value}
      </div>
      <div style={{ fontSize: 11, color: "#2a5060", marginTop: 5 }}>{sub}</div>
    </div>
  );
}

function RingProgress({ checked, total }: { checked: number; total: number }) {
  const circ = 364.4;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ * (1 - checked / total)), 400);
    return () => clearTimeout(t);
  }, [checked, total, circ]);

  return (
    <div style={{ position: "relative", width: 150, height: 150, margin: "12px auto 8px" }}>
      <svg width={150} height={150} viewBox="0 0 150 150" style={{ transform: "rotate(-90deg)" }}>
        <defs>
          <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0d9488" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
        <circle cx={75} cy={75} r={58} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10} />
        <circle
          cx={75}
          cy={75}
          r={58}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{
            transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)",
            filter: "drop-shadow(0 0 8px rgba(45,212,191,0.5))",
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span style={{ fontSize: 30, fontWeight: 700, color: "#fff", fontFamily: "Outfit, sans-serif" }}>
          {checked}
        </span>
        <span style={{ fontSize: 11, color: "#3d6070" }}>of {total}</span>
      </div>
    </div>
  );
}

function BottomCard({
  title,
  hint,
  pct,
  href,
}: {
  title: string;
  hint: string;
  pct: string;
  href: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(10,20,34,0.72)",
        borderRadius: 16,
        padding: 18,
        cursor: "pointer",
        display: "block",
        textDecoration: "none",
        border: `1px solid ${hovered ? "rgba(45,212,191,0.22)" : "rgba(45,212,191,0.09)"}`,
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition: "all 0.25s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 10,
          letterSpacing: "0.22em",
          textTransform: "uppercase" as const,
          color: "#2a5060",
          marginBottom: 12,
        }}
      >
        {title} <span style={{ color: "#2dd4bf", fontSize: 14, letterSpacing: 0 }}>-&gt;</span>
      </div>
      <div
        style={{
          height: 5,
          background: "rgba(255,255,255,0.06)",
          borderRadius: 4,
          overflow: "hidden",
          marginTop: 14,
        }}
      >
        <div
          style={{
            height: "100%",
            width: pct,
            borderRadius: 4,
            background: "linear-gradient(to right,#0d9488,#2dd4bf)",
            boxShadow: "0 0 8px rgba(45,212,191,0.3)",
          }}
        />
      </div>
      <div style={{ fontSize: 11, color: "#2a5060", marginTop: 10 }}>{hint}</div>
    </Link>
  );
}

export default function CoachDashboard() {
  const [showCheckedInList, setShowCheckedInList] = useState(false);
  const [teamData] = useState(() => getStoredDemoTeamData());

  const totalAthletes = teamData.athletes.length || 1;
  const checkedInPlayers = teamData.athletes.filter((athlete) => athlete.checkedInToday);
  const flaggedPlayers = teamData.athletes.filter((athlete) => athlete.status === "Concern" || athlete.status === "Watch");
  const avgMood = (teamData.athletes.reduce((sum, athlete) => sum + athlete.mood, 0) / totalAthletes).toFixed(1);
  const avgReadiness = Math.round(
    (teamData.athletes.reduce((sum, athlete) => {
      if (athlete.readiness === "High") return sum + 85;
      if (athlete.readiness === "Moderate") return sum + 70;
      return sum + 55;
    }, 0) / totalAthletes),
  );

  const stats = [
    {
      label: "Average mood",
      value: `${avgMood} / 10`,
      sub: "Teamwide today",
      glowColor: "#2dd4bf",
      borderColor: "rgba(45,212,191,0.18)",
      textColor: "#2dd4bf",
    },
    {
      label: "Check-ins",
      value: `${checkedInPlayers.length} / ${totalAthletes}`,
      sub: "Tap to view who checked in",
      glowColor: "#a78bfa",
      borderColor: "rgba(167,139,250,0.18)",
      textColor: "#a78bfa",
      onClick: () => setShowCheckedInList((prev) => !prev),
    },
    {
      label: "Flagged",
      value: `${flaggedPlayers.length}`,
      sub: "Needs supportive follow-up",
      glowColor: "#fb7185",
      borderColor: "rgba(251,113,133,0.18)",
      textColor: "#fb7185",
    },
    {
      label: "Readiness",
      value: `${avgReadiness}%`,
      sub: "Average confidence score",
      glowColor: "#fbbf24",
      borderColor: "rgba(251,191,36,0.18)",
      textColor: "#fbbf24",
    },
  ];

  const bottomCards = [
    { title: "Roster", hint: "31 athletes - 84% active this week", pct: "84%", href: "/coach/team" },
    { title: "Insights", hint: "Team trend analysis available", pct: "67%", href: "/coach/trends" },
    { title: "Support", hint: "3 flagged - follow-up recommended", pct: "91%", href: "/coach/alerts" },
  ];

  return (
    <section
      style={{
        width: "100%",
        color: "#e8f4f1",
        fontFamily: "'DM Sans', sans-serif",
        background: "radial-gradient(ellipse at 18% 10%, #0d2626 0%, #050d16 55%, #06101e 100%)",
        border: "1px solid rgba(45,212,191,0.09)",
        borderRadius: 22,
        padding: 20,
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes drift {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(10px,-14px) scale(1.08); }
        }
        @keyframes drift2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(-12px,10px) scale(0.94); }
        }
      `}</style>

      <main style={{ overflowX: "hidden" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 26,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 10,
                letterSpacing: "0.28em",
                textTransform: "uppercase",
                color: "#2a5060",
                marginBottom: 4,
              }}
            >
              Coach Dashboard
            </div>
            <div
              style={{
                fontFamily: "Outfit,sans-serif",
                fontSize: 26,
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#fff",
              }}
            >
              Welcome, Coach Rivera
            </div>
            <div style={{ fontSize: 13, color: "#4a7080", marginTop: 3 }}>
              Women&apos;s Lacrosse - Team wellness pulse overview
            </div>
          </div>
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: "5px 13px",
              borderRadius: 20,
              background: "rgba(45,212,191,0.12)",
              color: "#2dd4bf",
              border: "1px solid rgba(45,212,191,0.25)",
            }}
          >
            +0.7 this week
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {stats.map((s) => (
            <StatCard key={s.label} {...s} />
          ))}
        </div>

        {showCheckedInList ? (
          <div
            style={{
              background: "rgba(8,18,32,0.82)",
              border: "1px solid rgba(167,139,250,0.24)",
              borderRadius: 16,
              padding: 14,
              marginBottom: 16,
            }}
          >
            <div style={{ fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "#8b7ab4", marginBottom: 10 }}>
              Players checked in today
            </div>
            {checkedInPlayers.length > 0 ? (
              <div style={{ display: "grid", gap: 8 }}>
                {checkedInPlayers.map((athlete) => (
                  <Link
                    key={athlete.id}
                    href={`/coach/team/${athlete.id}`}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      textDecoration: "none",
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      borderRadius: 10,
                      padding: "9px 10px",
                    }}
                  >
                    <span style={{ color: "#d9f7ff", fontSize: 13 }}>{athlete.name}</span>
                    <span style={{ color: "#8be5ff", fontSize: 12 }}>Profile + history -&gt;</span>
                  </Link>
                ))}
              </div>
            ) : (
              <div style={{ color: "#6d89a0", fontSize: 12 }}>No players have checked in yet.</div>
            )}
          </div>
        ) : null}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          <div
            style={{
              background: "rgba(10,20,34,0.72)",
              border: "1px solid rgba(45,212,191,0.09)",
              borderRadius: 18,
              padding: 22,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: 200,
                height: 200,
                borderRadius: "50%",
                top: -60,
                right: -40,
                background: "radial-gradient(circle,rgba(45,212,191,0.13),transparent 70%)",
                animation: "drift 9s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                width: 150,
                height: 150,
                borderRadius: "50%",
                bottom: -30,
                left: -30,
                background: "radial-gradient(circle,rgba(167,139,250,0.1),transparent 70%)",
                animation: "drift2 11s ease-in-out infinite",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 20,
                position: "relative",
                zIndex: 2,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#2a5060",
                    marginBottom: 4,
                  }}
                >
                  Team wellness - today
                </div>
                <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>
                  Pulse overview
                </div>
                <div style={{ fontSize: 12, color: "#3d6878", marginTop: 3 }}>{checkedInPlayers.length} of {totalAthletes} checked in</div>
              </div>
              <span style={{ fontSize: 11, color: "#3d6878" }}>Live update</span>
            </div>
            <div style={{ position: "relative", zIndex: 2 }}>
              <RadarChart axes={RADAR_AXES} />
            </div>
          </div>

          <div
            style={{
              background: "rgba(10,20,34,0.72)",
              border: "1px solid rgba(45,212,191,0.09)",
              borderRadius: 18,
              padding: 22,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "#2a5060",
                  marginBottom: 4,
                }}
              >
                Check-ins today
              </div>
              <div style={{ fontFamily: "Outfit,sans-serif", fontSize: 18, fontWeight: 700, color: "#fff" }}>
                Completion
              </div>
              <div style={{ fontSize: 12, color: "#3d6878", marginTop: 3 }}>Updates as athletes submit.</div>
            </div>
            <RingProgress checked={checkedInPlayers.length} total={totalAthletes} />
            <div style={{ fontSize: 12, color: "#2a5060", textAlign: "center", marginTop: "auto" }}>
              <span style={{ color: "#2dd4bf", fontWeight: 600 }}>{Math.max(totalAthletes - checkedInPlayers.length, 0)} remaining</span> - send a nudge?
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {bottomCards.map(({ title, hint, pct, href }) => (
            <BottomCard key={title} title={title} hint={hint} pct={pct} href={href} />
          ))}
        </div>
      </main>
    </section>
  );
}
