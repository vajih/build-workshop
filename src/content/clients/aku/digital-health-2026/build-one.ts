import type {
  BuildStep,
  CommandBlockContent,
  TestCase,
  TroubleshootingEntry,
} from "@/content/types";

export const BUILD_ONE_TITLE = "Build 1: AKU Outbreak Signal";
export const BUILD_ONE_SUBTITLE =
  "Go from an empty folder to a live prototype with an interactive Karachi map.";

/* ----------------------------------------------------------------------------
   Safety wording (authoritative — shown across the portal and required in the
   student app)
---------------------------------------------------------------------------- */
export const DISCLAIMER =
  "Educational prototype only — not a surveillance, diagnostic, or clinical decision tool.";

export const SYNTHETIC_DATA_LABEL = "Synthetic classroom data";

export const SIGNAL_NOT_OUTBREAK =
  "A signal is a prompt to verify the data and investigate context. It does not confirm an outbreak.";

export const OSM_ATTRIBUTION = "© OpenStreetMap contributors";

export const SAFETY_MESSAGES = [
  SYNTHETIC_DATA_LABEL,
  DISCLAIMER,
  SIGNAL_NOT_OUTBREAK,
] as const;

/* ----------------------------------------------------------------------------
   Demonstration locations — approximate, classroom-only points for five Karachi
   districts. These are rough visual placements for the map exercise; they are
   NOT official administrative centroids or boundaries.
   FACILITATOR: sanity-check each point on a map before delivery.
---------------------------------------------------------------------------- */
export interface DemoLocation {
  label: string;
  /** approximate latitude, classroom visualisation only */
  lat: number;
  /** approximate longitude, classroom visualisation only */
  lng: number;
}

export const DEMO_LOCATIONS: DemoLocation[] = [
  { label: "Karachi East", lat: 24.92, lng: 67.1 },
  { label: "Karachi South", lat: 24.85, lng: 67.02 },
  { label: "Karachi Central", lat: 24.94, lng: 67.04 },
  { label: "Korangi", lat: 24.82, lng: 67.13 },
  { label: "Malir", lat: 24.89, lng: 67.19 },
];

/** Greater-Karachi map centre and city-level zoom for the initial map state. */
export const MAP_CENTER = { lat: 24.89, lng: 67.08, zoom: 11 };

/** The `const locations = {…}` block Copilot must reproduce in app.js. */
export const LOCATIONS_SNIPPET = `const locations = {
${DEMO_LOCATIONS.map(
  (l) => `  "${l.label}": { lat: ${l.lat.toFixed(2)}, lng: ${l.lng.toFixed(2)} },`,
).join("\n")}
};`;

export const BUILD_STEPS: BuildStep[] = [
  {
    id: "b1-01-os",
    number: 1,
    title: "Choose your operating system",
    summary:
      "Pick macOS or Windows PowerShell. Every command on this page will match your choice.",
    minutes: 1,
  },
  {
    id: "b1-02-terminal",
    number: 2,
    title: "Open the terminal",
    summary: "Open a command line so you can run the setup commands.",
    minutes: 1,
  },
  {
    id: "b1-03-readiness",
    number: 3,
    title: "Check your readiness",
    summary: "Confirm Git, Node.js, npm, and VS Code are installed.",
    minutes: 3,
  },
  {
    id: "b1-04-project",
    number: 4,
    title: "Create the student project",
    summary:
      "Make the workshop folder in your home directory and open it in VS Code.",
    minutes: 4,
  },
  {
    id: "b1-05-copilot",
    number: 5,
    title: "Open Copilot Agent mode",
    summary: "Get GitHub Copilot Chat ready in Agent mode inside your project.",
    minutes: 3,
  },
  {
    id: "b1-06-prompt-1",
    number: 6,
    title: "Prompt 1 — build the app and the map",
    summary:
      "Give Copilot the full specification for the AKU Outbreak Signal app, including the interactive Karachi map.",
    minutes: 14,
  },
  {
    id: "b1-07-test",
    number: 7,
    title: "Test Build 1",
    summary:
      "Run the calculation, map, safety, and mobile test groups and confirm each result.",
    minutes: 7,
  },
  {
    id: "b1-08-commit-1",
    number: 8,
    title: "First Git checkpoint",
    summary: "Save your working app as your first commit.",
    minutes: 3,
  },
  {
    id: "b1-09-vercel-login",
    number: 9,
    title: "Vercel authentication",
    summary: "Sign in to Vercel from the terminal.",
    minutes: 3,
  },
  {
    id: "b1-10-deploy",
    number: 10,
    title: "First production deployment",
    summary: "Deploy your app and get a live global URL.",
    minutes: 5,
  },
  {
    id: "b1-11-feature-1",
    number: 11,
    title: "Feature addition 1 — geospatial history",
    summary:
      "Prompt 2 turns Recent checks into multiple coloured map markers. One signal → many geospatial signals. Commit and redeploy.",
    minutes: 6,
  },
  {
    id: "b1-12-feature-2",
    number: 12,
    title: "Feature addition 2 — explainable markers",
    summary:
      "Prompt 3 adds a plain-language explanation to the result and every marker popup, plus boundary tests. Commit and redeploy.",
    minutes: 6,
  },
  {
    id: "b1-13-complete",
    number: 13,
    title: "Completion",
    summary: "Run the grouped final checklist and confirm everything works.",
    minutes: 2,
  },
];

