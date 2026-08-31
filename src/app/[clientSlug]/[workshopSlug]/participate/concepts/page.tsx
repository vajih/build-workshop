import Link from "next/link";
import { Presentation } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import { BUILD_CYCLE } from "@/content/shared/build-cycle";
import { AI_EVOLUTION, AI_EVOLUTION_SUMMARY } from "@/content/shared/ai-evolution";
import { RESPONSIBLE_AI_PRINCIPLES } from "@/content/shared/responsible-ai";
import {
  FRICTIONLESS_BUILDING,
  HUMAN_RESPONSIBILITY,
  BUILD_IN_THE_OPEN,
} from "@/content/shared/frictionless-building";
import { ECONOMIC_VALUE } from "@/content/shared/economic-value";

export const metadata = {
  title: "Concepts",
  description:
    "Condensed summaries of the workshop's concepts: what changed, AI and building, and responsible healthcare AI.",
};

export default async function ConceptsPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config } = await getBundle(params);
  const base = workshopBase(config);
  const slideLink = (sectionFirstSlide: string) =>
    `${base}/present/${sectionFirstSlide}`;

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Participant", href: `${base}/participate` },
          { label: "Concepts" },
        ]}
      />
      <PageIntro
        eyebrow="Background"
        title="Concepts, in brief"
        subtitle="The ideas behind the workshop, condensed. The full versions are in the presentation."
      />

      <div className="mt-8 space-y-12">
        <section id="what-changed" className="scroll-mt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold text-ink">What just changed?</h2>
            <Link
              href={slideLink("what-changed-1")}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              <Presentation className="size-4" aria-hidden />
              These slides
            </Link>
          </div>
          <p className="mt-2 font-medium text-ink">
            {FRICTIONLESS_BUILDING.headline}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6 text-ink-muted">
            {FRICTIONLESS_BUILDING.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-4 font-medium text-ink">
            {HUMAN_RESPONSIBILITY.headline}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6 text-ink-muted">
            {HUMAN_RESPONSIBILITY.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <p className="mt-4 font-medium text-ink">
            {BUILD_IN_THE_OPEN.headline}
          </p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6 text-ink-muted">
            {BUILD_IN_THE_OPEN.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <div className="mt-4 rounded-[var(--radius-card)] border border-border-strong bg-surface p-4">
            <p className="text-sm font-semibold text-ink">The build cycle</p>
            <ol className="mt-2 grid gap-2 sm:grid-cols-2">
              {BUILD_CYCLE.map((s, i) => (
                <li key={s.label} className="text-sm text-ink-muted">
                  <span className="font-medium text-ink">
                    {i + 1}. {s.label}
                  </span>{" "}
                  — {s.detail}
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="ai-and-building" className="scroll-mt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold text-ink">AI and building</h2>
            <Link
              href={slideLink("ai-and-building-1")}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              <Presentation className="size-4" aria-hidden />
              These slides
            </Link>
          </div>
          <p className="mt-2 text-ink-muted">{AI_EVOLUTION_SUMMARY}</p>
          <dl className="mt-3 space-y-2">
            {AI_EVOLUTION.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border-strong bg-surface px-4 py-3"
              >
                <dt className="font-semibold text-ink">{item.label}</dt>
                <dd className="mt-0.5 text-sm text-ink-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-medium text-ink">{ECONOMIC_VALUE.headline}</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-6 text-ink-muted">
            {ECONOMIC_VALUE.points.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
        </section>

        <section id="responsible-ai" className="scroll-mt-24">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-semibold text-ink">
              Responsible healthcare AI
            </h2>
            <Link
              href={slideLink("responsible-ai-1")}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              <Presentation className="size-4" aria-hidden />
              These slides
            </Link>
          </div>
          <dl className="mt-3 space-y-2">
            {RESPONSIBLE_AI_PRINCIPLES.map((item) => (
              <div
                key={item.label}
                className="rounded-lg border border-border-strong bg-surface px-4 py-3"
              >
                <dt className="font-semibold text-ink">{item.label}</dt>
                <dd className="mt-0.5 text-sm text-ink-muted">{item.detail}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 rounded-[var(--radius-card)] border border-watch/40 bg-watch-soft/50 p-4 text-sm text-ink-muted">
            {config.safety.disclaimer}
          </p>
        </section>
      </div>

      <ParticipantStepNav base={base} current="/participate/concepts" />
    </div>
  );
}
