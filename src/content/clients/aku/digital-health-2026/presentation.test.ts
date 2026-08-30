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
import { FRICTIONLESS_CHAPTER_CONFIG } from "./frictionless-chapter";
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

  it("inserts the adoption slide after Frictionless source slide 1", () => {
    expect(FRICTIONLESS_CHAPTER_CONFIG.map((entry) => entry.sourceSlide)).toEqual(
      Array.from({ length: 13 }, (_, index) => index + 1),
    );

    const enabledIds = FRICTIONLESS_CHAPTER_CONFIG.filter(
      (entry) => entry.include,
    ).map((entry) => entry.id);
    const anchor = slideIndexById("what-changed-1");

    const expectedIds = [
      ...enabledIds.slice(0, 1),
      "welcome-3-adoption",
      ...enabledIds.slice(1),
    ];

    expect(
      SLIDES.slice(anchor + 1, anchor + 1 + expectedIds.length).map(
        (slide) => slide.id,
      ),
    ).toEqual(expectedIds);
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
        // a slide may deep-link to a section anchor (`…#share`); the page it
        // points at must still be a real participant nav target.
        const page = slide.participantHref.split("#")[0];
        expect(navHrefs.has(page)).toBe(true);
      }
    }
  });

  it("the close section invites participants to share their build", () => {
    const share = SLIDES.find((s) => s.id === "presentations-close-share");
    expect(share?.section).toBe("presentations-close");
    expect(share?.participantHref).toBe("/participate/team-challenge#share");
    // it must land before the closing "Thank you" slide
    expect(slideIndexById("presentations-close-share")).toBeLessThan(
      slideIndexById("presentations-close-7"),
    );
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
