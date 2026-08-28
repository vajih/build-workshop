import type { AgendaBlock } from "@/content/types";

/**
 * Three-hour workshop agenda. Edit timings here only — every page that shows
 * agenda information reads from this file.
 *
 * `start` is minutes from the workshop start (H:MM). `minutes` is the duration.
 * Keep the durations adding up to `TOTAL_MINUTES`.
 */
export const TOTAL_MINUTES = 180;

export const AGENDA: AgendaBlock[] = [
  {
    start: "0:00",
    minutes: 10,
    title: "Welcome and orientation",
    description:
      "Why this workshop exists, how the portal works, and what you will have built by the end. Open the portal and confirm your setup from Before the Workshop.",
  },
  {
    start: "0:10",
    minutes: 60,
    title: "Build 1: AKU Outbreak Signal",
    description:
      "Immediate hands-on build. Go from an empty folder to a tested, committed, live prototype — a calculator and an interactive Karachi map — using AI as your pair programmer. Synthetic classroom data.",
    href: "/participate/build-1",
  },
  {
    start: "1:10",
    minutes: 15,
    title: "Concepts: AI as a pair programmer",
    description:
      "Short discussion. Define, prompt, supervise, test, commit, publish, improve. Where AI helps, where human judgement stays in charge.",
  },
  {
    start: "1:25",
    minutes: 15,
    title: "Outbreak-AI demonstration",
    description:
      "A small domain-specific model running offline on an ESP32. Edge AI versus cloud AI, privacy, resilience, and the epidemiological use case.",
    href: "/participate/outbreak-ai",
  },
  {
    start: "1:40",
    minutes: 5,
    title: "Additional applied examples",
    description:
      "One short walkthrough of another health-workflow prototype to widen the sense of what a three-hour build can produce.",
  },
  {
    start: "1:45",
    minutes: 5,
    title: "Team Challenge briefing",
    description:
      "Form teams of four to six. Review the objective, the minimum viable prototype, and the scoring rubric.",
    href: "/participate/team-challenge",
  },
  {
    start: "1:50",
    minutes: 40,
    title: "Team build sprint",
    description:
      "A 40-minute team build sprint. Teams design and build a minimum viable prototype for a real user and a real problem, using AI throughout. Facilitator circulates.",
    href: "/participate/team-challenge",
  },
  {
    start: "2:30",
    minutes: 25,
    title: "Five team presentations",
    description:
      "Five minutes per team: the problem, the user, a live demonstration, how AI was used, and responsible-design choices.",
  },
  {
    start: "2:55",
    minutes: 5,
    title: "Reflection and next steps",
    description:
      "What changed in three hours, how to keep building after today, and where to find the resources list.",
    href: "/participate/resources",
  },
];
