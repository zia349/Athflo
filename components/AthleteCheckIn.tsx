"use client";

import { useCallback, useEffect, useRef, useState } from "react";

interface MoodTheme {
  bg: string;
  orb1: string;
  orb2: string;
  orb3: string;
  btn: string;
  halo: string;
  word: string;
  desc: string;
}

const THEMES: MoodTheme[] = [
  {
    bg: "linear-gradient(160deg,#1a0a2e 0%,#0d1322 100%)",
    orb1: "rgba(139,92,246,0.28)",
    orb2: "rgba(219,39,119,0.18)",
    orb3: "rgba(99,102,241,0.15)",
    btn: "#7c3aed",
    halo: "rgba(139,92,246,0.4)",
    word: "Feeling low",
    desc: "It's okay - we've got you",
  },
  {
    bg: "linear-gradient(160deg,#1a1408 0%,#0d1322 100%)",
    orb1: "rgba(245,158,11,0.22)",
    orb2: "rgba(239,68,68,0.15)",
    orb3: "rgba(234,179,8,0.12)",
    btn: "#b45309",
    halo: "rgba(245,158,11,0.35)",
    word: "A bit off",
    desc: "Rest and recovery matters",
  },
  {
    bg: "linear-gradient(160deg,#071a1a 0%,#0d1322 100%)",
    orb1: "rgba(16,185,129,0.2)",
    orb2: "rgba(59,130,246,0.14)",
    orb3: "rgba(45,212,191,0.12)",
    btn: "#0d9488",
    halo: "rgba(45,212,191,0.35)",
    word: "Feeling okay",
    desc: "Steady and ready",
  },
  {
    bg: "linear-gradient(160deg,#041a14 0%,#0d1622 100%)",
    orb1: "rgba(45,212,191,0.28)",
    orb2: "rgba(16,185,129,0.2)",
    orb3: "rgba(52,211,153,0.15)",
    btn: "#059669",
    halo: "rgba(52,211,153,0.45)",
    word: "Feeling good!",
    desc: "Energy is up today",
  },
  {
    bg: "linear-gradient(160deg,#011a10 0%,#021622 100%)",
    orb1: "rgba(52,211,153,0.35)",
    orb2: "rgba(45,212,191,0.28)",
    orb3: "rgba(16,185,129,0.2)",
    btn: "#10b981",
    halo: "rgba(52,211,153,0.6)",
    word: "Feeling great!",
    desc: "Let's go - peak mode",
  },
];

function getTheme(val: number): MoodTheme {
  return THEMES[Math.floor((val - 1) / 2)];
}

interface FaceProps {
  moodVal: number;
  haloColor: string;
}

