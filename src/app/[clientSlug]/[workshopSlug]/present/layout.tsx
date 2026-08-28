import type { ReactNode } from "react";

export const metadata = {
  title: "Presentation",
  description: "Full-screen workshop presentation.",
};

/** Presentation Mode has no site chrome — it is meant for a projector. */
export default function PresentLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh w-full bg-[#06130d]">{children}</div>;
}