export const BUILD_STEP_IDS = BUILD_STEPS.map((s) => s.id);

/* ----------------------------------------------------------------------------
   Step 2 — open the terminal
---------------------------------------------------------------------------- */
export const OPEN_TERMINAL: Record<"macos" | "windows", string> = {
  macos: "Press Command + Space, type Terminal, and press Enter.",
  windows: "Open Start, type PowerShell, and open Windows PowerShell.",
};

/* ----------------------------------------------------------------------------
   Step 3 — readiness check
---------------------------------------------------------------------------- */
export const READINESS_BLOCK: CommandBlockContent = {
  language: "bash",
  macos: `git --version
node --version
npm --version
code --version`,
  windows: `git --version
node --version
npm --version
code --version`,
};

export const READINESS_EXPECTED = `git version 2.x.x
v20.x.x   (or v22.x.x)
10.x.x
1.x.x`;

/* ----------------------------------------------------------------------------
   Step 4 — create the student project
---------------------------------------------------------------------------- */
export const CREATE_PROJECT_BLOCK: CommandBlockContent = {
  macos: `mkdir -p "$HOME/AKU-Build-Workshop/01-outbreak-signal"
cd "$HOME/AKU-Build-Workshop/01-outbreak-signal"
git init -b main
git status
code .`,
  windows: `$project = Join-Path $HOME "AKU-Build-Workshop\\01-outbreak-signal"
New-Item -ItemType Directory -Force -Path $project | Out-Null
Set-Location $project
git init -b main
git status
code .`,
};

export const CREATE_PROJECT_EXPLAINED: string[] = [
  "Creates the AKU-Build-Workshop folder in your home directory.",
  "Creates the 01-outbreak-signal project folder inside it.",
  "Moves the terminal into the project folder.",
  "Initializes a Git repository with main as the default branch.",
  "Confirms the Git status.",
  "Opens the correct folder in VS Code.",
];

export const CREATE_PROJECT_EXPECTED = `On branch main

No commits yet`;

export const CREATE_PROJECT_VSCODE_FOLDER = "01-OUTBREAK-SIGNAL";

export const HOME_FOLDER_NOTE =
  "We use your home folder on purpose. Documents, Desktop, OneDrive, and iCloud Drive can sync or relocate files while you work, which breaks terminal paths and Git. Your home folder does not.";

/* ----------------------------------------------------------------------------
   Step 5 — Copilot Agent mode
---------------------------------------------------------------------------- */
export const COPILOT_AGENT_STEPS: string[] = [
  "Select the Copilot icon in the VS Code title bar or activity bar.",
  "Open Copilot Chat.",
  "Select Agent mode in the chat mode selector.",
  "Confirm the Explorer on the left shows the 01-outbreak-signal folder.",
  "Copy Prompt 1 below.",
  "Paste it into the Copilot chat box and send it.",
];

