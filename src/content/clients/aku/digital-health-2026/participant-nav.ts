import type { NavItem } from "@/content/types";

/**
 * Participant Mode navigation. Hrefs are relative to the workshop base
 * (`/aku/digital-health-2026`); the header and step navigation prepend it.
 */
export const PARTICIPANT_NAV: NavItem[] = [
  { label: "Overview", href: "/participate" },
  { label: "Before the Workshop", href: "/participate/before-workshop" },
  { label: "Agenda", href: "/participate/agenda" },
  { label: "Concepts", href: "/participate/concepts" },
  { label: "Build 1", href: "/participate/build-1" },
  { label: "Build 2", href: "/participate/build-2" },
  { label: "Outbreak-AI", href: "/participate/outbreak-ai" },
  { label: "Team Challenge", href: "/participate/team-challenge" },
  { label: "Resources", href: "/participate/resources" },
  { label: "Feedback", href: "/participate/feedback" },
];

/** Order used for previous / next step navigation within Participant Mode. */
export const PARTICIPANT_STEP_ORDER: NavItem[] = PARTICIPANT_NAV;
