import { PageIntro } from "@/components/PageIntro";
import { PrintButton } from "@/components/PrintButton";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import {
  BUILD1_DEBRIEF,
  BUILD_CYCLE,
  PRESENTER_CHECKLIST,
} from "@/content/clients/aku/digital-health-2026/facilitator";

export const metadata = { title: "Facilitator notes (print)" };

const FIELDS = [
  ["objective", "Objective"],
  ["says", "Says"],
  ["studentsDo", "Students do"],
  ["checkpoint", "Checkpoint"],
  ["commonFailure", "Common failure"],
  ["recovery", "Recovery"],
  ["transition", "Transition"],
] as const;

export default async function BackupFacilitatorPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { facilitatorSegments } = await getBundle(params);

  const timed = facilitatorSegments.reduce<
    { seg: (typeof facilitatorSegments)[number]; start: number; end: number }[]
  >((acc, seg) => {
    const start = acc.length ? acc[acc.length - 1].end : 0;
    acc.push({ seg, start, end: start + seg.minutes });
    return acc;
  }, []);

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Backup"
        title="Facilitator notes"
        subtitle="Every segment on one page, for printing or offline reference."
        aside={<PrintButton />}
      />

      <p className="mt-4 font-mono text-sm text-ink-muted">
        {BUILD_CYCLE.join(" → ")}
      </p>

      <div className="mt-6 space-y-6">
        {timed.map(({ seg, start, end }) => {
          return (
            <section
              key={seg.id}
              className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-4"
            >
              <div className="flex items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold text-ink">{seg.title}</h2>
                <span className="font-mono text-sm text-ink-subtle">
                  {start}–{end} min
                </span>
              </div>
              <dl className="mt-2 space-y-1.5 text-sm">
                {FIELDS.map(([key, label]) => (
                  <div key={key} className="sm:flex sm:gap-3">
                    <dt className="shrink-0 font-semibold text-ink-subtle sm:w-32">
                      {label}
                    </dt>
                    <dd className="text-ink-muted">{seg[key]}</dd>
                  </div>
                ))}
              </dl>
              {seg.timing ? (
                <p className="mt-2 text-sm text-ink-muted">
                  <span className="font-semibold text-ink-subtle">
                    Timing target:
                  </span>{" "}
                  {seg.timing.map((t) => `${t.label} ${t.range}`).join(" · ")}
                </p>
              ) : null}
              {seg.deepDive
                ? seg.deepDive.map((note) => (
                    <div key={note.heading} className="mt-2 text-sm">
                      <p className="font-semibold text-ink">{note.heading}</p>
                      <ul className="list-disc pl-5 text-ink-muted">
                        {note.body.map((line) => (
                          <li key={line}>{line}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                : null}
            </section>
          );
        })}
      </div>

      <section className="mt-8">
        <h2 className="text-lg font-semibold text-ink">Build 1 debrief</h2>
        <p className="mt-1 text-ink-muted">&ldquo;{BUILD1_DEBRIEF}&rdquo;</p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">Presenter checklist</h2>
        <ul className="mt-1 list-disc space-y-1 pl-5 text-sm text-ink-muted">
          {PRESENTER_CHECKLIST.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
