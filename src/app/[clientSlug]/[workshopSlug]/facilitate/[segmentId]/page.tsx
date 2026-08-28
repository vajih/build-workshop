import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Presentation, NotebookPen } from "lucide-react";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { QRCode } from "@/components/QRCode";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { resolveWorkshop, workshopParams } from "@/content/registry";
import { workshopBase } from "@/lib/workshop";
import { absoluteUrl } from "@/lib/site";
import { moduleByFacilitatorId } from "@/content/clients/aku/digital-health-2026/modules";
import { PRESENTATION_SECTIONS } from "@/content/clients/aku/digital-health-2026/presentation";

interface SegmentParams extends WorkshopRouteParams {
  segmentId: string;
}

export function generateStaticParams() {
  const out: { clientSlug: string; workshopSlug: string; segmentId: string }[] =
    [];
  for (const { clientSlug, workshopSlug } of workshopParams()) {
    const bundle = resolveWorkshop(clientSlug, workshopSlug);
    if (!bundle) continue;
    for (const seg of bundle.facilitatorSegments) {
      out.push({ clientSlug, workshopSlug, segmentId: seg.id });
    }
  }
  return out;
}

const FIELDS: { key: keyof SegmentContent; label: string }[] = [
  { key: "objective", label: "Learning objective" },
  { key: "says", label: "What the instructor says" },
  { key: "studentsDo", label: "What students do" },
  { key: "checkpoint", label: "Expected checkpoint" },
  { key: "commonFailure", label: "Common failure" },
  { key: "recovery", label: "Recovery" },
  { key: "transition", label: "Transition" },
];

type SegmentContent = {
  objective: string;
  says: string;
  studentsDo: string;
  checkpoint: string;
  commonFailure: string;
  recovery: string;
  transition: string;
};

export default async function FacilitateSegmentPage({
  params,
}: {
  params: Promise<SegmentParams>;
}) {
  const { config, facilitatorSegments } = await getBundle(params);
  const { segmentId } = await params;
  const base = workshopBase(config);

  const idx = facilitatorSegments.findIndex((s) => s.id === segmentId);
  if (idx === -1) notFound();
  const seg = facilitatorSegments[idx];
  const prev = idx > 0 ? facilitatorSegments[idx - 1] : null;
  const next =
    idx < facilitatorSegments.length - 1 ? facilitatorSegments[idx + 1] : null;

  const start = facilitatorSegments
    .slice(0, idx)
    .reduce((n, s) => n + s.minutes, 0);
  const end = start + seg.minutes;

  const mod = moduleByFacilitatorId(seg.id);
  const section = mod?.presentationSectionId
    ? PRESENTATION_SECTIONS.find((s) => s.id === mod.presentationSectionId)
    : undefined;
  const participantPath = mod?.participantHref
    ? `${base}${mod.participantHref}`
    : null;

  return (
    <div className="container-page py-8">
      <Breadcrumbs
        items={[
          { label: "Facilitator", href: `${base}/facilitate` },
          { label: seg.title },
        ]}
      />

      <header className="mt-3 border-b border-border pb-5">
        <p className="font-mono text-sm text-ink-subtle">
          {start}–{end} min · {seg.minutes} minutes
        </p>
        <h1 className="mt-1 text-3xl font-bold text-ink">{seg.title}</h1>
        <div className="mt-3 flex flex-wrap gap-2">
          {section?.firstSlideId ? (
            <Link
              href={`${base}/present/${section.firstSlideId}`}
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-primary"
            >
              <Presentation className="size-4" aria-hidden />
              Open presentation section
            </Link>
          ) : null}
          {participantPath ? (
            <Link
              href={participantPath}
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted hover:text-primary"
            >
              <NotebookPen className="size-4" aria-hidden />
              Open participant activity
            </Link>
          ) : null}
        </div>
      </header>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_auto]">
        <dl className="space-y-4">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <dt className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">
                {f.label}
              </dt>
              <dd className="mt-0.5 text-ink">
                {(seg as unknown as SegmentContent)[f.key]}
              </dd>
            </div>
          ))}
        </dl>

        {participantPath ? (
          <aside className="lg:w-56">
            <p className="mb-2 text-xs font-semibold tracking-wide text-ink-subtle uppercase">
              Participant activity
            </p>
            <QRCode
              value={absoluteUrl(participantPath)}
              size={180}
              label="Participant activity for this segment"
            />
          </aside>
        ) : null}
      </div>

      {seg.timing ? (
        <section className="mt-8" aria-labelledby="timing-heading">
          <h2
            id="timing-heading"
            className="text-lg font-semibold text-ink"
          >
            Recommended timing
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Operational target for the core &ldquo;empty folder → deployed&rdquo;
            loop. Venue network can move these — keep the immersion tightly
            managed.
          </p>
          <ul className="mt-3 divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface">
            {seg.timing.map((t) => (
              <li
                key={t.label}
                className="flex items-center justify-between gap-4 px-4 py-2.5 text-sm"
              >
                <span className="text-ink">{t.label}</span>
                <span className="font-mono text-ink-muted">{t.range}</span>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {seg.deepDive ? (
        <section className="mt-8 space-y-5" aria-labelledby="deepdive-heading">
          <h2
            id="deepdive-heading"
            className="text-lg font-semibold text-ink"
          >
            Delivery notes
          </h2>
          {seg.deepDive.map((note) => (
            <div
              key={note.heading}
              className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-4"
            >
              <p className="font-semibold text-ink">{note.heading}</p>
              <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-ink-muted">
                {note.body.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ) : null}

      <nav
        aria-label="Segment navigation"
        className="mt-10 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
      >
        {prev ? (
          <Link
            href={`${base}/facilitate/${prev.id}`}
            className="flex flex-col rounded-[var(--radius-card)] border border-border-strong bg-surface px-4 py-3 hover:border-primary"
          >
            <span className="inline-flex items-center gap-1 text-xs text-ink-subtle">
              <ArrowLeft className="size-3.5" aria-hidden />
              Previous segment
            </span>
            <span className="mt-0.5 font-semibold text-primary">
              {prev.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link
            href={`${base}/facilitate/${next.id}`}
            className="flex flex-col rounded-[var(--radius-card)] border border-border-strong bg-surface px-4 py-3 text-right hover:border-primary sm:items-end"
          >
            <span className="inline-flex items-center gap-1 text-xs text-ink-subtle">
              Next segment
              <ArrowRight className="size-3.5" aria-hidden />
            </span>
            <span className="mt-0.5 font-semibold text-primary">
              {next.title}
            </span>
          </Link>
        ) : (
          <span />
        )}
      </nav>
    </div>
  );
}
