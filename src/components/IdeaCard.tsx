"use client";

import { CheckCircle2, RotateCcw } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";
import { CopyButton } from "./CopyButton";
import { CompletionCheckbox } from "./CompletionCheckbox";
import { QRCode } from "./QRCode";
import { IDEA_CARD_FIELDS } from "@/content/clients/aku/digital-health-2026/team-challenge";

function formatCard(card: Record<string, string>): string {
  const lines = IDEA_CARD_FIELDS.map(
    (f) => `${f.label}: ${(card[f.id] ?? "").trim() || "—"}`,
  );
  return `Team idea\n${lines.join("\n")}`;
}

/**
 * The Team Challenge Idea Card. Free-text fields that autosave to this device
 * (via the workshop store), a copy button that produces a paste-ready block for
 * the shared board, and a completion checkpoint once every field is filled.
 */
export function IdeaCard() {
  const { ready, ideaCard, setIdeaCard, config } = useWorkshop();
  const boardUrl = config.engagement.teamBoardUrl;

  const filled =
    ready && IDEA_CARD_FIELDS.every((f) => (ideaCard[f.id] ?? "").trim());
  const started =
    ready && IDEA_CARD_FIELDS.some((f) => (ideaCard[f.id] ?? "").trim());

  const clearCard = () =>
    setIdeaCard(Object.fromEntries(IDEA_CARD_FIELDS.map((f) => [f.id, ""])));

  return (
    <div className="my-4 rounded-[var(--radius-card)] border border-border-strong bg-surface p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-ink">Your Idea Card</p>
        <CopyButton value={formatCard(ideaCard)} label="idea card" />
      </div>
      <p className="mt-0.5 text-xs text-ink-subtle">
        Saved on this device only — nothing is sent anywhere. Fill this on the
        screen you are sharing.
      </p>

      <div className="mt-4 space-y-4">
        {IDEA_CARD_FIELDS.map((field) => {
          const value = ready ? (ideaCard[field.id] ?? "") : "";
          const common = {
            id: `idea-${field.id}`,
            value,
            placeholder: field.placeholder,
            onChange: (
              e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
            ) => setIdeaCard({ [field.id]: e.target.value }),
            className:
              "mt-1 w-full rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-ink outline-none focus-visible:border-primary",
          };
          return (
            <div key={field.id}>
              <label
                htmlFor={`idea-${field.id}`}
                className="text-sm font-medium text-ink"
              >
                {field.label}
              </label>
              <p className="text-xs text-ink-subtle">{field.hint}</p>
              {field.long ? (
                <textarea rows={2} {...common} />
              ) : (
                <input type="text" {...common} />
              )}
            </div>
          );
        })}
      </div>

      {filled ? (
        <div className="mt-4 rounded-lg border border-stable/40 bg-stable-soft/50 p-4">
          <p className="inline-flex items-center gap-2 text-sm font-semibold text-stable">
            <CheckCircle2 className="size-4" aria-hidden />
            Card complete — copy it and paste it on the board
          </p>
          {boardUrl ? (
            <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
              <QRCode value={boardUrl} label="Team idea board" size={128} />
              <a
                href={boardUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Open the shared idea board
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            </div>
          ) : (
            <p className="mt-2 text-sm text-ink-muted">
              Your facilitator will share the board link at the start of this
              section.
            </p>
          )}
          <div className="mt-3">
            <CompletionCheckbox
              id="tc-idea-on-board"
              label="Our card is on the shared board"
            />
          </div>
        </div>
      ) : null}

      {started && !filled ? (
        <button
          type="button"
          onClick={clearCard}
          className="mt-3 inline-flex items-center gap-1.5 text-xs text-ink-subtle hover:text-ink"
        >
          <RotateCcw className="size-3.5" aria-hidden />
          Start the card over
        </button>
      ) : null}
    </div>
  );
}
