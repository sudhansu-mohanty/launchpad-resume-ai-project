"use client";

import { useState } from "react";

const items = [
  {
    q: "How accurate is the ATS score?",
    a: "The score estimates ATS readiness using structure, keyword relevance, and clarity signals. It is directional, not a hiring guarantee."
  },
  {
    q: "Do you store my resume data?",
    a: "Uploaded resumes are processed for analysis, and you can choose to remove saved data from your workspace at any time."
  },
  {
    q: "Can I target a specific role?",
    a: "Yes. You can tune wording and keyword focus for a role so the feedback emphasizes role-fit signals recruiters usually scan for."
  },
  {
    q: "What file formats are supported?",
    a: "The analyzer currently supports PDF uploads to preserve layout consistency and improve parsing reliability."
  },
  {
    q: "How fast is the analysis?",
    a: "Most resumes return a scored breakdown and summary in seconds, depending on file complexity and API availability."
  }
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="faq">
      <h2>Frequently asked questions</h2>
      <div className="list">
        {items.map((item, index) => {
          const expanded = openIndex === index;
          return (
            <article key={item.q} className="item">
              <button
                type="button"
                className="trigger"
                onClick={() => setOpenIndex(expanded ? null : index)}
                aria-expanded={expanded}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden="true"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "20px",
                    height: "20px",
                    flexShrink: 0,
                    fontSize: "1.15rem",
                    fontWeight: 400,
                    lineHeight: 1,
                    color: "#e7f59e",
                    transform: expanded ? "rotate(45deg)" : "rotate(0deg)",
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                  }}
                >
                  +
                </span>
              </button>
              <p
                style={{
                  margin: 0,
                  maxHeight: expanded ? "200px" : "0",
                  overflow: "hidden",
                  paddingLeft: "14px",
                  paddingRight: "14px",
                  paddingBottom: expanded ? "14px" : "0",
                  color: "rgb(176 190 169 / 0.96)",
                  lineHeight: "1.55",
                  fontSize: "0.92rem",
                  transition: "max-height 0.42s cubic-bezier(0.16, 1, 0.3, 1), padding-bottom 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                }}
              >
                {item.a}
              </p>
            </article>
          );
        })}
      </div>

      <style jsx>{`
        .faq {
          border: 1px solid rgb(176 190 169 / 0.45);
          border-radius: 18px;
          background: linear-gradient(175deg, rgb(0 0 0 / 0.8), rgb(6 12 9 / 0.9));
          box-shadow: inset 0 0 0 1px rgb(146 170 131 / 0.1);
          padding: clamp(18px, 2.2vw, 28px);
        }
        h2 {
          margin: 0;
          color: #ffffff;
          font-size: clamp(1.4rem, 2.8vw, 2rem);
        }
        .list {
          margin-top: 18px;
          display: grid;
          gap: 10px;
        }
        .item {
          border: 1px solid rgb(176 190 169 / 0.35);
          border-radius: 12px;
          background: rgb(0 0 0 / 0.56);
          overflow: hidden;
          transition: border-color 0.22s ease, box-shadow 0.22s ease;
        }
        .item:hover {
          border-color: rgb(176 190 169 / 0.55);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.28);
        }
        .trigger {
          width: 100%;
          border: 0;
          background: transparent;
          color: #ffffff;
          font-size: 0.98rem;
          font-weight: 600;
          padding: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: left;
          gap: 14px;
        }
      `}</style>
    </section>
  );
}
