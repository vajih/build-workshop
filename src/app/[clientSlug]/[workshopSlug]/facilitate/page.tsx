import Link from "next/link";
import { ArrowRight, CheckSquare, LifeBuoy, ListOrdered } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { SessionClock } from "@/components/facilitator/SessionClock";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase, facilitatorField, publicAudience } from "@/lib/workshop";
import { moduleByFacilitatorId } from "@/content/clients/aku/digital-health-2026/modules";
import {
  PRESENTER_CHECKLIST,
  BACKUP_INSTRUCTIONS,
  BUILD_CYCLE,
} from "@/content/clients/aku/digital-health-2026/facilitator";
import {
  PRESENTATION_SECTIONS,
  DRAFT_SLIDES,
} from "@/content/clients/aku/digital-health-2026/presentation";

export default async function FacilitateDashboardPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config, facilitatorSegments } = await getBundle(params);
  const base = workshopBase(config);

  // cumulative windows (no mutation across the map)
  const segments = facilitatorSegments.reduce<
    { id: string; title: string; start: number; end: number; minutes: number }[]
  >((acc, seg) => {
    const start = acc.length ? acc[acc.length - 1].end : 0;
    acc.push({
      id: seg.id,
      title: seg.title,
      start,
      end: start + seg.minutes,
      minutes: seg.minutes,
    });
    return acc;
  }, []);

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Operational view"
        title="Run the workshop"
        subtitle="Timing, checkpoints, and recovery for each segment. Open a segment for the full script."
      />

      <dl className="mt-4 grid gap-x-8 gap-y-1 text-sm sm:grid-cols-2">
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Engagement</dt>
          <dd className="text-ink">{config.engagement.name}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Organization</dt>
          <dd className="text-ink">
            {config.organization.publicRelationshipLabel}{" "}
            {config.organization.name}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Industry</dt>
          <dd className="text-ink">{config.industry.name}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Methodology</dt>
          <dd className="text-ink">{config.methodology.name}</dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Date</dt>
          <dd className={config.engagement.date ? "text-ink" : "text-watch"}>
            {facilitatorField(config.engagement.date, "Date")}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Location</dt>
          <dd className={config.engagement.location ? "text-ink" : "text-watch"}>
            {facilitatorField(config.engagement.location, "Location")}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Department</dt>
          <dd
            className={config.engagement.department ? "text-ink" : "text-watch"}
          >
            {facilitatorField(config.engagement.department, "Department")}
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="text-ink-subtle">Course</dt>
          <dd className={config.engagement.course ? "text-ink" : "text-watch"}>
            {facilitatorField(config.engagement.course, "Course")}
          </dd>
        </div>
      </dl>

      {!config.audience.confirmed ? (
        <div className="mt-4 rounded-[var(--radius-card)] border border-watch/40 bg-watch-soft/60 p-3 text-sm text-watch">
          <p>
            <strong>Review needed.</strong> Public pages currently show the
            neutral fallback &ldquo;{publicAudience(config)}&rdquo;. The precise
            draft description is:
          </p>
          <p className="mt-1 rounded bg-surface/70 px-2 py-1 font-medium text-ink">
            &ldquo;{config.audience.description}&rdquo;
          </p>
          <p className="mt-1">
            Confirm or edit it in{" "}
            <code>src/content/clients/aku/digital-health-2026/workshop.ts</code>{" "}
            and set <code>audience.confirmed: true</code>. Also confirm any date,
            location, department, and course marked above, and the &ldquo;
            {config.organization.publicRelationshipLabel}&rdquo; relationship
            wording.
          </p>
        </div>
      ) : null}

      {DRAFT_SLIDES.length > 0 ? (
        <p className="mt-3 rounded-[var(--radius-card)] border border-watch/40 bg-watch-soft/60 p-3 text-sm text-watch">
          <strong>Draft slides.</strong> These slides need review before
          delivery (not flagged on the projected deck):{" "}
          <span className="font-mono">{DRAFT_SLIDES.join(", ")}</span>. Open them
          at <code>{base}/present/&lt;id&gt;</code>.
        </p>
      ) : null}

      <div className="mt-6">
        <SessionClock
          storageKey={`workshop:${config.clientSlug}:${config.slug}:session-start`}
          segments={segments}
        />
      </div>

      <section className="mt-8" aria-labelledby="segments-heading">
        <h2 id="segments-heading" className="text-xl font-semibold text-ink">
          Segments
        </h2>
        <ol className="mt-3 space-y-2">
          {segments.map((seg) => {
            const mod = moduleByFacilitatorId(seg.id);
            const section = mod?.presentationSectionId
              ? PRESENTATION_SECTIONS.find(
                  (s) => s.id === mod.presentationSectionId,
                )
              : undefined;
            return (
              <li
                key={seg.id}
                className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-4"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Link
                    href={`${base}/facilitate/${seg.id}`}
                    className="text-lg font-semibold text-primary hover:underline"
                  >
                    {seg.title}
                  </Link>
                  <span className="font-mono text-sm text-ink-subtle">
                    {seg.start}–{seg.end} min
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm">
                  {section?.firstSlideId ? (
                    <Link
                      href={`${base}/present/${section.firstSlideId}`}
                      className="text-ink-muted hover:text-primary"
                    >
                      → Presentation section
                    </Link>
                  ) : null}
                  {mod?.participantHref ? (
                    <Link
                      href={`${base}${mod.participantHref}`}
                      className="text-ink-muted hover:text-primary"
                    >
                      → Participant activity
                    </Link>
                  ) : null}
                  <Link
                    href={`${base}/facilitate/${seg.id}`}
                    className="inline-flex items-center gap-1 font-medium text-primary"
                  >
                    Open segment
                    <ArrowRight className="size-3.5" aria-hidden />
                  </Link>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="mt-8" aria-labelledby="deck-editor-heading">
        <h2
          id="deck-editor-heading"
          className="inline-flex items-center gap-2 text-xl font-semibold text-ink"
        >
          <ListOrdered className="size-5 text-accent" aria-hidden />
          Deck Editor
        </h2>
        <p className="mt-2 text-sm text-ink-muted">
          Reorder slides within a section or hide ones you want to skip this
          delivery, without deleting anything — content stays in the source
          files, only order and visibility change.
        </p>
        <Link
          href={`${base}/facilitate/deck-editor`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Open the Deck Editor
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>

      <section className="mt-8" aria-labelledby="cycle-heading">
        <h2 id="cycle-heading" className="text-xl font-semibold text-ink">
          The build cycle to keep repeating
        </h2>
        <p className="mt-2 font-mono text-sm text-ink-muted">
          {BUILD_CYCLE.join(" → ")}
        </p>
      </section>

      <section className="mt-8" aria-labelledby="checklist-heading">
        <h2
          id="checklist-heading"
          className="inline-flex items-center gap-2 text-xl font-semibold text-ink"
        >
          <CheckSquare className="size-5 text-accent" aria-hidden />
          Presenter checklist
        </h2>
        <ul className="mt-3 space-y-2">
          {PRESENTER_CHECKLIST.map((item) => (
            <li
              key={item}
              className="flex gap-2 rounded-lg border border-border-strong bg-surface px-3 py-2 text-sm text-ink-muted"
            >
              <span
                aria-hidden
                className="mt-1 size-3.5 shrink-0 rounded border border-border-strong"
              />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8" aria-labelledby="backup-heading">
        <h2
          id="backup-heading"
          className="inline-flex items-center gap-2 text-xl font-semibold text-ink"
        >
          <LifeBuoy className="size-5 text-accent" aria-hidden />
          Backup and recovery
        </h2>
        <div className="mt-3 space-y-3">
          {BACKUP_INSTRUCTIONS.map((group) => (
            <div
              key={group.title}
              className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-4"
            >
              <p className="font-semibold text-ink">{group.title}</p>
              <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-sm text-ink-muted">
                {group.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
          ))}
        </div>
        <Link
          href={`${base}/backup`}
          className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          Open the backup and print pages
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </section>
    </div>
  );
}