function MoodFace({ moodVal, haloColor }: FaceProps) {
  const idx = Math.floor((moodVal - 1) / 2);
  const mouths = [
    "M 35 70 Q 55 58 75 70",
    "M 35 68 Q 55 60 75 68",
    "M 35 68 Q 55 68 75 68",
    "M 35 66 Q 55 76 75 66",
    "M 33 64 Q 55 78 77 64",
  ];
  const brows = [0.9, 0.5, 0, 0, 0];
  const cheeks = [
    "rgba(255,160,120,0.35)",
    "rgba(255,180,140,0.2)",
    "transparent",
    "transparent",
    "transparent",
  ];
  const eyeR = [5.5, 6, 6, 6.5, 7];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 8,
        margin: "16px 0 8px",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 160,
          height: 160,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${haloColor}, transparent 70%)`,
          transition: "background 1s ease",
          opacity: 0.35,
        }}
      />
      <svg
        width={110}
        height={110}
        viewBox="0 0 110 110"
        style={{ position: "relative", zIndex: 2, transition: "all 0.5s ease" }}
      >
        <circle
          cx={55}
          cy={55}
          r={50}
          fill="rgba(255,255,255,0.08)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={1.5}
        />
        <path
          d="M 28 32 Q 37 27 46 32"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={brows[idx]}
          style={{ transition: "opacity 0.4s" }}
        />
        <path
          d="M 64 32 Q 73 27 82 32"
          fill="none"
          stroke="rgba(255,255,255,0.6)"
          strokeWidth={2.5}
          strokeLinecap="round"
          opacity={brows[idx]}
          style={{ transition: "opacity 0.4s" }}
        />
        <circle cx={37} cy={44} r={eyeR[idx]} fill="#fff" style={{ transition: "r 0.3s" }} />
        <circle cx={73} cy={44} r={eyeR[idx]} fill="#fff" style={{ transition: "r 0.3s" }} />
        <circle cx={39} cy={46} r={2.5} fill="rgba(0,0,0,0.3)" />
        <circle cx={75} cy={46} r={2.5} fill="rgba(0,0,0,0.3)" />
        <circle cx={30} cy={58} r={8} fill={cheeks[idx]} style={{ transition: "fill 0.5s" }} />
        <circle cx={80} cy={58} r={8} fill={cheeks[idx]} style={{ transition: "fill 0.5s" }} />
        <path
          d={mouths[idx]}
          fill="none"
          stroke="#fff"
          strokeWidth={3.5}
          strokeLinecap="round"
          style={{ transition: "d 0.4s" }}
        />
      </svg>
    </div>
  );
}

interface DragSliderProps {
  value: number;
  onChange: (v: number) => void;
  color: string;
  min?: number;
  max?: number;
}

function DragSlider({ value, onChange, color, min = 1, max = 10 }: DragSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const calcVal = useCallback(
    (clientX: number) => {
      if (!trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      onChange(Math.round(pct * (max - min)) + min);
    },
    [onChange, min, max],
  );

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      calcVal(x);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [calcVal]);

  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div
      ref={trackRef}
      style={{ position: "relative", height: 52, cursor: "pointer", touchAction: "none" }}
      onMouseDown={(e) => {
        dragging.current = true;
        calcVal(e.clientX);
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        calcVal(e.touches[0].clientX);
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          right: 0,
          height: 8,
          borderRadius: 4,
          background: "rgba(255,255,255,0.12)",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          left: 0,
          width: `${pct}%`,
          height: 8,
          borderRadius: 4,
          background: color,
          transition: "background 0.8s",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: `${pct}%`,
          transform: "translate(-50%, -50%)",
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: color,
          border: "3px solid #fff",
          boxShadow: "0 0 20px rgba(0,0,0,0.3)",
          transition: "background 0.8s",
          cursor: "grab",
        }}
      />
    </div>
  );
}

interface MetricRowProps {
  label: string;
  color: string;
}

function MetricRow({ label, color }: MetricRowProps) {
  const [val, setVal] = useState(5);
  const pct = ((val - 1) / 9) * 100;
  const trackRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const calcVal = useCallback((clientX: number) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const p = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    setVal(Math.round(p * 9) + 1);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging.current) return;
      calcVal("touches" in e ? e.touches[0].clientX : e.clientX);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    window.addEventListener("touchend", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("touchend", onUp);
    };
  }, [calcVal]);

  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>{label}</div>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff" }}>{val}</div>
      </div>
      <div
        ref={trackRef}
        style={{ position: "relative", height: 36, cursor: "pointer", touchAction: "none" }}
        onMouseDown={(e) => {
          dragging.current = true;
          calcVal(e.clientX);
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          calcVal(e.touches[0].clientX);
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            right: 0,
            height: 6,
            borderRadius: 3,
            background: "rgba(255,255,255,0.1)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            left: 0,
            width: `${pct}%`,
            height: 6,
            borderRadius: 3,
            background: color,
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: `${pct}%`,
            transform: "translate(-50%,-50%)",
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: color,
            border: "2.5px solid #fff",
            boxShadow: "0 0 12px rgba(0,0,0,0.25)",
            cursor: "grab",
          }}
        />
      </div>
    </div>
  );
}

function PillGrid({ options }: { options: string[] }) {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))",
        gap: 8,
        marginBottom: 20,
      }}
    >
      {options.map((opt) => (
        <div
          key={opt}
          onClick={() => setSelected(opt)}
          style={{
            padding: "13px 10px",
            borderRadius: 14,
            textAlign: "center",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
            border:
              selected === opt
                ? "1.5px solid rgba(255,255,255,0.6)"
                : "1.5px solid rgba(255,255,255,0.12)",
            background: selected === opt ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)",
            color: selected === opt ? "#fff" : "rgba(255,255,255,0.6)",
            transition: "all 0.2s",
          }}
        >
          {opt}
        </div>
      ))}
    </div>
  );
}

function CompletionRing({ score }: { score: number }) {
  const circ = 289;
  const [offset, setOffset] = useState(circ);

  useEffect(() => {
    const t = setTimeout(() => setOffset(circ * (1 - (score - 1) / 9)), 300);
    return () => clearTimeout(t);
  }, [score, circ]);

  return (
    <div style={{ position: "relative", width: 110, height: 110 }}>
      <svg width={110} height={110} viewBox="0 0 110 110" style={{ transform: "rotate(-90deg)" }}>
        <circle cx={55} cy={55} r={46} fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth={9} />
        <circle
          cx={55}
          cy={55}
          r={46}
          fill="none"
          stroke="#fff"
          strokeWidth={9}
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s cubic-bezier(.4,0,.2,1)" }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 22,
          fontWeight: 700,
          color: "#fff",
          fontFamily: "Outfit, sans-serif",
        }}
      >
        {score}
      </div>
    </div>
  );
}

export default function AthleteCheckIn() {
  const [step, setStep] = useState(0);
  const [moodVal, setMoodVal] = useState(5);
  const TOTAL = 3;
  const theme = getTheme(moodVal);

  const next = () => {
    if (step < TOTAL) setStep((s) => s + 1);
  };
  const prev = () => {
    if (step > 0) setStep((s) => s - 1);
  };
  const finish = () => setStep(3);
  const restart = () => {
    setStep(0);
    setMoodVal(5);
  };
  const backArrowLabel = step === 3 ? "Last question" : "Back";
  const goBackWithArrow = () => {
    if (step === 3) {
      setStep(2);
      return;
    }
    prev();
  };

  return (
    <div
      style={{
        width: "100%",
        fontFamily: "'Outfit', sans-serif",
      }}
    >
      <style>{`
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(16px,-20px) scale(1.1)} 66%{transform:translate(-10px,12px) scale(0.92)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 40%{transform:translate(-18px,14px) scale(1.12)} 70%{transform:translate(12px,-10px) scale(0.9)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,18px)} }
        @keyframes fadeSlide { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div
        style={{
          width: "min(100%, 520px)",
          margin: "0 auto",
          position: "relative",
          overflow: "hidden",
          borderRadius: 28,
          minHeight: "clamp(560px, 72vh, 700px)",
          background: theme.bg,
          transition: "background 1.2s ease",
          border: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: 220,
            height: 220,
            borderRadius: "50%",
            top: -60,
            right: -40,
            background: `radial-gradient(circle,${theme.orb1},transparent 70%)`,
            animation: "float1 9s ease-in-out infinite",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 180,
            height: 180,
            borderRadius: "50%",
            bottom: 80,
            left: -50,
            background: `radial-gradient(circle,${theme.orb2},transparent 70%)`,
            animation: "float2 11s ease-in-out infinite -2s",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 130,
            height: 130,
            borderRadius: "50%",
            bottom: 200,
            right: 0,
            background: `radial-gradient(circle,${theme.orb3},transparent 70%)`,
            animation: "float3 7s ease-in-out infinite -4s",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "32px 24px 28px",
            display: "flex",
            flexDirection: "column",
            minHeight: "clamp(560px, 72vh, 700px)",
          }}
        >
          {step > 0 && (
            <button
              type="button"
              onClick={goBackWithArrow}
              style={{
                alignSelf: "flex-start",
                background: "rgba(255,255,255,0.08)",
                border: "1px solid rgba(255,255,255,0.18)",
                color: "rgba(255,255,255,0.85)",
                borderRadius: 999,
                padding: "6px 10px",
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                marginBottom: 12,
              }}
              aria-label={`Go back to ${backArrowLabel.toLowerCase()}`}
            >
              ← {backArrowLabel}
            </button>
          )}

          <div style={{ display: "flex", gap: 5, marginBottom: 28 }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div
                key={i}
                style={{
                  height: 5,
                  borderRadius: 3,
                  width: i === step ? 22 : 10,
                  background:
                    i === step
                      ? "rgba(255,255,255,0.9)"
                      : i < step
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(255,255,255,0.2)",
                  transition: "all 0.4s",
                }}
              />
            ))}
          </div>

          {step === 0 && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, animation: "fadeSlide 0.4s ease" }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 8,
                }}
              >
                Daily check-in
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1.2, marginBottom: 6 }}>
                How are you feeling?
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 8 }}>
                Drag to rate your mood right now
              </div>

              <MoodFace moodVal={moodVal} haloColor={theme.halo} />
              <div
                style={{
                  textAlign: "center",
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#fff",
                  marginBottom: 4,
                  minHeight: 36,
                  transition: "all 0.3s",
                  fontFamily: "Outfit, sans-serif",
                }}
              >
                {theme.word}
              </div>
              <div
                style={{
                  textAlign: "center",
                  fontSize: 14,
                  color: "rgba(255,255,255,0.55)",
                  marginBottom: 24,
                  minHeight: 20,
                }}
              >
                {theme.desc}
              </div>

              <DragSlider value={moodVal} onChange={setMoodVal} color={theme.btn} />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 11,
                  color: "rgba(255,255,255,0.35)",
                  marginTop: -4,
                  marginBottom: 28,
                }}
              >
                <span>Rough</span>
                <span>Amazing</span>
              </div>

              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={next}
                  style={{
                    width: "100%",
                    padding: 17,
                    borderRadius: 16,
                    border: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    background: theme.btn,
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                    transition: "transform 0.15s, background 0.8s",
                  }}
                >
                  Continue
                </button>
                <button
                  onClick={next}
                  style={{
                    background: "transparent",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                    padding: 12,
                    borderRadius: 14,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                    width: "100%",
                  }}
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, animation: "fadeSlide 0.4s ease" }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 8,
                }}
              >
                Daily check-in
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Rate your levels</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 24 }}>Slide each one</div>
              <MetricRow label="Energy" color="#a78bfa" />
              <MetricRow label="Stress" color="#fb7185" />
              <MetricRow label="Practice readiness" color="#34d399" />
              <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={next}
                  style={{
                    width: "100%",
                    padding: 17,
                    borderRadius: 16,
                    border: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    background: theme.btn,
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                    transition: "background 0.8s",
                  }}
                >
                  Continue
                </button>
                <button
                  onClick={prev}
                  style={{
                    background: "transparent",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                    padding: 12,
                    borderRadius: 14,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                    width: "100%",
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div style={{ display: "flex", flexDirection: "column", flex: 1, animation: "fadeSlide 0.4s ease" }}>
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 8,
                }}
              >
                Daily check-in
              </div>
              <div style={{ fontSize: 24, fontWeight: 700, color: "#fff", marginBottom: 6 }}>How did you sleep?</div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginBottom: 20 }}>Pick the closest</div>
              <PillGrid options={["Under 6 hrs", "6-7 hrs", "7-8 hrs", "8+ hrs"]} />
              <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Anything on your mind?</div>
              <textarea
                placeholder="Your coach reads these privately..."
                style={{
                  width: "100%",
                  borderRadius: 14,
                  border: "1.5px solid rgba(255,255,255,0.12)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#fff",
                  fontFamily: "Outfit, sans-serif",
                  fontSize: 14,
                  padding: 14,
                  resize: "none",
                  height: 80,
                  outline: "none",
                  lineHeight: 1.5,
                }}
                onFocus={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.35)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.12)")}
              />
              <div style={{ marginTop: "auto", paddingTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <button
                  onClick={finish}
                  style={{
                    width: "100%",
                    padding: 17,
                    borderRadius: 16,
                    border: "none",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    background: theme.btn,
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                    transition: "background 0.8s",
                  }}
                >
                  Submit check-in
                </button>
                <button
                  onClick={prev}
                  style={{
                    background: "transparent",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    color: "rgba(255,255,255,0.5)",
                    padding: 12,
                    borderRadius: 14,
                    fontSize: 14,
                    cursor: "pointer",
                    fontFamily: "Outfit, sans-serif",
                    width: "100%",
                  }}
                >
                  Back
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
                gap: 14,
                animation: "fadeSlide 0.5s ease",
              }}
            >
              <CompletionRing score={moodVal} />
              <div style={{ fontSize: 26, fontWeight: 700, color: "#fff", fontFamily: "Outfit, sans-serif" }}>
                You&apos;re all set!
              </div>
              <div style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>
                Coach Rivera has been notified.
                <br />
                Keep showing up - it matters.
              </div>
              <button
                onClick={restart}
                style={{
                  marginTop: 8,
                  padding: "16px 40px",
                  borderRadius: 16,
                  border: "none",
                  fontSize: 16,
                  fontWeight: 700,
                  color: "#fff",
                  background: theme.btn,
                  cursor: "pointer",
                  fontFamily: "Outfit, sans-serif",
                  transition: "background 0.8s",
                }}
              >
                Complete check-in
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
