"use client";

import type { ReactNode } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import type { ChecklistItem } from "@/content/types";
import { useWorkshop } from "@/lib/workshop-context";
import { CompletionCheckbox } from "./CompletionCheckbox";

/** Render a string, turning `backtick spans` into <code>. */
function withInlineCode(text: string): ReactNode[] {
  return text
    .split(/`([^`]+)`/g)
    .map((part, i) => (i % 2 === 1 ? <code key={i}>{part}</code> : part));
}

/**
 * One compact install-checklist row: checkbox, title, short description, and an
 * inline "Setup" disclosure. Checking it strikes the title and tints the row
 * green — the same feedback as the plain checklist rows.
 */
export function SetupChecklistRow({
  item,
}: {
  item: ChecklistItem & { setup: NonNullable<ChecklistItem["setup"]> };
}) {
  const { ready, isComplete } = useWorkshop();
  const done = ready && isComplete(item.id);
  const { setup } = item;

  return (
    <li
      className={`grid grid-cols-[auto_1fr] items-start gap-x-2.5 rounded-lg border px-3 py-2 transition-colors ${
        done
          ? "border-stable/40 bg-stable-soft/50"
          : "border-border-strong bg-surface"
      }`}
    >
      <CompletionCheckbox id={item.id} label={item.label} variant="marker" />
      <details className="group min-w-0">
        <summary className="flex cursor-pointer list-none items-center gap-2 [&::-webkit-details-marker]:hidden">
          <span className="min-w-0 flex-1 text-sm leading-5">
            <span
              className={`font-medium ${
                done ? "text-ink-muted line-through" : "text-ink"
              }`}
            >
              {item.label}
            </span>
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
      </details>
    </li>
  );
}
