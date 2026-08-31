import type { FacilitatorSegment } from "@/content/types";

export const BUILD1_DEBRIEF =
  "Minutes ago, you had an empty folder. You now have a working application with an interactive map, a local development environment, version history, and a live global URL — built on synthetic classroom data, and not one line typed by hand.";

export const FACILITATOR_SEGMENTS: FacilitatorSegment[] = [
  {
    id: "f-welcome",
    title: "Welcome and orientation",
    minutes: 10,
    objective:
      "Students understand what they will build and how to use the portal without further hand-holding.",
    says:
      "In three hours you will go from an empty folder to a live, tested, public health application that you built with AI. The portal is your workbench — every command and prompt is there to copy. You do not need to type anything by hand.",
    studentsDo:
      "Open the portal, open Build 1, and confirm their setup against Before the Workshop.",
    checkpoint: "Every student has the portal open and Build 1 visible.",
    commonFailure: "A few laptops are missing Git, Node, or the code command.",
    recovery:
      "Point them to Before the Workshop troubleshooting. Pair anyone still stuck with a neighbour and keep moving — they can catch up during Step 4.",
    transition: "Move straight into Build 1. Do not lecture first.",
  },
  {
    id: "f-build1",
    title: "Build 1: AKU Outbreak Signal",
    minutes: 30,
    objective:
      "Every student has a working, committed, deployed app — a calculator and an interactive Karachi map — and a live URL, in about 20 minutes. The feature rounds are Build 2 (optional).",
    says:
      "This is quick immersion. In about twenty minutes you go from an empty folder to a live, public app. Work step by step. Read the expected result before you run the command. If what you see does not match, stop and use the troubleshooting section — do not push forward on a broken step.",
    studentsDo:
      "Follow the 5 steps: set up the project, open Copilot Agent mode, run Prompt 1 (calculator + map), work the Calculation / Map / Safety / Mobile checks, then commit, log in to Vercel, and deploy to a live URL.",
    checkpoint:
      "Step 4 (Calculation and Map checks pass) and Step 5 (a live URL with a visible map and attribution). Anyone finished before the room should be pointed at Build 2, not left waiting.",
    commonFailure:
      "The WATCH boundary is implemented as ratio > 1.5 instead of ratio >= 1.5 (30 / 20 shows STABLE), or the map container has zero height and renders blank.",
    recovery:
      "Calculation: paste the Step 4 calculation repair prompt with the exact inputs and actual result. Map: paste the Step 4 map repair prompt with the matching symptom — the calculator must keep working while the map is fixed.",
    transition:
      "Once most of the room has a live URL, pause the hands-on work and gather attention for the concepts discussion. Fast finishers keep going on Build 2 while you talk; everyone else has Build 2 as homework.",
    timing: [
      { label: "Project setup + Copilot", range: "3–5 min" },
      { label: "Copilot generation (calculator + map)", range: "4–6 min" },
      { label: "Local testing", range: "3–4 min" },
      { label: "Commit + first Vercel deployment", range: "4–6 min" },
      { label: "Brief debrief", range: "2 min" },
    ],
    deepDive: [
      {
        heading: "Managing fast finishers — Build 2",
        body: [
          "Build 1 is deliberately short. Some students will have a live URL in 12–15 minutes while others are still deploying.",
          "Send anyone who finishes to Build 2 (/participate/build-2): two optional, independent extensions — a geospatial history, then explainable signals — each ending in a commit and redeploy.",
          "Say clearly that Build 2 is a bonus, not a requirement. Build 1 was the deliverable. Everyone gets Build 2 as homework regardless.",
          "This keeps the room busy without holding the slow finishers to a longer clock, and it means you can move to the concepts discussion as soon as most people are live.",
        ],
      },
      {
        heading: "Why the map creates an immediate visual payoff",
        body: [
          "A ratio is abstract. A red dot on a familiar city is not — students feel the result before they analyse it.",
          "It also lets you make the responsible-AI point concretely: the same red dot that creates urgency is exactly what must be explained as a synthetic signal requiring verification.",
          "Framing to use: “A red marker is visually powerful. That is precisely why we must explain that it is a synthetic signal requiring verification, not proof of an outbreak.”",
        ],
      },
      {
        heading: "Geospatial epidemiology — the one-minute version",
        body: [
          "Mapping counts by place is one of the oldest tools in the field — it shows where to look first.",
          "It adds context (which areas, near what), not certainty. Clusters can be reporting artefacts, population differences, or access to care.",
          "The workshop app stops at “where to look”. Investigation, verification, and response stay with people.",
        ],
      },
      {
        heading: "Common Leaflet failure modes and the fix",
        body: [
          "Missing map CSS: the leaflet.css <link> loads after the map is created → tiles misaligned or controls unstyled. Fix: put it in <head> before app.js.",
          "Zero-height container: the map div has no CSS height → blank or a thin strip. Fix: explicit height in CSS, then map.invalidateSize() after layout settles.",
          "Tile-network failure: the venue blocks tile.openstreetmap.org or the CDN → the fallback message must show and the calculator must be unaffected. This is expected, not a bug.",
          "Attribution: “© OpenStreetMap contributors” is required and must stay readable — do not hide or restyle it away.",
          "Marker does not update: Copilot used an image icon instead of a circleMarker → ask it to switch to a vector circle so colour can change with no assets.",
          "Recovery: the Step 7 map repair prompt covers all of the above — students pick the matching symptom.",
        ],
      },
      {
        heading: "If venue internet is unavailable",
        body: [
          "The map will not load for anyone. Say so up front and treat it as a feature of the design: the calculator, classification, tests, commits, and (where possible) deployment all still work.",
          "Students still complete Build 1 — the completion checklist marks the map and deployment separately.",
          "All coordinates and data are synthetic classroom values — there is nothing real to protect and nothing real being claimed.",
        ],
      },
    ],
  },
  {
    id: "f-concepts",
    title: "Concepts: AI as a pair programmer",
    minutes: 20,
    objective:
      "Students can name the build cycle and say where human judgement stays in charge.",
    says:
      "You just ran a loop: define, prompt, supervise, test, commit, publish, learn, improve. The AI wrote code. You decided what to build, what was acceptable, and what to ship.",
    studentsDo: "Discuss, ask questions, look back at prompts they wrote.",
    checkpoint: "Students can restate the cycle in their own words.",
    commonFailure: "The discussion drifts into open-ended AI debate and runs long.",
    recovery: "Timebox it. Park big questions for the reflection at the end.",
    transition: "Introduce the Outbreak-AI device demonstration.",
  },
  {
    id: "f-outbreak-ai",
    title: "Outbreak-AI demonstration",
    minutes: 15,
    objective:
      "Students see a domain-specific model running offline on an ESP32 and understand edge versus cloud AI.",
    says:
      "This device has no internet connection. It reads weekly counts and baselines and returns a ranked signal. Small model, one job, runs anywhere, keeps the data in the room.",
    studentsDo:
      "Watch the demo flow, then raise the suggested audience questions.",
    checkpoint:
      "Students can distinguish signal interpretation, outbreak investigation, and medical diagnosis.",
    commonFailure:
      "Someone concludes the device 'detects outbreaks'.",
    recovery:
      "Restate the boundary: it interprets a signal for a human to act on. It does not confirm outbreaks and does not replace an epidemiologist.",
    transition: "Show one or two additional applied examples, then brief the Team Challenge.",
  },
  {
    id: "f-team-build",
    title: "Team Challenge: idea, gallery, sharpen, build",
    minutes: 60,
    objective:
      "Every team has a locked, board-visible idea the room understands, then a running prototype of that one thing.",
    says:
      "Deciding what to build is the hard part, so we do that first and out loud. Lock a one-page idea, put it on the board, and we read every idea together before anyone prompts. Then you have about forty minutes to build.",
    studentsDo:
      "Fill the Idea Card and post it to the shared board, take part in the gallery (read every card, leave one note on another team's card, give a twenty-second pitch), sharpen against three questions and lock the card, then build for ~40 minutes and prepare a five-minute demo.",
    checkpoint:
      "All cards on the board by minute 10 · every team through the gallery round · a running demo by minute 35 of the build.",
    commonFailure:
      "A team cannot agree on an idea, or scopes too big and has nothing running near the end of the build.",
    recovery:
      "Idea deadlock — you pick from their two front-runners, or hand them a spare from your prepared list. Scope — cut to the single most important function and get that working.",
    transition:
      "Two-minute warning, then presentations. Hold the five-minute limit firmly.",
    timing: [
      { label: "Fill the Idea Card", range: "8 min" },
      { label: "Facilitator gut-check", range: "2 min" },
      { label: "Idea gallery", range: "8 min" },
      { label: "Sharpen and lock", range: "2 min" },
      { label: "Build", range: "40 min" },
    ],
    deepDive: [
      {
        heading: "Set up the shared board (before the session)",
        body: [
          "Create a Google Slides deck: a title slide, then one numbered slide per team with the five Idea Card headings as a layout (The user / The problem / The one thing / The payoff / What it is NOT).",
          "Set sharing to “anyone with the link can edit”. Paste the link into workshop.ts (engagement.teamBoardUrl) so the participant page shows a QR, or open it live and read the short link aloud.",
          "Fallback: if the venue blocks Google, print a grid — one A4 sheet per team with the five headings — and run the gallery on a wall.",
        ],
      },
      {
        heading: "The facilitator gut-check (2 minutes)",
        body: [
          "Scan the board the moment cards land. Flag out loud, per card:",
          "Needs real patient data → reframe to synthetic or aggregate for today.",
          "Far too big → name the single function they should keep.",
          "Not actually a problem → ask “what does the user do today instead?”",
          "Two near-identical cards → point it out before the gallery so they can combine or differentiate.",
        ],
      },
      {
        heading: "Running the Idea Gallery",
        body: [
          "About four minutes of silent reading, then a strict twenty-seconds-per-team round with a visible timer.",
          "One note per person on one other team's card — a question they'd want answered or one genuine strength. Not “here's what I'd build”.",
          "Name the overlaps yourself: “teams 2 and 5, you're adjacent — combine, or split cleanly.”",
          "Keep it safe: “these notes are to help you aim, not a verdict. Every team builds.”",
        ],
      },
      {
        heading: "If a team finishes early",
        body: [
          "They extend their own prototype — a second function, better input validation, a mobile pass — or pair with a struggling team.",
          "They do not start something new. The locked card is the deliverable.",
        ],
      },
    ],
  },
  {
    id: "f-presentations",
    title: "Five team presentations",
    minutes: 25,
    objective: "Each team communicates problem, user, working demo, AI use, and responsible design in five minutes.",
    says:
      "Five minutes each. Problem, user, live demo, how you used AI, what your tool is not.",
    studentsDo: "Present in turn. Others score against the rubric.",
    checkpoint: "All five teams present within the time box.",
    commonFailure: "The first team runs eight minutes and the last team is rushed.",
    recovery: "Use a visible timer. Cut at five minutes. Be consistent from team one.",
    transition:
      "As each team finishes, ask them to post their build on LinkedIn and tag you while it is fresh. Then close with the reflection and next steps.",
  },
  {
    id: "f-reflection",
    title: "Reflection and next steps",
    minutes: 5,
    objective: "Students leave knowing how to keep building and where the resources are.",
    says: BUILD1_DEBRIEF,
    studentsDo:
      "Post their team build on LinkedIn, connect with the facilitator, and note the resources page and the build cycle to take home.",
    checkpoint:
      "Students know where the Resources page is, what to try next, and have been prompted to share their build.",
    commonFailure: "The session overran and this is skipped.",
    recovery: "Protect the last five minutes. This is the part they remember.",
    transition: "Thank the room. End on time.",
  },
];

