import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";

export default async function BackupIndexPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config } = await getBundle(params);
  const base = workshopBase(config);

  const pages = [
    {
      href: `${base}/backup/commands`,
      title: "All Build 1 commands",
      blurb: "Every terminal command from Build 1, in order, macOS and Windows.",
    },
    {
      href: `${base}/backup/prompts`,
      title: "All Build 1 prompts",
      blurb: "Prompt 1, Prompt 2, Prompt 3, and the repair prompt, verbatim.",
    },
    {
      href: `${base}/backup/participant`,
      title: "Participant instructions (print)",
      blurb: "The full participant path on one page, formatted for printing.",
    },
    {
      href: `${base}/backup/facilitator`,
      title: "Facilitator notes (print)",
      blurb: "Every segment's script, checkpoints, and recovery on one page.",
    },
    {
      href: `${base}/backup/slides`,
      title: "Presentation as text (print)",
      blurb: "Every slide's content as a readable outline.",
    },
  ];

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Resilience"
        title="Backup and print"
        subtitle="If the venue internet fails or you need paper, everything is here. Use your browser's Print dialog to save any page as PDF."
      >
        <p>
          To run the portal locally with no internet: <code>npm install</code>{" "}
          then <code>npm run dev</code>, and set{" "}
          <code>NEXT_PUBLIC_SITE_URL</code> to your laptop&rsquo;s network
          address so QR codes resolve. Full steps are in the README.
        </p>
      </PageIntro>

      <ul className="mt-6 divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface">
        {pages.map((p) => (
          <li key={p.href}>
            <Link
              href={p.href}
              className="flex items-start gap-3 p-4 hover:bg-surface-muted/60"
            >
              <FileText className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <span className="min-w-0 flex-1">
                <span className="font-medium text-primary">{p.title}</span>
                <span className="mt-0.5 block text-sm text-ink-muted">
                  {p.blurb}
                </span>
              </span>
              <ArrowRight className="mt-0.5 size-4 shrink-0 text-ink-subtle" aria-hidden />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
