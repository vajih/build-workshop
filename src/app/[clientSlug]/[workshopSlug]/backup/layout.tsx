import type { ReactNode } from "react";
import Link from "next/link";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase, workshopMark } from "@/lib/workshop";

export const metadata = {
  title: "Backup and print",
  robots: { index: false, follow: false },
};

export default async function BackupLayout({
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
              Backup and print
            </span>
          </Link>
          <Link
            href={`${base}/backup`}
            className="text-sm font-medium text-ink-muted hover:text-primary"
          >
            All backup pages
          </Link>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
    </>
  );
}
