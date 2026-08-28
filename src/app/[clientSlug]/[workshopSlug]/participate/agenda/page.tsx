import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "The three-hour workshop agenda: immediate Build 1 immersion, concepts, the Outbreak-AI demonstration, the team challenge, and presentations.",
};

function clock(minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${h}:${String(m).padStart(2, "0")}`;
}

export default async function AgendaPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config, agenda } = await getBundle(params);
  const base = workshopBase(config);

  const timed = agenda.blocks.reduce<
    { block: (typeof agenda.blocks)[number]; start: number; end: number }[]
  >((acc, block) => {
    const start = acc.length ? acc[acc.length - 1].end : 0;
    acc.push({ block, start, end: start + block.minutes });
    return acc;
  }, []);

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Participant", href: `${base}/participate` },
          { label: "Agenda" },
        ]}
      />
      <PageIntro
        eyebrow="Plan"
        title={`${Math.round((agenda.totalMinutes / 60) * 10) / 10}-hour agenda`}
        subtitle="Timings are a guide. Build 1 starts almost immediately — the concepts come after you have built something."
      >
        <p>
          Total scheduled time is {agenda.totalMinutes} minutes. Times shown are
          from the start of the session.
        </p>
      </PageIntro>

      <ol className="mt-8 space-y-3">
        {timed.map(({ block, start, end }) => (
          <li
            key={block.start}
            className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-5 shadow-[var(--shadow-card)]"
          >
            <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="shrink-0 font-mono text-sm text-ink-subtle">
                {clock(start)}–{clock(end)}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-x-2">
                  <h2 className="text-lg font-semibold text-ink">
                    {block.title}
                  </h2>
                  <span className="text-xs font-medium text-accent">
                    {block.minutes} min
                  </span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">
                  {block.description}
                </p>
                {block.href ? (
                  <Link
                    href={`${base}${block.href}`}
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Open this section
                    <ArrowRight className="size-4" aria-hidden />
                  </Link>
                ) : null}
              </div>
            </div>
          </li>
        ))}
      </ol>

      <p className="mt-6 text-sm text-ink-subtle">
        Roughly 30–45 minutes is reserved for team building and about 25 minutes
        for five team presentations, followed by a short reflection.
      </p>

      <ParticipantStepNav base={base} current="/participate/agenda" />
    </div>
  );
}
