"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import RecruiterShowcase from "../components/RecruiterShowcase";
import ResumeUploader from "../components/ResumeUploader";
import ScoreCard, { ScoreResult } from "../components/ScoreCard";

export default function HomePage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string>("");
  const [apiOnline, setApiOnline] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState<string | null>(null);

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch("http://api:8000/health");
        if (!response.ok) {
          setApiOnline(false);
          return;
        }
        const payload = (await response.json()) as { status?: string };
        setApiOnline(payload.status === "ok");
      } catch {
        setApiOnline(false);
      }
    };

    checkHealth();
  }, []);

  return (
    <main style={{ minHeight: "100vh", position: "relative", color: "#FFFFFF" }}>
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: "#000000"
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "-120px",
            width: "320px",
            height: "320px",
            borderRadius: "999px",
            background: "rgb(146 170 131 / 0.40)",
            filter: "blur(80px)"
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "-100px",
            top: "40px",
            width: "280px",
            height: "280px",
            borderRadius: "999px",
            background: "rgb(231 245 158 / 0.35)",
            filter: "blur(80px)"
          }}
        />
      </div>

      <div style={{ position: "relative", zIndex: 10 }}>
        <Navbar />

        <section
          style={{
            maxWidth: "960px",
            margin: "0 auto",
            padding: "56px 20px 70px",
            textAlign: "center"
          }}
        >
          <h1 style={{ margin: "0 0 14px", fontSize: "2.5rem" }}>Upload your resume to start for free</h1>
          <p style={{ margin: "0 auto", maxWidth: "720px", color: "rgb(255 255 255 / 0.82)" }}>
            Get ATS-style scoring and clarity feedback in seconds so your resume is easier to scan
            and easier to shortlist.
          </p>
          <button
            type="button"
            style={{
              marginTop: "26px",
              background: "#92AA83",
              color: "#FFFFFF",
              border: "1px solid rgb(176 190 169 / 0.55)",
              borderRadius: "12px",
              padding: "12px 18px",
              fontWeight: 500
            }}
          >
            Start Free Analysis
          </button>

          <div
            style={{
              marginTop: "18px",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "10px"
            }}
          >
            {["No credit card", "ATS-friendly insights", "Fast PDF scoring"].map((chip) => (
              <span
                key={chip}
                style={{
                  border: "1px solid rgb(176 190 169 / 0.45)",
                  background: "rgb(224 237 197 / 0.15)",
                  color: "#FFFFFF",
                  borderRadius: "999px",
                  padding: "6px 12px",
                  fontSize: "0.875rem"
                }}
              >
                {chip}
              </span>
            ))}
          </div>

          <div
            style={{
              marginTop: "20px",
              display: "grid",
              gap: "12px",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              textAlign: "left"
            }}
          >
            {[
              { title: "AI Powered", caption: "Smart scoring from resume structure and content." },
              { title: "ATS Friendly", caption: "Keyword and formatting checks for ATS pipelines." },
              { title: "Clarity Boost", caption: "Actionable feedback to improve readability fast." }
            ].map((feature) => (
              <article
                key={feature.title}
                onMouseEnter={() => setHoveredFeature(feature.title)}
                onMouseLeave={() => setHoveredFeature(null)}
                style={{
                  border: "1px solid rgb(176 190 169 / 0.40)",
                  background: "rgb(0 0 0 / 0.65)",
                  borderRadius: "12px",
                  padding: "12px",
                  transition: "transform 150ms ease",
                  transform: hoveredFeature === feature.title ? "translateY(-4px)" : "translateY(0)"
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "12px",
                    height: "12px",
                    borderRadius: "999px",
                    background: "#E7F59E",
                    marginBottom: "10px"
                  }}
                />
                <h3 style={{ margin: "0 0 6px", fontSize: "1rem", color: "#FFFFFF" }}>{feature.title}</h3>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "#B0BEA9" }}>{feature.caption}</p>
              </article>
            ))}
          </div>
        </section>

        <section style={{ maxWidth: "960px", margin: "-24px auto 0", padding: "0 20px 30px" }}>
          <div
            style={{
              border: "1px solid rgb(176 190 169 / 0.45)",
              background: "rgb(0 0 0 / 0.75)",
              borderRadius: "16px",
              padding: "18px",
              backdropFilter: "blur(6px)"
            }}
          >
            <span
              style={{
                display: "inline-block",
                marginBottom: "12px",
                background: "#E0EDC5",
                border: `1px solid ${apiOnline ? "#92AA83" : "#B0BEA9"}`,
                color: "#000000",
                borderRadius: "999px",
                padding: "6px 10px",
                fontSize: "0.875rem"
              }}
            >
              {apiOnline ? "API Connected" : "API Offline"}
            </span>

            <ResumeUploader
              onResult={(next) => {
                setResult(next);
                setError("");
              }}
              onError={(message) => {
                setResult(null);
                setError(message);
              }}
            />

            {error ? (
              <p
                style={{
                  marginTop: "16px",
                  background: "#E7F59E",
                  border: "1px solid #B0BEA9",
                  color: "#000000",
                  padding: "10px 12px",
                  borderRadius: "10px"
                }}
              >
                {error}
              </p>
            ) : null}

            {result ? <ScoreCard result={result} /> : null}
          </div>
        </section>

        <RecruiterShowcase />
      </div>
    </main>
  );
}
