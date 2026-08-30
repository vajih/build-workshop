import type { WorkshopConfig, WorkshopMode } from "@/content/types";

/**
 * URL helpers for a workshop. All routes are derived from the routing slugs so
 * nothing is hardcoded to "aku".
 *
 *   base:        /aku/digital-health-2026
 *   present:     /aku/digital-health-2026/present
 *   participate: /aku/digital-health-2026/participate
 *   facilitate:  /aku/digital-health-2026/facilitate
 *   backup:      /aku/digital-health-2026/backup
 */
export function workshopBase(config: WorkshopConfig): string {
  return `/${config.clientSlug}/${config.slug}`;
}

/* ---- Brand-architecture text helpers -----------------------------------
   Compose display strings from the separated config fields so no component
   hardcodes an organization, industry, or engagement name. */

/** Compact wordmark for headers/footers, e.g. "AKU Build Workshop". */
export function workshopMark(config: WorkshopConfig): string {
  return `${config.organization.shortName} ${config.program.name}`;
}

/** The engagement name, e.g. "AKU Build Workshop 2026". */
export function engagementName(config: WorkshopConfig): string {
  return config.engagement.name;
}

/** Public relationship line, e.g. "Prepared for Aga Khan University". */
export function relationshipLine(config: WorkshopConfig): string {
  return `${config.organization.publicRelationshipLabel} ${config.organization.name}`;
}

/** Creator attribution, e.g. "Designed and facilitated by Vajih Khan". */
export function creatorAttribution(config: WorkshopConfig): string {
  return `Designed and facilitated by ${config.creator.name}`;
}

/** The creator's public LinkedIn URL, or `null` when none is configured. */
export function creatorLinkedIn(config: WorkshopConfig): string | null {
  return config.creator.linkedinUrl ?? null;
}

/* ---- Public vs facilitator content --------------------------------------
   PUBLIC surfaces (landing, hub, participant, presentation, Open Graph, and
   public print / PDF) must never show internal uncertainty or configuration
   warnings. When a value is unconfirmed or unset:
     - audience  -> a neutral fallback phrase
     - date / location / department / course -> omitted entirely (null)
   FACILITATOR Mode keeps the precise draft wording and an explicit
   "requires confirmation" label. */

/**
 * Neutral audience phrase shown on every PUBLIC surface while
 * `audience.confirmed` is false. Contains no review or uncertainty language.
 */
export const PUBLIC_AUDIENCE_FALLBACK =
  "AKU workshop participants in digital health research";

/** Audience text safe for PUBLIC display. Never exposes the unconfirmed draft. */
export function publicAudience(config: WorkshopConfig): string {
  return config.audience.confirmed
    ? config.audience.description
    : PUBLIC_AUDIENCE_FALLBACK;
}

/**
 * Engagement facts for PUBLIC display. An unset value returns `null` so callers
 * omit it completely — never a placeholder such as "date to be confirmed".
 */
export function publicDate(config: WorkshopConfig): string | null {
  return config.engagement.date ?? null;
}
export function publicLocation(config: WorkshopConfig): string | null {
  return config.engagement.location ?? null;
}
export function publicDepartment(config: WorkshopConfig): string | null {
  return config.engagement.department ?? null;
}
export function publicCourse(config: WorkshopConfig): string | null {
  return config.engagement.course ?? null;
}

/**
 * FACILITATOR-ONLY label for a configuration item still needing review.
 * Never render this on a public surface.
 */
export function facilitatorField(
  value: string | undefined,
  label: string,
): string {
  return value ?? `${label} requires confirmation`;
}

export function modeHref(config: WorkshopConfig, mode: WorkshopMode): string {
  return `${workshopBase(config)}/${mode}`;
}

/** Resolve a workshop-relative href (starting "/") to an absolute app path. */
export function rel(config: WorkshopConfig, href: string): string {
  if (!href.startsWith("/")) return href;
  return `${workshopBase(config)}${href}`;
}

export function presentSlideHref(
  config: WorkshopConfig,
  slideId: string,
): string {
  return `${modeHref(config, "present")}/${slideId}`;
}

export function backupHref(config: WorkshopConfig, sub = ""): string {
  return `${workshopBase(config)}/backup${sub}`;
}

export const MODE_META: Record<
  WorkshopMode,
  { label: string; verb: string; blurb: string }
> = {
  present: {
    label: "Present",
    verb: "Present the workshop",
    blurb: "Full-screen slides for the projector, with keyboard control.",
  },
  participate: {
    label: "Participate",
    verb: "Participate in the workshop",
    blurb: "The guided workbook: steps, commands, prompts, tests, and progress.",
  },
  facilitate: {
    label: "Facilitate",
    verb: "Facilitate the workshop",
    blurb: "The instructor's operational view: timing, checkpoints, recovery.",
  },
};
