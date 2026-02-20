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
                <span className="icon" aria-hidden="true">
                  {expanded ? "-" : "+"}
                </span>
              </button>
              {expanded ? <p>{item.a}</p> : null}
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
        .icon {
          color: #e7f59e;
          font-size: 1.1rem;
          line-height: 1;
        }
        p {
          margin: 0;
          padding: 0 14px 14px;
          color: rgb(176 190 169 / 0.96);
          line-height: 1.55;
          font-size: 0.92rem;
        }
      `}</style>
    </section>
  );
}
