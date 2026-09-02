import type { PresentationSection } from "@/content/types";

/**
 * A workshop's live overrides for Presentation Mode: which slides are
 * hidden, and any within-section reordering — both editable from the
 * Deck Editor (Facilitate Mode → Reorder & hide slides) instead of by
 * hand-editing slide arrays. Slide *content* always stays authored in the
 * workshop's own content files; this only changes order and visibility.
 */
export interface DeckOrder {
  /** slide ids to skip in Presentation Mode, wherever they're authored */
  hidden: string[];
  /** per-section explicit slide-id order; ids left out keep their authored
   * relative order, appended after the ones listed — so a newly authored
   * slide never silently disappears from the deck */
  order: Record<string, string[]>;
}

export function applyDeckOrder(
  sections: PresentationSection[],
  deckOrder: DeckOrder,
): PresentationSection[] {
  const hiddenIds = new Set(deckOrder.hidden);

  return sections.map((section) => {
    const explicitOrder = deckOrder.order[section.id];
    let slides = section.slides;

    if (explicitOrder?.length) {
      const byId = new Map(slides.map((s) => [s.id, s] as const));
      const ordered = explicitOrder
        .map((id) => byId.get(id))
        .filter((s): s is (typeof slides)[number] => s !== undefined);
      const orderedIds = new Set(ordered.map((s) => s.id));
      const rest = slides.filter((s) => !orderedIds.has(s.id));
      slides = [...ordered, ...rest];
    }

    return {
      ...section,
      slides: slides.map((s) =>
        hiddenIds.has(s.id) ? { ...s, hidden: true } : s,
      ),
    };
  });
}
