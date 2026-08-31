import { describe, expect, it } from "vitest";
import {
  IDEA_CARD_FIELDS,
  IDEA_CARD_RULE,
  GALLERY_STEPS,
  SHARPEN_QUESTIONS,
  RUBRIC,
  WORKSHOP_HASHTAG,
  SHARE_IDEA_TEMPLATE,
  SHARE_POST_TEMPLATE,
  PROMPTING_TIPS,
} from "./team-challenge";
import { PRESENTATION, slideIndexById } from "./presentation";

describe("Team Challenge — idea-first flow", () => {
  it("the Idea Card has the five expected fields, each fully described", () => {
    expect(IDEA_CARD_FIELDS.map((f) => f.id)).toEqual([
      "user",
      "problem",
      "oneThing",
      "payoff",
      "notThis",
    ]);
    for (const f of IDEA_CARD_FIELDS) {
      expect(f.label.trim().length).toBeGreaterThan(0);
      expect(f.hint.trim().length).toBeGreaterThan(0);
      expect(f.placeholder.trim().length).toBeGreaterThan(0);
    }
    // exactly one long (textarea) field
    expect(IDEA_CARD_FIELDS.filter((f) => f.long)).toHaveLength(1);
  });

  it("the no-prompting-until-posted rule is stated", () => {
    expect(IDEA_CARD_RULE).toMatch(/no prompting/i);
    expect(IDEA_CARD_RULE).toMatch(/posted|thread/i);
  });

  it("the comment round is feedback in a thread, not a ranking", () => {
    expect(GALLERY_STEPS).toHaveLength(4);
    const joined = GALLERY_STEPS.join(" ");
    expect(joined).toMatch(/thread/i);
    expect(joined).toMatch(/comment on two or three/i);
    expect(joined).toMatch(/twenty seconds/i);
    expect(joined).not.toMatch(/\bdot(s)?\b/i);
    expect(joined).not.toMatch(/\bvote\b/i);
  });

  it("both LinkedIn templates carry the cohort hashtag and the boundary field", () => {
    for (const t of [SHARE_IDEA_TEMPLATE, SHARE_POST_TEMPLATE]) {
      expect(t).toContain(WORKSHOP_HASHTAG);
    }
    expect(SHARE_IDEA_TEMPLATE).toMatch(/what it is not/i);
    expect(SHARE_IDEA_TEMPLATE).toMatch(/synthetic data/i);
  });

  it("sharpen asks three questions and the rubric is unchanged at six dimensions", () => {
    expect(SHARPEN_QUESTIONS).toHaveLength(3);
    expect(RUBRIC).toHaveLength(6);
  });

  it("has five prompting tips, on a slide right after responsible-ai-6", () => {
    expect(PROMPTING_TIPS).toHaveLength(5);
    for (const t of PROMPTING_TIPS) {
      expect(t.label.trim().length).toBeGreaterThan(0);
      expect(t.detail.trim().length).toBeGreaterThan(0);
    }
    expect(slideIndexById("responsible-ai-prompting")).toBe(
      slideIndexById("responsible-ai-6") + 1,
    );
  });
});

describe("Team Challenge — presentation section", () => {
  const section = PRESENTATION.sections.find((s) => s.id === "team-challenge");
  const ids = section?.slides.map((s) => s.id) ?? [];

  it("runs idea → gallery → sharpen → clock before the build slides", () => {
    const order = [
      "team-challenge-2",
      "team-challenge-3",
      "team-challenge-sharpen",
      "team-challenge-clock",
      "team-challenge-4",
    ];
    let last = -1;
    for (const id of order) {
      const at = ids.indexOf(id);
      expect(at, `${id} present and after the previous`).toBeGreaterThan(last);
      last = at;
    }
  });

  it("the lock-your-idea slide deep-links to the Idea Card", () => {
    const lock = section?.slides.find((s) => s.id === "team-challenge-2");
    expect(lock?.participantHref).toBe("/participate/team-challenge#idea");
  });
});