/* ----------------------------------------------------------------------------
   Step 6 — Prompt 1 (authoritative wording)
---------------------------------------------------------------------------- */
export const PROMPT_1 = `You are my pair programmer. Build a small web application called "AKU Outbreak Signal".

STACK
- HTML, CSS, and vanilla JavaScript only. No build step, no npm packages, no bundler.
- Use Leaflet for an interactive map, loaded from its official CDN (the leaflet.css <link> and leaflet.js <script> tags). Pin one specific Leaflet version.
- Use OpenStreetMap raster tiles: https://tile.openstreetmap.org/{z}/{x}/{y}.png
- Do NOT use React or any framework, a database, geocoding, the browser geolocation / location-permission API, Mapbox, Google Maps, an API key, or any disease-surveillance API.
- No real case data, no real patient data, no live epidemiological data. Every value in this app is invented for a classroom exercise.

PURPOSE
A health worker picks a location, enters this week's case count and the normal weekly baseline for that location, and selects "Analyze signal". The app compares the numbers, classifies the result, and shows the location on a map.

LOCATIONS
Replace any free-text location field with a dropdown of exactly these five predefined Karachi demonstration locations. Keep their approximate coordinates in ONE JavaScript object, used everywhere — do not repeat coordinates in more than one function. These coordinates are rough classroom placements for visualisation only; they are not official administrative centroids.

${LOCATIONS_SNIPPET}

INPUTS
- Location: dropdown, one of the five above. Default: "Karachi East".
- Cases this week: number, 0 or greater. Default: 40.
- Normal weekly baseline: number, greater than 0. Default: 20.

CALCULATION AND CLASSIFICATION (use exactly these thresholds)
ratio = cases this week ÷ normal weekly baseline
Show the ratio rounded to one decimal place, for example "1.8×".
- ratio below 1.5 → STABLE (green)
- ratio from 1.5 up to but not including 2.0 → WATCH (amber)
- ratio 2.0 or higher → INVESTIGATE (red)

Responsible next step per level:
- STABLE: continue routine monitoring.
- WATCH: review recent counts and data quality, and check again next reporting cycle.
- INVESTIGATE: notify the outbreak investigation team to verify the data and decide on a response.

MAP — INITIAL STATE (on page load)
- Centre the map on greater Karachi (about lat 24.89, lng 67.08) at a city-level zoom (about 11).
- Add the OpenStreetMap tile layer with its attribution control visible and readable, showing exactly: ${OSM_ATTRIBUTION}
- Show one neutral (grey) circle marker at the default location, "Karachi East".
- Show a compact legend on or beside the map: green = Stable, amber = Watch, red = Investigate.
- Show visible text above or beside the map: ${SYNTHETIC_DATA_LABEL}
- Give the map an accessible name (aria-label) or an adjacent text description of what it shows.

MAP — AFTER "Analyze signal"
1. Validate all inputs (see VALIDATION).
2. Compute the ratio and classification.
3. Update the textual result: the location name, the ratio to one decimal, and the word STABLE / WATCH / INVESTIGATE.
4. Pan / focus the map to the selected location.
5. Replace that location's circle marker with one coloured by the signal: green / amber / red. Use a Leaflet circleMarker or circle (a vector marker) so the colour can change with no image or icon files.
6. Open a popup on that marker containing, as text: Location, Cases, Baseline, Ratio (one decimal), Classification.
7. Never rely on colour alone — the popup text and the on-page result must both state STABLE / WATCH / INVESTIGATE.
8. Keep the responsible next-step guidance visible.

VALIDATION
- Baseline of 0, empty, or negative → show a clear validation message and DO NOT show a result or move the map.
- Cases empty or negative → clear validation message, no result.

RESILIENCE — the map is optional
- If the Leaflet library or the map tiles fail to load (for example the venue blocks the CDN or the tile server), show a short friendly fallback message in the map area, for example: "Map unavailable — the calculator still works."
- The calculation, classification, validation, result text, and next-step guidance must all keep working with no map.
- Do not prefetch, bulk-download, or cache tiles.

LAYOUT
- Laptop: a balanced two-column layout where practical — inputs and the current result on one side, the map on the other. Keep the "Analyze signal" button and the current result visible without excessive scrolling.
- Phone: stack controls, then result, then map. Give the map a defined height (for example 320px). Call map.invalidateSize() after the layout settles so Leaflet renders correctly. Keep controls touch-friendly.

ACCESSIBILITY
- Every input has a visible <label>.
- The result region uses aria-live="polite".
- Status is shown with the word (STABLE / WATCH / INVESTIGATE) and a shape or icon, not colour alone.

SAFETY TEXT — show all three, prominently, near the result and the map
- ${SYNTHETIC_DATA_LABEL}
- ${DISCLAIMER}
- ${SIGNAL_NOT_OUTBREAK}
Do not show any real disease name, any patient information, or any claim of current disease activity. Do not imply access to real surveillance data.

FILES TO CREATE
- index.html   (loads Leaflet CSS + JS from the CDN)
- styles.css
- app.js
- README.md    (what the app does, how to run it, that all data is synthetic, the disclaimer, and the OpenStreetMap attribution note)
- .gitignore   (.DS_Store, node_modules, .vercel)

AFTER CREATING THE FILES
1. Start a local web server and give me the local URL to open.
2. Walk me through these tests and tell me the expected result for each:
   - Karachi East, 20, 20   → STABLE, 1.0×
   - Karachi South, 30, 20   → WATCH, 1.5×
   - Korangi, 40, 20   → INVESTIGATE, 2.0×
   - Malir, 40, 0   → validation error, no result, map does not move
   Then confirm: the map loads centred on Karachi, the "${OSM_ATTRIBUTION}" attribution is visible, choosing a different location moves the selected point, an analysed location shows a green / amber / red circle marker with a popup containing location, cases, baseline, ratio, and classification, and the calculator still works if the tile layer is blocked.
3. Stop before deploying anything. Do not run any deployment command until these tests pass.`;

