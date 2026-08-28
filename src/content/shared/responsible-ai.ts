import type { SlideItem } from "@/content/types";

/**
 * Responsible-AI principles for health and public-health contexts. Reusable
 * across health workshops. These are teaching framings, not policy text.
 */
export const RESPONSIBLE_AI_PRINCIPLES: SlideItem[] = [
  {
    label: "Signal, not conclusion",
    detail:
      "A model can say 'this number looks unusual'. It cannot say what it means. A person decides that.",
  },
  {
    label: "Decision support, not diagnosis",
    detail:
      "Tools inform a human decision. They do not make the decision and do not diagnose a patient.",
  },
  {
    label: "Explainability",
    detail:
      "If a tool flags something, it should show why — the inputs and the threshold that triggered it.",
  },
  {
    label: "Data quality",
    detail:
      "A signal is only as good as the counts behind it. Reporting delays and data-entry errors look like events.",
  },
  {
    label: "Corroboration",
    detail:
      "One flag is a prompt to look, not a finding. Confirm with other sources before acting.",
  },
  {
    label: "Privacy",
    detail:
      "Aggregate counts by place and time are usually enough. Do not collect identifiable information you do not need.",
  },
  {
    label: "Human oversight",
    detail:
      "Keep a person in the loop for every action that affects a patient or a population.",
  },
  {
    label: "Limitation language",
    detail:
      "Say plainly what the tool is not. Carry the disclaimer everywhere the output appears.",
  },
];

export const SIGNAL_VS_CONCLUSION = {
  signal: [
    "A number is outside its expected range.",
    "Produced automatically and consistently.",
    "Points attention at something.",
  ],
  conclusion: [
    "An interpretation of what the number means.",
    "Requires context, verification, and judgement.",
    "Belongs to a person, not a tool.",
  ],
};

export const SUPPORT_VS_DIAGNOSIS = {
  support: [
    "Ranks locations for review this week.",
    "Explains which threshold was crossed.",
    "Leaves the response decision to the team.",
  ],
  diagnosis: [
    "Determines a disease in an individual.",
    "A clinical act by a qualified person.",
    "Never the job of a workshop prototype.",
  ],
};
