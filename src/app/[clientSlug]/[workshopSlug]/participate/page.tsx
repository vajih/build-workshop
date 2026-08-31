import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Journey } from "@/components/Journey";
import { SafetyNotice } from "@/components/SafetyNotice";
import { ContinuePanel } from "@/components/ContinuePanel";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { ResetProgress } from "@/components/ResetProgress";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase, workshopMark, rel } from "@/lib/workshop";

export const metadata = {
  title: "Overview",
  description:
    "Your starting point for the participant workbook: the journey, the agenda, and where to pick up.",
};

export default async function ParticipantOverviewPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config, modules, agenda } = await getBundle(params);
  const base = workshopBase(config);
  const build1 = modules.find((m) => m.id === "build-1");
  const progressIds = build1?.checkpointIds ?? [];

  const participantModules = modules.filter((m) => m.participantHref);

  return (
    <div className="container-page py-10">
      <PageIntro
        eyebrow="Participant workbook"
        title={workshopMark(config)}
        subtitle={config.program.tagline}
      >
        <p>
          {config.industry.name}. Build, test, publish, and improve a real
          application with AI as your pair programmer.
        </p>
        <p>
          Follow the sections in order. Copy the exact commands and prompts,
          check each expected result, and tick steps off as you go.
        </p>
      </PageIntro>

      <div className="mt-6">
        <ContinuePanel />
      </div>

      <section className="mt-10" aria-labelledby="progress-heading">
        <h2 id="progress-heading" className="sr-only">
          Build 1 progress
        </h2>
        <ProgressIndicator ids={progressIds} />
      </section>

      <section className="mt-10" aria-labelledby="sections-heading">
        <h2 id="sections-heading" className="text-xl font-semibold text-ink">
          Workshop sections
        </h2>
        <ul className="mt-3 divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface">
          {participantModules.map((m) => (
            <li key={m.id}>
              <Link
                href={rel(config, m.participantHref!)}
                className="flex items-start justify-between gap-3 p-4 hover:bg-surface-muted/60"
              >
                <span className="min-w-0">
                  <span className="font-medium text-primary">
                    {m.title}
                    {m.optional ? (
                      <span className="ml-2 rounded-full bg-surface-muted px-2 py-0.5 align-middle text-xs font-medium text-ink-muted">
                        Optional
                      </span>
                    ) : null}
                  </span>
                  <span className="mt-0.5 block text-sm text-ink-muted">
                    {m.summary}
                  </span>
                </span>
                {m.minutes ? (
                  <span className="shrink-0 text-xs text-ink-subtle">
                    {m.optional ? "+" : ""}
                    {m.minutes} min
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="journey-heading">
        <h2 id="journey-heading" className="text-xl font-semibold text-ink">
          The journey
        </h2>
        <div className="mt-3">
          <Journey variant="detailed" />
        </div>
      </section>

      <section className="mt-10" aria-labelledby="agenda-heading">
        <div className="flex items-baseline justify-between gap-4">
          <h2 id="agenda-heading" className="text-xl font-semibold text-ink">
            Agenda
          </h2>
          <Link
            href={`${base}/participate/agenda`}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            Full agenda
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
        <p className="mt-1 text-sm text-ink-muted">
          {agenda.totalMinutes} minutes, {agenda.blocks.length} segments. Build 1
          starts in the first ten minutes.
        </p>
      </section>

      <SafetyNotice tone="strong" title="Safety and scope">
        <p>{config.safety.statement}</p>
      </SafetyNotice>

      <section className="mt-10" aria-labelledby="reset-heading">
        <h2 id="reset-heading" className="text-xl font-semibold text-ink">
          Your progress
        </h2>
        <p className="mt-1 mb-3 text-sm text-ink-muted">
          Completed steps, your saved live URL, and dismissed notices are stored
          only in this browser on this device. No personal or health information
          is collected.
        </p>
        <ResetProgress />
      </section>
    </div>
  );
}