export const PROMPT_1_CREATES = [
  "index.html",
  "styles.css",
  "app.js",
  "README.md",
  ".gitignore",
];

export const PROMPT_1_CREATES_NOTE =
  "Still five files. Leaflet is loaded from its CDN inside index.html — there is no build step and no npm install.";

/* ----------------------------------------------------------------------------
   Step 7 — test tables + repair prompts
---------------------------------------------------------------------------- */
export const BUILD_ONE_TESTS: TestCase[] = [
  {
    inputs: { Location: "Karachi East", Cases: "20", Baseline: "20" },
    expected: "Stable — 1.0×",
  },
  {
    inputs: { Location: "Karachi South", Cases: "30", Baseline: "20" },
    expected: "Watch — 1.5×",
  },
  {
    inputs: { Location: "Korangi", Cases: "40", Baseline: "20" },
    expected: "Investigate — 2.0×",
  },
  {
    inputs: { Location: "Malir", Cases: "40", Baseline: "0" },
    expected: "Validation error — no result shown",
  },
];

/** Manual checks for the map — no numbers, so kept as a plain list. */
export const MAP_TESTS: string[] = [
  "The map loads centred on Karachi at a city-level zoom.",
  `The "${OSM_ATTRIBUTION}" attribution is visible and readable on the map.`,
  "Choosing a different location moves the selected point on the map.",
  "STABLE produces a green circle marker and the word “Stable” in the result text.",
  "WATCH produces an amber circle marker and the word “Watch” in the result text.",
  "INVESTIGATE produces a red circle marker and the word “Investigate” in the result text.",
  "The marker popup shows location, cases, baseline, ratio, and classification.",
  "The calculator still works if the tile layer is blocked or fails to load.",
  "The map is usable at laptop and mobile widths.",
  "No real-surveillance or current-outbreak claim appears anywhere in the app.",
];

/**
 * Completion checkboxes for Step 7, grouped so students are not overwhelmed:
 * Calculation, Map, Safety, Mobile.
 */
