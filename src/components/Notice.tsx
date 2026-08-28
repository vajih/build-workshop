"use client";

import type { ReactNode } from "react";
import { Info, X } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";

interface NoticeProps {
  /** Stable id — once dismissed it stays dismissed on this device. */
  id: string;
  title?: string;
  children: ReactNode;
}

export function Notice({ id, title, children }: NoticeProps) {
  const { ready, isDismissed, dismiss } = useWorkshop();

  if (ready && isDismissed(id)) return null;

  return (
    <div className="my-4 flex gap-3 rounded-[var(--radius-card)] border border-accent/30 bg-accent-soft/50 p-4">
      <Info className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden />
      <div className="min-w-0 flex-1 text-sm text-ink-muted">
        {title ? (
          <p className="mb-0.5 font-semibold text-ink">{title}</p>
        ) : null}
        <div className="prose-block">{children}</div>
      </div>
      <button
        type="button"
        onClick={() => dismiss(id)}
        aria-label="Dismiss this notice"
        className="-m-1 h-7 w-7 shrink-0 rounded-md p-1 text-ink-subtle hover:bg-surface hover:text-ink"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
