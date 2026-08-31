import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { SafetyNotice } from "@/components/SafetyNotice";
import { TimeAllocation } from "@/components/TimeAllocation";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { PromptBlock } from "@/components/PromptBlock";
import { CompletionCheckbox } from "@/components/CompletionCheckbox";
import { IdeaCard } from "@/components/IdeaCard";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase, creatorLinkedIn } from "@/lib/workshop";
import {
  CHALLENGE_OBJECTIVE,
  TEAM_FORMATION,
  IDEA_CARD_RULE,
  TEAM_BOARD_INTRO,
  GALLERY_STEPS,
  SHARPEN_QUESTIONS,
  SHARPEN_RULE,
  MVP_REQUIREMENTS,
  HEALTH_DATA_GUIDANCE,
  PRESENTATION_STRUCTURE,
  PRESENTATION_TIPS,
  RUBRIC,
  RUBRIC_NOTE,
  SHARE_YOUR_BUILD,
  SHARE_POST_TEMPLATE,
} from "@/content/clients/aku/digital-health-2026/team-challenge";

export const metadata: Metadata = {
  title: "Team Challenge",
  description:
    "Lock a one-page idea, review every team's idea together, sharpen yours, then build a working prototype in about 40 minutes and present it in five.",
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

const PHASES = [
  { href: "#idea", label: "1 · Lock your idea" },
  { href: "#gallery", label: "2 · Idea gallery" },
  { href: "#sharpen", label: "3 · Sharpen" },
  { href: "#build", label: "4 · Build" },
];

export default async function TeamChallengePage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config } = await getBundle(params);
  const base = workshopBase(config);
  const linkedIn = creatorLinkedIn(config);

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
        subtitle="Idea first, then build. Lock a one-page idea, review every team's idea together, sharpen yours, then build it live."
        aside={
          <div className="flex flex-col items-end gap-2">
            <TimeAllocation minutes={40} label="Build" />
            <TimeAllocation minutes={25} label="Presentations" />
          </div>
        }
      >
        <p>{CHALLENGE_OBJECTIVE}</p>
      </PageIntro>

      <nav aria-label="Team Challenge phases" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {PHASES.map((p) => (
            <li key={p.href}>
              <a
                href={p.href}
                className="rounded-full border border-border-strong bg-surface px-3 py-1 text-sm text-ink-muted hover:border-primary hover:text-primary"
              >
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 space-y-10">
        {/* PHASE 1 — lock your idea */}
        <section id="idea" aria-labelledby="idea-heading" className="scroll-mt-24">
          <h2 id="idea-heading" className="text-xl font-semibold text-ink">
            1 · Lock your idea
          </h2>
          <List items={TEAM_FORMATION} />
          <p className="mt-4 text-ink-muted">{TEAM_BOARD_INTRO}</p>
          <p className="mt-2 rounded-lg border border-investigate/40 bg-investigate-soft/40 px-3 py-2 text-sm font-medium text-ink">
            {IDEA_CARD_RULE}
          </p>
          <IdeaCard />
        </section>

        {/* PHASE 2 — idea gallery */}
        <section
          id="gallery"
          aria-labelledby="gallery-heading"
          className="scroll-mt-24"
        >
          <h2 id="gallery-heading" className="text-xl font-semibold text-ink">
            2 · Idea gallery — about 8 minutes
          </h2>
          <p className="mt-1 text-ink-muted">
            Every idea goes up together. This is also your breather — stand up,
            walk the board.
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-ink-muted">
            {GALLERY_STEPS.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ol>
        </section>

        {/* PHASE 3 — sharpen */}
        <section
          id="sharpen"
          aria-labelledby="sharpen-heading"
          className="scroll-mt-24"
        >
          <h2 id="sharpen-heading" className="text-xl font-semibold text-ink">
            3 · Sharpen — about 3 minutes
          </h2>
          <p className="mt-1 text-ink-muted">
            Based on what you heard, answer these, then update your Idea Card.
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-6 text-ink-muted">
            {SHARPEN_QUESTIONS.map((q) => (
              <li key={q}>{q}</li>
            ))}
          </ol>
          <p className="mt-3 rounded-lg border border-primary/40 bg-primary-soft/50 px-3 py-2 text-sm font-medium text-ink">
            {SHARPEN_RULE}
          </p>
        </section>

        {/* PHASE 4 — build */}
        <section id="build" aria-labelledby="build-heading" className="scroll-mt-24">
          <h2 id="build-heading" className="text-xl font-semibold text-ink">
            4 · Build — about 40 minutes
          </h2>

          <h3 className="mt-4 text-lg font-semibold text-ink">
            What the prototype must have
          </h3>
          <List items={MVP_REQUIREMENTS} />

          <SafetyNotice tone="strong" title="Responsible use of health data">
            <ul>
              {HEALTH_DATA_GUIDANCE.map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </SafetyNotice>

          <h3 className="mt-6 text-lg font-semibold text-ink">
            Presentation structure — five minutes
          </h3>
          <p className="mt-1 text-sm text-ink-muted">
            The problem, the user, and the boundary come straight off your locked
            Idea Card.
          </p>
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

          <h3 className="mt-6 text-lg font-semibold text-ink">Scoring rubric</h3>
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

        {/* Share */}
        <section
          id="share"
          aria-labelledby="share-heading"
          className="scroll-mt-24 rounded-[var(--radius-card)] border border-border-strong bg-surface-muted/40 p-5"
        >
          <h2 id="share-heading" className="text-xl font-semibold text-ink">
            Share what you built
          </h2>
          <p className="mt-1 text-ink-muted">
            The demo is done — now make it something you can point to next week.
            Post your team&rsquo;s build on LinkedIn before you leave.
          </p>
          <List items={SHARE_YOUR_BUILD} />

          <div className="mt-4">
            <p className="text-sm font-semibold text-ink">
              A starting point for the post
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              Replace every bracket. It should sound like you wrote it, not a
              template.
            </p>
            <PromptBlock
              title="LinkedIn post draft"
              label="LinkedIn post draft"
              text={SHARE_POST_TEMPLATE}
            />
          </div>

          {linkedIn ? (
            <a
              href={linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-2 rounded-full border border-primary bg-primary-soft px-4 py-2 text-sm font-medium text-primary hover:bg-primary hover:text-white"
            >
              <LinkedInIcon className="size-4" />
              Connect with {config.creator.name} on LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}

          <div className="mt-4">
            <CompletionCheckbox
              id="team-challenge-shared"
              label="Posted our build on LinkedIn and tagged the facilitator"
            />
          </div>
        </section>
      </div>

      <ParticipantStepNav base={base} current="/participate/team-challenge" />
    </div>
  );
}
