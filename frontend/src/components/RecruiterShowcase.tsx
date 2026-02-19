export default function RecruiterShowcase() {
  return (
    <section className="showcase">
      <div className="container">
        <h2>See What Recruiters See In Your Resume</h2>
        <p>
          Preview how your resume appears to hiring teams with a cleaner structure, stronger
          highlights, and role-focused clarity.
        </p>

        <div className="stage">
          <div className="preview">
            <div className="preview-header" />
            <div className="preview-line wide" />
            <div className="preview-line" />
            <div className="preview-line" />
            <div className="preview-block" />
            <div className="preview-line wide" />
            <div className="preview-line" />
            <div className="preview-line short" />
          </div>

          <article className="float left-top">
            <span className="dot" />
            <h3>Top Match Skills</h3>
            <p>Leadership, product delivery, stakeholder communication.</p>
          </article>

          <article className="float right-mid">
            <span className="dot" />
            <h3>ATS Signals</h3>
            <p>Keywords and formatting recognized for role alignment.</p>
          </article>

          <article className="float cta">
            <h4>Ready for review?</h4>
            <button type="button">Get Instant Feedback</button>
          </article>
        </div>
      </div>

      <style jsx>{`
        .showcase {
          max-width: 960px;
          margin: 18px auto 0;
          padding: 0 20px 60px;
        }
        .container {
          border: 1px solid rgb(176 190 169 / 0.45);
          border-radius: 16px;
          background: rgb(0 0 0 / 0.72);
          padding: 26px 18px 22px;
          text-align: center;
          color: #ffffff;
        }
        h2 {
          margin: 0;
          font-size: clamp(1.5rem, 3.4vw, 2.1rem);
        }
        p {
          margin: 10px auto 0;
          max-width: 720px;
          color: rgb(176 190 169 / 0.95);
        }
        .stage {
          position: relative;
          margin: 26px auto 0;
          max-width: 760px;
          min-height: 420px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .preview {
          width: min(480px, 92%);
          min-height: 350px;
          border-radius: 14px;
          border: 1px solid rgb(176 190 169 / 0.45);
          background: rgb(0 0 0 / 0.76);
          box-shadow: 0 16px 42px rgb(146 170 131 / 0.16);
          padding: 18px 16px;
          text-align: left;
        }
        .preview-header {
          height: 18px;
          width: 42%;
          border-radius: 999px;
          background: rgb(231 245 158 / 0.8);
          margin-bottom: 14px;
        }
        .preview-line {
          height: 10px;
          border-radius: 999px;
          background: rgb(176 190 169 / 0.45);
          margin-bottom: 10px;
        }
        .preview-line.wide {
          width: 92%;
        }
        .preview-line.short {
          width: 55%;
          margin-bottom: 0;
        }
        .preview-block {
          height: 88px;
          border-radius: 12px;
          border: 1px solid rgb(176 190 169 / 0.42);
          background: rgb(224 237 197 / 0.14);
          margin: 14px 0;
        }
        .float {
          position: absolute;
          width: clamp(170px, 24vw, 220px);
          border-radius: 12px;
          border: 1px solid rgb(176 190 169 / 0.45);
          background: rgb(0 0 0 / 0.78);
          padding: 12px;
          text-align: left;
          box-shadow: 0 10px 30px rgb(0 0 0 / 0.35);
        }
        .left-top {
          left: 0;
          top: 10px;
        }
        .right-mid {
          right: 0;
          top: 138px;
        }
        .cta {
          right: 56px;
          bottom: 8px;
          width: clamp(165px, 22vw, 210px);
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
          font-size: 0.95rem;
          color: #ffffff;
        }
        h4 {
          margin: 0 0 8px;
          color: #ffffff;
        }
        .float p {
          margin: 0;
          font-size: 0.82rem;
          color: rgb(176 190 169 / 0.95);
        }
        button {
          width: 100%;
          border: 1px solid rgb(176 190 169 / 0.55);
          border-radius: 10px;
          background: #92aa83;
          color: #ffffff;
          padding: 8px 10px;
          font-size: 0.85rem;
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
          .cta {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
