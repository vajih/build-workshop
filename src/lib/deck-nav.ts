import type { Slide } from "@/content/types";

/** Pure slide-navigation helpers shared by the Deck and its tests. */

export function clampIndex(index: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(Math.max(index, 0), total - 1);
}

export function nextIndex(index: number, total: number): number {
  return clampIndex(index + 1, total);
}

export function prevIndex(index: number, total: number): number {
  return clampIndex(index - 1, total);
}

export function indexOfSlide(slides: Pick<Slide, "id">[], id: string): number {
  return slides.findIndex((s) => s.id === id);
}

/** Resolve the starting index for a (possibly missing or invalid) slide id. */
export function resolveStartIndex(
  slides: Pick<Slide, "id">[],
  requestedId: string | undefined,
): number {
  if (!requestedId) return 0;
  const i = indexOfSlide(slides, requestedId);
  return i >= 0 ? i : 0;
}
