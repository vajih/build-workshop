import { PageIntro } from "@/components/PageIntro";
import { DeckEditor } from "@/components/facilitator/DeckEditor";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";

export default async function DeckEditorPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const bundle = await getBundle(params);
  const { config, presentation } = bundle;

  const sections = presentation.sections.map((section) => ({
    id: section.id,
    title: section.title,
    slides: section.slides.map((slide) => ({
      id: slide.id,
      label: slide.title ?? slide.kicker ?? slide.id,
      hidden: Boolean(slide.hidden),
    })),
  }));

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Deck Editor"
        title="Reorder and hide slides"
        subtitle="Move slides within a section or hide them from Presentation Mode without deleting anything. Content stays authored in the workshop's source files — this only changes order and visibility for this delivery."
      />
      <DeckEditor
        clientSlug={config.clientSlug}
        workshopSlug={config.slug}
        initialSections={sections}
      />
    </div>
  );
}
