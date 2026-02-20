"use client";

import { useEffect, useState } from "react";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import RecruiterShowcase from "../components/RecruiterShowcase";
import ResumeUploader from "../components/ResumeUploader";
import ScoreCard, { ScoreResult } from "../components/ScoreCard";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export default function HomePage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string>("");
  const [apiOnline, setApiOnline] = useState(false);
  const [apiHint, setApiHint] = useState("");
  const sectionPadding = "clamp(18px, 3.4vw, 30px) 0";

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await fetch(`${API_BASE}/health`);
        if (!response.ok) {
          setApiOnline(false);
          setApiHint("API unavailable. UI remains active in demo mode.");
          return;
        }
        const payload = (await response.json()) as { status?: string };
        const online = payload.status === "ok";
        setApiOnline(online);
        setApiHint(online ? "" : "API unavailable. UI remains active in demo mode.");
      } catch {
        setApiOnline(false);
        setApiHint("API unavailable. UI remains active in demo mode.");
      }
    };

    checkHealth();
  }, []);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal-feature]"));
    if (!targets.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
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

        <div style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 clamp(14px, 2.4vw, 20px)" }}>
          <section
            style={{
              padding: "96px 0 30px",
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
              ].map((feature, index) => (
                <article
                  key={feature.title}
                  data-reveal-feature
                  className="feature-card"
                  style={{
                    border: "1px solid rgb(176 190 169 / 0.40)",
                    background: "rgb(0 0 0 / 0.65)",
                    borderRadius: "12px",
                    padding: "12px",
                    transitionDelay: `${index * 90}ms`
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

          <section style={{ padding: sectionPadding }}>
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
              {!apiOnline && apiHint ? (
                <p
                  style={{
                    margin: "0 0 12px",
                    fontSize: "0.85rem",
                    color: "#B0BEA9"
                  }}
                >
                  {apiHint}
                </p>
              ) : null}

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

          <section style={{ padding: sectionPadding }}>
            <div
              style={{
                border: "1px solid rgb(176 190 169 / 0.45)",
                background: "linear-gradient(168deg, rgb(0 0 0 / 0.78), rgb(9 14 11 / 0.88))",
                borderRadius: "18px",
                padding: "clamp(18px, 2.2vw, 28px)"
              }}
            >
              <h2 style={{ margin: 0, color: "#FFFFFF", fontSize: "clamp(1.35rem, 2.8vw, 2rem)" }}>
                How it works
              </h2>
              <p
                style={{
                  margin: "10px 0 0",
                  color: "rgb(176 190 169 / 0.95)"
                }}
              >
                Get from upload to recruiter-ready polish in three focused steps.
              </p>
              <div
                style={{
                  marginTop: "16px",
                  display: "grid",
                  gap: "12px",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))"
                }}
              >
                {[
                  {
                    step: "1",
                    title: "Upload resume",
                    detail: "Drop in your PDF and run an instant ATS-style check."
                  },
                  {
                    step: "2",
                    title: "Review score",
                    detail: "See strengths, gaps, and role-fit issues recruiters scan first."
                  },
                  {
                    step: "3",
                    title: "Apply fixes",
                    detail: "Use guided recommendations to improve clarity and impact fast."
                  }
                ].map((item) => (
                  <article
                    key={item.step}
                    style={{
                      border: "1px solid rgb(176 190 169 / 0.35)",
                      borderRadius: "12px",
                      background: "rgb(0 0 0 / 0.58)",
                      padding: "14px"
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        width: "28px",
                        height: "28px",
                        borderRadius: "999px",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "#E7F59E",
                        color: "#000000",
                        fontWeight: 700
                      }}
                    >
                      {item.step}
                    </span>
                    <h3 style={{ margin: "10px 0 6px", color: "#FFFFFF" }}>{item.title}</h3>
                    <p style={{ margin: 0, color: "#B0BEA9", fontSize: "0.9rem" }}>{item.detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section style={{ padding: sectionPadding }}>
            <RecruiterShowcase />
          </section>

          <section style={{ padding: sectionPadding }}>
            <Faq />
          </section>

          <section style={{ padding: sectionPadding }}>
            <div
              style={{
                border: "1px solid rgb(176 190 169 / 0.45)",
                borderRadius: "18px",
                padding: "clamp(22px, 2.8vw, 36px)",
                background: "radial-gradient(circle at 80% 30%, rgb(146 170 131 / 0.23), rgb(0 0 0 / 0.88) 46%)",
                textAlign: "center"
              }}
            >
              <p
                style={{
                  margin: 0,
                  fontSize: "0.8rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#B0BEA9"
                }}
              >
                Ready to ship applications faster
              </p>
              <h2 style={{ margin: "10px 0 0", fontSize: "clamp(1.45rem, 3vw, 2.2rem)", color: "#FFFFFF" }}>
                Make your next resume your strongest one
              </h2>
              <p style={{ margin: "10px auto 0", maxWidth: "700px", color: "rgb(176 190 169 / 0.95)" }}>
                Generate clearer bullet points, improve ATS readability, and send resumes with confidence.
              </p>
              <button
                type="button"
                style={{
                  marginTop: "18px",
                  border: "1px solid rgb(176 190 169 / 0.55)",
                  borderRadius: "999px",
                  background: "#92AA83",
                  color: "#FFFFFF",
                  padding: "11px 18px",
                  fontWeight: 600
                }}
              >
                Start free resume review
              </button>
            </div>
          </section>

          <Footer />
        </div>
      </div>

      <style jsx>{`
        .feature-card {
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 420ms ease, transform 420ms ease;
        }
        .feature-card.in-view {
          opacity: 1;
          transform: translateY(0);
        }
        .feature-card.in-view:hover {
          transform: translateY(-4px);
        }
      `}</style>
    </main>
  );
}
