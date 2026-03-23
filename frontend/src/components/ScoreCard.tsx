"use client";

import { useEffect, useRef, useState } from "react";

export type ScoreResult = {
  filename: string;
  total_score: number;
  categories: {
    skills: number;
    experience: number;
    projects: number;
    education: number;
    impact: number;
    formatting: number;
  };
  summary: string;
  strengths: string[];
  weaknesses: string[];
};

type Props = {
  result: ScoreResult;
};

type BreakdownItem = {
  label: string;
  value: number;
  max: number;
  status: "good" | "warn" | "bad";
};

const statusColor = {
  good: "#92AA83",
  warn: "#E7F59E",
  bad: "#B0BEA9"
} as const;

function buildBreakdown(categories: any): BreakdownItem[] {
  const items = [
    { label: "Structure", value: categories.experience + categories.education, max: 20 },
    { label: "Impact", value: categories.impact, max: 20 },
    { label: "Keywords", value: categories.skills, max: 20 },
    { label: "Clarity", value: categories.projects, max: 20 },
    { label: "Formatting", value: categories.formatting, max: 20 }
  ];

  return items.map((item) => {
    const ratio = item.value / item.max;
    const status = ratio >= 0.7 ? "good" : ratio >= 0.45 ? "warn" : "bad";
    return {
      ...item,
      value: Math.max(0, Math.min(item.max, item.value)),
      status
    };
  });
}

export default function ScoreCard({ result }: Props) {
  const total = Math.max(0, Math.min(100, result.total_score));
  const [displayScore, setDisplayScore] = useState(0);
  const [barsReady, setBarsReady] = useState(false);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    setDisplayScore(0);
    setBarsReady(false);

    const timeout = setTimeout(() => {
      setBarsReady(true);
      const duration = 900;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setDisplayScore(Math.round(eased * total));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    }, 80);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(rafRef.current);
    };
  }, [total]);

  const breakdown = buildBreakdown(result.categories);

  return (
    <section
      style={{
        marginTop: "20px",
        background: "rgb(0 0 0 / 0.72)",
        border: "1px solid rgb(176 190 169 / 0.40)",
        borderRadius: "14px",
        padding: "18px",
        display: "grid",
        gap: "14px",
        color: "rgb(255 255 255 / 0.92)"
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <h2 style={{ margin: 0, color: "#FFFFFF" }}>Your LaunchPad Score</h2>
        <p
          style={{
            margin: 0,
            fontSize: "1.8rem",
            fontWeight: 700,
            color: "#FFFFFF",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {displayScore}/100
        </p>
      </div>

      <div
        style={{
          width: "100%",
          height: "10px",
          borderRadius: "999px",
          background: "rgb(176 190 169 / 0.35)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: barsReady ? `${total}%` : "0%",
            height: "100%",
            borderRadius: "999px",
            background: "linear-gradient(90deg, rgb(146 170 131 / 0.95) 0%, rgb(231 245 158 / 0.95) 100%)",
            transition: "width 900ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>

      <div style={{ display: "grid", gap: "8px" }}>
        {breakdown.map((item, index) => (
          <div
            key={item.label}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "rgb(0 0 0 / 0.45)",
              border: "1px solid rgb(176 190 169 / 0.32)",
              borderRadius: "10px",
              padding: "8px 10px",
              animation: `lp-fade-up 0.4s cubic-bezier(0.16,1,0.3,1) ${0.15 + index * 0.08}s both`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "999px",
                  background: statusColor[item.status]
                }}
              />
              <span style={{ color: "rgb(255 255 255 / 0.90)" }}>{item.label}</span>
            </div>
            <span style={{ color: "rgb(255 255 255 / 0.86)" }}>
              {item.value}/{item.max}
            </span>
          </div>
        ))}
      </div>

      <p style={{ margin: 0, color: "rgb(255 255 255 / 0.80)" }}>{result.summary}</p>

      <button
        type="button"
        onMouseEnter={(event) => {
          event.currentTarget.style.boxShadow = "0 0 0 1px rgb(231 245 158 / 0.30), 0 10px 24px rgb(231 245 158 / 0.20)";
        }}
        onMouseLeave={(event) => {
          event.currentTarget.style.boxShadow = "none";
        }}
        style={{
          background: "#92AA83",
          color: "#FFFFFF",
          border: "1px solid rgb(176 190 169 / 0.55)",
          borderRadius: "10px",
          padding: "10px 14px",
          cursor: "pointer",
          transition: "box-shadow 150ms ease"
        }}
      >
        Import Resume
      </button>

      <p style={{ margin: 0, color: "rgb(176 190 169 / 0.95)", fontSize: "0.875rem" }}>
        Tip: strengthen role-specific keywords to improve ATS relevance.
      </p>
    </section>
  );
}
