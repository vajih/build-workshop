import { notFound } from "next/navigation";
import { Deck } from "@/components/slides/Deck";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { resolveWorkshop, workshopParams } from "@/content/registry";
import { workshopBase } from "@/lib/workshop";
import { absoluteUrl } from "@/lib/site";
import { qrSvg } from "@/lib/qr";

interface PresentParams extends WorkshopRouteParams {
  slide?: string[];
}

export function generateStaticParams() {
  const params: { clientSlug: string; workshopSlug: string; slide: string[] }[] =
    [];
  for (const { clientSlug, workshopSlug } of workshopParams()) {
    const bundle = resolveWorkshop(clientSlug, workshopSlug);
    if (!bundle) continue;
    params.push({ clientSlug, workshopSlug, slide: [] });
    for (const section of bundle.presentation.sections) {
      for (const s of section.slides) {
        params.push({ clientSlug, workshopSlug, slide: [s.id] });
      }
    }
  }
  return params;
}

export default async function PresentPage({
  params,
}: {
  params: Promise<PresentParams>;
}) {
  const bundle = await getBundle(params);
  const { slide: slideSegments } = await params;
  const { config, presentation } = bundle;
  const base = workshopBase(config);

  const slides = presentation.sections.flatMap((s) => s.slides);
  const sections = presentation.sections.map((s, i) => ({
    id: s.id,
    title: s.title,
    index: i,
    firstSlideId: s.slides[0]?.id,
    slideCount: s.slides.length,
  }));

  const requestedId = slideSegments?.[0];
  if (requestedId && !slides.some((s) => s.id === requestedId)) {
    notFound();
  }

  const participantUrls: Record<string, string> = {};
  for (const s of slides) {
    if (s.participantHref) {
      participantUrls[s.id] = `${base}${s.participantHref}`;
    }
  }

  const participantOverviewUrl = absoluteUrl(`${base}/participate`);
  const deckTheme =
    config.clientSlug === "aku" && config.slug === "digital-health-2026"
      ? "frictionless-blueprint"
      : undefined;

  return (
    <Deck
      slides={slides}
      sections={sections}
      base={base}
      initialSlideId={requestedId ?? slides[0]?.id}
      participantUrls={participantUrls}
      participantOverviewUrl={participantOverviewUrl}
      qrSvg={qrSvg(participantOverviewUrl)}
      theme={deckTheme}
    />
  );
}
