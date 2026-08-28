import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import {
  OUTBREAK_AI_INTRO,
  OUTBREAK_AI_SECTIONS,
  DEMO_FLOW,
  AUDIENCE_QUESTIONS,
  BOUNDARIES,
  OUTBREAK_AI_LIMITS,
} from "@/content/clients/aku/digital-health-2026/outbreak-ai";

export const metadata: Metadata = {
  title: "Outbreak-AI",
  description:
    "A demonstration of a small domain-specific model running offline on an ESP32: edge AI versus cloud AI, privacy, resilience, and the epidemiological use case.",
};

export default async function OutbreakAIPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config } = await getBundle(params);
  const base = workshopBase(config);

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Participant", href: `${base}/participate` },
          { label: "Outbreak-AI" },
        ]}
      />
      <PageIntro
        eyebrow="Instructor demonstration"
        title="Outbreak-AI"
        subtitle="A small model, one job, running offline on a device that fits in your palm."
      >
        <p>{OUTBREAK_AI_INTRO}</p>
      </PageIntro>

      <div className="mt-8 space-y-8">
        {OUTBREAK_AI_SECTIONS.map((section) => (
          <section key={section.id} aria-labelledby={`${section.id}-heading`}>
            <h2
              id={`${section.id}-heading`}
              className="text-xl font-semibold text-ink"
            >
              {section.heading}
            </h2>
            <div className="prose-block mt-2 text-ink-muted">
              {section.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        ))}

        <section aria-labelledby="demo-heading">
          <h2 id="demo-heading" className="text-xl font-semibold text-ink">
            The demonstration flow
          </h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-ink-muted">
            {DEMO_FLOW.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="questions-heading">
          <h2 id="questions-heading" className="text-xl font-semibold text-ink">
            Suggested audience questions
          </h2>
          <ul className="mt-3 list-disc space-y-2 pl-6 text-ink-muted">
            {AUDIENCE_QUESTIONS.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="boundaries-heading">
          <h2 id="boundaries-heading" className="text-xl font-semibold text-ink">
            Three things that are not the same
          </h2>
          <dl className="mt-3 space-y-3">
            {BOUNDARIES.map((b) => (
              <div
                key={b.term}
                className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-4"
              >
                <dt className="font-semibold text-ink">{b.term}</dt>
                <dd className="mt-1 text-sm text-ink-muted">{b.definition}</dd>
              </div>
            ))}
          </dl>
        </section>

        <SafetyNotice tone="strong" title="Limits of the device">
          <p>{OUTBREAK_AI_LIMITS}</p>
        </SafetyNotice>
      </div>

      <ParticipantStepNav base={base} current="/participate/outbreak-ai" />
    </div>
  );
}
