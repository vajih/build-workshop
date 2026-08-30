import type { ReactNode } from "react";
import { Oswald, Source_Serif_4 } from "next/font/google";

const frictionlessDisplay = Oswald({
  subsets: ["latin"],
  variable: "--font-frictionless-display",
});

const frictionlessSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-frictionless-serif",
});

export const metadata = {
  title: "Presentation",
  description: "Full-screen workshop presentation.",
};

/** Presentation Mode has no site chrome — it is meant for a projector. */
export default function PresentLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${frictionlessDisplay.variable} ${frictionlessSerif.variable} min-h-dvh w-full bg-[#151719]`}
    >
      {children}
    </div>
  );
}
