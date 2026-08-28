"use client";

import { useWorkshop } from "@/lib/workshop-context";

interface ProgressIndicatorProps {
  /** Ordered ids that make up this progress bar. */
  ids: readonly string[];
  label?: string;
  /** "bar" is the full page version; "compact" is the header pill. */
  variant?: "bar" | "compact";
}

export function ProgressIndicator({
  ids,
  label = "Build 1 progress",
  variant = "bar",
}: ProgressIndicatorProps) {
  const { ready, completedCount } = useWorkshop();
  const total = ids.length;
  const done = ready ? completedCount(ids) : 0;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);

  if (variant === "compact") {
    return (
      <div
        className="flex items-center gap-2"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label={`${label}: ${done} of ${total} steps complete`}
      >
        <span className="hidden text-xs font-medium text-ink-muted sm:inline">
          {done}/{total}
        </span>
        <span className="h-1.5 w-16 overflow-hidden rounded-full bg-border">
          <span
            className="block h-full rounded-full bg-primary transition-[width] duration-500"
            style={{ width: `${pct}%` }}
          />
        </span>
      </div>
    );
  }

  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={done}
      aria-label={`${label}: ${done} of ${total} steps complete`}
    >
      <div className="mb-1.5 flex items-baseline justify-between">
        <span className="text-sm font-semibold text-ink">{label}</span>
        <span className="text-sm text-ink-muted">
          {done} of {total} steps &middot; {pct}%
        </span>
      </div>
      <span className="block h-2.5 w-full overflow-hidden rounded-full bg-border">
        <span
          className="block h-full rounded-full bg-primary transition-[width] duration-500"
          style={{ width: `${pct}%` }}
        />
      </span>
    </div>
  );
}
