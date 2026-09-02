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

  it("inserts the pit-stop sequence after the model-efficiency slide", () => {
    expect(FRICTIONLESS_CHAPTER_CONFIG.map((entry) => entry.sourceSlide)).toEqual(
      Array.from({ length: 13 }, (_, index) => index + 1),
    );

    const enabledIds = FRICTIONLESS_CHAPTER_CONFIG.filter(
      (entry) => entry.include,
    ).map((entry) => entry.id);
    const modelEfficiencyIndex = enabledIds.indexOf(
      "frictionless-05-model-efficiency",
    );
    const expectedIds = [
      ...enabledIds.slice(0, 1),
      "welcome-3-adoption",
      ...enabledIds.slice(1, modelEfficiencyIndex + 1),
      "what-changed-pit-stops",
      "what-changed-pit-stops-discussion",
      ...enabledIds.slice(modelEfficiencyIndex + 1, 7),
      "what-changed-optional-break",
      ...enabledIds.slice(7, 10),
      "what-changed-khayal",
      "what-changed-khayal-architecture",
      "what-changed-dcp-opportunity",
      "what-changed-dcp",
      "what-changed-dcp-architecture",
      ...enabledIds.slice(10),
    ];
    const anchor = slideIndexById("what-changed-1");
    const actualIds = SLIDES.slice(
      anchor + 1,
      anchor + 1 + expectedIds.length,
    ).map((slide) => slide.id);

    expect(actualIds).toEqual(expectedIds);
    expect(
      actualIds.slice(
        actualIds.indexOf("frictionless-05-model-efficiency"),
        actualIds.indexOf("frictionless-05-model-efficiency") + 4,
      ),
    ).toEqual([
      "frictionless-05-model-efficiency",
      "what-changed-pit-stops",
      "what-changed-pit-stops-discussion",
      "frictionless-06-workbench",
    ]);
  });

  it("slideIndexById finds slides and returns -1 for unknown", () => {
    expect(slideIndexById(SLIDES[0].id)).toBe(0);
    expect(slideIndexById(SLIDES[SLIDE_COUNT - 1].id)).toBe(SLIDE_COUNT - 1);
    expect(slideIndexById("no-such-slide")).toBe(-1);
  });

  it("carries the build-in-the-open thread from concept to close", () => {
    const openSlide = slideIndexById("what-changed-open");
    const openSlideContent = SLIDES[openSlide];
    const lastSlide = SLIDES[SLIDE_COUNT - 1];
    expect(openSlide).toBeGreaterThan(-1);
    expect(openSlideContent.layout).toBe("build-open");
    expect(openSlideContent.images).toHaveLength(1);
    expect(openSlideContent.body).toHaveLength(4);
    // the final slide invites a post about the workshop
    expect(lastSlide.id).toBe("presentations-close-7");
    expect(`${lastSlide.title} ${lastSlide.lead}`).toMatch(/#AKUBuildWorkshop/);
    expect(`${lastSlide.title} ${lastSlide.lead}`.toLowerCase()).toMatch(/post/);
  });

  it("keeps the pit-stop observation and discussion sequence presentation-ready", () => {
    const video = SLIDES.find((slide) => slide.id === "what-changed-pit-stops");
    const discussion = SLIDES.find(
      (slide) => slide.id === "what-changed-pit-stops-discussion",
    );

    expect(video?.layout).toBe("click-video");
    expect(video?.video?.youtubeId).toBe("RRy_73ivcms");
    expect(discussion?.layout).toBe("discussion-build");
    expect(discussion?.items).toHaveLength(5);
    expect(discussion?.conclusion?.label).toBe(
      "New tools accelerate innovation.",
    );
  });

  it("places a configurable optional break after the one-window slide", () => {
    const oneWindow = slideIndexById("frictionless-07-one-window");
    const breakSlide = SLIDES[oneWindow + 1];

    expect(breakSlide.id).toBe("what-changed-optional-break");
    expect(breakSlide.layout).toBe("break-timer");
    expect(breakSlide.timerMinutes).toBe(10);
    expect(breakSlide.stoicMessage).toBeTruthy();
  });

  it("introduces the product examples before the useful-experience slide", () => {
    const usefulExperience = slideIndexById(
      "frictionless-11-useful-experience",
    );
    const khayal = SLIDES[usefulExperience - 5];
    const architecture = SLIDES[usefulExperience - 4];
    const dcpOpportunity = SLIDES[usefulExperience - 3];
    const dcp = SLIDES[usefulExperience - 2];
    const dcpArchitecture = SLIDES[usefulExperience - 1];

    expect(khayal.id).toBe("what-changed-khayal");
    expect(khayal.layout).toBe("mobile-showcase");
    expect(khayal.mobileScreens).toHaveLength(3);
    expect(khayal.externalCta?.href).toBe("https://khayal-vert.vercel.app/");
    expect(architecture.id).toBe("what-changed-khayal-architecture");
    expect(architecture.layout).toBe("khayal-architecture");
    expect(dcpOpportunity.id).toBe("what-changed-dcp-opportunity");
    expect(dcpOpportunity.layout).toBe("dcp-opportunity");
    expect(dcpOpportunity.images).toHaveLength(2);
    expect(dcp.id).toBe("what-changed-dcp");
    expect(dcp.layout).toBe("desktop-showcase");
    expect(dcp.desktopScreens).toHaveLength(3);
    expect(dcp.externalCta?.href).toBe("https://dcp-dusky.vercel.app/demo5");
    expect(dcpArchitecture.id).toBe("what-changed-dcp-architecture");
    expect(dcpArchitecture.layout).toBe("dcp-architecture");
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
