"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Activity, Menu, X } from "lucide-react";
import type { NavItem } from "@/content/types";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { OSSelector } from "@/components/OSSelector";

interface ParticipantHeaderProps {
  /** workshop base path, e.g. "/aku/digital-health-2026" */
  base: string;
  title: string;
  navItems: NavItem[];
  /** progress checkpoint ids for the compact header indicator */
  progressIds: string[];
}

function isActive(pathname: string, href: string) {
  return href.endsWith("/participate")
    ? pathname === href
    : pathname.startsWith(href);
}

export function ParticipantHeader({
  base,
  title,
  navItems,
  progressIds,
}: ParticipantHeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = navItems.map((i) => ({ ...i, full: `${base}${i.href}` }));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur print:hidden">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href={`${base}/participate`}
          onClick={close}
          className="flex items-center gap-2 font-bold text-ink"
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-on-primary">
            <Activity className="size-4" aria-hidden />
          </span>
          <span className="leading-tight">
            {title}
            <span className="block text-[11px] font-medium text-ink-subtle">
              Participant workbook
            </span>
          </span>
        </Link>

        <nav aria-label="Participant" className="hidden items-center gap-1 xl:flex">
          {items.map((item) => (
            <Link
              key={item.full}
              href={item.full}
              aria-current={isActive(pathname, item.full) ? "page" : undefined}
              className={`rounded-md px-2.5 py-1.5 text-sm font-medium transition-colors ${
                isActive(pathname, item.full)
                  ? "bg-primary-soft text-primary"
                  : "text-ink-muted hover:bg-surface-muted hover:text-ink"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <ProgressIndicator ids={progressIds} variant="compact" />
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-ink-muted hover:bg-surface-muted xl:hidden"
            aria-expanded={open}
            aria-controls="participant-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            {open ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div id="participant-nav" className="border-t border-border bg-surface xl:hidden">
          <nav aria-label="Participant (mobile)" className="container-page py-3">
            <ul className="space-y-1">
              {items.map((item) => (
                <li key={item.full}>
                  <Link
                    href={item.full}
                    onClick={close}
                    aria-current={
                      isActive(pathname, item.full) ? "page" : undefined
                    }
                    className={`block rounded-md px-3 py-2.5 text-sm font-medium ${
                      isActive(pathname, item.full)
                        ? "bg-primary-soft text-primary"
                        : "text-ink-muted hover:bg-surface-muted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-border pt-3">
              <OSSelector variant="compact" />
              <ProgressIndicator ids={progressIds} />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
