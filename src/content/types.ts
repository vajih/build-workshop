/** Shared content types for the Build Workshop platform. */

export interface NavItem {
  label: string;
  href: string;
}

export interface JourneyStage {
  label: string;
  detail: string;
}

export interface AgendaBlock {
  /** e.g. "0:00" — minutes from workshop start */
  start: string;
  /** duration in minutes */
  minutes: number;
  title: string;
  description: string;
  /** optional route the block maps to */
  href?: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  detail?: string;
  /** true when this is required for Build 1 */
  required: boolean;
  /** optional step-by-step setup instructions, shown in an accordion */
  setup?: ChecklistSetup;
}

export interface ChecklistSetup {
  /** official download / documentation link */
  docHref?: string;
  /** visible text for `docHref` */
  docLabel?: string;
  /** numbered instructions, in order */
  steps: string[];
  /** one line on how to confirm it worked */
  verify?: string;
}

export interface DiagnosticCommand {
  command: string;
  expected: string;
}

export interface TroubleshootingEntry {
  problem: string;
  fix: string;
}

export interface TestCase {
  inputs: Record<string, string>;
  expected: string;
}

export type OSKey = "macos" | "windows";

export interface CommandBlockContent {
  macos?: string;
  windows?: string;
  /** language hint for display only */
  language?: string;
}

export interface BuildStep {
  id: string;
  number: number;
  title: string;
  summary: string;
  /** minutes of workshop time this step is expected to take */
  minutes?: number;
}

export interface ResourceLink {
  label: string;
  href: string;
  note?: string;
  tag: "required" | "optional" | "demo";
}

export interface ResourceSection {
  id: string;
  title: string;
  intro?: string;
  links: ResourceLink[];
}

export interface FacilitatorNote {
  heading: string;
  body: string[];
}

export interface FacilitatorSegment {
  id: string;
  title: string;
  minutes: number;
  objective: string;
  says: string;
  studentsDo: string;
  checkpoint: string;
  commonFailure: string;
  recovery: string;
  transition: string;
  /** optional extended guidance rendered under the standard fields */
  deepDive?: FacilitatorNote[];
  /** optional per-phase operational timing target */
  timing?: { label: string; range: string }[];
}

export interface RubricRow {
  dimension: string;
  description: string;
}

/* ==========================================================================
   Integrated Workshop Platform — configuration and content model
   ========================================================================== */

export type WorkshopMode = "present" | "participate" | "facilitate";

/**
 * Brand architecture. Five concepts are kept deliberately separate so the same
 * platform serves any industry / organization / audience without touching a
 * reusable component:
 *
 *   creator       — Vajih Khan (stable)
 *   methodology   — Frictionless Building + the Frictionless Build Cycle (stable)
 *   program       — Build Workshop + its tagline (stable)
 *   industry      — the domain this engagement is in (configurable)
 *   organization  — the host, and how we may publicly describe the relationship (configurable)
 *   audience      — the actual people attending (configurable, needs confirmation)
 *   engagement    — this specific scheduled workshop (configurable)
 *
 * The industry is never part of the creator or product name.
 */

/** Stable — the person behind the platform. */
export interface WorkshopCreator {
  name: string;
  /** e.g. "Creator and facilitator" */
  role: string;
  /**
   * Optional public LinkedIn profile URL. When set, participants are invited to
   * connect (footer, close of the workshop) and asked to tag the facilitator
   * when they post their Team Challenge build.
   */
  linkedinUrl?: string;
}

/** Stable — the signature methodology and its build cycle. */
export interface WorkshopMethodology {
  /** "Frictionless Building" */
  name: string;
  /** "Frictionless Build Cycle" */
  buildCycleName: string;
  /** Define → Prompt → Supervise → Test → Commit → Publish → Learn → Improve */
  buildCycle: string[];
}

/** Stable — the reusable program. */
export interface WorkshopProgram {
  /** "Build Workshop" */
  name: string;
  /** "From Idea to Working Application" */
  tagline: string;
}

/** Configurable — the domain context for this engagement. */
export interface WorkshopIndustry {
  /** "Healthcare & Epidemiology" */
  name: string;
  focusAreas?: string[];
}

/** Configurable — the host organization and how we describe the relationship. */
export interface WorkshopOrganization {
  /** "Aga Khan University" */
  name: string;
  /** "AKU" */
  shortName: string;
  /**
   * Public relationship wording. Default "Prepared for". Only change to
   * "Hosted by" / "Presented at" once the organization confirms it. Do not
   * imply partnership, endorsement, sponsorship, or ownership.
   */
  publicRelationshipLabel: string;
}

/** Configurable — the actual people attending (not the institution). */
export interface WorkshopAudience {
  /** short label, e.g. "Participants" */
  label: string;
  /** editable full description of who attends */
  description: string;
  /** false → the description still needs final facilitator review */
  confirmed: boolean;
}

/** Configurable — this specific scheduled workshop. */
export interface WorkshopEngagement {
  /** "AKU Build Workshop 2026" */
  name: string;
  year: number;
  /** all optional and editable without code changes */
  date?: string;
  location?: string;
  department?: string;
  course?: string;
  /**
   * Shared "Team idea board" URL (a Google Slides deck the facilitator opens
   * for Section 6). When set, the Team Challenge page shows a link + QR;
   * otherwise it tells participants the facilitator will share it.
   */
  teamBoardUrl?: string;
}

