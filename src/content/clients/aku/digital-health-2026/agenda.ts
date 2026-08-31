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
    minutes: 30,
    title: "Build 1: AKU Outbreak Signal",
    description:
      "Quick immersion — about 20 minutes hands-on: an empty folder to a tested, committed, live prototype (a calculator and an interactive Karachi map) using AI as your pair programmer. Synthetic classroom data. Finished early? Start Build 2.",
    href: "/participate/build-1",
  },
  {
    start: "0:40",
    minutes: 20,
    title: "Concepts: AI as a pair programmer",
    description:
      "Short discussion. Define, prompt, supervise, test, commit, publish, improve. Where AI helps, where human judgement stays in charge. Fast finishers continue with Build 2.",
  },
  {
    start: "1:00",
    minutes: 15,
    title: "Outbreak-AI demonstration",
    description:
      "A small domain-specific model running offline on an ESP32. Edge AI versus cloud AI, privacy, resilience, and the epidemiological use case.",
    href: "/participate/outbreak-ai",
  },
  {
    start: "1:15",
    minutes: 15,
    title: "Applied examples and open build time",
    description:
      "A short walkthrough of another health-workflow prototype, plus time to finish Build 1 or work through the optional Build 2 extensions. Form your Team Challenge teams of four to six toward the end.",
    href: "/participate/build-2",
  },
  {
    start: "1:30",
    minutes: 8,
    title: "Team Challenge — write and post your idea",
    description:
      "Each team writes a one-page Idea Card (user, problem, the one thing, payoff, boundary) and posts it as a comment on the workshop's LinkedIn thread. No prompting yet.",
    href: "/participate/team-challenge",
  },
  {
    start: "1:38",
    minutes: 12,
    title: "Comment round and sharpen",
    description:
      "Everyone comments on two or three other teams' ideas in the thread, then a 20-second pitch per team. Teams sharpen their idea against three questions and lock it. Doubles as the mid-session breather; comments keep coming after today.",
    href: "/participate/team-challenge",
  },
  {
    start: "1:50",
    minutes: 40,
    title: "Team build sprint",
    description:
      "About 40 minutes to build the locked idea with AI as the pair programmer. Facilitator circulates.",
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
