import type { SlideItem } from "@/content/types";

/**
 * A concise, non-technical framing of how AI tooling has shifted. Reusable
 * across workshops. Kept deliberately general — no vendor claims, no dated
 * benchmarks, no invented statistics.
 *
 * DRAFT: confirm this framing is acceptable for the audience before delivery.
 */
export const AI_EVOLUTION: SlideItem[] = [
  {
    label: "Generative AI",
    detail:
      "Models that produce text, code, and images from a description. Useful, but they generate — they do not check.",
  },
  {
    label: "Agentic development",
    detail:
      "The model works in steps: reads files, makes changes, runs commands, and reports back — under a person's supervision.",
  },
  {
    label: "Domain-specific AI",
    detail:
      "A small model trained for one narrow job. Cheaper to run, easier to test, easier to trust.",
  },
  {
    label: "Edge AI",
    detail:
      "The model runs on the device in front of you. No network, no account, no data leaving the room.",
  },
];

export const AI_EVOLUTION_SUMMARY =
  "The direction of travel: from big general models in the cloud toward small, specific models that run close to where the work happens.";
