import { ChevronDown, LifeBuoy } from "lucide-react";
import type { TroubleshootingEntry } from "@/content/types";

interface TroubleshootingProps {
  entries: TroubleshootingEntry[];
  title?: string;
}

/**
 * Native <details>/<summary> accordion — keyboard operable and accessible by
 * default, no JavaScript required.
 */
export function Troubleshooting({
  entries,
  title = "Troubleshooting",
}: TroubleshootingProps) {
  return (
    <section className="my-6" aria-labelledby="troubleshooting-heading">
      <h3
        id="troubleshooting-heading"
        className="mb-3 inline-flex items-center gap-2 text-lg font-semibold text-ink"
      >
        <LifeBuoy className="size-5 text-accent" aria-hidden />
        {title}
      </h3>
      <div className="divide-y divide-border overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface">
        {entries.map((entry, i) => (
          <details key={i} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-3 text-sm font-medium text-ink hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
              {entry.problem}
              <ChevronDown
                className="size-4 shrink-0 text-ink-subtle transition-transform group-open:rotate-180"
                aria-hidden
              />
            </summary>
            <div className="px-4 pb-4 text-sm text-ink-muted">{entry.fix}</div>
          </details>
        ))}
      </div>
    </section>
  );
}
