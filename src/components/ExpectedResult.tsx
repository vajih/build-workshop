import type { ReactNode } from "react";
import { CircleCheck } from "lucide-react";

interface ExpectedResultProps {
  /** Monospaced expected output. Line breaks preserved. */
  output?: string;
  /** Optional rich explanation instead of / alongside raw output. */
  children?: ReactNode;
  title?: string;
}

export function ExpectedResult({
  output,
  children,
  title = "Expected result",
}: ExpectedResultProps) {
  return (
    <div className="my-4 rounded-[var(--radius-card)] border border-stable/30 bg-stable-soft/60 p-4">
      <p className="mb-2 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-stable uppercase">
        <CircleCheck className="size-4" aria-hidden />
        {title}
      </p>
      {output ? (
        <pre className="overflow-x-auto rounded-md border border-stable/20 bg-surface px-3 py-2 text-[13px] leading-relaxed text-ink">
          <code className="font-mono whitespace-pre">{output}</code>
        </pre>
      ) : null}
      {children ? (
        <div className="prose-block text-sm text-ink-muted">{children}</div>
      ) : null}
    </div>
  );
}