export const TEST_GROUPS: {
  id: string;
  title: string;
  items: { id: string; label: string }[];
}[] = [
  {
    id: "calc",
    title: "Calculation",
    items: [
      { id: "b1-t-calc-stable", label: "Karachi East, 20 / 20 → Stable — 1.0×" },
      { id: "b1-t-calc-watch", label: "Karachi South, 30 / 20 → Watch — 1.5×" },
      { id: "b1-t-calc-invest", label: "Korangi, 40 / 20 → Investigate — 2.0×" },
      {
        id: "b1-t-calc-validation",
        label: "Malir, 40 / 0 → validation error, no result, map does not move",
      },
    ],
  },
  {
    id: "map",
    title: "Map",
    items: [
      { id: "b1-t-map-center", label: "Map loads centred on Karachi" },
      {
        id: "b1-t-map-attribution",
        label: `“${OSM_ATTRIBUTION}” attribution is visible`,
      },
      {
        id: "b1-t-map-select",
        label: "Selecting another location moves the selected point",
      },
      {
        id: "b1-t-map-colours",
        label: "Stable = green, Watch = amber, Investigate = red circle marker",
      },
      {
        id: "b1-t-map-popup",
        label: "Popup shows location, cases, baseline, ratio, classification",
      },
      {
        id: "b1-t-map-fallback",
        label: "Calculator still works when map tiles are blocked",
      },
    ],
  },
  {
    id: "safety",
    title: "Safety",
    items: [
      {
        id: "b1-t-safety-synthetic",
        label: `“${SYNTHETIC_DATA_LABEL}” is shown near the map`,
      },
      {
        id: "b1-t-safety-disclaimer",
        label: "The full disclaimer is shown near the result",
      },
      {
        id: "b1-t-safety-noclaim",
        label:
          "No real disease name, no patient data, no current-outbreak claim",
      },
    ],
  },
  {
    id: "mobile",
    title: "Mobile",
    items: [
      {
        id: "b1-t-mobile-stack",
        label: "Controls, result, then map stack vertically on a phone",
      },
      {
        id: "b1-t-mobile-height",
        label: "The map has a usable height and renders fully",
      },
      {
        id: "b1-t-mobile-touch",
        label: "Map and controls are touch-friendly",
      },
    ],
  },
];

export const REPAIR_PROMPT = `One or more calculation test cases did not produce the expected result.

Here is what I did and what I saw:
- Inputs: [location], [cases this week], [normal weekly baseline]
- Expected: [expected level and ratio]
- Actual: [what the app showed]

Please:
1. Find the cause in app.js (check the ratio calculation, the classification boundaries, and the validation for a baseline of 0).
2. Fix it without changing the visual design or the map.
3. Re-run the four standard test cases and confirm each one now matches:
   - Karachi East, 20, 20  → STABLE, 1.0×
   - Karachi South, 30, 20  → WATCH, 1.5×
   - Korangi, 40, 20  → INVESTIGATE, 2.0×
   - Malir, 40, 0  → validation error, no result, map does not move
Do not deploy anything.`;

export const MAP_REPAIR_PROMPT = `The map is not behaving correctly. The calculator still works.

Symptom: [blank / grey map] OR [map is a thin strip] OR [tiles do not load] OR [marker colour does not change] OR ["${OSM_ATTRIBUTION}" attribution is missing].

Please, in app.js / index.html / styles.css only:
1. Confirm the Leaflet CSS <link> loads before the map is created, and the map container has a non-zero height in CSS.
2. Confirm the OpenStreetMap tile layer URL is https://tile.openstreetmap.org/{z}/{x}/{y}.png and its attribution shows exactly "${OSM_ATTRIBUTION}".
3. Confirm there is only ONE Leaflet map instance and that map.invalidateSize() is called after layout changes.
4. Confirm the analysed marker is a circleMarker / circle whose colour is set from the classification (green / amber / red) and that its popup contains location, cases, baseline, ratio, and classification.
5. If tiles cannot load at all, keep the "Map unavailable — the calculator still works." fallback and leave the calculator untouched.
Do not add an API key, geocoding, or a different map provider. Do not deploy anything.`;

/* ----------------------------------------------------------------------------
   Step 8 — first commit
---------------------------------------------------------------------------- */
export const COMMIT_1_BLOCK: CommandBlockContent = {
  macos: `git status
git add .
git commit -m "Build initial outbreak signal app"
git log --oneline -1`,
  windows: `git status
git add .
git commit -m "Build initial outbreak signal app"
git log --oneline -1`,
};

export const COMMIT_1_EXPLAINED: string[] = [
  "git status — lists the new files Git has noticed but is not yet tracking.",
  "git add . — stages every change in the project for the next commit.",
  'git commit -m "..." — saves a permanent snapshot with a short message.',
  "git log --oneline -1 — shows your most recent commit on one line.",
];

