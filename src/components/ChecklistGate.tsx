"use client";

import Link from "next/link";
import { ArrowRight, CircleCheckBig } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";

interface ChecklistGateProps {
  /** The items that must all be checked before the next step unlocks. */
  items: { id: string; label: string }[];
  /** Panel heading. */
  title: string;
  /** Where "you're ready" leads. */
  cta: { href: string; label: string };
}

/**
 * A soft completion gate: shows live progress over a checklist and only enables
 * the "next step" button once every item is checked. It does not hard-block
 * navigation — the standard prev/next nav still works — it just makes the
 * intended path clear and rewards finishing the list.
 */
export function ChecklistGate({ items, title, cta }: ChecklistGateProps) {
  const { ready, isComplete } = useWorkshop();
  const remaining = ready ? items.filter((i) => !isComplete(i.id)) : items;
  const done = items.length - remaining.length;
  const complete = ready && remaining.length === 0;
  const pct = Math.round((done / items.length) * 100);

  return (
    <section
      aria-labelledby="gate-heading"
      className={`mt-10 rounded-[var(--radius-card)] border p-5 transition-colors ${
        complete
          ? "border-stable/40 bg-stable-soft/50"
          : "border-border-strong bg-surface"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <h2
          id="gate-heading"
          className="inline-flex items-center gap-2 text-lg font-semibold text-ink"
        >
          {complete ? (
            <CircleCheckBig className="size-5 text-stable" aria-hidden />
          ) : null}
          {title}
        </h2>
        <span className="shrink-0 text-sm text-ink-muted tabular-nums">
          {done} / {items.length}
        </span>
      </div>

      <span
        className="mt-2 block h-2 w-full overflow-hidden rounded-full bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={items.length}
        aria-valuenow={done}
        aria-label={`${done} of ${items.length} setup items checked`}
      >
        <span
          className={`block h-full rounded-full transition-[width] duration-500 ${
            complete ? "bg-stable" : "bg-primary"
          }`}
          style={{ width: `${pct}%` }}
        />
      </span>

      {complete ? (
        <>
          <p className="mt-3 text-sm text-ink-muted">
            Everything is installed and checked off. You are ready to build.
          </p>
          <Link
            href={cta.href}
            className="mt-3 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-strong"
          >
            {cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </>
      ) : (
        <>
          <p className="mt-3 text-sm text-ink-muted">
            Tick each item above as you finish it. When all {items.length} are
            checked, you are ready for the next step.
          </p>
          {ready && remaining.length > 0 ? (
            <p className="mt-2 text-sm text-ink-subtle">
              Still to do:{" "}
              <span className="text-ink-muted">
                {remaining.map((i) => i.label).join(", ")}
              </span>
              .
            </p>
          ) : null}
          <span
            aria-disabled="true"
            className="mt-3 inline-flex cursor-not-allowed items-center gap-2 rounded-lg border border-border-strong bg-surface-muted px-4 py-2.5 text-sm font-semibold text-ink-subtle"
          >
            {cta.label}
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </>
      )}
    </section>
  );
}
