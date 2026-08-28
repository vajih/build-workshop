import type { ReactNode } from "react";
import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { PlatformFooter } from "@/components/chrome/PlatformFooter";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase, workshopMark, modeHref } from "@/lib/workshop";

export const metadata = {
  title: "Facilitator view",
  description: "The instructor's operational view.",
  robots: { index: false, follow: false },
};

export default async function FacilitateLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<WorkshopRouteParams>;
}) {
  const { config } = await getBundle(params);
  const base = workshopBase(config);

  return (
    <>
      <header className="border-b border-border bg-surface print:hidden">
        <div className="container-page flex h-14 items-center justify-between gap-4">
          <Link href={base} className="font-bold text-ink">
            {workshopMark(config)}
            <span className="ml-2 text-xs font-medium text-ink-subtle">
              Facilitator view
            </span>
          </Link>
          <nav className="flex items-center gap-2 text-sm">
            <Link
              href={modeHref(config, "present")}
              className="rounded-md px-2.5 py-1.5 font-medium text-ink-muted hover:bg-surface-muted hover:text-ink"
            >
              Presentation
            </Link>
            <Link
              href={modeHref(config, "participate")}
              className="rounded-md px-2.5 py-1.5 font-medium text-ink-muted hover:bg-surface-muted hover:text-ink"
            >
              Participant
            </Link>
            <Link
              href={`${base}/backup`}
              className="rounded-md px-2.5 py-1.5 font-medium text-ink-muted hover:bg-surface-muted hover:text-ink"
            >
              Backup
            </Link>
          </nav>
        </div>
      </header>

      <div className="container-page pt-4 print:pt-0">
        <p className="flex items-center gap-2 rounded-[var(--radius-card)] border border-watch/40 bg-watch-soft/60 p-3 text-sm text-watch">
          <NotebookPen className="size-4 shrink-0" aria-hidden />
          Facilitator notes — not intended for participant display. Do not
          project this view.
        </p>
      </div>

      <main id="main" className="flex-1">
        {children}
      </main>
      <PlatformFooter config={config} />
    </>
  );
}
