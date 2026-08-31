import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, Sparkles } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { StepCard } from "@/components/StepCard";
import { CommandBlock } from "@/components/CommandBlock";
import { PromptBlock } from "@/components/PromptBlock";
import { ExpectedResult } from "@/components/ExpectedResult";
import { TestCaseTable } from "@/components/TestCaseTable";
import { CompletionCheckbox } from "@/components/CompletionCheckbox";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { OSSelector } from "@/components/OSSelector";
import { Troubleshooting } from "@/components/Troubleshooting";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import {
  BUILD_TWO_TITLE,
  BUILD_TWO_SUBTITLE,
  BUILD_TWO_INTRO,
  BUILD_2_STEPS,
  BUILD_2_STEP_IDS,
  DISCLAIMER,
  SYNTHETIC_DATA_LABEL,
  SIGNAL_NOT_OUTBREAK,
  PROMPT_2,
  COMMIT_2_BLOCK,
  PROMPT_3,
  BOUNDARY_TESTS,
  COMMIT_3_BLOCK,
  BUILD_2_CHECKLIST,
  BUILD_ONE_TROUBLESHOOTING,
} from "@/content/clients/aku/digital-health-2026/build-one";

export const metadata: Metadata = {
  title: "Build 2: Extend your app (optional)",
  description:
    "Optional. Two self-contained features that build on the live Build 1 app: a geospatial history of recent checks, and plain-language explanations for every signal. Do either, both, or neither.",
};

const COMPLETE_IDS = BUILD_2_STEP_IDS.map((id) => `${id}-complete`);

function StepDone({ id, n }: { id: string; n: number }) {
  return (
    <div className="mt-5">
      <CompletionCheckbox
        id={`${id}-complete`}
        label={`Mark Extension ${n} complete`}
        variant="step"
      />
    </div>
  );
}

const step = (n: number) => BUILD_2_STEPS[n - 1];

export default async function BuildTwoPage({
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
          { label: "Build 2" },
        ]}
      />
      <PageIntro
        eyebrow="Optional · fast-finisher track"
        title={BUILD_TWO_TITLE}
        subtitle={BUILD_TWO_SUBTITLE}
        aside={<OSSelector variant="compact" />}
      >
        <p>{BUILD_TWO_INTRO}</p>
        <p>
          You need your working Build 1 project open in VS Code with Copilot in
          Agent mode. If you have not finished{" "}
          <Link href={`${base}/participate/build-1`}>Build 1</Link> yet, do that
          first.
        </p>
      </PageIntro>

      <div className="sticky top-16 z-30 -mx-5 mt-4 border-b border-border bg-bg/95 px-5 py-3 backdrop-blur">
        <ProgressIndicator ids={COMPLETE_IDS} />
      </div>

      <SafetyNotice tone="strong">
        <p>
          Everything you add here still runs on{" "}
          <strong>{SYNTHETIC_DATA_LABEL.toLowerCase()}</strong>. Keep all three
          safety messages visible in the app:
        </p>
        <ul>
          <li>&ldquo;{SYNTHETIC_DATA_LABEL}&rdquo;</li>
          <li>&ldquo;{DISCLAIMER}&rdquo;</li>
          <li>&ldquo;{SIGNAL_NOT_OUTBREAK}&rdquo;</li>
        </ul>
      </SafetyNotice>

      <div className="mt-6 space-y-4">
        {/* EXTENSION A — geospatial history */}
        <StepCard {...step(1)} defaultOpen>
          <p>
            Turn &ldquo;Recent checks&rdquo; into a geospatial history — the same
            five checks, now as coloured markers on the map. The idea to make
            visible: <strong>one signal → multiple geospatial signals</strong>.
            Send Prompt 2 to Copilot in Agent mode.
          </p>
          <PromptBlock
            text={PROMPT_2}
            title="Prompt 2"
            hint="Adds up to five coloured history markers on the same map. Still HTML, CSS, and vanilla JavaScript only."
          />
          <p>When it works and you have tested it, commit and redeploy:</p>
          <CommandBlock
            macos={COMMIT_2_BLOCK.macos}
            windows={COMMIT_2_BLOCK.windows}
            label="extension A commit and deploy commands"
            caption="Commit the Recent checks feature and redeploy"
          />
          <ExpectedResult>
            <p>
              <code>git log --oneline -2</code> shows two commits. The redeploy
              prints a fresh production URL. Open it and confirm Recent checks
              works on the live site.
            </p>
          </ExpectedResult>
          <StepDone id={step(1).id} n={1} />
        </StepCard>

        {/* EXTENSION B — explainable signals */}
        <StepCard {...step(2)}>
          <p>
            Make the result <em>and every history marker popup</em> explain
            itself — the cases, the baseline, the calculation, the ratio, the
            threshold band, and the responsible interpretation. Keep the
            collapsible &ldquo;How it works&rdquo; section. Send Prompt 3.
          </p>
          <PromptBlock
            text={PROMPT_3}
            title="Prompt 3"
            hint="Explainability for the current result and each marker popup. A red marker is a prompt to verify, not proof."
          />
          <p className="font-medium text-ink">Boundary tests to confirm:</p>
          <TestCaseTable
            cases={BOUNDARY_TESTS}
            columns={["Cases", "Baseline", "Ratio"]}
            caption="Threshold boundary tests at 1.4x, 1.5x, and 2.0x"
          />
          <p>Then commit and redeploy:</p>
          <CommandBlock
            macos={COMMIT_3_BLOCK.macos}
            windows={COMMIT_3_BLOCK.windows}
            label="extension B commit and deploy commands"
            caption="Commit the explainability feature and redeploy"
          />
          <ExpectedResult>
            <p>
              The live site now explains why each signal was produced and states
              clearly that it does not diagnose disease or confirm an outbreak.
            </p>
          </ExpectedResult>
          <StepDone id={step(2).id} n={2} />
        </StepCard>

        {/* THE FULL JOURNEY */}
        <StepCard {...step(3)}>
          <p>
            Run this against your live site. Tick each item you confirm — skip
            the rows for any extension you did not do.
          </p>
          <ul className="list-none space-y-2 pl-0">
            {BUILD_2_CHECKLIST.map((item) => (
              <li key={item.id}>
                <CompletionCheckbox id={item.id} label={item.label} />
              </li>
            ))}
          </ul>
          <div className="mt-5 rounded-[var(--radius-card)] border border-stable/30 bg-stable-soft/50 p-5">
            <p className="inline-flex items-center gap-2 font-semibold text-stable">
              <CheckCircle2 className="size-5" aria-hidden />
              The full journey
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              From an empty folder to a tested, version-controlled, publicly
              deployed prototype: a calculator, an interactive Karachi map,
              multiple geospatial signals, and explainable decision support — all
              on synthetic classroom data. Next: the{" "}
              <Link href={`${base}/participate/outbreak-ai`}>
                Outbreak-AI demonstration
              </Link>{" "}
              and the{" "}
              <Link href={`${base}/participate/team-challenge`}>
                Team Challenge
              </Link>
              .
            </p>
          </div>
          <StepDone id={step(3).id} n={3} />
        </StepCard>
      </div>

      <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft/50 px-4 py-2 text-sm text-ink-muted">
        <Sparkles className="size-4 text-accent" aria-hidden />
        No time today? This page is the same after the workshop — it makes a good
        evening project.
      </p>

      <Troubleshooting entries={BUILD_ONE_TROUBLESHOOTING} />

      <ParticipantStepNav base={base} current="/participate/build-2" />
    </div>
  );
}
