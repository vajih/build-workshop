import { describe, expect, it } from "vitest";
import {
  FEEDBACK_NPS_VALUES,
  FEEDBACK_RATING_VALUES,
  WORKSHOP_FEEDBACK_QUESTIONS,
  WORKSHOP_NPS_QUESTION,
  WORKSHOP_OPEN_FEEDBACK_QUESTION,
} from "./feedback";

describe("post-workshop feedback", () => {
  it("keeps the pulse survey quick and consistently scaled", () => {
    expect(WORKSHOP_FEEDBACK_QUESTIONS).toHaveLength(5);
    expect(new Set(WORKSHOP_FEEDBACK_QUESTIONS.map((question) => question.id)).size).toBe(5);
    expect(FEEDBACK_RATING_VALUES).toEqual([1, 2, 3, 4, 5]);
  });

  it("uses the standard 0–10 NPS range and one open prompt", () => {
    expect(FEEDBACK_NPS_VALUES).toEqual([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(WORKSHOP_NPS_QUESTION).toMatch(/recommend/i);
    expect(WORKSHOP_OPEN_FEEDBACK_QUESTION).toMatch(/improve/i);
  });
});
