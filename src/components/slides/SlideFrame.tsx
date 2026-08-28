import type { ReactNode } from "react";

/**
 * The inner content region of a slide. The Deck owns the 16:9 stage and the
 * chrome (slide number, section, controls); this just lays out one slide's
 * content with generous padding and vertical centring.
 */
export function SlideFrame({
  children,
  align = "center",
}: {
  children: ReactNode;
  align?: "center" | "start";
}) {
  return (
    <div
      className={`flex h-full w-full flex-col gap-[clamp(0.75rem,2vh,1.75rem)] p-[var(--slide-pad)] ${
        align === "center" ? "justify-center" : "justify-start pt-[8vh]"
      }`}
    >
      {children}
    </div>
  );
}
