"use client";

import { useEffect, useRef } from "react";

export default function RecruiterShowcase() {
  const showcaseRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = showcaseRef.current;
    if (!node) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("in-view");
          observer.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div ref={showcaseRef} className="showcase">
        <h2>See Your Resume Through a Recruiter Lens</h2>
        <p>
          A preview-first review layer highlights fit, structure, and role alignment before your
          resume reaches a hiring team.
        </p>

        <div className="stage">
          <div className="preview">
            <div className="preview-header">
              <span className="badge">Candidate Preview</span>
              <span className="score">82 Match</span>
            </div>
            <div className="preview-line wide" />
            <div className="preview-line med" />
            <div className="preview-line short" />
            <div className="preview-block">
              <div className="preview-line wide" />
              <div className="preview-line med" />
              <div className="preview-line short" />
            </div>
            <div className="preview-line wide" />
            <div className="preview-line med" />
            <div className="preview-line short" />
          </div>

          <article className="float left-top">
            <span className="dot" />
            <h3>Top Skills Detected</h3>
            <p>Product strategy, cross-functional execution, stakeholder updates.</p>
          </article>

          <article className="float right-mid">
            <span className="dot" />
            <h3>ATS Readability</h3>
            <p>Section hierarchy and keyword signals are clearly parsed.</p>
          </article>

          <article className="float bottom">
            <h4>Need stronger impact?</h4>
            <button type="button">Generate stronger bullets</button>
          </article>
        </div>
      </div>

      <style jsx>{`
      .showcase {
        border: 1px solid rgb(176 190 169 / 0.45);
        border-radius: 18px;
        background: linear-gradient(165deg, rgb(0 0 0 / 0.84) 0%, rgb(8 14 10 / 0.9) 100%);
        box-shadow: inset 0 0 0 1px rgb(146 170 131 / 0.1), 0 16px 45px rgb(0 0 0 / 0.35);
        padding: clamp(16px, 2vw, 24px);
        text-align: center;
        color: #ffffff;
      }
      h2 {
        margin: 0;
        font-size: clamp(1.5rem, 3.2vw, 2.15rem);
      }
      p {
        margin: 10px auto 0;
        max-width: 760px;
        color: rgb(176 190 169 / 0.95);
      }
      .stage {
        position: relative;
        margin: 12px auto 0;
        max-width: 940px;
        min-height: 320px;
      }
      .preview {
        width: min(560px, 94%);
        margin: 0 auto;
        min-height: 288px;
        border-radius: 14px;
        border: 1px solid rgb(176 190 169 / 0.45);
        background: rgb(0 0 0 / 0.8);
        box-shadow: 0 18px 40px rgb(146 170 131 / 0.2);
        padding: 16px;
        text-align: left;
      }
      .preview-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12px;
      }
      .badge {
        border: 1px solid rgb(176 190 169 / 0.45);
        background: rgb(224 237 197 / 0.16);
        color: #ffffff;
        border-radius: 999px;
        padding: 5px 10px;
        font-size: 0.76rem;
      }
      .score {
        border-radius: 999px;
        background: rgb(231 245 158 / 0.86);
        color: #000000;
        padding: 5px 10px;
        font-size: 0.76rem;
        font-weight: 700;
      }
      .preview-line {
        height: 9px;
        border-radius: 999px;
        background: rgb(176 190 169 / 0.45);
        margin-bottom: 8px;
      }
      .preview-line.wide {
        width: 94%;
      }
      .preview-line.med {
        width: 72%;
      }
      .preview-line.short {
        width: 48%;
        margin-bottom: 0;
      }
      .preview-block {
        border-radius: 12px;
        border: 1px solid rgb(176 190 169 / 0.36);
        background: rgb(224 237 197 / 0.12);
        margin: 10px 0;
        padding: 12px;
      }
      .float {
        position: absolute;
        width: min(220px, 42%);
        border-radius: 12px;
        border: 1px solid rgb(176 190 169 / 0.45);
        background: rgb(0 0 0 / 0.78);
        padding: 12px;
        text-align: left;
        box-shadow: 0 10px 24px rgb(0 0 0 / 0.38);
        opacity: 0;
        transform: translateY(16px);
        transition: opacity 420ms ease, transform 420ms ease;
      }
      .showcase.in-view .float {
        opacity: 1;
        transform: translateY(0);
      }
      .showcase.in-view .left-top {
        transition-delay: 80ms;
      }
      .showcase.in-view .right-mid {
        transition-delay: 170ms;
      }
      .showcase.in-view .bottom {
        transition-delay: 250ms;
      }
      .left-top {
        left: 0;
        top: 10px;
      }
      .right-mid {
        right: 0;
        top: 110px;
      }
      .bottom {
        right: 48px;
        bottom: 4px;
      }
      .dot {
        display: inline-block;
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: #e7f59e;
        margin-bottom: 8px;
      }
      h3 {
        margin: 0 0 6px;
        font-size: 0.94rem;
      }
      h4 {
        margin: 0 0 8px;
        font-size: 0.9rem;
      }
      .float p {
        margin: 0;
        color: rgb(176 190 169 / 0.95);
        font-size: 0.8rem;
      }
      button {
        width: 100%;
        border: 1px solid rgb(176 190 169 / 0.55);
        border-radius: 10px;
        background: #92aa83;
        color: #ffffff;
        padding: 8px 10px;
        font-size: 0.82rem;
        cursor: pointer;
      }
      @media (max-width: 900px) {
        .stage {
          min-height: auto;
          display: grid;
          gap: 12px;
        }
        .float {
          position: static;
          width: 100%;
        }
      }
    `}</style>
    </>
  );
}
