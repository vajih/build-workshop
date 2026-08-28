import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { StepCard } from "@/components/StepCard";
import { CommandBlock } from "@/components/CommandBlock";
import { PromptBlock } from "@/components/PromptBlock";
import { ExpectedResult } from "@/components/ExpectedResult";
import { TestCaseTable } from "@/components/TestCaseTable";
import { CompletionCheckbox } from "@/components/CompletionCheckbox";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { OSSelector } from "@/components/OSSelector";
import { OpenTerminalText } from "@/components/OpenTerminalText";
import { Troubleshooting } from "@/components/Troubleshooting";
import { SafetyNotice } from "@/components/SafetyNotice";
import { Notice } from "@/components/Notice";
import { LiveUrlField } from "@/components/LiveUrlField";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import {
  BUILD_ONE_TITLE,
  BUILD_ONE_SUBTITLE,
  BUILD_STEPS,
  BUILD_STEP_IDS,
  DISCLAIMER,
  SYNTHETIC_DATA_LABEL,
  SIGNAL_NOT_OUTBREAK,
  OSM_ATTRIBUTION,
  DEMO_LOCATIONS,
  MAP_CENTER,
  READINESS_BLOCK,
  READINESS_EXPECTED,
  CREATE_PROJECT_BLOCK,
  CREATE_PROJECT_EXPLAINED,
  CREATE_PROJECT_EXPECTED,
  CREATE_PROJECT_VSCODE_FOLDER,
  HOME_FOLDER_NOTE,
  COPILOT_AGENT_STEPS,
  PROMPT_1,
  PROMPT_1_CREATES,
  PROMPT_1_CREATES_NOTE,
  BUILD_ONE_TESTS,
  MAP_TESTS,
  TEST_GROUPS,
  REPAIR_PROMPT,
  MAP_REPAIR_PROMPT,
  COMMIT_1_BLOCK,
  COMMIT_1_EXPLAINED,
  VERCEL_LOGIN_BLOCK,
  VERCEL_LOGIN_NOTE,
  DEPLOY_BLOCK,
  DEPLOY_ANSWERS,
  DEPLOY_RESULT_NOTE,
  PROMPT_2,
  COMMIT_2_BLOCK,
  PROMPT_3,
  BOUNDARY_TESTS,
  COMMIT_3_BLOCK,
  COMPLETION_CHECKLIST,
  BUILD_ONE_TROUBLESHOOTING,
} from "@/content/clients/aku/digital-health-2026/build-one";

export const metadata: Metadata = {
  title: "Build 1: AKU Outbreak Signal",
  description:
    "The most complete guide in the portal: 13 steps from an empty folder to a tested, committed, deployed prototype with an interactive Karachi map, built with GitHub Copilot. Synthetic classroom data only.",
};

const COMPLETE_IDS = BUILD_STEP_IDS.map((id) => `${id}-complete`);

/** Small helper for the "mark this step complete" control at the end of a step. */
function StepDone({ id, n }: { id: string; n: number }) {
  return (
    <div className="mt-5">
      <CompletionCheckbox
        id={`${id}-complete`}
        label={`Mark Step ${n} complete`}
        variant="step"
      />
    </div>
  );
}

const step = (n: number) => BUILD_STEPS[n - 1];

