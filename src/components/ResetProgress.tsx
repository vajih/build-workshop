"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";

export function ResetProgress() {
  const { resetAll } = useWorkshop();
  const [confirming, setConfirming] = useState(false);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <p className="text-sm text-ink-muted" role="status">
        Your workshop progress has been reset on this device.
      </p>
    );
  }

  if (confirming) {
    return (
      <div className="rounded-[var(--radius-card)] border border-investigate/30 bg-investigate-soft/50 p-4">
        <p className="text-sm font-medium text-ink">
          Reset all workshop progress on this device?
        </p>
        <p className="mt-1 text-sm text-ink-muted">
          This clears completed steps, your saved live URL, and dismissed
          notices. Your operating-system choice is kept. This cannot be undone.
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              resetAll();
              setDone(true);
            }}
            className="rounded-md bg-investigate px-3 py-1.5 text-sm font-semibold text-white hover:bg-investigate/90"
          >
            Yes, reset my progress
          </button>
          <button
            type="button"
            onClick={() => setConfirming(false)}
            className="rounded-md border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted hover:bg-surface-muted"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setConfirming(true)}
      className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-2 text-sm font-medium text-ink-muted hover:bg-surface-muted hover:text-ink"
    >
      <RotateCcw className="size-4" aria-hidden />
      Reset my workshop progress
    </button>
  );
}