/* ----------------------------------------------------------------------------
   Step 9 — Vercel login
---------------------------------------------------------------------------- */
export const VERCEL_LOGIN_BLOCK: CommandBlockContent = {
  macos: `npx vercel@latest login`,
  windows: `npx vercel@latest login`,
};

export const VERCEL_LOGIN_NOTE =
  "The CLI opens your browser to authorize the login. Approve it, then return to VS Code — the terminal will confirm you are signed in. If npx asks to install the vercel package, answer yes.";

/* ----------------------------------------------------------------------------
   Step 10 — first deployment
---------------------------------------------------------------------------- */
export const DEPLOY_BLOCK: CommandBlockContent = {
  macos: `npx vercel@latest --prod`,
  windows: `npx vercel@latest --prod`,
};

export const DEPLOY_ANSWERS: { question: string; answer: string }[] = [
  { question: "Set up and deploy?", answer: "Yes" },
  { question: "Which scope?", answer: "Your personal account" },
  { question: "Link to existing project?", answer: "No" },
  { question: "Project name?", answer: "aku-outbreak-signal-yourname" },
  { question: "In which directory is your code located?", answer: "./" },
  { question: "Want to override the settings?", answer: "No" },
];

export const DEPLOY_RESULT_NOTE =
  "When it finishes, Vercel prints a Production URL ending in .vercel.app. Open it in your browser and re-run the four test cases on the live site. You can paste the URL into the field below so the portal remembers it for the rest of the workshop.";

/* ----------------------------------------------------------------------------
   Step 11 — Prompt 2 + commit + redeploy
---------------------------------------------------------------------------- */
export const PROMPT_2 = `Evolve "Recent checks" in the AKU Outbreak Signal app into a geospatial history: one signal → multiple geospatial signals.

AFTER EVERY SUCCESSFUL ANALYSIS
- Save the check to the browser with localStorage: location, cases, baseline, ratio (one decimal), classification (STABLE / WATCH / INVESTIGATE), and a timestamp.
- Keep only the five most recent checks.
- Show the five checks as a text list, most recent first. Each row must include the location, the ratio, and the classification word — never colour alone.
- Show a coloured circle marker on the map for every check in the history: green for STABLE, amber for WATCH, red for INVESTIGATE.
- Selecting a row in the list focuses / pans the map to its marker.
- Selecting a marker opens its popup: location, cases, baseline, ratio, classification.
- A "Clear history" button removes the list, the stored history, AND the history markers from the map.

CONSTRAINTS
- Still only HTML, CSS, and vanilla JavaScript. Still no framework, no database, no API key, no geocoding.
- Do not store anything that could identify a patient — location, counts, and time only.
- Reuse the ONE existing Leaflet map. Do not create a second map or duplicate / conflicting map instances.
- The currently selected analysis must still be understandable from the on-page text alone, even when the map is unavailable.
- If localStorage is empty or unavailable, show "No recent checks yet." and do not error.
- Keep all three safety messages visible: "${SYNTHETIC_DATA_LABEL}", "${DISCLAIMER}", "${SIGNAL_NOT_OUTBREAK}".

AFTER THE CHANGE
1. Restart the local server if needed and give me the local URL.
2. Have me analyse three different locations and confirm: three list rows, three coloured markers, list-row → marker focus, marker → popup, the list keeps only the five most recent and survives a refresh, and "Clear history" removes every history marker and the list.
3. Update README.md.
4. Stop before deploying.`;

export const COMMIT_2_BLOCK: CommandBlockContent = {
  macos: `git status
git add .
git commit -m "Add recent outbreak signal history"
git log --oneline -2
npx vercel@latest --prod`,
  windows: `git status
git add .
git commit -m "Add recent outbreak signal history"
git log --oneline -2
npx vercel@latest --prod`,
};

