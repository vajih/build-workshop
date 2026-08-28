"use client";

import { Terminal } from "lucide-react";
import { CopyButton } from "./CopyButton";
import { useWorkshop } from "@/lib/workshop-context";

interface CommandBlockProps {
  /** A single command block shown regardless of OS. */
  code?: string;
  /** OS-specific variants. When set, the active OS selection decides which shows. */
  macos?: string;
  windows?: string;
  /** Accessible label for the copy button, e.g. "readiness check commands". */
  label: string;
  /** Optional short caption shown above the block. */
  caption?: string;
}

export function CommandBlock({
  code,
  macos,
  windows,
  label,
  caption,
}: CommandBlockProps) {
  const { os } = useWorkshop();

  const osSpecific = macos !== undefined || windows !== undefined;
  const text = osSpecific ? (os === "windows" ? windows : macos) ?? "" : code ?? "";
  const osLabel = os === "windows" ? "Windows PowerShell" : "macOS";

  return (
    <figure className="my-4 overflow-hidden rounded-[var(--radius-card)] border border-border-strong bg-[#0f1c17] shadow-[var(--shadow-card)]">
      {caption ? (
        <figcaption className="sr-only">{caption}</figcaption>
      ) : null}
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[0.04] px-3 py-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70">
          <Terminal className="size-3.5" aria-hidden />
          {osSpecific ? osLabel : "Terminal"}
        </span>
        <CopyButton
          value={text}
          label={label}
          className="border-white/20 bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
        />
      </div>
      <pre className="overflow-x-auto px-4 py-3.5 text-[13px] leading-relaxed text-[#e7efe9]">
        <code className="font-mono whitespace-pre">{text}</code>
      </pre>
    </figure>
  );
}
