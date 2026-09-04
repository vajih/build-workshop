export interface WorkshopFeedbackQuestion {
  id: string;
  shortLabel: string;
  statement: string;
}

/**
 * Five outcome measures for the post-workshop pulse. All share one agreement
 * scale so participants can answer quickly and the organizer can compare them.
 */
export const WORKSHOP_FEEDBACK_QUESTIONS: WorkshopFeedbackQuestion[] = [
  {
    id: "workshop_value",
    shortLabel: "Value",
    statement: "The workshop was a valuable use of my time.",
  },
  {
    id: "prototype_confidence",
    shortLabel: "Confidence",
    statement:
      "I feel more confident using AI to turn an idea into a working prototype.",
  },
  {
    id: "practical_relevance",
    shortLabel: "Relevance",
    statement:
      "I can apply this workshop approach in my work, teaching, research, or studies.",
  },
  {
    id: "clarity_and_pace",
    shortLabel: "Clarity and pace",
    statement: "The workshop activities and facilitation were clear and well paced.",
  },
  {
    id: "responsible_ai",
    shortLabel: "Responsible AI",
    statement:
      "I better understand how to build and evaluate AI responsibly in healthcare.",
  },
];

export const WORKSHOP_NPS_QUESTION =
  "How likely are you to recommend the Build Workshop to a colleague?";

export const WORKSHOP_OPEN_FEEDBACK_QUESTION =
  "What should we keep — and what is one thing we could improve?";

export const FEEDBACK_RATING_VALUES = [1, 2, 3, 4, 5] as const;
export const FEEDBACK_NPS_VALUES = Array.from({ length: 11 }, (_, index) => index);