/* ----------------------------------------------------------------------------
   Step 12 — Prompt 3 + commit + redeploy
---------------------------------------------------------------------------- */
export const PROMPT_3 = `Add explainability to BOTH the current result and every history marker in the AKU Outbreak Signal app.

BEHAVIOUR
- For the current result AND inside each history marker popup, show a short plain-language explanation covering:
  - the cases this week and the baseline
  - the calculation (cases ÷ baseline)
  - the ratio to one decimal
  - which threshold band it falls in (below 1.5× stable / 1.5× up to but not including 2.0× watch / 2.0× and above investigate)
  - the responsible interpretation for that level
  Example wording for INVESTIGATE:
  "40 cases ÷ a baseline of 20 = 2.0×. A ratio of 2.0× or more is classified as INVESTIGATE. This is a synthetic signal — verify the data and investigate the context. It does not confirm an outbreak."
- Keep the collapsible "How it works" section (a <details> element, closed by default, keyboard operable) that explains the thresholds and includes this exact line:
  "This app interprets a synthetic signal. It does not diagnose disease, confirm an outbreak, or replace an epidemiologist. A red marker is a prompt to verify, not proof."

CONSTRAINTS
- Still only HTML, CSS, and vanilla JavaScript.
- Keep the three safety messages visible: "${SYNTHETIC_DATA_LABEL}", "${DISCLAIMER}", "${SIGNAL_NOT_OUTBREAK}".
- Do not imply that any marker confirms an outbreak.

After the change, test these exact boundaries and confirm the level and the explanation for each:
- ratio 1.4× (28 cases, baseline 20) → STABLE
- ratio 1.5× (30 cases, baseline 20) → WATCH
- ratio 2.0× (40 cases, baseline 20) → INVESTIGATE

Then:
1. Give me the local URL to re-check the three boundary cases and one history-marker popup.
2. Update README.md.
3. Stop before deploying.`;

export const BOUNDARY_TESTS: TestCase[] = [
  {
    inputs: { Cases: "28", Baseline: "20", Ratio: "1.4×" },
    expected: "Stable",
  },
  {
    inputs: { Cases: "30", Baseline: "20", Ratio: "1.5×" },
    expected: "Watch",
  },
  {
    inputs: { Cases: "40", Baseline: "20", Ratio: "2.0×" },
    expected: "Investigate",
  },
];

export const COMMIT_3_BLOCK: CommandBlockContent = {
  macos: `git status
git add .
git commit -m "Add explainable signal thresholds"
git log --oneline -3
npx vercel@latest --prod`,
  windows: `git status
git add .
git commit -m "Add explainable signal thresholds"
git log --oneline -3
npx vercel@latest --prod`,
};

/* ----------------------------------------------------------------------------
   Backup / print — ordered collections of every command and prompt
---------------------------------------------------------------------------- */
export const ALL_COMMAND_BLOCKS: {
  step: number;
  label: string;
  block: CommandBlockContent;
}[] = [
  { step: 3, label: "Readiness check", block: READINESS_BLOCK },
  { step: 4, label: "Create the student project", block: CREATE_PROJECT_BLOCK },
  { step: 8, label: "First Git checkpoint", block: COMMIT_1_BLOCK },
  { step: 9, label: "Vercel authentication", block: VERCEL_LOGIN_BLOCK },
  { step: 10, label: "First production deployment", block: DEPLOY_BLOCK },
  { step: 11, label: "Feature 1 — commit and redeploy", block: COMMIT_2_BLOCK },
  { step: 12, label: "Feature 2 — commit and redeploy", block: COMMIT_3_BLOCK },
];

export const ALL_PROMPTS: { label: string; text: string }[] = [
  { label: "Prompt 1 — build the app and the map", text: PROMPT_1 },
  { label: "Prompt 2 — geospatial history", text: PROMPT_2 },
  { label: "Prompt 3 — explainable markers", text: PROMPT_3 },
  { label: "Repair prompt — calculation", text: REPAIR_PROMPT },
  { label: "Repair prompt — map", text: MAP_REPAIR_PROMPT },
];

/** The visible product evolution across Build 1 — used on a presentation slide. */
export const PRODUCT_EVOLUTION: string[] = [
  "Calculator",
  "Geospatial signal",
  "Multi-location view",
  "Explainable decision support",
];

