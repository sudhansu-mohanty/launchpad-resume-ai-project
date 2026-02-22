"use client";

import { useEffect, useState } from "react";
import Faq from "../components/Faq";
import Footer from "../components/Footer";
import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import RecruiterShowcase from "../components/RecruiterShowcase";
import ResumeUploader from "../components/ResumeUploader";
import ScoreCard, { ScoreResult } from "../components/ScoreCard";


export default function HomePage() {
  const [result, setResult] = useState<ScoreResult | null>(null);
  const [error, setError] = useState<string>("");
  const sectionPadding = "clamp(10px, 4.5vw, 20px) 0";

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
          <HeroSection />

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
            <span
              style={{
                display: "block",
                marginBottom: "12px",
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "#C8E86A",
              }}
            >
              How it works
            </span>
            <h2
              style={{
                margin: "0 0 28px",
                fontSize: "clamp(1.5rem, 2.8vw, 2rem)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                color: "#E8EDE6",
                maxWidth: "520px",
                lineHeight: 1.2,
              }}
            >
              From upload to recruiter-ready in three steps
            </h2>
            <div
              style={{
                display: "grid",
                gap: "0",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                borderTop: "1px solid rgba(146,170,131,0.20)",
              }}
            >
              {[
                {
                  step: "01",
                  title: "Upload resume",
                  detail: "Drop in your PDF and run an instant ATS-style check.",
                },
                {
                  step: "02",
                  title: "Review score",
                  detail: "See strengths, gaps, and role-fit issues recruiters scan first.",
                },
                {
                  step: "03",
                  title: "Apply fixes",
                  detail: "Use guided recommendations to improve clarity and impact fast.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    borderRight: "1px solid rgba(146,170,131,0.14)",
                    borderLeft: "1px solid rgba(146,170,131,0.14)",
                    borderBottom: "1px solid rgba(146,170,131,0.14)",
                    padding: "24px 24px 24px 12px",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      fontSize: "2.4rem",
                      fontWeight: 800,
                      letterSpacing: "-0.05em",
                      color: "rgb(146, 170, 131)",
                      lineHeight: 1,
                      marginBottom: "16px",
                    }}
                  >
                    {item.step}
                  </span>
                  <h3
                    style={{
                      margin: "0 0 8px",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#E8EDE6",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, fontSize: "0.875rem", color: "#8A9E82", lineHeight: 1.65 }}>
                    {item.detail}
                  </p>
                </div>
              ))}
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
                  border: "none",
                  borderRadius: "6px",
                  background: "#92AA83",
                  color: "#080A09",
                  padding: "11px 24px",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  letterSpacing: "-0.01em",
                  cursor: "pointer",
                }}
              >
                Start free resume review
              </button>
            </div>
          </section>

          <Footer />
        </div>
      </div>

    </main>
  );
}
