import type { RubricRow } from "@/content/types";

/** Cohort hashtag — used on the idea and build posts so the class can find each other. */
export const WORKSHOP_HASHTAG = "#AKUBuildWorkshop";

export const CHALLENGE_OBJECTIVE =
  "In your team, turn a real problem into a working prototype — with AI as your pair programmer. First you write a one-page idea and post it to the workshop's LinkedIn thread. Your classmates comment on it in real time; you sharpen your idea from what they say, then you have about 40 minutes to build and five minutes to present. The comments keep coming after today.";

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
  "No prompting until your card is posted in the thread. Deciding what to build is the hard part — do that first, in the open.";

export const TEAM_BOARD_INTRO =
  "Your facilitator posts one anchor post on LinkedIn at the start of this section. Fill your card below, copy it, and post it as a comment on that post — so the whole room can find every idea in one place. You can also share it as your own post with " +
  WORKSHOP_HASHTAG +
  ". The card is saved on this device too — it becomes the skeleton of your five-minute presentation. Prefer not to post publicly? One person per team posts, or your team uses the slide-deck fallback and reads the card aloud in the round.";

/* ----------------------------------------------------------------------------
   Phase 2 — the idea gallery, run as a live LinkedIn comment round. Doubles as
   the mid-session break: stand up, work the thread on your phone.
---------------------------------------------------------------------------- */
export const GALLERY_STEPS: string[] = [
  "Open the thread and read every team's idea — take about four minutes.",
  "Comment on two or three other teams' cards: one question you would want answered, or one thing that is genuinely strong. A question, not “here is what I would build”.",
  "Rapid round in the room: each team gets twenty seconds to say their user and the one thing. The facilitator names any overlaps.",
  "Read the comments on your own card. Vajih and others keep replying after today — you will have more feedback by tonight.",
];

/**
 * A starting point for the idea post — the Idea Card with a short ask and the
 * cohort hashtag. Participants replace every bracket. The IdeaCard component
 * builds the real version from the filled card.
 */
export const SHARE_IDEA_TEMPLATE = `[Team idea — AKU Build Workshop]

The user: [one named role]
The problem: [what they do today instead]
The one thing it does: [end to end, one sentence]
The payoff: [minutes / errors / travel / missed signals]
What it is NOT: [the boundary]

We are building this in the next hour with AI. A workshop exercise on synthetic data — feedback welcome. What are we missing?

Facilitated by @Vajih Khan ${WORKSHOP_HASHTAG}`;

/* ----------------------------------------------------------------------------
   Phase 3 — sharpen, then lock.
---------------------------------------------------------------------------- */
export const SHARPEN_QUESTIONS: string[] = [
  "Is your user still the right person — and is it one person, not three?",
  "Cut your scope in half. What is the single most important function, the one you would keep if you only had ten minutes?",
  "Did another team’s idea reveal a gap, an overlap, or a simpler version of yours?",
];

export const SHARPEN_RULE =
  "Update your card, then lock it. This version is what you build and what you present against. Edit your post or add a reply so the thread shows the sharpened idea.";

/** Shown in the sharpen and share sections — the loop continues after the room clears. */
export const KEEP_THE_LOOP_GOING =
  "The comments do not stop when the room empties. People keep replying to your idea and your build for days. Check the thread tonight and this week, reply to every comment, and keep sharpening. Vajih is in there.";

export const MVP_REQUIREMENTS: string[] = [
  "It runs. You can demonstrate it live in the browser.",
  "It does one useful thing end to end, not three things halfway.",
  "It has a clear user and a clear problem statement written down.",
  "Inputs are validated and the interface is readable on a phone.",
  "It uses only what you can build in the time — no database or external service is required.",
  "It carries a visible line stating it is an educational prototype, not a clinical tool.",
];

/**
 * Five prompting tips for the build sprint. Copilot builds what you describe,
 * so the quality of the prompt is the quality of the build.
 */
export const PROMPTING_TIPS: { label: string; detail: string }[] = [
  {
    label: "Name the user and the one job",
    detail: "Who it is for, and the single thing it does end to end.",
  },
  {
    label: "State the stack and the “do not”",
    detail: "Plain HTML, CSS, JS — say no framework, no backend.",
  },
  {
    label: "Inputs, rule, output",
    detail: "Exact fields, exact logic, what shows for each case.",
  },
  {
    label: "One thing, then the next",
    detail: "Core function working and tested before any polish.",
  },
  {
    label: "Paste the error, don’t retype it",
    detail: "The exact message — then read the fix before accepting.",
  },
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
  "Post about what your team built on LinkedIn before you leave the room — as a follow-up on your idea post, or on the same thread, so the arc is visible.",
  "Say what it does in one line, name the user it was for, and add a screenshot or a short screen recording of the working demo.",
  "Name one thing AI did well and one thing you had to correct — that is the part people actually learn from.",
  "Keep the honest framing: an educational prototype built with synthetic data in about 40 minutes — not a diagnosis, a surveillance system, or a real deployment.",
  "Tag Vajih Khan and use " + WORKSHOP_HASHTAG + ", and connect so you can ask questions after today.",
];

/**
 * A starting point, not a script. Participants replace every bracket. Kept
 * short so it reads as a person wrote it.
 */
export const SHARE_POST_TEMPLATE = `Today at the AKU Build Workshop my team built [what it does, one line] for [the named user].

Starting from an empty folder, with AI as a pair programmer, we went from a problem to a working prototype in about 40 minutes.

It is an educational prototype built with synthetic data — not a clinical, diagnostic, or surveillance tool.

What surprised me: [one thing you learned about building with AI].

Facilitated by @Vajih Khan ${WORKSHOP_HASHTAG}`;
