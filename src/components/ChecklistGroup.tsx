import type { ChecklistItem } from "@/content/types";
import { CompletionCheckbox } from "./CompletionCheckbox";
import { SetupChecklistRow } from "./SetupChecklistRow";

interface ChecklistGroupProps {
  items: ChecklistItem[];
  /** Show the "Required for Build 1" / "Optional" tag on each row. */
  showTags?: boolean;
}

export function ChecklistGroup({ items, showTags = false }: ChecklistGroupProps) {
  return (
    <ul className="space-y-2">
      {items.map((item) =>
        item.setup ? (
          <SetupChecklistRow
            key={item.id}
            item={item as ChecklistItem & { setup: NonNullable<ChecklistItem["setup"]> }}
          />
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
