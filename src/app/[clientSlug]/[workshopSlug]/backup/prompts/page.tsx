import { PageIntro } from "@/components/PageIntro";
import { PrintButton } from "@/components/PrintButton";
import { CopyButton } from "@/components/CopyButton";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { ALL_PROMPTS } from "@/content/clients/aku/digital-health-2026/build-one";

export const metadata = { title: "All Build 1 prompts" };

export default async function BackupPromptsPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  await getBundle(params);

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Backup"
        title="All Build 1 prompts"
        subtitle="The full wording of every AI prompt used in Build 1. Nothing is shortened."
        aside={<PrintButton />}
      />

      <div className="mt-6 space-y-8">
        {ALL_PROMPTS.map((p) => (
          <section key={p.label}>
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">{p.label}</h2>
              <CopyButton value={p.text} label={p.label} />
            </div>
            <pre className="mt-2 overflow-x-auto rounded-[var(--radius-card)] border border-border-strong bg-surface-muted p-4 text-[13px] leading-relaxed">
              <code className="font-mono whitespace-pre-wrap">{p.text}</code>
            </pre>
          </section>
        ))}
      </div>
    </div>
  );
}
