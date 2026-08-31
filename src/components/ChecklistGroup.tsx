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

function SetupBody({ setup }: { setup: NonNullable<ChecklistItem["setup"]> }) {
  return (
    <div className="prose-block mt-2 border-t border-border pt-2 text-sm text-ink-muted">
      <ol>
        {setup.steps.map((step, i) => (
          <li key={i}>{withInlineCode(step)}</li>
        ))}
      </ol>
      {setup.verify ? (
        <p className="text-ink">
          <strong>Check it worked:</strong> {withInlineCode(setup.verify)}
        </p>
      ) : null}
      {setup.docHref ? (
        <p>
          Official guide:{" "}
          <a
            href={setup.docHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-primary hover:underline"
          >
            {setup.docLabel ?? setup.docHref}
            <ExternalLink className="size-3.5" aria-hidden />
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </p>
      ) : null}
    </div>
  );
}

export function ChecklistGroup({ items, showTags = false }: ChecklistGroupProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) =>
        item.setup ? (
          /* Compact one-line row with an inline "Setup" disclosure. */
          <li
            key={item.id}
            className="grid grid-cols-[auto_1fr] items-start gap-x-2.5 rounded-lg border border-border-strong bg-surface px-3 py-2"
          >
            <CompletionCheckbox
              id={item.id}
              label={item.label}
              variant="marker"
            />
            <details className="group min-w-0">
              <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
                <span className="min-w-0 flex-1 text-sm leading-5">
                  <span className="font-medium text-ink">{item.label}</span>
                  {item.detail ? (
                    <span className="text-ink-subtle"> — {item.detail}</span>
                  ) : null}
                </span>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-primary">
                  Setup
                  <ChevronDown
                    className="size-4 transition-transform group-open:rotate-180"
                    aria-hidden
                  />
                </span>
              </summary>
              <SetupBody setup={item.setup} />
            </details>
          </li>
        ) : (
          <li key={item.id}>
            <div className="rounded-lg border border-border-strong bg-surface">
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
            </div>
          </li>
        ),
      )}
    </ul>
  );
}
