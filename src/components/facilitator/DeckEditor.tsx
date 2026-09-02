"use client";

import { useState } from "react";
import { ArrowDown, ArrowUp, Eye, EyeOff, Loader2, Save } from "lucide-react";

interface EditorSlide {
  id: string;
  label: string;
  hidden: boolean;
}

interface EditorSection {
  id: string;
  title: string;
  slides: EditorSlide[];
}

type SaveStatus =
  | { kind: "idle" }
  | { kind: "saving" }
  | { kind: "saved" }
  | { kind: "error"; message: string };

/**
 * Reorder-within-section and hide/show controls for Presentation Mode.
 * Edits are local until Save, which POSTs the full slide order and hidden
 * list to /api/deck-order — a dev-only route that writes deck-order.json.
 * Slide content itself is never touched; only order and visibility.
 */
export function DeckEditor({
  clientSlug,
  workshopSlug,
  initialSections,
}: {
  clientSlug: string;
  workshopSlug: string;
  initialSections: EditorSection[];
}) {
  const [sections, setSections] = useState(initialSections);
  const [dirty, setDirty] = useState(false);
  const [status, setStatus] = useState<SaveStatus>({ kind: "idle" });

  function moveSlide(sectionId: string, index: number, direction: -1 | 1) {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        const target = index + direction;
        if (target < 0 || target >= section.slides.length) return section;
        const slides = [...section.slides];
        [slides[index], slides[target]] = [slides[target], slides[index]];
        return { ...section, slides };
      }),
    );
    setDirty(true);
    setStatus({ kind: "idle" });
  }

  function toggleHidden(sectionId: string, slideId: string) {
    setSections((prev) =>
      prev.map((section) => {
        if (section.id !== sectionId) return section;
        return {
          ...section,
          slides: section.slides.map((slide) =>
            slide.id === slideId ? { ...slide, hidden: !slide.hidden } : slide,
          ),
        };
      }),
    );
    setDirty(true);
    setStatus({ kind: "idle" });
  }

  async function save() {
    setStatus({ kind: "saving" });
    const hidden = sections.flatMap((section) =>
      section.slides.filter((s) => s.hidden).map((s) => s.id),
    );
    const order = Object.fromEntries(
      sections.map((section) => [section.id, section.slides.map((s) => s.id)]),
    );

    try {
      const res = await fetch("/api/deck-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientSlug, workshopSlug, hidden, order }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: data.error ?? "Save failed.",
        });
        return;
      }
      setStatus({ kind: "saved" });
      setDirty(false);
    } catch {
      setStatus({ kind: "error", message: "Could not reach the server." });
    }
  }

  return (
    <div className="mt-6 space-y-8 pb-24">
      {sections.map((section) => (
        <section key={section.id} aria-labelledby={`section-${section.id}`}>
          <h2
            id={`section-${section.id}`}
            className="text-lg font-semibold text-ink"
          >
            {section.title}
          </h2>
          <ol className="mt-2 space-y-1.5">
            {section.slides.map((slide, index) => (
              <li
                key={slide.id}
                className={`flex items-center gap-3 rounded-[var(--radius-card)] border px-3 py-2 text-sm ${
                  slide.hidden
                    ? "border-border bg-surface/50 text-ink-subtle"
                    : "border-border-strong bg-surface text-ink"
                }`}
              >
                <span className="w-6 shrink-0 font-mono text-xs text-ink-subtle">
                  {index + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{slide.label}</p>
                  <p className="truncate font-mono text-xs text-ink-subtle">
                    {slide.id}
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-1">
                  <button
                    type="button"
                    onClick={() => moveSlide(section.id, index, -1)}
                    disabled={index === 0}
                    className="rounded border border-border-strong p-1.5 text-ink-muted hover:text-primary disabled:opacity-30"
                    aria-label={`Move ${slide.label} up`}
                  >
                    <ArrowUp className="size-3.5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveSlide(section.id, index, 1)}
                    disabled={index === section.slides.length - 1}
                    className="rounded border border-border-strong p-1.5 text-ink-muted hover:text-primary disabled:opacity-30"
                    aria-label={`Move ${slide.label} down`}
                  >
                    <ArrowDown className="size-3.5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleHidden(section.id, slide.id)}
                    className="ml-1 inline-flex items-center gap-1 rounded border border-border-strong px-2 py-1.5 text-ink-muted hover:text-primary"
                    aria-pressed={slide.hidden}
                    aria-label={
                      slide.hidden
                        ? `Show ${slide.label} in Presentation Mode`
                        : `Hide ${slide.label} from Presentation Mode`
                    }
                  >
                    {slide.hidden ? (
                      <EyeOff className="size-3.5" aria-hidden />
                    ) : (
                      <Eye className="size-3.5" aria-hidden />
                    )}
                    <span className="text-xs">
                      {slide.hidden ? "Hidden" : "Shown"}
                    </span>
                  </button>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}

      <div className="fixed inset-x-0 bottom-0 z-10 border-t border-border-strong bg-surface/95 p-4 backdrop-blur">
        <div className="container-page flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={save}
            disabled={!dirty || status.kind === "saving"}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-on-primary hover:bg-primary-strong disabled:opacity-40"
          >
            {status.kind === "saving" ? (
              <Loader2 className="size-4 animate-spin" aria-hidden />
            ) : (
              <Save className="size-4" aria-hidden />
            )}
            Save changes
          </button>
          {status.kind === "saved" ? (
            <p className="text-sm text-ink-muted">
              Saved to deck-order.json. Hard-refresh Presentation Mode to see
              it, then commit and push (or ask Claude to) to make it live.
            </p>
          ) : null}
          {status.kind === "error" ? (
            <p className="text-sm text-watch">{status.message}</p>
          ) : null}
          {status.kind === "idle" && dirty ? (
            <p className="text-sm text-watch">Unsaved changes.</p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