export default async function BuildOnePage({
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
          { label: "Build 1" },
        ]}
      />
      <PageIntro
        eyebrow="Hands-on build"
        title={BUILD_ONE_TITLE}
        subtitle={BUILD_ONE_SUBTITLE}
        aside={<OSSelector variant="compact" />}
      >
        <p>
          Follow the steps in order. Read the expected result{" "}
          <strong>before</strong> you run each command. If what you see does not
          match, stop and check the troubleshooting section at the bottom — do
          not push forward on a broken step.
        </p>
      </PageIntro>

      <div className="sticky top-16 z-30 -mx-5 mt-4 border-b border-border bg-bg/95 px-5 py-3 backdrop-blur">
        <ProgressIndicator ids={COMPLETE_IDS} />
      </div>

      <SafetyNotice tone="strong">
        <p>
          The app you build is an educational prototype using{" "}
          <strong>{SYNTHETIC_DATA_LABEL.toLowerCase()}</strong>. Use only the
          invented test values below. Do not enter real patient data and do not
          imply access to real surveillance data. Your app must show all three
          of these, prominently:
        </p>
        <ul>
          <li>&ldquo;{SYNTHETIC_DATA_LABEL}&rdquo;</li>
          <li>&ldquo;{DISCLAIMER}&rdquo;</li>
          <li>&ldquo;{SIGNAL_NOT_OUTBREAK}&rdquo;</li>
        </ul>
      </SafetyNotice>

      <div className="mt-6 space-y-4">
        {/* STEP 1 — OS */}
        <StepCard {...step(1)} defaultOpen>
          <p>
            Choose the system you are working on. Every command on this page will
            switch to match, and your choice is remembered on this device.
          </p>
          <div className="mt-3">
            <OSSelector />
          </div>
          <StepDone id={step(1).id} n={1} />
        </StepCard>

        {/* STEP 2 — terminal */}
        <StepCard {...step(2)}>
          <p>Open a terminal so you can run the setup commands.</p>
          <OpenTerminalText />
          <Notice id="b1-terminal-tip" title="Keep this terminal open">
            <p>
              You will run every command in this same window. If you close it,
              reopen it and run the <code>cd</code> line from Step 4 again.
            </p>
          </Notice>
          <StepDone id={step(2).id} n={2} />
        </StepCard>

        {/* STEP 3 — readiness */}
        <StepCard {...step(3)}>
          <p>Confirm the four tools are installed and on your PATH.</p>
          <CommandBlock
            macos={READINESS_BLOCK.macos}
            windows={READINESS_BLOCK.windows}
            label="readiness check commands"
            caption="Readiness check — prints four version numbers"
          />
          <ExpectedResult output={READINESS_EXPECTED}>
            <p>
              Four version numbers, one per command. If any command says
              &ldquo;command not found&rdquo;, fix that tool using{" "}
              <Link href={`${base}/participate/before-workshop`}>
                Before the Workshop
              </Link>{" "}
              before continuing.
            </p>
          </ExpectedResult>
          <StepDone id={step(3).id} n={3} />
        </StepCard>

        {/* STEP 4 — project */}
        <StepCard {...step(4)}>
          <p>
            Create the workshop folder in your <strong>home directory</strong>{" "}
            and open it in VS Code. Run the whole block.
          </p>
          <CommandBlock
            macos={CREATE_PROJECT_BLOCK.macos}
            windows={CREATE_PROJECT_BLOCK.windows}
            label="create project commands"
            caption="Create the project folder, initialise Git, and open VS Code"
          />
          <p className="font-medium text-ink">This block:</p>
          <ol>
            {CREATE_PROJECT_EXPLAINED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <ExpectedResult output={CREATE_PROJECT_EXPECTED}>
            <p>
              The <code>git status</code> line shows you are on{" "}
              <code>main</code> with no commits yet. VS Code opens with the
              Explorer titled <code>{CREATE_PROJECT_VSCODE_FOLDER}</code>.
            </p>
          </ExpectedResult>
          <SafetyNotice title="Why the home folder?">
            <p>{HOME_FOLDER_NOTE}</p>
          </SafetyNotice>
          <StepDone id={step(4).id} n={4} />
        </StepCard>

        {/* STEP 5 — Copilot agent */}
        <StepCard {...step(5)}>
          <p>Get GitHub Copilot Chat ready in Agent mode inside your project.</p>
          <ol>
            {COPILOT_AGENT_STEPS.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
          <ExpectedResult title="You are ready when">
            <p>
              Copilot Chat is open, the mode selector says <strong>Agent</strong>
              , and the Explorer shows the <code>01-outbreak-signal</code>{" "}
              folder.
            </p>
          </ExpectedResult>
          <StepDone id={step(5).id} n={5} />
        </StepCard>

        {/* STEP 6 — Prompt 1 */}
        <StepCard {...step(6)}>
          <p>
            Copy Prompt 1 exactly and send it to Copilot in Agent mode. It is the
            full specification for the app — the calculator{" "}
            <strong>and</strong> an interactive Karachi map. Do not shorten it,
            and you do not need to add anything verbally.
          </p>
          <PromptBlock
            text={PROMPT_1}
            title="Prompt 1"
            hint="Paste this into Copilot Chat (Agent mode) and send it. One paste, nothing to add."
          />

          <p className="font-medium text-ink">
            The five demonstration locations (classroom coordinates only)
          </p>
          <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border-strong">
            <table className="w-full border-collapse text-sm">
              <caption className="sr-only">
                The five predefined Karachi demonstration locations and their
                approximate classroom coordinates
              </caption>
              <thead>
                <tr className="bg-surface-muted text-left">
                  <th className="border-b border-border-strong px-3 py-2 font-semibold text-ink">
                    Location
                  </th>
                  <th className="border-b border-border-strong px-3 py-2 font-semibold text-ink">
                    Latitude
                  </th>
                  <th className="border-b border-border-strong px-3 py-2 font-semibold text-ink">
                    Longitude
                  </th>
                </tr>
              </thead>
              <tbody>
                {DEMO_LOCATIONS.map((l) => (
                  <tr key={l.label} className="odd:bg-surface even:bg-surface-muted/40">
                    <td className="border-b border-border px-3 py-2 text-ink">
                      {l.label}
                    </td>
                    <td className="border-b border-border px-3 py-2 font-mono text-ink-muted">
                      {l.lat.toFixed(2)}
                    </td>
                    <td className="border-b border-border px-3 py-2 font-mono text-ink-muted">
                      {l.lng.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-ink-subtle">
            These are rough visual placements for the map exercise — not official
            administrative centroids. The map opens centred on greater Karachi
            (about {MAP_CENTER.lat}, {MAP_CENTER.lng}) at a city-level zoom.
          </p>

          <Notice id="b1-map-internet" title="The map needs internet — the calculator does not">
            <p>
              Leaflet and the OpenStreetMap tiles load over the network. If the
              venue blocks them, Prompt 1 tells Copilot to show a{" "}
              <em>&ldquo;Map unavailable&rdquo;</em> message and keep the
              calculator, classification, and guidance working.
            </p>
          </Notice>

          <p className="font-medium text-ink">Copilot should create:</p>
          <ul>
            {PROMPT_1_CREATES.map((f) => (
              <li key={f}>
                <code>{f}</code>
              </li>
            ))}
          </ul>
          <p className="text-sm text-ink-subtle">{PROMPT_1_CREATES_NOTE}</p>

          <ExpectedResult title="Expected outcome">
            <p>
              Five files in the Explorer, a local server running, and a local URL
              (for example <code>http://localhost:8000</code>). The page loads
              with Karachi East, 40, and 20 already filled in and shows an{" "}
              <strong>INVESTIGATE — 2.0×</strong> result. A map is centred on
              Karachi with a visible <code>{OSM_ATTRIBUTION}</code> attribution, a
              neutral marker on Karachi East, and a green / amber / red legend.
              Copilot stops before any deployment.
            </p>
          </ExpectedResult>
          <StepDone id={step(6).id} n={6} />
        </StepCard>

        {/* STEP 7 — test */}
        <StepCard {...step(7)}>
          <p>
            Test in your browser. Start with the four calculation cases, then
            work through the map, safety, and mobile checks. Tick each group as
            you confirm it — you do not need to hold all of it in your head at
            once.
          </p>

          <p className="font-medium text-ink">Calculation test cases</p>
          <TestCaseTable
            cases={BUILD_ONE_TESTS}
            columns={["Location", "Cases", "Baseline"]}
            caption="Build 1 calculation acceptance tests"
          />
          <ExpectedResult title="The boundaries matter">
            <p>
              The third case sits exactly on the 2.0× boundary and must read
              INVESTIGATE. The fourth must show a validation error, no result,
              and the map must not move.
            </p>
          </ExpectedResult>

          <p className="font-medium text-ink">Map checks</p>
          <ul className="list-disc space-y-1.5 pl-6 text-ink-muted">
            {MAP_TESTS.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>

          <div className="mt-5 space-y-4">
            {TEST_GROUPS.map((group) => (
              <div key={group.id}>
                <p className="mb-2 text-sm font-semibold text-ink">
                  {group.title}
                </p>
                <ul className="list-none space-y-2 pl-0">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <CompletionCheckbox id={item.id} label={item.label} />
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p className="mt-5 font-medium text-ink">If a calculation test fails</p>
          <p>
            Fill in your inputs and what you actually saw, then send this repair
            prompt to Copilot:
          </p>
          <PromptBlock
            text={REPAIR_PROMPT}
            title="Repair prompt — calculation"
            label="calculation repair prompt"
            hint="Replace the bracketed parts with your inputs and the actual result."
          />

          <p className="mt-4 font-medium text-ink">If the map misbehaves</p>
          <p>
            The calculator can be fine while the map is broken. Pick the symptom
            in the first line and send this:
          </p>
          <PromptBlock
            text={MAP_REPAIR_PROMPT}
            title="Repair prompt — map"
            label="map repair prompt"
            hint="Leave only the symptom that matches. The calculator must stay untouched."
          />
          <StepDone id={step(7).id} n={7} />
        </StepCard>

        {/* STEP 8 — commit 1 */}
        <StepCard {...step(8)}>
          <p>Save your working app as your first commit.</p>
          <CommandBlock
            macos={COMMIT_1_BLOCK.macos}
            windows={COMMIT_1_BLOCK.windows}
            label="first commit commands"
            caption="Stage and commit the initial app"
          />
          <ul>
            {COMMIT_1_EXPLAINED.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ul>
          <ExpectedResult>
            <p>
              <code>git log --oneline -1</code> prints one line: a short commit
              hash followed by{" "}
              <code>Build initial outbreak signal app</code>.
            </p>
          </ExpectedResult>
          <StepDone id={step(8).id} n={8} />
        </StepCard>

        {/* STEP 9 — vercel login */}
        <StepCard {...step(9)}>
          <p>Sign in to Vercel from the terminal. Run this on its own.</p>
          <CommandBlock
            macos={VERCEL_LOGIN_BLOCK.macos}
            windows={VERCEL_LOGIN_BLOCK.windows}
            label="Vercel login command"
            caption="Authenticate the Vercel CLI"
          />
          <ExpectedResult>
            <p>{VERCEL_LOGIN_NOTE}</p>
          </ExpectedResult>
          <StepDone id={step(9).id} n={9} />
        </StepCard>

        {/* STEP 10 — deploy */}
        <StepCard {...step(10)}>
          <p>Deploy your app to a live global URL.</p>
          <CommandBlock
            macos={DEPLOY_BLOCK.macos}
            windows={DEPLOY_BLOCK.windows}
            label="production deploy command"
            caption="Deploy to production with the Vercel CLI"
          />
          <p className="font-medium text-ink">Answer the prompts like this:</p>
          <ul>
            {DEPLOY_ANSWERS.map((qa) => (
              <li key={qa.question}>
                <strong>{qa.question}</strong> — {qa.answer}
              </li>
            ))}
          </ul>
          <ExpectedResult>
            <p>{DEPLOY_RESULT_NOTE}</p>
          </ExpectedResult>
          <LiveUrlField />
          <StepDone id={step(10).id} n={10} />
        </StepCard>

        {/* STEP 11 — feature 1 */}
        <StepCard {...step(11)}>
          <p>
            Turn &ldquo;Recent checks&rdquo; into a geospatial history — the same
            five checks, now as coloured markers on the map. The idea to make
            visible: <strong>one signal → multiple geospatial signals</strong>.
            Send Prompt 2 to Copilot.
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
            label="feature 1 commit and deploy commands"
            caption="Commit the Recent checks feature and redeploy"
          />
          <ExpectedResult>
            <p>
              <code>git log --oneline -2</code> shows two commits. The redeploy
              prints a fresh production URL. Open it and confirm Recent checks
              works on the live site.
            </p>
          </ExpectedResult>
          <StepDone id={step(11).id} n={11} />
        </StepCard>

        {/* STEP 12 — feature 2 */}
        <StepCard {...step(12)}>
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
            label="feature 2 commit and deploy commands"
            caption="Commit the explainability feature and redeploy"
          />
          <ExpectedResult>
            <p>
              <code>git log --oneline -3</code> shows three commits. The live
              site now explains why each signal was produced and states clearly
              that it does not diagnose disease or confirm an outbreak.
            </p>
          </ExpectedResult>
          <StepDone id={step(12).id} n={12} />
        </StepCard>

        {/* STEP 13 — completion */}
        <StepCard {...step(13)}>
          <p>
            Run the final checklist against your live site. Tick each item as you
            confirm it.
          </p>
          <ul className="list-none space-y-2 pl-0">
            {COMPLETION_CHECKLIST.map((item) => (
              <li key={item.id}>
                <CompletionCheckbox id={item.id} label={item.label} />
              </li>
            ))}
          </ul>
          <div
            id="what-you-built"
            className="mt-5 scroll-mt-24 rounded-[var(--radius-card)] border border-stable/30 bg-stable-soft/50 p-5"
          >
            <p className="inline-flex items-center gap-2 font-semibold text-stable">
              <CheckCircle2 className="size-5" aria-hidden />
              Build 1 complete
            </p>
            <p className="mt-1 text-sm text-ink-muted">
              You went from an empty folder to a tested, version-controlled,
              publicly deployed prototype: a calculator, an interactive Karachi
              map, multiple geospatial signals, and explainable decision support
              — all on synthetic classroom data. Next: the{" "}
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
          <StepDone id={step(13).id} n={13} />
        </StepCard>
      </div>

      <Troubleshooting entries={BUILD_ONE_TROUBLESHOOTING} />

      <ParticipantStepNav base={base} current="/participate/build-1" />
    </div>
  );
}
