import { describe, expect, it } from "vitest";
import {
  PRESENTATION,
  SLIDES,
  SLIDE_COUNT,
  slideIndexById,
  PRESENTATION_SECTIONS,
  DRAFT_SLIDES,
} from "./presentation";
import { PARTICIPANT_NAV } from "./participant-nav";
import {
  clampIndex,
  nextIndex,
  prevIndex,
  resolveStartIndex,
} from "@/lib/deck-nav";

describe("presentation deck", () => {
  it("has the seven required sections in order", () => {
    expect(PRESENTATION_SECTIONS.map((s) => s.id)).toEqual([
      "welcome",
      "what-changed",
      "ai-and-building",
      "responsible-ai",
      "outbreak-ai",
      "team-challenge",
      "presentations-close",
    ]);
  });

  it("every slide id is unique", () => {
    const ids = SLIDES.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("every slide belongs to a real section", () => {
    const sectionIds = new Set(PRESENTATION.sections.map((s) => s.id));
    for (const slide of SLIDES) {
      expect(sectionIds.has(slide.section)).toBe(true);
    }
  });

  it("slideIndexById finds slides and returns -1 for unknown", () => {
    expect(slideIndexById(SLIDES[0].id)).toBe(0);
    expect(slideIndexById(SLIDES[SLIDE_COUNT - 1].id)).toBe(SLIDE_COUNT - 1);
    expect(slideIndexById("no-such-slide")).toBe(-1);
  });

  it("exercise-launch slides link to a real participant nav target", () => {
    const navHrefs = new Set(PARTICIPANT_NAV.map((n) => n.href));
    for (const slide of SLIDES) {
      if (slide.participantHref) {
        expect(navHrefs.has(slide.participantHref)).toBe(true);
      }
    }
  });

  it("draft slides are tracked for review", () => {
    // there is at least one flagged draft, and all are real slide ids
    const ids = new Set(SLIDES.map((s) => s.id));
    for (const id of DRAFT_SLIDES) expect(ids.has(id)).toBe(true);
  });
});

describe("deck navigation (pure)", () => {
  it("clamps within bounds", () => {
    expect(clampIndex(-3, 10)).toBe(0);
    expect(clampIndex(99, 10)).toBe(9);
    expect(clampIndex(4, 10)).toBe(4);
  });

  it("next / prev stop at the ends", () => {
    expect(prevIndex(0, SLIDE_COUNT)).toBe(0);
    expect(nextIndex(SLIDE_COUNT - 1, SLIDE_COUNT)).toBe(SLIDE_COUNT - 1);
    expect(nextIndex(0, SLIDE_COUNT)).toBe(1);
  });

  it("resolves the start index from a direct slide id, ignoring invalid ids", () => {
    const target = SLIDES[5].id;
    expect(resolveStartIndex(SLIDES, target)).toBe(5);
    expect(resolveStartIndex(SLIDES, "bogus")).toBe(0);
    expect(resolveStartIndex(SLIDES, undefined)).toBe(0);
  });
});
