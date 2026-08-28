"use client";

import type { ReactNode } from "react";
import { Check, ChevronDown } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";
import { TimeAllocation } from "./TimeAllocation";

interface StepCardProps {
  id: string;
  number: number;
  title: string;
  summary?: string;
  minutes?: number;
  defaultOpen?: boolean;
  children: ReactNode;
}

/**
 * Progressive-disclosure step container. Each step is a native <details> so it
 * is keyboard operable. The step number is visually dominant and the completion
 * state (from localStorage progress) is reflected in the header.
 */
export function StepCard({
  id,
  number,
  title,
  summary,
  minutes,
  defaultOpen = false,
  children,
}: StepCardProps) {
  const { ready, isComplete } = useWorkshop();
  const done = ready && isComplete(`${id}-complete`);

  return (
    <details
      id={id}
      open={defaultOpen}
      className="group scroll-mt-24 overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-surface shadow-[var(--shadow-card)] open:border-primary/40"
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 p-4 hover:bg-surface-muted/60 sm:p-5 [&::-webkit-details-marker]:hidden">
        <span
          aria-hidden
          className={`flex size-10 shrink-0 items-center justify-center rounded-full text-base font-bold ${
            done
              ? "bg-stable text-white"
              : "bg-primary-soft text-primary group-open:bg-primary group-open:text-on-primary"
          }`}
        >
          {done ? <Check className="size-5" strokeWidth={3} /> : number}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">
              Step {number}
            </span>
            {minutes ? <TimeAllocation minutes={minutes} /> : null}
            {done ? (
              <span className="text-xs font-semibold text-stable">Complete</span>
            ) : null}
          </span>
          <span className="mt-0.5 block text-lg font-semibold text-ink">
            {title}
          </span>
          {summary ? (
            <span className="mt-0.5 block text-sm text-ink-muted group-open:hidden">
              {summary}
            </span>
          ) : null}
        </span>
        <ChevronDown
          className="size-5 shrink-0 text-ink-subtle transition-transform group-open:rotate-180"
          aria-hidden
        />
      </summary>
      <div className="border-t border-border px-4 pb-5 pt-4 sm:px-5">
        <div className="prose-block max-w-none text-ink">{children}</div>
      </div>
    </details>
  );
}
