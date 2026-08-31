"use client";

import Link from "next/link";
import { ArrowRight, PlayCircle, RotateCcw } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";
import { BUILD_1_STEPS } from "@/content/clients/aku/digital-health-2026/build-one";

/**
 * "Continue where I left off" / "Go to the current section" for Participant Mode.
 * Reads last-visited step and Build 1 progress from namespaced localStorage.
 */
export function ContinuePanel() {
  const { ready, base, lastStep, isComplete, completedCount } = useWorkshop();

  const stepCompleteIds = BUILD_1_STEPS.map((s) => `${s.id}-complete`);
  const done = ready ? completedCount(stepCompleteIds) : 0;
  const firstIncomplete = ready
    ? BUILD_1_STEPS.find((s) => !isComplete(`${s.id}-complete`))
    : undefined;

  const resumeHref =
    ready && lastStep && lastStep !== "/participate"
      ? `${base}${lastStep}`
      : null;

  return (
    <div className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        {resumeHref ? (
          <Link
            href={resumeHref}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-strong"
          >
            Continue where I left off
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        ) : (
          <Link
            href={`${base}/participate/before-workshop`}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-on-primary hover:bg-primary-strong"
          >
            <PlayCircle className="size-4" aria-hidden />
            Start with setup
          </Link>
        )}

        <Link
          href={
            firstIncomplete
              ? `${base}/participate/build-1#${firstIncomplete.id}`
              : `${base}/participate/build-1`
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong bg-surface px-4 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
        >
          {firstIncomplete
            ? `Go to Build 1 · Step ${firstIncomplete.number}`
            : "Review Build 1"}
        </Link>
      </div>

      {ready && done > 0 ? (
        <p className="mt-3 text-sm text-ink-muted" role="status">
          {done} of {stepCompleteIds.length} Build 1 steps complete.
        </p>
      ) : (
        <p className="mt-3 text-sm text-ink-subtle">
          Progress is saved on this device only. No account needed.
        </p>
      )}

      <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-ink-subtle">
        <RotateCcw className="size-3.5" aria-hidden />
        You can reset your progress from the bottom of this page.
      </p>
    </div>
  );
}
