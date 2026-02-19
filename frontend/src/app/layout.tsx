import "./globals.css";
import type { ReactNode } from "react";

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#F1F7EE",
          color: "#92AA83"
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto", padding: "24px" }}>{children}</div>
      </body>
    </html>
  );
}
