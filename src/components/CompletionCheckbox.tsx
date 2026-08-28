"use client";

import { Check } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";

interface CompletionCheckboxProps {
  /** Stable unique id stored in localStorage progress. */
  id: string;
  label: string;
  /** Visual weight — "step" is larger, used at the end of a build step. */
  variant?: "step" | "inline";
}

export function CompletionCheckbox({
  id,
  label,
  variant = "inline",
}: CompletionCheckboxProps) {
  const { ready, isComplete, toggleStep } = useWorkshop();
  const checked = ready && isComplete(id);

  return (
    <label
      className={`group flex cursor-pointer items-center gap-3 rounded-lg border transition-colors ${
        variant === "step" ? "px-4 py-3" : "px-3 py-2"
      } ${
        checked
          ? "border-stable/40 bg-stable-soft/50"
          : "border-border-strong bg-surface hover:bg-surface-muted"
      }`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={checked}
        onChange={() => toggleStep(id)}
      />
      <span
        aria-hidden
        className={`flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
          checked
            ? "border-stable bg-stable text-white"
            : "border-border-strong bg-surface group-hover:border-primary"
        }`}
      >
        {checked ? <Check className="size-3.5" strokeWidth={3} /> : null}
      </span>
      <span
        className={`text-sm ${
          checked ? "text-ink-muted line-through" : "text-ink"
        } ${variant === "step" ? "font-medium" : ""}`}
      >
        {label}
      </span>
    </label>
  );
}
