import { PageIntro } from "@/components/PageIntro";
import { PrintButton } from "@/components/PrintButton";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import {
  ALL_COMMAND_BLOCKS,
  OPEN_TERMINAL,
} from "@/content/clients/aku/digital-health-2026/build-one";

export const metadata = { title: "All Build 1 commands" };

function Block({ macos, windows }: { macos?: string; windows?: string }) {
  if (macos === windows) {
    return (
      <pre className="mt-2 overflow-x-auto rounded-md border border-border-strong bg-surface-muted px-3 py-2 text-[13px]">
        <code className="font-mono whitespace-pre">{macos}</code>
      </pre>
    );
  }
  return (
    <div className="mt-2 grid gap-3 sm:grid-cols-2">
      <div>
        <p className="text-xs font-semibold text-ink-subtle">macOS</p>
        <pre className="mt-1 overflow-x-auto rounded-md border border-border-strong bg-surface-muted px-3 py-2 text-[13px]">
          <code className="font-mono whitespace-pre">{macos}</code>
        </pre>
      </div>
      <div>
        <p className="text-xs font-semibold text-ink-subtle">Windows PowerShell</p>
        <pre className="mt-1 overflow-x-auto rounded-md border border-border-strong bg-surface-muted px-3 py-2 text-[13px]">
          <code className="font-mono whitespace-pre">{windows}</code>
        </pre>
      </div>
    </div>
  );
}

export default async function BackupCommandsPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  await getBundle(params);

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Backup"
        title="All Build 1 commands"
        subtitle="Every terminal command from Build 1, in order. Line breaks are exact — copy whole blocks."
        aside={<PrintButton />}
      />

      <section className="mt-6">
        <h2 className="text-lg font-semibold text-ink">Step 2 — open the terminal</h2>
        <p className="mt-1 text-sm text-ink-muted">macOS: {OPEN_TERMINAL.macos}</p>
        <p className="text-sm text-ink-muted">
          Windows: {OPEN_TERMINAL.windows}
        </p>
      </section>

      {ALL_COMMAND_BLOCKS.map((entry) => (
        <section key={entry.label} className="mt-6">
          <h2 className="text-lg font-semibold text-ink">
            {entry.group} — {entry.label}
          </h2>
          <Block macos={entry.block.macos} windows={entry.block.windows} />
        </section>
      ))}
    </div>
  );
}
