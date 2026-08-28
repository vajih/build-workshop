import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { NavItem } from "@/content/types";

interface StepNavProps {
  /** ordered list of steps (hrefs relative to `base`) */
  order: NavItem[];
  /** current step href, relative to `base` */
  current: string;
  /** workshop base path to prepend, e.g. "/aku/digital-health-2026" */
  base: string;
}

export function StepNav({ order, current, base }: StepNavProps) {
  const index = order.findIndex((item) => item.href === current);
  const prev = index > 0 ? order[index - 1] : null;
  const next =
    index >= 0 && index < order.length - 1 ? order[index + 1] : null;

  return (
    <nav
      aria-label="Workshop step navigation"
      className="mt-12 grid gap-3 border-t border-border pt-6 sm:grid-cols-2 print:hidden"
    >
      {prev ? (
        <Link
          href={`${base}${prev.href}`}
          className="group flex flex-col rounded-[var(--radius-card)] border border-border-strong bg-surface px-4 py-3 transition-colors hover:border-primary hover:bg-primary-soft/40"
        >
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-subtle">
            <ArrowLeft className="size-3.5" aria-hidden />
            Previous
          </span>
          <span className="mt-0.5 font-semibold text-primary">{prev.label}</span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          href={`${base}${next.href}`}
          className="group flex flex-col rounded-[var(--radius-card)] border border-border-strong bg-surface px-4 py-3 text-right transition-colors hover:border-primary hover:bg-primary-soft/40 sm:items-end"
        >
          <span className="inline-flex items-center gap-1 text-xs font-medium text-ink-subtle">
            Next
            <ArrowRight className="size-3.5" aria-hidden />
          </span>
          <span className="mt-0.5 font-semibold text-primary">{next.label}</span>
        </Link>
      ) : (
        <span />
      )}
    </nav>
  );
}