/* ----------------------------------------------------------------------------
   Step 13 — completion checklist
---------------------------------------------------------------------------- */
export const COMPLETION_CHECKLIST: { id: string; label: string }[] = [
  { id: "b1-done-folder", label: "Correct project folder created in the home directory" },
  { id: "b1-done-vscode", label: "VS Code opened to the 01-outbreak-signal project" },
  { id: "b1-done-git", label: "Git repository initialized on main" },
  { id: "b1-done-app", label: "Application built with all five files, including the Leaflet map" },
  { id: "b1-done-map", label: "Map loads centred on Karachi with visible OpenStreetMap attribution" },
  { id: "b1-done-tests", label: "Calculation, Map, Safety, and Mobile test groups passed" },
  { id: "b1-done-fallback", label: "Calculator still works when the map tiles are blocked" },
  { id: "b1-done-commits", label: "Three Git commits created" },
  { id: "b1-done-recent", label: "Geospatial history shows multiple coloured markers and survives a refresh" },
  { id: "b1-done-explain", label: "Explainability works for the result and every marker popup" },
  { id: "b1-done-deploy", label: "Production deployment succeeded with a live URL" },
  { id: "b1-done-final-tests", label: "Final tests passed on the live site" },
];

/* ----------------------------------------------------------------------------
   Troubleshooting
---------------------------------------------------------------------------- */
export const BUILD_ONE_TROUBLESHOOTING: TroubleshootingEntry[] = [
  {
    problem: "code . does nothing",
    fix: "On macOS, install the 'code' command: in VS Code press Command + Shift + P, run Shell Command: Install 'code' command in PATH, then reopen the terminal. On Windows, reinstall VS Code and keep the “Add to PATH” option checked.",
  },
  {
    problem: "VS Code opened the wrong folder",
    fix: "In VS Code choose File > Open Folder and select AKU-Build-Workshop/01-outbreak-signal. The Explorer title should read 01-OUTBREAK-SIGNAL.",
  },
  {
    problem: "Copilot Chat has no Agent mode option",
    fix: "Update the GitHub Copilot and GitHub Copilot Chat extensions, reload the VS Code window, and confirm your Copilot subscription is active.",
  },
  {
    problem: "git commit says “Author identity unknown”",
    fix: 'Run git config --global user.name "Your Name" and git config --global user.email "you@example.com", then run the commit again.',
  },
  {
    problem: "The WATCH boundary is wrong (30 / 20 shows STABLE)",
    fix: "The classification must use ratio >= 1.5 for WATCH, not ratio > 1.5. Use the calculation repair prompt in Step 7 and paste your inputs and the actual result.",
  },
  {
    problem: "The map area is blank, grey, or a thin strip",
    fix: "Usually the map container has no height, or Leaflet's CSS did not load. Confirm the leaflet.css <link> is in <head> before the map is created, give the map container an explicit height in CSS, and call map.invalidateSize() after the layout settles. Send the map repair prompt in Step 7.",
  },
  {
    problem: "Map tiles do not load (network blocked)",
    fix: "The venue may block the OpenStreetMap tile server or the Leaflet CDN. The calculator must keep working — confirm the fallback message shows and the result, classification, and next-step guidance are unaffected. This is expected behaviour, not a bug.",
  },
  {
    problem: "“L is not defined” / “Leaflet is not defined”",
    fix: "The leaflet.js <script> is missing, misspelled, or runs after your app.js. Load leaflet.js from the CDN before app.js and pin a specific version.",
  },
  {
    problem: "The marker colour does not change after Analyze signal",
    fix: "The analysed marker must be a Leaflet circleMarker or circle whose colour / fillColor is set from the classification (green / amber / red). If Copilot used an image icon, ask it to switch to a vector circle marker so no icon files are needed.",
  },
  {
    problem: "The “© OpenStreetMap contributors” attribution is missing",
    fix: "Attribution is required. Set it on the tile layer (attribution option) and do not hide, cover, or restyle it so it becomes unreadable. Send the map repair prompt.",
  },
  {
    problem: "npx vercel asks to install a package",
    fix: "Answer yes. The first run downloads the Vercel CLI. This is expected and only happens once.",
  },
  {
    problem: "Vercel deploy fails with “No framework detected”",
    fix: "That is fine for a plain HTML app. When asked to override the settings, answer No and let Vercel deploy it as a static site.",
  },
  {
    problem: "The live site shows an old version",
    fix: "Confirm you committed your changes, then run npx vercel@latest --prod again. Hard-refresh the browser (Shift + Reload).",
  },
];
