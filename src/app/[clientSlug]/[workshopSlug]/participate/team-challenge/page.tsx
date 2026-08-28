import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { SafetyNotice } from "@/components/SafetyNotice";
import { TimeAllocation } from "@/components/TimeAllocation";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import {
  CHALLENGE_OBJECTIVE,
  TEAM_FORMATION,
  MVP_REQUIREMENTS,
  VALUE_PROMPTS,
  HEALTH_DATA_GUIDANCE,
  PRESENTATION_STRUCTURE,
  PRESENTATION_TIPS,
  RUBRIC,
  RUBRIC_NOTE,
} from "@/content/clients/aku/digital-health-2026/team-challenge";

export const metadata: Metadata = {
  title: "Team Challenge",
  description:
    "Build and present a minimum viable prototype for a real health worker or researcher in about 40 minutes, then present it in five minutes against a simple rubric.",
};

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 list-disc space-y-2 pl-6 text-ink-muted">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  );
}

export default async function TeamChallengePage({
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
          { label: "Team Challenge" },
        ]}
      />
      <PageIntro
        eyebrow="Applied challenge"
        title="Team Challenge"
        subtitle="A 40-minute team build sprint: turn a real problem into a working prototype, with AI, then demo it live."
        aside={
          <div className="flex flex-col items-end gap-2">
            <TimeAllocation minutes={45} label="Build" />
            <TimeAllocation minutes={25} label="Presentations" />
          </div>
        }
      >
        <p>{CHALLENGE_OBJECTIVE}</p>
      </PageIntro>

      <div className="mt-8 space-y-8">
        <section aria-labelledby="teams-heading">
          <h2 id="teams-heading" className="text-xl font-semibold text-ink">
            Form your team
          </h2>
          <List items={TEAM_FORMATION} />
        </section>

        <section aria-labelledby="mvp-heading">
          <h2 id="mvp-heading" className="text-xl font-semibold text-ink">
            What the prototype must have
          </h2>
          <List items={MVP_REQUIREMENTS} />
        </section>

        <section aria-labelledby="value-heading">
          <h2 id="value-heading" className="text-xl font-semibold text-ink">
            Define the user and the value
          </h2>
          <p className="mt-1 text-ink-muted">
            Answer these before you write a prompt. Write the answers where the
            team can see them.
          </p>
          <List items={VALUE_PROMPTS} />
        </section>

        <SafetyNotice tone="strong" title="Responsible use of health data">
          <ul>
            {HEALTH_DATA_GUIDANCE.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </SafetyNotice>

        <section aria-labelledby="present-heading">
          <h2 id="present-heading" className="text-xl font-semibold text-ink">
            Presentation structure — five minutes
          </h2>
          <ol className="mt-3 space-y-2">
            {PRESENTATION_STRUCTURE.map((p) => (
              <li
                key={p.part}
                className="rounded-lg border border-border-strong bg-surface px-4 py-3"
              >
                <span className="font-semibold text-ink">{p.part}</span>
                <span className="mt-0.5 block text-sm text-ink-muted">
                  {p.detail}
                </span>
              </li>
            ))}
          </ol>
          <List items={PRESENTATION_TIPS} />
        </section>

        <section aria-labelledby="rubric-heading">
          <h2 id="rubric-heading" className="text-xl font-semibold text-ink">
            Scoring rubric
          </h2>
          <div className="mt-3 overflow-x-auto rounded-[var(--radius-card)] border border-border-strong">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                Team Challenge scoring rubric
              </caption>
              <thead>
                <tr className="bg-surface-muted text-left">
                  <th
                    scope="col"
                    className="border-b border-border-strong px-3 py-2 font-semibold text-ink"
                  >
                    Dimension
                  </th>
                  <th
                    scope="col"
                    className="border-b border-border-strong px-3 py-2 font-semibold text-ink"
                  >
                    What we look for (score 1–5)
                  </th>
                </tr>
              </thead>
              <tbody>
                {RUBRIC.map((row) => (
                  <tr
                    key={row.dimension}
                    className="odd:bg-surface even:bg-surface-muted/40"
                  >
                    <td className="border-b border-border px-3 py-2 font-medium text-ink">
                      {row.dimension}
                    </td>
                    <td className="border-b border-border px-3 py-2 text-ink-muted">
                      {row.description}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-2 text-sm text-ink-subtle">{RUBRIC_NOTE}</p>
        </section>
      </div>

      <ParticipantStepNav base={base} current="/participate/team-challenge" />
    </div>
  );
}
