import { Clock } from "lucide-react";

interface TimeAllocationProps {
  minutes: number;
  /** Optional label, e.g. "Step time" or "Segment". */
  label?: string;
}

/** Static time-allocation badge — no live countdown. */
export function TimeAllocation({ minutes, label = "About" }: TimeAllocationProps) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-surface px-2.5 py-1 text-xs font-medium text-ink-muted">
      <Clock className="size-3.5 text-accent" aria-hidden />
      <span className="sr-only">{label} </span>
      {minutes} min
    </span>
  );
}
