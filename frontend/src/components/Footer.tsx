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
        <p>© 2026 LaunchPad Resume AI</p>
        <p>Built for confident applications.</p>
      </div>

      <style jsx>{`
        .footer {
          border-top: 1px solid rgba(146, 170, 131, 0.20);
          padding: 24px 0 32px;
        }
        .row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
        }
        .top {
          padding-bottom: 20px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(146, 170, 131, 0.12);
        }
        .brand {
          margin: 0;
          font-size: 1.1rem;
          font-weight: 800;
          letter-spacing: -0.035em;
          color: #E8EDE6;
        }
        .brand span {
          color: #C8E86A;
        }
        .copy {
          margin: 6px 0 0;
          color: #8A9E82;
          font-size: 0.875rem;
          line-height: 1.5;
        }
        .links {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }
        .links a {
          color: rgba(232, 237, 230, 0.50);
          text-decoration: none;
          font-size: 0.875rem;
          padding: 4px 8px;
          border-radius: 4px;
          transition: color 0.15s ease;
        }
        .links a:hover {
          color: #E8EDE6;
        }
        .bottom p {
          margin: 0;
          color: #4A5E43;
          font-size: 0.8rem;
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
