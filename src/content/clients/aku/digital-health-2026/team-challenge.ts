import type { RubricRow } from "@/content/types";

export const CHALLENGE_OBJECTIVE =
  "In your team, turn a real problem into a working prototype — with AI as your pair programmer. First you lock a one-page idea and put it on the shared board. The room reads every idea together and gives each team one note. You sharpen yours, then you have about 40 minutes to build and five minutes to present.";

export const TEAM_FORMATION: string[] = [
  "Form teams of four to six people. Mix roles — clinicians, epidemiologists, data people, and first-time builders together.",
  "Pick one person to drive the keyboard and share their screen. Everyone else supervises, tests, and writes the prompts.",
  "Choose a problem someone on the team has actually faced. Specific beats ambitious.",
];

/* ----------------------------------------------------------------------------
   Phase 1 — the Idea Card. Filled in the workbook (saved on the device that is
   sharing the screen), then copied onto the team's slide on the shared board.
---------------------------------------------------------------------------- */
export const IDEA_CARD_FIELDS: {
  id: string;
  label: string;
  hint: string;
  placeholder: string;
  /** render as a multi-line textarea */
  long?: boolean;
}[] = [
  {
    id: "user",
    label: "The user",
    hint: "One named role — not “clinicians”, not “everyone”.",
    placeholder:
      "A triage nurse on the night shift at a district hospital",
  },
  {
    id: "problem",
    label: "The problem",
    hint: "What do they do today instead?",
    placeholder:
      "Counts febrile cases by hand at 6am and phones the number to the district office",
    long: true,
  },
  {
    id: "oneThing",
    label: "The one thing it does",
    hint: "End to end, in one sentence.",
    placeholder:
      "Enter today’s count and get a colour-coded signal with a suggested next step",
  },
  {
    id: "payoff",
    label: "The payoff",
    hint: "Minutes, errors, travel, waiting, missed signals.",
    placeholder:
      "Saves ~15 minutes each morning and removes the transcription error",
  },
  {
    id: "notThis",
    label: "What it is NOT",
    hint: "The boundary. Say it plainly.",
    placeholder:
      "Not a diagnosis, not a real surveillance feed — a decision aid on synthetic data",
  },
];

export const IDEA_CARD_RULE =
  "No prompting until your card is on the board. Deciding what to build is the hard part — do that first, together.";

export const TEAM_BOARD_INTRO =
  "Your facilitator opens a shared board with one slide per team at the start of this section. Fill your card below, copy it, and paste it onto your team’s slide. The card is also saved on this device — it becomes the skeleton of your five-minute presentation.";

/* ----------------------------------------------------------------------------
   Phase 2 — the idea gallery (doubles as the mid-session break).
---------------------------------------------------------------------------- */
export const GALLERY_STEPS: string[] = [
  "Read every card on the board — take about four minutes.",
  "Leave one note on one other team’s card: a question you would want answered, or one thing that is strong. A question, not “here is what I would build”.",
  "Rapid round: each team gets twenty seconds to say their user and the one thing.",
  "Listen for overlaps. If two teams are solving adjacent problems, say so — you might combine, or split cleanly.",
];

/* ----------------------------------------------------------------------------
   Phase 3 — sharpen, then lock.
---------------------------------------------------------------------------- */
export const SHARPEN_QUESTIONS: string[] = [
  "Is your user still the right person — and is it one person, not three?",
  "Cut your scope in half. What is the single most important function, the one you would keep if you only had ten minutes?",
  "Did another team’s idea reveal a gap, an overlap, or a simpler version of yours?",
];

export const SHARPEN_RULE =
  "Update your card, then lock it. This version is what you build and what you present against.";

export const MVP_REQUIREMENTS: string[] = [
  "It runs. You can demonstrate it live in the browser.",
  "It does one useful thing end to end, not three things halfway.",
  "It has a clear user and a clear problem statement written down.",
  "Inputs are validated and the interface is readable on a phone.",
  "It uses only what you can build in the time — no database or external service is required.",
  "It carries a visible line stating it is an educational prototype, not a clinical tool.",
];

export const HEALTH_DATA_GUIDANCE: string[] = [
  "Use invented or aggregate data for the demonstration. No real patient information.",
  "Do not collect names, contact details, or identifiers unless the prototype genuinely needs them — and today it does not.",
  "State plainly what the tool is not: not a diagnosis, not a treatment decision, not a confirmed outbreak.",
  "Keep a human in the loop for every action that affects a person.",
];

/**
 * The five-minute presentation. The first two parts and the last one come
 * straight off your locked Idea Card.
 */
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
