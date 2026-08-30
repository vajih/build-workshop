import type { RubricRow } from "@/content/types";

export const CHALLENGE_OBJECTIVE =
  "In your team, design and build a working minimum viable prototype of an application that solves a real problem for a real health worker, patient group, or researcher — using AI as your pair programmer throughout. You have roughly 30 to 45 minutes to build and five minutes to present.";

export const TEAM_FORMATION: string[] = [
  "Form teams of four to six people. Mix roles — clinicians, epidemiologists, data people, and first-time builders together.",
  "Pick one person to drive the keyboard and share their screen. Everyone else supervises, tests, and writes the prompts.",
  "Choose a problem someone on the team has actually faced. Specific beats ambitious.",
  "Agree on the one thing the prototype must do before you write a single prompt.",
];

export const MVP_REQUIREMENTS: string[] = [
  "It runs. You can demonstrate it live in the browser.",
  "It does one useful thing end to end, not three things halfway.",
  "It has a clear user and a clear problem statement written down.",
  "Inputs are validated and the interface is readable on a phone.",
  "It uses only what you can build in the time — no database or external service is required.",
  "It carries a visible line stating it is an educational prototype, not a clinical tool.",
];

export const VALUE_PROMPTS: string[] = [
  "Who is the user, in one sentence? Name the role, not “everyone”.",
  "What problem does this solve, and what do they do today instead?",
  "What does it save — minutes, errors, travel, waiting, missed signals?",
  "If this existed on Monday, who would use it and how often?",
];

export const HEALTH_DATA_GUIDANCE: string[] = [
  "Use invented or aggregate data for the demonstration. No real patient information.",
  "Do not collect names, contact details, or identifiers unless the prototype genuinely needs them — and today it does not.",
  "State plainly what the tool is not: not a diagnosis, not a treatment decision, not a confirmed outbreak.",
  "Keep a human in the loop for every action that affects a person.",
];

export const PRESENTATION_STRUCTURE: { part: string; detail: string }[] = [
  { part: "The problem (45s)", detail: "Who has it, how often, what it costs them." },
  { part: "The user (30s)", detail: "One named role and their situation." },
  { part: "Live demo (2m)", detail: "Show the one thing working, end to end." },
  { part: "How you used AI (1m)", detail: "What you prompted, what you supervised, what you rejected." },
  { part: "Responsible design (45s)", detail: "What it is not, and how you kept a human in charge." },
];

export const PRESENTATION_TIPS: string[] = [
  "Five minutes is strict. Practise the demo once before you present.",
  "Have the app already open and working. Do not build live on stage.",
  "If something breaks, talk through what it should do — the idea still counts.",
  "One speaker for the story, one for the demo, is usually smoother than one person doing both.",
];

export const RUBRIC: RubricRow[] = [
  {
    dimension: "Importance of the problem",
    description: "Is this a real problem that matters to real people?",
  },
  {
    dimension: "Value to the intended user",
    description: "Would the named user actually use this, and gain something clear?",
  },
  {
    dimension: "Working functionality",
    description: "Does the core function work end to end in the live demo?",
  },
  {
    dimension: "Thoughtful use of AI",
    description: "Did the team direct and supervise the AI, not just accept its output?",
  },
  {
    dimension: "Responsible design",
    description: "Clear boundaries, no overclaiming, a human kept in the loop, no real health data.",
  },
  {
    dimension: "Clarity of demonstration",
    description: "Was the problem, the user, and the working prototype easy to follow in five minutes?",
  },
];

export const RUBRIC_NOTE =
  "Score each dimension from 1 to 5. The rubric rewards a small thing that works and is honestly framed over a large thing that does not.";

/**
 * After the demo: turn the build into something the team can point to later.
 * A public post is the fastest way to keep the momentum and build a network
 * around the work.
 */
export const SHARE_YOUR_BUILD: string[] = [
  "Post about what your team built on LinkedIn before you leave the room — while it is fresh and the demo still works.",
  "Say what it does in one line, name the user it was for, and add a screenshot or a short screen recording of the working demo.",
  "Name one thing AI did well and one thing you had to correct — that is the part people actually learn from.",
  "Keep the honest framing: an educational prototype built with synthetic data in about 40 minutes — not a diagnosis, a surveillance system, or a real deployment.",
  "Tag the facilitator so your build stays on their radar, and connect so you can ask questions after today.",
];

/**
 * A starting point, not a script. Participants replace every bracket. Kept
 * short so it reads as a person wrote it.
 */
export const SHARE_POST_TEMPLATE = `Today at the AKU Build Workshop my team built [what it does, one line] for [the named user].

Starting from an empty folder, with AI as a pair programmer, we went from a problem to a working prototype in about 40 minutes.

It is an educational prototype built with synthetic data — not a clinical, diagnostic, or surveillance tool.

What surprised me: [one thing you learned about building with AI].

Facilitated by Vajih Khan. #BuildWorkshop`;
