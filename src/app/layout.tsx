import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Build Workshop — a workshop platform where participants build",
    template: "%s · Build Workshop",
  },
  description:
    "The Build Workshop program by Vajih Khan: a reusable, content-driven workshop platform with Presentation, Participant, and Facilitator modes, built on the Frictionless Building methodology. Current engagement: Healthcare & Epidemiology, prepared for Aga Khan University.",
  applicationName: "Build Workshop",
  authors: [{ name: "Vajih Khan" }],
  keywords: [
    "Build Workshop",
    "Frictionless Building",
    "workshop platform",
    "AI pair programming",
    "presentation mode",
    "learn to build",
    "Vajih Khan",
  ],
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Build Workshop",
    title: "Build Workshop",
    description:
      "A platform for workshops where participants don't just learn — they build. Presentation, Participant, and Facilitator modes from one content source.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Build Workshop",
    description:
      "A platform for workshops where participants don't just learn — they build.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-on-primary"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
