import type { ReactNode } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { ChecklistItem } from "@/content/types";
import { CompletionCheckbox } from "./CompletionCheckbox";

interface ChecklistGroupProps {
  items: ChecklistItem[];
  /** Show the "Required for Build 1" / "Optional" tag on each row. */
  showTags?: boolean;
}

/** Render a string, turning `backtick spans` into <code>. */
function withInlineCode(text: string): ReactNode[] {
  return text
    .split(/`([^`]+)`/g)
    .map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}

export function ChecklistGroup({ items, showTags = false }: ChecklistGroupProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li key={item.id}>
          <div className="overflow-hidden rounded-lg border border-border-strong bg-surface">
            <CompletionCheckbox id={item.id} label={item.label} />
            {(item.detail || showTags) && (
              <div className="flex flex-wrap items-center gap-2 px-3 pb-2.5 pl-11 text-xs text-ink-subtle">
                {showTags ? (
                  <span
                    className={`rounded-full px-2 py-0.5 font-medium ${
                      item.required
                        ? "bg-primary-soft text-primary"
                        : "bg-surface-muted text-ink-muted"
                    }`}
                  >
                    {item.required ? "Required for Build 1" : "Optional"}
                  </span>
                ) : null}
                {item.detail ? <span>{item.detail}</span> : null}
              </div>
            )}

            {item.setup ? (
              <details className="group border-t border-border">
                <summary className="flex cursor-pointer list-none items-center gap-1.5 px-3 py-2 pl-11 text-xs font-semibold text-primary hover:bg-surface-muted [&::-webkit-details-marker]:hidden">
                  <ChevronDown
                    className="size-4 shrink-0 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                  Detailed setup steps
                </summary>
                <div className="prose-block px-3 pb-3 pl-11 text-sm text-ink-muted">
                  <ol>
                    {item.setup.steps.map((step, i) => (
                      <li key={i}>{withInlineCode(step)}</li>
                    ))}
                  </ol>
                  {item.setup.verify ? (
                    <p className="text-ink">
                      <strong>Check it worked:</strong>{" "}
                      {withInlineCode(item.setup.verify)}
                    </p>
                  ) : null}
                  {item.setup.docHref ? (
                    <p>
                      Official guide:{" "}
                      <a
                        href={item.setup.docHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-primary hover:underline"
                      >
                        {item.setup.docLabel ?? item.setup.docHref}
                        <ExternalLink className="size-3.5" aria-hidden />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </p>
                  ) : null}
                </div>
              </details>
            ) : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