/**
 * Define -> Prompt -> Supervise -> Test -> Commit -> Publish -> Learn -> Improve
 * The authoritative list lives in shared content; re-exported here for the
 * facilitator view.
 */
export { BUILD_CYCLE_LABELS as BUILD_CYCLE } from "@/content/shared/build-cycle";

export const PRESENTER_CHECKLIST: string[] = [
  "Projector shows the presentation at a readable size from the back of the room.",
  "Presentation is in full screen (press F) and on the title slide.",
  "Participant workbook URL and QR code are ready to show (press Q on any slide).",
  "Your own laptop has the participant workbook open to test alongside the room.",
  "Wi-Fi is confirmed — the map needs it. Or the map-unavailable fallback plan is ready.",
  "Session clock started when the workshop begins.",
  "Backup pages (all commands, all prompts) are open in a tab or printed.",
  "Say once, early: all locations, coordinates, and case numbers today are synthetic classroom data.",
];

export const BACKUP_INSTRUCTIONS: { title: string; steps: string[] }[] = [
  {
    title: "If venue internet fails",
    steps: [
      "Run the portal locally on your laptop: npm install then npm run dev.",
      "Set NEXT_PUBLIC_SITE_URL to your laptop's LAN address so QR codes resolve.",
      "Share your laptop's address with the room, or connect the projector directly.",
      "Participants can still reach the workbook over the local network.",
    ],
  },
  {
    title: "If the map will not load (no internet, or the tile server / CDN is blocked)",
    steps: [
      "Say so up front — the map needs the network; the calculator does not.",
      "Prompt 1 already tells Copilot to show a fallback message and keep the calculator working.",
      "Students still complete Build 1 — the completion checklist marks the map and deployment separately.",
      "All coordinates and numbers are synthetic classroom data — nothing real is lost.",
    ],
  },
  {
    title: "If a participant's machine cannot deploy",
    steps: [
      "They can still complete Steps 1–8 (build, test, commit) fully offline.",
      "Pair them with a neighbour for the deployment steps.",
      "The completion checklist marks deployment separately — partial completion is fine.",
    ],
  },
  {
    title: "Producing a PDF backup",
    steps: [
      "Open the backup pages (all commands, all prompts, participant, facilitator).",
      "Use the browser's Print dialog and choose Save as PDF.",
      "The print stylesheet hides navigation and expands collapsed sections.",
    ],
  },
];
