"use client";

import { Check } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";

interface CompletionCheckboxProps {
  /** Stable unique id stored in localStorage progress. */
  id: string;
  label: string;
  /**
   * Visual weight:
   *  - "step"   — large, used at the end of a build step
   *  - "inline" — default pill with border and label text
   *  - "marker" — just the box; the label is visually hidden (kept for a11y).
   *    Use when the label text is already shown next to the checkbox.
   */
  variant?: "step" | "inline" | "marker";
}

export function CompletionCheckbox({
  id,
  label,
  variant = "inline",
}: CompletionCheckboxProps) {
  const { ready, isComplete, toggleStep } = useWorkshop();
  const checked = ready && isComplete(id);

  const box = (
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
  );

  const input = (
    <input
      type="checkbox"
      className="sr-only"
      checked={checked}
      onChange={() => toggleStep(id)}
    />
  );

  if (variant === "marker") {
    return (
      <label className="group inline-flex shrink-0 cursor-pointer items-center">
        {input}
        {box}
        <span className="sr-only">{label}</span>
      </label>
    );
  }

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
      {input}
      {box}
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
