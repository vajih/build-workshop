import { notFound } from "next/navigation";
import { resolveWorkshop, type WorkshopBundle } from "@/content/registry";

export interface WorkshopRouteParams {
  clientSlug: string;
  workshopSlug: string;
}

/**
 * Server helper for pages under `[clientSlug]/[workshopSlug]`. Awaits the route
 * params, resolves the workshop bundle, and 404s if the slugs do not match a
 * registered workshop.
 */
export async function getBundle(
  params: Promise<WorkshopRouteParams>,
): Promise<WorkshopBundle> {
  const { clientSlug, workshopSlug } = await params;
  const bundle = resolveWorkshop(clientSlug, workshopSlug);
  if (!bundle) notFound();
  return bundle;
}
