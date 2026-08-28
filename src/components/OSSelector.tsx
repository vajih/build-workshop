"use client";

import { Command, SquareTerminal } from "lucide-react";
import { useWorkshop, type OS } from "@/lib/workshop-context";

const OPTIONS: { value: OS; label: string; icon: typeof Command }[] = [
  { value: "macos", label: "macOS", icon: Command },
  { value: "windows", label: "Windows PowerShell", icon: SquareTerminal },
];

interface OSSelectorProps {
  /** "full" is the labelled selector on Build 1; "compact" is a small toggle. */
  variant?: "full" | "compact";
}

export function OSSelector({ variant = "full" }: OSSelectorProps) {
  const { os, setOS, ready } = useWorkshop();

  return (
    <div className={variant === "full" ? "" : "inline-block"}>
      {variant === "full" ? (
        <p className="mb-2 text-sm font-semibold text-ink">
          Your operating system
        </p>
      ) : null}
      <div
        role="radiogroup"
        aria-label="Operating system"
        className="inline-flex rounded-lg border border-border-strong bg-surface p-1"
      >
        {OPTIONS.map(({ value, label, icon: Icon }) => {
          const active = ready && os === value;
          return (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={active}
              onClick={() => setOS(value)}
              className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-on-primary"
                  : "text-ink-muted hover:bg-surface-muted hover:text-ink"
              }`}
            >
              <Icon className="size-4" aria-hidden />
              {variant === "full" ? label : label.split(" ")[0]}
            </button>
          );
        })}
      </div>
      {variant === "full" ? (
        <p className="mt-2 text-xs text-ink-subtle">
          Every command on this page updates to match. Your choice is remembered
          on this device.
        </p>
      ) : null}
    </div>
  );
}
