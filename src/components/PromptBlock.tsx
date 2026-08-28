"use client";

import { Sparkles } from "lucide-react";
import { CopyButton } from "./CopyButton";

interface PromptBlockProps {
  /** Exact prompt text — line breaks and quotation marks are preserved. */
  text: string;
  /** Title shown in the header, e.g. "Prompt 1". */
  title: string;
  /** Accessible copy-button label; defaults to the title. */
  label?: string;
  /** Optional one-line hint under the title. */
  hint?: string;
}

export function PromptBlock({ text, title, label, hint }: PromptBlockProps) {
  return (
    <figure className="my-4 overflow-hidden rounded-[var(--radius-card)] border border-accent/30 bg-accent-soft/50 shadow-[var(--shadow-card)]">
      <div className="flex items-center justify-between gap-3 border-b border-accent/20 bg-accent-soft px-3 py-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-accent uppercase">
          <Sparkles className="size-3.5" aria-hidden />
          {title}
        </span>
        <CopyButton value={text} label={label ?? title} />
      </div>
      {hint ? (
        <p className="border-b border-accent/15 bg-surface/60 px-4 py-2 text-xs text-ink-muted">
          {hint}
        </p>
      ) : null}
      <pre className="max-h-[28rem] overflow-auto bg-surface px-4 py-3.5 text-[13px] leading-relaxed text-ink">
        <code className="font-mono whitespace-pre-wrap">{text}</code>
      </pre>
    </figure>
  );
}
