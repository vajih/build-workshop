import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { JOURNEY } from "@/content/journey";

interface JourneyProps {
  /** "chips" is compact; "detailed" shows the per-stage description. */
  variant?: "chips" | "detailed";
}

export function Journey({ variant = "chips" }: JourneyProps) {
  if (variant === "detailed") {
    return (
      <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {JOURNEY.map((stage, i) => (
          <li
            key={stage.label}
            className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-4"
          >
            <span className="text-xs font-semibold text-accent">
              Stage {i + 1}
            </span>
            <p className="mt-0.5 font-semibold text-ink">{stage.label}</p>
            <p className="mt-1 text-sm text-ink-muted">{stage.detail}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2">
      {JOURNEY.map((stage, i) => (
        <Fragment key={stage.label}>
          <li className="rounded-full border border-border-strong bg-surface px-3 py-1 text-sm font-medium text-ink">
            {stage.label}
          </li>
          {i < JOURNEY.length - 1 ? (
            <ChevronRight
              className="size-4 shrink-0 text-ink-subtle"
              aria-hidden
            />
          ) : null}
        </Fragment>
      ))}
    </ol>
  );
}
