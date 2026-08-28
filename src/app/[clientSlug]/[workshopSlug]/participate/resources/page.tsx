import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";
import { RESOURCE_SECTIONS } from "@/content/clients/aku/digital-health-2026/resources";
import type { ResourceLink } from "@/content/types";

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Official documentation for every tool used in the workshop: VS Code, Git, GitHub, Copilot, Node.js, Vercel, and more, labelled by when you need them.",
};

const TAG_LABEL: Record<ResourceLink["tag"], string> = {
  required: "Required for Build 1",
  optional: "Optional for later builds",
  demo: "Instructor demonstration only",
};

const TAG_CLASS: Record<ResourceLink["tag"], string> = {
  required: "bg-primary-soft text-primary",
  optional: "bg-surface-muted text-ink-muted",
  demo: "bg-watch-soft text-watch",
};

export default async function ResourcesPage({
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
          { label: "Resources" },
        ]}
      />
      <PageIntro
        eyebrow="Reference"
        title="Workshop resources"
        subtitle="Official documentation, grouped by tool. External links open in a new tab."
      >
        <p>
          Each link is labelled so you know whether you need it for Build 1, for
          a later build, or only to follow an instructor demonstration.
        </p>
      </PageIntro>

      <nav aria-label="Resource sections" className="mt-6">
        <ul className="flex flex-wrap gap-2">
          {RESOURCE_SECTIONS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="rounded-full border border-border-strong bg-surface px-3 py-1 text-sm text-ink-muted hover:border-primary hover:text-primary"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-8 space-y-10">
        {RESOURCE_SECTIONS.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-24"
          >
            <h2
              id={`${section.id}-heading`}
              className="text-xl font-semibold text-ink"
            >
              {section.title}
            </h2>
            {section.intro ? (
              <p className="mt-1 text-sm text-ink-muted">{section.intro}</p>
            ) : null}
            <ul className="mt-3 divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface">
              {section.links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 p-4 hover:bg-surface-muted/60"
                  >
                    <span className="min-w-0">
                      <span className="inline-flex items-center gap-1.5 font-medium text-primary">
                        {link.label}
                        <ExternalLink
                          className="size-3.5 shrink-0"
                          aria-hidden
                        />
                        <span className="sr-only">(opens in a new tab)</span>
                      </span>
                      {link.note ? (
                        <span className="mt-0.5 block text-sm text-ink-muted">
                          {link.note}
                        </span>
                      ) : null}
                    </span>
                    <span
                      className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${TAG_CLASS[link.tag]}`}
                    >
                      {TAG_LABEL[link.tag]}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <ParticipantStepNav base={base} current="/participate/resources" />
    </div>
  );
}
