import type { WorkshopModule } from "@/content/types";
import { BUILD_STEP_IDS } from "./build-one";

/**
 * Cross-link table: each module ties together its Presentation section, its
 * Participant activity, and its Facilitator segment. Ordering comes from
 * `workshop.ts` (`moduleOrder`).
 *
 * `participantHref` and `conceptHref` are relative to the workshop base
 * (`/aku/digital-health-2026`).
 */
export const MODULES: WorkshopModule[] = [
  {
    id: "welcome",
    title: "Welcome and immediate immersion",
    summary:
      "Orientation, the QR code, and the launch of Build 1 within the first ten minutes.",
    kind: "welcome",
    minutes: 10,
    participantHref: "/participate",
    presentationSectionId: "welcome",
    facilitatorId: "f-welcome",
  },
  {
    id: "build-1",
    title: "Build 1: AKU Outbreak Signal",
    summary:
      "From an empty folder to a tested, committed, deployed prototype with an interactive Karachi map. Synthetic classroom data.",
    kind: "build",
    minutes: 55,
    participantHref: "/participate/build-1",
    conceptHref: "/participate/build-1#what-you-built",
    presentationSectionId: "welcome",
    facilitatorId: "f-build1",
    checkpointIds: BUILD_STEP_IDS.map((id) => `${id}-complete`),
  },
  {
    id: "what-changed",
    title: "What just changed?",
    summary:
      "From idea to working application, AI as a pair programmer, and the build cycle.",
    kind: "concept",
    minutes: 15,
    conceptHref: "/participate/concepts#what-changed",
    presentationSectionId: "what-changed",
    facilitatorId: "f-concepts",
  },
  {
    id: "ai-and-building",
    title: "AI and building",
    summary:
      "Generative, agentic, domain-specific, and edge AI — and building useful systems.",
    kind: "concept",
    minutes: 10,
    conceptHref: "/participate/concepts#ai-and-building",
    presentationSectionId: "ai-and-building",
    facilitatorId: "f-concepts",
  },
  {
    id: "responsible-ai",
    title: "Responsible healthcare AI",
    summary:
      "Signal versus conclusion, decision support versus diagnosis, explainability, oversight.",
    kind: "concept",
    minutes: 10,
    conceptHref: "/participate/concepts#responsible-ai",
    presentationSectionId: "responsible-ai",
    facilitatorId: "f-outbreak-ai",
  },
  {
    id: "outbreak-ai",
    title: "Outbreak-AI",
    summary:
      "A small domain-specific model running offline on an ESP32. Edge versus cloud AI.",
    kind: "demo",
    minutes: 15,
    participantHref: "/participate/outbreak-ai",
    presentationSectionId: "outbreak-ai",
    facilitatorId: "f-outbreak-ai",
  },
  {
    id: "team-challenge",
    title: "Team Challenge",
    summary:
      "A 40-minute team build sprint: design, build, and present a minimum viable prototype for a real user.",
    kind: "challenge",
    minutes: 50,
    participantHref: "/participate/team-challenge",
    presentationSectionId: "team-challenge",
    facilitatorId: "f-team-build",
  },
  {
    id: "presentations-close",
    title: "Team presentations and close",
    summary: "Five team presentations, feedback, reflection, and next steps.",
    kind: "concept",
    minutes: 30,
    participantHref: "/participate/resources",
    presentationSectionId: "presentations-close",
    facilitatorId: "f-presentations",
  },
];

export function moduleById(id: string): WorkshopModule | undefined {
  return MODULES.find((m) => m.id === id);
}

export function moduleByPresentationSection(
  sectionId: string,
): WorkshopModule | undefined {
  return MODULES.find((m) => m.presentationSectionId === sectionId);
}

export function moduleByFacilitatorId(
  facilitatorId: string,
): WorkshopModule | undefined {
  return MODULES.find((m) => m.facilitatorId === facilitatorId);
}
