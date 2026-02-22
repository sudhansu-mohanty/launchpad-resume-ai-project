"use client";

import { useEffect, useState, type ReactNode } from "react";

const links = [
  { label: "Resume Builder", href: "#" },
  { label: "ATS Analysis", href: "#" },
  { label: "Pricing", href: "#" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          width: "100%",
          height: "60px",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          background: scrolled
            ? "rgba(8, 10, 9, 0.92)"
            : "rgba(8, 10, 9, 0.60)",
          borderBottom: `1px solid ${
            scrolled ? "rgba(146,170,131,0.20)" : "transparent"
          }`,
          transition: "background 0.25s ease, border-color 0.25s ease",
        }}
      >
        <nav
          style={{
            width: "100%",
            maxWidth: "1120px",
            height: "60px",
            margin: "0 auto",
            padding: "0 clamp(16px, 3vw, 48px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "24px",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              fontWeight: 800,
              fontSize: "1.1rem",
              letterSpacing: "-0.035em",
              color: "#E8EDE6",
              textDecoration: "none",
              flexShrink: 0,
              lineHeight: 1,
            }}
          >
            Launch<span style={{ color: "#C8E86A" }}>Pad</span>
          </a>

          {/* Nav links */}
          <div
            style={{
              display: "flex",
              gap: "2px",
              alignItems: "center",
              flex: 1,
              justifyContent: "center",
            }}
          >
            {links.map((link) => (
              <NavLink key={link.label} href={link.href}>
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#upload"
            style={{
              background: "#92AA83",
              color: "#080A09",
              borderRadius: "6px",
              padding: "8px 18px",
              fontSize: "0.875rem",
              fontWeight: 700,
              letterSpacing: "-0.01em",
              textDecoration: "none",
              flexShrink: 0,
              display: "inline-flex",
              alignItems: "center",
              whiteSpace: "nowrap",
              transition: "background 0.15s ease, transform 0.15s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#A3BC94";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#92AA83";
            }}
          >
            Try for free
          </a>
        </nav>
      </header>

      {/* Nav link hover styles */}
      <style>{`
        .lp-nav-link {
          color: rgba(232, 237, 230, 0.55);
          font-size: 0.875rem;
          font-weight: 500;
          letter-spacing: -0.01em;
          text-decoration: none;
          padding: 6px 10px;
          border-radius: 6px;
          white-space: nowrap;
          transition: color 0.15s ease;
        }
        .lp-nav-link:hover {
          color: #E8EDE6;
        }
      `}</style>
    </>
  );
}

function NavLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="lp-nav-link">
      {children}
    </a>
  );
}
