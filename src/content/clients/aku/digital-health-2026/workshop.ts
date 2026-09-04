import type { WorkshopConfig } from "@/content/types";
import { DISCLAIMER } from "./build-one";
import { HEALTH_SAFETY_STATEMENT } from "@/content/shared/safety";
import {
  BUILD_CYCLE_LABELS,
  METHODOLOGY_NAME,
  BUILD_CYCLE_NAME,
} from "@/content/shared/build-cycle";

/**
 * AKU Build Workshop 2026 — the first engagement of the Build Workshop program.
 *
 * Brand architecture (see `@/content/types`):
 *   creator      Vajih Khan .................... stable
 *   methodology  Frictionless Building ......... stable
 *   program      Build Workshop ................ stable
 *   industry     Healthcare & Epidemiology ..... configurable
 *   organization Aga Khan University ("AKU") ... configurable, "Prepared for"
 *   audience     the people attending .......... configurable, NOT YET CONFIRMED
 *   engagement   AKU Build Workshop 2026 ....... configurable
 *
 * EDITABLE without touching components: everything under `industry`,
 * `organization`, `audience`, and `engagement`, plus `visibility`,
 * `moduleOrder`, and `links`.
 *
 * REVIEW BEFORE DELIVERY:
 *   - `audience.description` — `confirmed: false` until the facilitator signs off.
 *     Do not claim every listed group will attend.
 *   - `engagement.date` / `location` / `department` / `course` — placeholders.
 *   - `engagement.teamBoardUrl` — the Section 6 idea thread. Post the LinkedIn
 *     anchor post ("Teams, drop your idea card as a comment") shortly before the
 *     session and paste its link here (or a Google Slides deck as a fallback).
 *     Left unset, the Team Challenge page tells participants the facilitator
 *     will share it.
 *   - `organization.publicRelationshipLabel` — keep "Prepared for" unless AKU
 *     confirms "Hosted by" / "Presented at".
 */
export const akuDigitalHealth2026: WorkshopConfig = {
  creator: {
    name: "Vajih Khan",
    role: "Creator and facilitator",
    linkedinUrl: "https://www.linkedin.com/in/vajihkhan/",
  },
  methodology: {
    name: METHODOLOGY_NAME,
    buildCycleName: BUILD_CYCLE_NAME,
    buildCycle: BUILD_CYCLE_LABELS,
  },
  program: {
    name: "Build Workshop",
    tagline: "From Idea to Working Application",
  },
  industry: {
    name: "Healthcare & Epidemiology",
    focusAreas: [
      "Outbreak and surveillance signals",
      "Decision support, not diagnosis",
      "Responsible use of health data",
    ],
  },
  organization: {
    name: "Aga Khan University",
    shortName: "AKU",
    publicRelationshipLabel: "Prepared for",
  },
  audience: {
    label: "Participants",
    // EDITABLE — requires final facilitator review. Do not assert that every
    // group listed will attend.
    description:
      "AKU researchers, clinicians, data scientists, faculty, and students",
    confirmed: false,
  },
  engagement: {
    name: "AKU Build Workshop 2026",
    year: 2026,
    date: undefined, // e.g. "March 2026" — to be confirmed
    location: undefined, // e.g. "Aga Khan University, Karachi" — to be confirmed
    department: undefined,
    course: undefined,
    teamBoardUrl: undefined, // paste the Section 6 LinkedIn idea-thread (anchor post) link
  },

  clientSlug: "aku",
  slug: "digital-health-2026",

  theme: "aku-healthcare",
  visibility: { present: true, participate: true, facilitate: true },
  moduleOrder: [
    "welcome",
    "build-1",
    "build-2",
    "what-changed",
    "ai-and-building",
    "responsible-ai",
    "outbreak-ai",
    "team-challenge",
    "presentations-close",
    "feedback",
  ],
  safety: {
    disclaimer: DISCLAIMER,
    statement: HEALTH_SAFETY_STATEMENT,
  },
  links: [
    { label: "Post-workshop feedback", href: "/participate/feedback" },
    { label: "Workshop resources", href: "/participate/resources" },
    { label: "Backup: all commands and prompts", href: "/backup" },
  ],
  storageVersion: 1,
};
