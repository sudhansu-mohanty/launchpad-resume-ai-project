import "./globals.css";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "700", "800"],
});

export const metadata = {
  title: "LaunchPad — AI Resume Feedback",
  description:
    "Get ATS-style scoring and clarity feedback on your resume in seconds. Built for fast, recruiter-ready iteration.",
  openGraph: {
    title: "LaunchPad — AI Resume Feedback",
    description:
      "Upload your resume and get ATS scoring, keyword gaps, and clarity improvements instantly.",
    type: "website",
  },
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
