import Link from "next/link";
import { ArrowRight, CalendarDays, Layers, Users } from "lucide-react";
import { PlatformHeader } from "@/components/chrome/PlatformHeader";
import { PlatformFooter } from "@/components/chrome/PlatformFooter";
import { ModeCards } from "@/components/chrome/ModeCards";
import { Journey } from "@/components/Journey";
import { SafetyNotice } from "@/components/SafetyNotice";
import { PRIMARY_WORKSHOP } from "@/content/registry";
import {
  workshopBase,
  relationshipLine,
  creatorAttribution,
  publicAudience,
} from "@/lib/workshop";

export default function PlatformLandingPage() {
  const { config, agenda } = PRIMARY_WORKSHOP;
  const base = workshopBase(config);
  const hours = Math.round((agenda.totalMinutes / 60) * 10) / 10;

  return (
    <>
      <PlatformHeader
        right={
          <Link
            href={`${base}/participate`}
            className="hidden rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-on-primary hover:bg-primary-strong sm:inline-block"
          >
            Participate
          </Link>
        }
      />
      <main id="main" className="flex-1">
        <div className="container-page py-10 sm:py-14">
          <section className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.14em] text-accent uppercase">
              {config.program.name}
            </p>
            <p className="mt-1 text-lg font-medium text-ink-muted">
              {config.industry.name}
            </p>
            <h1 className="mt-3 text-4xl font-bold text-ink sm:text-5xl">
              {config.program.tagline}
            </h1>
            <p className="mt-4 text-sm text-ink-muted">
              {relationshipLine(config)}
              <span className="mx-2 text-ink-subtle">·</span>
              {creatorAttribution(config)}
            </p>
            <p className="mt-5 text-xl text-ink-muted">
              A platform for workshops where participants don&rsquo;t just
              learn&nbsp;— they build.
            </p>
            <p className="mt-4 text-base text-ink-muted">
              The {config.program.name} is a reusable, content-driven workshop
              platform with Presentation, Participant, and Facilitator modes,
              built on the {config.methodology.name} methodology. It combines
              teaching, live presentation, guided exercises, AI prompts, terminal
              commands, demonstrations, participant progress, and facilitator
              support in one coherent environment.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`${base}/participate`}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-5 py-3 text-base font-semibold text-on-primary shadow-[var(--shadow-card)] hover:bg-primary-strong"
              >
                Participate in the workshop
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <Link
                href={base}
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-5 py-3 text-base font-medium text-ink hover:bg-surface-muted"
              >
                Workshop details
              </Link>
            </div>
          </section>

          <section className="mt-12" aria-labelledby="modes-heading">
            <h2 id="modes-heading" className="text-2xl font-bold text-ink">
              Three views, one content source
            </h2>
            <p className="mt-1 text-ink-muted">
              The same workshop module provides projected slides, participant
              instructions, and facilitator notes — not three unrelated copies.
            </p>
            <div className="mt-4">
              <ModeCards config={config} emphasise="participate" />
            </div>
          </section>

          <section
            className="mt-12 grid gap-4 sm:grid-cols-3"
            aria-label="Workshop at a glance"
          >
            <div className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-5">
              <CalendarDays className="size-5 text-accent" aria-hidden />
              <p className="mt-2 text-2xl font-bold text-ink">{hours} hours</p>
              <p className="text-sm text-ink-muted">
                One hands-on session, {agenda.blocks.length} segments.
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-5">
              <Users className="size-5 text-accent" aria-hidden />
              <p className="mt-2 text-2xl font-bold text-ink">
                {config.organization.name}
              </p>
              <p className="text-sm text-ink-muted">
                {config.organization.publicRelationshipLabel} ·{" "}
                {publicAudience(config)}
              </p>
            </div>
            <div className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-5">
              <Layers className="size-5 text-accent" aria-hidden />
              <p className="mt-2 text-2xl font-bold text-ink">Reusable</p>
              <p className="text-sm text-ink-muted">
                Content-driven, so the same platform serves any industry,
                organization, and audience without changing components.
              </p>
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

          <section className="mt-12" aria-labelledby="safety-heading">
            <h2 id="safety-heading" className="sr-only">
              Safety statement
            </h2>
            <SafetyNotice tone="strong" title="Required safety statement">
              <p>{config.safety.statement}</p>
            </SafetyNotice>
          </section>

          <section className="mt-4 rounded-[var(--radius-card)] border border-border-strong bg-surface p-5">
            <p className="text-sm text-ink-muted">
              {config.creator.role}:{" "}
              <span className="font-semibold text-ink">
                {config.creator.name}
              </span>
              <span className="mx-2 text-ink-subtle">·</span>
              Methodology:{" "}
              <span className="font-semibold text-ink">
                {config.methodology.name}
              </span>
            </p>
          </section>
        </div>
      </main>
      <PlatformFooter config={config} />
    </>
  );
}
