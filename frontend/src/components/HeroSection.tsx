"use client";

import { useEffect, useRef, useState } from "react";

const SCORE_TARGET = 78;

const METRICS = [
  { label: "Structure",  value: 19, max: 20, color: "#92AA83" },
  { label: "Keywords",   value: 15, max: 20, color: "#92AA83" },
  { label: "Clarity",    value: 17, max: 20, color: "#92AA83" },
  { label: "Impact",     value: 16, max: 20, color: "#C8E86A" },
];

const CHIPS = ["No credit card", "ATS-friendly insights", "Results in seconds"];

export default function HeroSection() {
  const [score, setScore]           = useState(0);
  const [barsReady, setBarsReady]   = useState(false);
  const rafRef                      = useRef<number>(0);
  const timerRef                    = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    // Slight delay so the animation is perceived as a reaction to load
    timerRef.current = setTimeout(() => {
      setBarsReady(true);

      const duration = 1400;
      const start = performance.now();

      const tick = (now: number) => {
        const t      = Math.min((now - start) / duration, 1);
        const eased  = 1 - Math.pow(1 - t, 3); // ease-out cubic
        setScore(Math.round(eased * SCORE_TARGET));
        if (t < 1) rafRef.current = requestAnimationFrame(tick);
      };

      rafRef.current = requestAnimationFrame(tick);
    }, 350);

    return () => {
      clearTimeout(timerRef.current);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <style>{`
        .lp-hero {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(32px, 5vw, 72px);
          align-items: center;
          padding: 56px 0 40px;
        }
        @media (max-width: 820px) {
          .lp-hero { grid-template-columns: 1fr; }
          .lp-hero-preview { display: none !important; }
        }
      `}</style>

      <section className="lp-hero">

        {/* ── Left: copy ─────────────────────────────── */}
        <div>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "6px",
              marginBottom: "20px",
              fontSize: "0.72rem",
              fontWeight: 600,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "#C8E86A",
              border: "1px solid rgba(200,232,106,0.25)",
              borderRadius: "4px",
              padding: "4px 8px",
            }}
          >
            <span
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "999px",
                background: "#C8E86A",
                display: "inline-block",
              }}
            />
            AI Resume Feedback
          </span>

          <h1
            style={{
              margin: "0 0 18px",
              fontSize: "clamp(2.6rem, 5vw, 4rem)",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
              color: "#E8EDE6",
            }}
          >
            Your resume,
            <br />
            recruiter-ready.
          </h1>

          <p
            style={{
              margin: "0 0 32px",
              fontSize: "clamp(0.95rem, 1.4vw, 1.05rem)",
              color: "#8A9E82",
              lineHeight: 1.7,
              maxWidth: "400px",
            }}
          >
            Get ATS-style scoring and clarity feedback in seconds — so your
            resume is easier to scan and easier to shortlist.
          </p>

          <div style={{ display: "flex", alignItems: "center", gap: "14px", flexWrap: "wrap" }}>
            <a
              href="#upload"
              style={{
                display: "inline-flex",
                alignItems: "center",
                background: "#92AA83",
                color: "#080A09",
                borderRadius: "6px",
                padding: "12px 24px",
                fontWeight: 700,
                fontSize: "0.9rem",
                letterSpacing: "-0.01em",
                cursor: "pointer",
                textDecoration: "none",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#A3BC94"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#92AA83"; }}
            >
              Analyze my resume
            </a>
            <span style={{ fontSize: "0.8rem", color: "#4A5E43" }}>
              Free · No signup
            </span>
          </div>

          <div style={{ marginTop: "24px", display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {CHIPS.map((chip) => (
              <span
                key={chip}
                style={{
                  border: "1px solid rgba(146,170,131,0.20)",
                  color: "#4A5E43",
                  borderRadius: "4px",
                  padding: "4px 10px",
                  fontSize: "0.78rem",
                }}
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right: score preview ────────────────────── */}
        <div className="lp-hero-preview" style={{ position: "relative" }}>
          {/* Ambient glow */}
          <div
            style={{
              position: "absolute",
              inset: "-32px",
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(146,170,131,0.13) 0%, transparent 68%)",
              pointerEvents: "none",
            }}
          />

          {/* Card */}
          <div
            style={{
              position: "relative",
              background: "#0E110E",
              border: "1px solid rgba(146,170,131,0.20)",
              borderRadius: "14px",
              padding: "24px",
              boxShadow:
                "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(146,170,131,0.06)",
            }}
          >
            {/* Card header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "7px" }}>
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "999px",
                    background: "#C8E86A",
                    display: "inline-block",
                  }}
                />
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "#8A9E82",
                  }}
                >
                  LaunchPad Score
                </span>
              </div>

              {/* Animated score number */}
              <span
                style={{
                  fontSize: "2rem",
                  fontWeight: 800,
                  letterSpacing: "-0.04em",
                  color: "#E8EDE6",
                  lineHeight: 1,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {score}
                <span
                  style={{ fontSize: "0.9rem", color: "#4A5E43", fontWeight: 500 }}
                >
                  /100
                </span>
              </span>
            </div>

            {/* Main bar */}
            <div
              style={{
                width: "100%",
                height: "5px",
                borderRadius: "999px",
                background: "rgba(146,170,131,0.12)",
                marginBottom: "22px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  borderRadius: "999px",
                  background: "linear-gradient(90deg, #92AA83 0%, #C8E86A 100%)",
                  width: barsReady ? `${SCORE_TARGET}%` : "0%",
                  transition: "width 1400ms cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              />
            </div>

            {/* Metric rows */}
            <div style={{ display: "grid", gap: "12px" }}>
              {METRICS.map((metric, i) => (
                <div key={metric.label}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "5px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.78rem",
                        color: "#8A9E82",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {metric.label}
                    </span>
                    <span style={{ fontSize: "0.78rem", color: "#4A5E43" }}>
                      {metric.value}/{metric.max}
                    </span>
                  </div>
                  <div
                    style={{
                      width: "100%",
                      height: "3px",
                      borderRadius: "999px",
                      background: "rgba(146,170,131,0.10)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        borderRadius: "999px",
                        background: metric.color,
                        width: barsReady
                          ? `${(metric.value / metric.max) * 100}%`
                          : "0%",
                        transition: `width 700ms cubic-bezier(0.16, 1, 0.3, 1) ${140 + i * 110}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <p
              style={{
                margin: "18px 0 0",
                fontSize: "0.78rem",
                color: "#4A5E43",
                lineHeight: 1.6,
                borderTop: "1px solid rgba(146,170,131,0.10)",
                paddingTop: "14px",
              }}
            >
              Strong keyword coverage. Improve bullet impact for top-quartile
              shortlisting.
            </p>
          </div>

          {/* Floating badge */}
          <div
            style={{
              position: "absolute",
              bottom: "-14px",
              right: "-14px",
              background: "#0E110E",
              border: "1px solid rgba(200,232,106,0.28)",
              borderRadius: "6px",
              padding: "7px 12px",
              display: "flex",
              alignItems: "center",
              gap: "6px",
              boxShadow: "0 8px 28px rgba(0,0,0,0.55)",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "999px",
                background: "#C8E86A",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                color: "#C8E86A",
                letterSpacing: "0.04em",
                whiteSpace: "nowrap",
              }}
            >
              ATS-optimized
            </span>
          </div>
        </div>

      </section>
    </>
  );
}
