import type { FacilitatorSegment } from "@/content/types";

export const BUILD1_DEBRIEF =
  "Minutes ago, you had an empty folder. You now have a working application with an interactive map, a local development environment, version history, a live global URL, multiple geospatial signals saved in the browser, and explainable results — built on synthetic classroom data.";

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
    minutes: 60,
    objective:
      "Every student has a working, committed, deployed app — a calculator and an interactive Karachi map — and has run the grouped test cases themselves.",
    says:
      "We have moved from a number to a place. That changes how people understand a signal — but geography adds context, not certainty. Work step by step. Read the expected result before you run the command. If what you see does not match, stop and use the troubleshooting section — do not push forward on a broken step.",
    studentsDo:
      "Follow Steps 1 to 13: create the project, run Prompt 1 (calculator + map), work the Calculation / Map / Safety / Mobile test groups, commit, log in to Vercel, deploy, add the geospatial history and the explainable markers, redeploy, and finish the completion checklist.",
    checkpoint:
      "Steps 7 (Calculation and Map groups pass), 10 (live URL with a visible map and attribution), and 13 (grouped completion checklist) are the checkpoints to watch.",
    commonFailure:
      "The WATCH boundary is implemented as ratio > 1.5 instead of ratio >= 1.5 (30 / 20 shows STABLE), or the map container has zero height and renders blank.",
    recovery:
      "Calculation: paste the Step 7 calculation repair prompt with the exact inputs and actual result. Map: paste the Step 7 map repair prompt with the matching symptom — the calculator must keep working while the map is fixed.",
    transition:
      "Once most of the room has a live URL with a working map, pause the hands-on work and gather attention for the concepts discussion.",
    timing: [
      { label: "Project setup", range: "2–3 min" },
      { label: "Copilot generation (calculator + map)", range: "4–6 min" },
      { label: "Local testing (grouped)", range: "3–4 min" },
      { label: "First Vercel deployment", range: "2–4 min" },
      { label: "Brief debrief", range: "2 min" },
    ],
    deepDive: [
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
    minutes: 15,
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
    title: "Team Challenge build",
    minutes: 45,
    objective:
      "Each team has a running prototype of one useful thing for one named user.",
    says:
      "Pick a problem someone on your team has actually had. Agree on the one thing it must do before you prompt. Keep a human in the loop and use invented data only.",
    studentsDo:
      "Form teams, define the problem and user, build with AI, and prepare a five-minute presentation.",
    checkpoint:
      "At the 30-minute mark every team can demo something, even if small.",
    commonFailure: "A team scopes too big and has nothing running at minute 35.",
    recovery:
      "Tell them to cut to the single most important function and get that working. A small thing that runs beats a big thing that does not.",
    transition:
      "Give a two-minute warning, then move to presentations. Hold the five-minute limit firmly.",
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
