import type {
  AgendaBlock,
  FacilitatorSegment,
  Presentation,
  WorkshopConfig,
  WorkshopModule,
} from "./types";

import { akuDigitalHealth2026 } from "./clients/aku/digital-health-2026/workshop";
import { AGENDA, TOTAL_MINUTES } from "./clients/aku/digital-health-2026/agenda";
import { MODULES } from "./clients/aku/digital-health-2026/modules";
import { PRESENTATION } from "./clients/aku/digital-health-2026/presentation";
import { FACILITATOR_SEGMENTS } from "./clients/aku/digital-health-2026/facilitator";

/**
 * The workshop registry. Adding a workshop = add a content folder under
 * `content/clients/<client>/<workshop>/` and register its bundle here. No
 * database, no dynamic loading.
 */
export interface WorkshopBundle {
  config: WorkshopConfig;
  agenda: { totalMinutes: number; blocks: AgendaBlock[] };
  modules: WorkshopModule[];
  presentation: Presentation;
  facilitatorSegments: FacilitatorSegment[];
}

const AKU_DIGITAL_HEALTH_2026: WorkshopBundle = {
  config: akuDigitalHealth2026,
  agenda: { totalMinutes: TOTAL_MINUTES, blocks: AGENDA },
  modules: MODULES,
  presentation: PRESENTATION,
  facilitatorSegments: FACILITATOR_SEGMENTS,
};

export const WORKSHOPS: WorkshopBundle[] = [AKU_DIGITAL_HEALTH_2026];

export function resolveWorkshop(
  clientSlug: string,
  workshopSlug: string,
): WorkshopBundle | undefined {
  return WORKSHOPS.find(
    (w) =>
      w.config.clientSlug === clientSlug && w.config.slug === workshopSlug,
  );
}

export function workshopParams(): { clientSlug: string; workshopSlug: string }[] {
  return WORKSHOPS.map((w) => ({
    clientSlug: w.config.clientSlug,
    workshopSlug: w.config.slug,
  }));
}

/** The workshop shown on the platform landing page. */
export const PRIMARY_WORKSHOP = AKU_DIGITAL_HEALTH_2026;
