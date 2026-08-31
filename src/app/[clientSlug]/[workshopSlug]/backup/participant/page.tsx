import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";
import { PrintButton } from "@/components/PrintButton";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import {
  BRING_CHECKLIST,
  INSTALL_CHECKLIST,
  DIAGNOSTICS,
} from "@/content/clients/aku/digital-health-2026/before-workshop";
import {
  IDEA_CARD_FIELDS,
  GALLERY_STEPS,
  SHARPEN_QUESTIONS,
  RUBRIC,
} from "@/content/clients/aku/digital-health-2026/team-challenge";
import {
  BUILD_1_STEPS,
  BUILD_2_STEPS,
  BUILD_ONE_TESTS,
  MAP_TESTS,
  DEMO_LOCATIONS,
  DISCLAIMER,
  SYNTHETIC_DATA_LABEL,
  SIGNAL_NOT_OUTBREAK,
  OSM_ATTRIBUTION,
  CLEAN_SLATE_BLOCK,
  CLEAN_SLATE_NOTE,
} from "@/content/clients/aku/digital-health-2026/build-one";

export const metadata = { title: "Participant instructions (print)" };

export default async function BackupParticipantPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config, agenda } = await getBundle(params);
  const base = workshopBase(config);

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Backup"
        title="Participant instructions"
        subtitle="A one-page summary of the participant path. The full interactive version is in the workbook."
        aside={<PrintButton />}
      >
        <div className="rounded-md border border-watch/40 bg-watch-soft/50 p-2 text-sm">
          <p>{SYNTHETIC_DATA_LABEL}</p>
          <p>{DISCLAIMER}</p>
          <p>{SIGNAL_NOT_OUTBREAK}</p>
        </div>
        <p>
          The app is a calculator <strong>and</strong> an interactive Karachi
          map (Leaflet + OpenStreetMap). The map needs an internet connection for
          its tiles; the calculator keeps working if the map is unavailable.
        </p>
        <p>
          Full commands:{" "}
          <Link href={`${base}/backup/commands`}>backup/commands</Link>. Full
          prompts: <Link href={`${base}/backup/prompts`}>backup/prompts</Link>.
        </p>
      </PageIntro>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">Agenda</h2>
        <ol className="mt-1 text-sm text-ink-muted">
          {agenda.blocks.map((b) => (
            <li key={b.start}>
              <span className="font-mono">{b.start}</span> — {b.title} (
              {b.minutes} min)
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">Before the workshop</h2>
        <p className="mt-1 text-sm font-medium text-ink">Bring</p>
        <ul className="list-disc pl-5 text-sm text-ink-muted">
          {BRING_CHECKLIST.map((i) => (
            <li key={i.id}>{i.label}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm font-medium text-ink">
          Install — all six are required for Build 1
        </p>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-ink-muted">
          {INSTALL_CHECKLIST.map((i) => (
            <li key={i.id}>
              <span className="font-medium text-ink">{i.label}</span>
              {i.detail ? ` — ${i.detail}` : null}
              {i.setup ? (
                <>
                  <ul className="mt-1 list-disc space-y-0.5 pl-5">
                    {i.setup.steps.map((s, n) => (
                      <li key={n}>{s}</li>
                    ))}
                  </ul>
                  {i.setup.verify ? (
                    <p className="mt-1">
                      <span className="font-medium text-ink">Check: </span>
                      {i.setup.verify}
                    </p>
                  ) : null}
                  {i.setup.docHref ? (
                    <p className="text-ink-subtle">{i.setup.docHref}</p>
                  ) : null}
                </>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="mt-2 text-sm font-medium text-ink">
          Check (same on macOS and Windows)
        </p>
        <pre className="mt-1 overflow-x-auto rounded-md border border-border-strong bg-surface-muted px-3 py-2 text-[13px]">
          <code className="font-mono whitespace-pre">
            {DIAGNOSTICS.map((d) => d.command).join("\n")}
          </code>
        </pre>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">
          Build 1 — {BUILD_1_STEPS.length} steps (about 20 minutes)
        </h2>
        <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-ink-muted">
          {BUILD_1_STEPS.map((s) => (
            <li key={s.id}>
              <span className="font-medium text-ink">{s.title}.</span>{" "}
              {s.summary}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">
          Build 2 (optional) — {BUILD_2_STEPS.length} steps
        </h2>
        <ol className="mt-1 list-decimal space-y-1 pl-5 text-sm text-ink-muted">
          {BUILD_2_STEPS.map((s) => (
            <li key={s.id}>
              <span className="font-medium text-ink">{s.title}.</span>{" "}
              {s.summary}
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">
          Start over — clean slate
        </h2>
        <p className="text-sm text-ink-muted">
          Deletes only the <code>01-outbreak-signal</code> project folder so you
          can restart Build 1. Close the folder in VS Code and stop the preview
          server first. {CLEAN_SLATE_NOTE}
        </p>
        <div className="mt-2 grid gap-3 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-ink-subtle">macOS</p>
            <pre className="mt-1 overflow-x-auto rounded-md border border-border-strong bg-surface-muted px-3 py-2 text-[13px]">
              <code className="font-mono whitespace-pre">
                {CLEAN_SLATE_BLOCK.macos}
              </code>
            </pre>
          </div>
          <div>
            <p className="text-xs font-semibold text-ink-subtle">
              Windows PowerShell
            </p>
            <pre className="mt-1 overflow-x-auto rounded-md border border-border-strong bg-surface-muted px-3 py-2 text-[13px]">
              <code className="font-mono whitespace-pre">
                {CLEAN_SLATE_BLOCK.windows}
              </code>
            </pre>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">
          The five demonstration locations
        </h2>
        <p className="text-sm text-ink-muted">
          Predefined dropdown options. Approximate classroom coordinates for the
          map — not official administrative centroids.
        </p>
        <ul className="mt-1 text-sm text-ink-muted">
          {DEMO_LOCATIONS.map((l) => (
            <li key={l.label}>
              <span className="font-medium text-ink">{l.label}</span> —{" "}
              <span className="font-mono">
                {l.lat.toFixed(2)}, {l.lng.toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">
          Build 1 calculation tests
        </h2>
        <table className="mt-1 w-full border-collapse text-sm">
          <thead>
            <tr className="text-left">
              <th className="border-b border-border-strong py-1 pr-3">Location</th>
              <th className="border-b border-border-strong py-1 pr-3">Cases</th>
              <th className="border-b border-border-strong py-1 pr-3">Baseline</th>
              <th className="border-b border-border-strong py-1">Expected</th>
            </tr>
          </thead>
          <tbody>
            {BUILD_ONE_TESTS.map((t, i) => (
              <tr key={i}>
                <td className="border-b border-border py-1 pr-3 font-mono">
                  {t.inputs.Location}
                </td>
                <td className="border-b border-border py-1 pr-3 font-mono">
                  {t.inputs.Cases}
                </td>
                <td className="border-b border-border py-1 pr-3 font-mono">
                  {t.inputs.Baseline}
                </td>
                <td className="border-b border-border py-1">{t.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">Build 1 map checks</h2>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink-muted">
          {MAP_TESTS.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-2 text-sm text-ink-muted">
          Attribution required and must stay readable: {OSM_ATTRIBUTION}. If
          tiles are blocked, the calculator must still work.
        </p>
      </section>

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">
          Team Challenge — idea first
        </h2>
        <p className="mt-1 text-sm font-medium text-ink">
          Idea Card (fill it, put it on the shared board — no prompting until it
          is there)
        </p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink-muted">
          {IDEA_CARD_FIELDS.map((f) => (
            <li key={f.id}>
              <span className="font-medium text-ink">{f.label}</span> — {f.hint}
            </li>
          ))}
        </ul>
        <p className="mt-2 text-sm font-medium text-ink">
          Idea gallery (~8 min)
        </p>
        <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm text-ink-muted">
          {GALLERY_STEPS.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <p className="mt-2 text-sm font-medium text-ink">
          Sharpen, then lock (~3 min)
        </p>
        <ol className="mt-1 list-decimal space-y-0.5 pl-5 text-sm text-ink-muted">
          {SHARPEN_QUESTIONS.map((q) => (
            <li key={q}>{q}</li>
          ))}
        </ol>
        <p className="mt-2 text-sm font-medium text-ink">Scored 1–5 on</p>
        <ul className="mt-1 list-disc space-y-0.5 pl-5 text-sm text-ink-muted">
          {RUBRIC.map((r) => (
            <li key={r.dimension}>{r.dimension}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
