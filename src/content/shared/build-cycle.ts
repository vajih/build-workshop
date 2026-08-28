import type { SlideItem } from "@/content/types";

/** The signature methodology. Stable across every engagement. */
export const METHODOLOGY_NAME = "Frictionless Building";
export const BUILD_CYCLE_NAME = "Frictionless Build Cycle";

/**
 * The Frictionless Build Cycle. Reusable — not engagement-specific.
 * Define → Prompt → Supervise → Test → Commit → Publish → Learn → Improve
 */
export const BUILD_CYCLE: SlideItem[] = [
  { label: "Define", detail: "Decide what to build and what 'good enough' means." },
  { label: "Prompt", detail: "Describe the work precisely to the AI." },
  { label: "Supervise", detail: "Read what it produced. Accept, correct, or reject." },
  { label: "Test", detail: "Run defined cases and confirm the results." },
  { label: "Commit", detail: "Save a snapshot with version history." },
  { label: "Publish", detail: "Deploy so other people can use it." },
  { label: "Learn", detail: "See what real use reveals." },
  { label: "Improve", detail: "Feed that back into the next definition." },
];

export const BUILD_CYCLE_LABELS = BUILD_CYCLE.map((s) => s.label);

export const BUILD_CYCLE_SUMMARY =
  "AI writes code. People decide what to build, what is acceptable, and what to ship. The cycle keeps a human in charge of every decision that matters.";
