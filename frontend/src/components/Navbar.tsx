"use client";

import { useEffect, useState } from "react";

const links = ["AI Resume Builder", "ATS Analysis", "Templates", "Pricing"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 6);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        width: "100%",
        height: "64px",
        backdropFilter: "blur(10px)",
        background: "rgb(0 0 0 / 0.72)",
        borderBottom: scrolled ? "1px solid rgb(176 190 169 / 0.40)" : "1px solid transparent"
      }}
    >
      <nav
        style={{
          width: "100%",
          height: "64px",
          // maxWidth: "1120px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "16px"
        }}
      >
        <div style={{ fontWeight: 700, color: "#FFFFFF", whiteSpace: "nowrap" }}>
          Launch<span style={{ color: "#E7F59E" }}>Pad</span>
        </div>

        <div
          style={{
            display: "flex",
            gap: "18px",
            alignItems: "center",
            color: "rgb(255 255 255 / 0.88)",
            fontSize: "0.92rem",
            flexWrap: "nowrap",
            justifyContent: "center"
          }}
        >
          {links.map((link) => (
            <span key={link} style={{ whiteSpace: "nowrap" }}>
              {link}
            </span>
          ))}
        </div>

        <button
          type="button"
          style={{
            background: "#92AA83",
            color: "#FFFFFF",
            border: "1px solid rgb(176 190 169 / 0.55)",
            borderRadius: "999px",
            padding: "9px 14px",
            fontWeight: 600,
            cursor: "pointer",
            whiteSpace: "nowrap"
          }}
        >
          Get Started Free
        </button>
      </nav>
    </header>
  );
}