export interface WorkshopConfig {
  creator: WorkshopCreator;
  methodology: WorkshopMethodology;
  program: WorkshopProgram;
  industry: WorkshopIndustry;
  organization: WorkshopOrganization;
  audience: WorkshopAudience;
  engagement: WorkshopEngagement;

  /* ---- routing (the slug may keep the org short name — it names this
     specific engagement, not the reusable product) ---- */
  clientSlug: string;
  slug: string;

  /* ---- platform mechanics ---- */
  /** theme id — maps to a `[data-theme]` block in globals.css */
  theme: string;
  /** which modes are enabled and shown in navigation */
  visibility: Record<WorkshopMode, boolean>;
  /** module ids in presentation / delivery order */
  moduleOrder: string[];
  safety: { disclaimer: string; statement: string };
  /** contact / resource links surfaced on the workshop hub */
  links: { label: string; href: string; external?: boolean }[];
  /** localStorage schema version for this workshop's stored data */
  storageVersion: number;
}

/** One delivery segment, linking the three modes. */
export interface WorkshopModule {
  id: string;
  title: string;
  summary: string;
  kind: "welcome" | "build" | "concept" | "demo" | "challenge" | "resource";
  minutes?: number;
  /** optional module — a stretch / fast-finisher track, not part of the core path */
  optional?: boolean;
  /** relative href (within the workshop base) into Participant Mode */
  participantHref?: string;
  /** condensed concept summary href, if any */
  conceptHref?: string;
  /** id of the matching PresentationSection */
  presentationSectionId?: string;
  /** id of the matching FacilitatorSegment */
  facilitatorId?: string;
  /** progress checkpoint ids that make up this module (for progress bars) */
  checkpointIds?: string[];
}

export type SlideType =
  | "title"
  | "section"
  | "statement"
  | "concept"
  | "timeline"
  | "comparison"
  | "image-compare"
  | "process"
  | "demo-intro"
  | "exercise-launch"
  | "discussion"
  | "reflection"
  | "closing";

export interface SlideColumn {
  heading: string;
  points: string[];
}

export interface SlideItem {
  label: string;
  detail?: string;
}

/** one photo in an image-compare slide (e.g. "before" / "after") */
export interface SlideImage {
  /** path under /public, e.g. "/images/presentation/example.jpg" */
  src: string;
  alt: string;
  /** short overlay label, e.g. a year */
  tag?: string;
  caption?: string;
  /** CSS aspect-ratio of the source file, e.g. "1 / 1" or "3 / 2" — keeps the
   * rendered box matched to the photo so nothing is cropped or letterboxed.
   * Defaults to "1 / 1" if omitted. */
  aspectRatio?: string;
}

export interface Slide {
  /** globally unique, URL-safe — used as the direct slide link */
  id: string;
  type: SlideType;
  /** owning section id */
  section: string;
  /** optional presentation-only composition layered on top of the slide type */
  layout?:
    | "blueprint-hero"
    | "blueprint-product"
    | "frictionless-embed"
    | "click-video"
    | "discussion-build"
    | "break-timer"
    | "mobile-showcase"
    | "khayal-architecture";
  /** 1-based source slide number for the embedded Frictionless chapter. */
  embedSlide?: number;
  title?: string;
  /** one large supporting line under the title */
  lead?: string;
  /** short bullet points — keep projector-friendly, never long instructions */
  body?: string[];
  /** timeline / process / comparison-as-list items */
  items?: SlideItem[];
  /** comparison columns */
  columns?: SlideColumn[];
  /** image-compare: photos shown side by side */
  images?: SlideImage[];
  /** image-compare: optional visual scale multiplier for chart-heavy slides */
  imageScale?: number;
  /** discussion prompt */
  question?: string;
  /** exercise-launch: relative participant href to open the activity */
  participantHref?: string;
  /** optional high-emphasis presentation CTA for a participant activity */
  participantCta?: {
    eyebrow: string;
    label: string;
    detail: string;
  };
  /** small on-slide caption (NOT facilitator notes) */
  note?: string;
  /** image-compare: emphasized takeaway panel shown beside a two-image
   * comparison (used instead of `note` when present) */
  callout?: { stat?: string; text: string };
  /** small source / citation line rendered at the foot of the slide */
  source?: string;
  /** click-video: a presenter-controlled YouTube embed */
  video?: {
    youtubeId: string;
    title: string;
    author: string;
    thumbnail: string;
  };
  /** discussion-build: final synthesis revealed after all list items */
  conclusion?: SlideItem;
  /** break-timer: editable default duration in minutes */
  timerMinutes?: number;
  /** break-timer: short original message informed by Stoic practice */
  stoicMessage?: string;
  /** mobile-showcase: phone screenshots or labeled placeholders */
  mobileScreens?: {
    label: string;
    detail: string;
    src?: string;
    alt?: string;
  }[];
  /** optional presentation CTA that opens an external product or source */
  externalCta?: {
    label: string;
    href: string;
  };
  /** eyebrow / kicker text */
  kicker?: string;
  /** content still needs facilitator review before the workshop */
  draft?: boolean;
}

export interface PresentationSection {
  id: string;
  title: string;
  slides: Slide[];
}

export interface Presentation {
  sections: PresentationSection[];
}

/**
 * Interface boundary for a future live-session feature (current section,
 * workshop code, "go to current step", announcements, timers). Not implemented
 * in V1 — documented so a later networked feature has a defined attach point.
 */
export interface LiveSessionHook {
  currentSectionId: string | null;
  workshopCode: string | null;
  announcement: string | null;
  timerEndsAt: number | null;
}
