import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ChecklistGroup } from "@/components/ChecklistGroup";
import { CommandBlock } from "@/components/CommandBlock";
import { ExpectedResult } from "@/components/ExpectedResult";
import { OSSelector } from "@/components/OSSelector";
import { Troubleshooting } from "@/components/Troubleshooting";
import { Notice } from "@/components/Notice";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import {
  BRING_CHECKLIST,
  INSTALL_CHECKLIST,
  OPTIONAL_CHECKLIST,
  DIAGNOSTICS,
  DIAGNOSTICS_EXPECTED,
  MAC_CODE_COMMAND_STEPS,
  BEFORE_TROUBLESHOOTING,
} from "@/content/clients/aku/digital-health-2026/before-workshop";

export const metadata: Metadata = {
  title: "Before the Workshop",
  description:
    "Everything to install and check before the workshop: VS Code, Git, Node.js, GitHub, Copilot, and Vercel, with diagnostic commands.",
};

const diagnosticBlock = DIAGNOSTICS.map((d) => d.command).join("\n");

export default async function BeforeWorkshopPage({
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
          { label: "Before the Workshop" },
        ]}
      />
      <PageIntro
        eyebrow="Preparation"
        title="Before the Workshop"
        subtitle="Do this the day before. It takes about 30 minutes and means you start building immediately."
      >
        <p>
          Work through each list and tick items off — your progress is saved on
          this device. Anything marked optional is not needed for Build 1.
        </p>
      </PageIntro>

      <div className="mt-8 space-y-10">
        <section aria-labelledby="bring-heading">
          <h2 id="bring-heading" className="text-xl font-semibold text-ink">
            Bring with you
          </h2>
          <div className="mt-3">
            <ChecklistGroup items={BRING_CHECKLIST} />
          </div>
        </section>

        <section aria-labelledby="install-heading">
          <h2 id="install-heading" className="text-xl font-semibold text-ink">
            Install and set up
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            All six are required for Build 1.
          </p>
          <div className="mt-3">
            <ChecklistGroup items={INSTALL_CHECKLIST} />
          </div>
        </section>

        <section aria-labelledby="optional-heading">
          <h2 id="optional-heading" className="text-xl font-semibold text-ink">
            Optional — later builds and demonstrations
          </h2>
          <p className="mt-1 text-sm text-ink-muted">
            Keep these separate from Build 1. Only set up Claude Code if your
            instructor tells you to.
          </p>
          <div className="mt-3">
            <ChecklistGroup items={OPTIONAL_CHECKLIST} />
          </div>
        </section>

        <section aria-labelledby="diagnostics-heading">
          <h2
            id="diagnostics-heading"
            className="text-xl font-semibold text-ink"
          >
            Check your tools
          </h2>
          <p className="mt-2 text-ink-muted">
            Open your terminal and run these four commands. They are the same on
            macOS and Windows PowerShell.
          </p>
          <div className="mt-3">
            <OSSelector />
          </div>
          <CommandBlock
            macos={diagnosticBlock}
            windows={diagnosticBlock}
            label="diagnostic commands"
            caption="Diagnostic commands to check installed tool versions"
          />
          <ExpectedResult>
            <p>{DIAGNOSTICS_EXPECTED}</p>
            <ul>
              {DIAGNOSTICS.map((d) => (
                <li key={d.command}>
                  <code>{d.command}</code> → {d.expected}
                </li>
              ))}
            </ul>
          </ExpectedResult>
        </section>

        <section aria-labelledby="mac-code-heading">
          <h2 id="mac-code-heading" className="text-xl font-semibold text-ink">
            macOS only — enable the <code>code</code> command
          </h2>
          <p className="mt-2 text-ink-muted">
            If <code>code --version</code> reports “command not found” on a Mac,
            turn on the VS Code terminal command:
          </p>
          <ol className="mt-3 list-decimal space-y-1.5 pl-6 text-ink">
            {MAC_CODE_COMMAND_STEPS.map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
          <Notice id="bw-windows-code" title="On Windows this is automatic">
            <p>
              The VS Code installer adds <code>code</code> to your PATH when you
              keep the default “Add to PATH” option checked. If it is missing,
              reinstall VS Code and keep that box ticked.
            </p>
          </Notice>
        </section>

        <Troubleshooting
          entries={BEFORE_TROUBLESHOOTING}
          title="If a command is not found"
        />
      </div>

      <ParticipantStepNav base={base} current="/participate/before-workshop" />
    </div>
  );
}
