"use client";

import { Printer } from "lucide-react";

export function PrintButton({ label = "Print / save as PDF" }: { label?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-surface px-3 py-2 text-sm font-medium text-ink-muted hover:bg-surface-muted hover:text-ink print:hidden"
    >
      <Printer className="size-4" aria-hidden />
      {label}
    </button>
  );
}
