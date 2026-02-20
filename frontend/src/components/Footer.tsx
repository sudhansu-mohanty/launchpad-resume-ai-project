export default function Footer() {
  return (
    <footer className="footer">
      <div className="row top">
        <div>
          <p className="brand">
            Launch<span>Pad</span>
          </p>
          <p className="copy">AI resume feedback built for fast, recruiter-ready iteration.</p>
        </div>
        <div className="links">
          <a href="#">Product</a>
          <a href="#">Pricing</a>
          <a href="#">Privacy</a>
          <a href="#">Contact</a>
        </div>
      </div>
      <div className="row bottom">
        <p>(c) 2026 LaunchPad Resume AI</p>
        <p>Built for confident applications.</p>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid rgb(176 190 169 / 0.3);
          padding: 20px 0 28px;
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .top {
          padding-bottom: 16px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgb(176 190 169 / 0.2);
        }
        .brand {
          margin: 0;
          font-size: 1.18rem;
          font-weight: 700;
          color: #ffffff;
        }
        .brand span {
          color: #e7f59e;
        }
        .copy {
          margin: 6px 0 0;
          color: rgb(176 190 169 / 0.95);
          font-size: 0.9rem;
        }
        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
        }
        .links a {
          color: rgb(255 255 255 / 0.88);
          text-decoration: none;
          font-size: 0.9rem;
        }
        .bottom p {
          margin: 0;
          color: rgb(176 190 169 / 0.9);
          font-size: 0.84rem;
        }
        @media (max-width: 780px) {
          .row {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
