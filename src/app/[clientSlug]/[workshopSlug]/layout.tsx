import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { WorkshopProvider } from "@/lib/workshop-context";
import { resolveWorkshop, workshopParams } from "@/content/registry";
import { workshopMark } from "@/lib/workshop";

interface RouteParams {
  clientSlug: string;
  workshopSlug: string;
}

export function generateStaticParams() {
  return workshopParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { clientSlug, workshopSlug } = await params;
  const bundle = resolveWorkshop(clientSlug, workshopSlug);
  if (!bundle) return {};
  const { config } = bundle;
  const mark = workshopMark(config);
  return {
    title: {
      default: `${mark} — ${config.program.tagline}`,
      template: `%s · ${mark}`,
    },
    description: `${config.program.name} · ${config.industry.name}. ${config.organization.publicRelationshipLabel} ${config.organization.name}. A three-hour hands-on session — build a live application with AI, then a hackathon-style team build sprint. Designed and facilitated by ${config.creator.name} using the ${config.methodology.name} methodology.`,
  };
}

export default async function WorkshopLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<RouteParams>;
}) {
  const { clientSlug, workshopSlug } = await params;
  const bundle = resolveWorkshop(clientSlug, workshopSlug);
  if (!bundle) notFound();

  return (
    <div data-theme={bundle.config.theme} className="flex min-h-full flex-col">
      <WorkshopProvider config={bundle.config}>{children}</WorkshopProvider>
    </div>
  );
}
