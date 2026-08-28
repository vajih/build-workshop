import Link from "next/link";
import { ArrowRight, CalendarDays, Users } from "lucide-react";
import { PlatformHeader } from "@/components/chrome/PlatformHeader";
import { PlatformFooter } from "@/components/chrome/PlatformFooter";
import { ModeCards } from "@/components/chrome/ModeCards";
import { Journey } from "@/components/Journey";
import { SafetyNotice } from "@/components/SafetyNotice";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import {
  workshopBase,
  workshopMark,
  relationshipLine,
  creatorAttribution,
  publicAudience,
  publicDate,
  publicLocation,
} from "@/lib/workshop";

export default async function WorkshopHubPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config, agenda } = await getBundle(params);
  const base = workshopBase(config);
  const hours = Math.round((agenda.totalMinutes / 60) * 10) / 10;
  const when = publicDate(config);
  const where = publicLocation(config);

  return (
    <>
      <PlatformHeader
        mark={workshopMark(config)}
        tagline={`${config.program.name} · ${config.industry.name}`}
      />
      <main id="main" className="flex-1">
        <div className="container-page py-10 sm:py-14">
          <section className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">
              {config.program.name}
            </p>
            <p className="mt-1 text-lg font-medium text-ink-muted">
              {config.industry.name}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">
              {config.program.tagline}
            </h1>
            <p className="mt-4 text-base text-ink-muted">
              {relationshipLine(config)}
              <span className="mx-2 text-ink-subtle">·</span>
              {creatorAttribution(config)}
            </p>
            <p className="mt-4 text-base text-ink-muted">
              Build, test, publish, and improve a real application with AI as
              your pair programmer, using the {config.methodology.name}{" "}
              methodology. The session ends with a hackathon-style team build
              sprint — teams ship a working prototype and demo it live.
            </p>

            <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {when ? (
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-accent" aria-hidden />
                  <dt className="sr-only">When</dt>
                  <dd className="text-ink-muted">
                    {when}
                    {where ? ` · ${where}` : ""}
                  </dd>
                </div>
              ) : where ? (
                <div className="flex items-center gap-2">
                  <CalendarDays className="size-4 text-accent" aria-hidden />
                  <dt className="sr-only">Location</dt>
                  <dd className="text-ink-muted">{where}</dd>
                </div>
              ) : null}
              <div className="flex items-start gap-2">
                <Users className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
                <dt className="sr-only">Participants</dt>
                <dd className="text-ink-muted">{publicAudience(config)}</dd>
              </div>
            </dl>
          </section>

          <section className="mt-10" aria-labelledby="modes-heading">
            <h2 id="modes-heading" className="text-2xl font-bold text-ink">
              Choose how you are joining
            </h2>
            <p className="mt-1 text-ink-muted">
              One workshop, three views. Most participants want{" "}
              <strong>Participate</strong>.
            </p>
            <div className="mt-4">
              <ModeCards config={config} emphasise="participate" />
            </div>
          </section>

          <section className="mt-12" aria-labelledby="journey-heading">
            <h2 id="journey-heading" className="text-2xl font-bold text-ink">
              The workshop journey
            </h2>
            <div className="mt-4">
              <Journey variant="chips" />
            </div>
          </section>

          <section className="mt-12" aria-labelledby="agenda-heading">
            <div className="flex items-baseline justify-between gap-4">
              <h2 id="agenda-heading" className="text-2xl font-bold text-ink">
                {hours}-hour agenda
              </h2>
              <Link
                href={`${base}/participate/agenda`}
                className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                Full agenda
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            </div>
            <ol className="mt-4 divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface">
              {agenda.blocks.map((block) => (
                <li
                  key={block.start}
                  className="flex flex-col gap-1 p-4 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <span className="w-16 shrink-0 font-mono text-sm text-ink-subtle">
                    {block.start}
                  </span>
                  <span className="flex-1">
                    <span className="font-semibold text-ink">{block.title}</span>
                    <span className="ml-2 text-xs text-ink-subtle">
                      {block.minutes} min
                    </span>
                  </span>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-12" aria-labelledby="safety-heading">
            <h2 id="safety-heading" className="sr-only">
              Safety statement
            </h2>
            <SafetyNotice tone="strong" title="Required safety statement">
              <p>{config.safety.statement}</p>
            </SafetyNotice>
          </section>

          <section className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius-card)] border border-border-strong bg-surface p-5">
            <p className="text-sm text-ink-muted">
              {config.creator.role}:{" "}
              <span className="font-semibold text-ink">
                {config.creator.name}
              </span>
            </p>
            <Link
              href={`${base}/backup`}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              Backup and print pages
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </section>
        </div>
      </main>
      <PlatformFooter config={config} />
    </>
  );
}
