"use client";

import { useWorkshop } from "@/lib/workshop-context";
import { OPEN_TERMINAL } from "@/content/clients/aku/digital-health-2026/build-one";

/** Shows the terminal-opening instruction for the selected operating system. */
export function OpenTerminalText() {
  const { os, ready } = useWorkshop();
  const key = ready && os === "windows" ? "windows" : "macos";

  return (
    <div className="my-3 rounded-[var(--radius-card)] border border-border-strong bg-surface-muted/60 p-4">
      <p className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">
        {key === "windows" ? "Windows PowerShell" : "macOS"}
      </p>
      <p className="mt-1 text-ink">{OPEN_TERMINAL[key]}</p>
    </div>
  );
}
