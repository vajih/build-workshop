# Content editing guide

> **Platform update.** Content is now organised as `shared/**` (reusable
> concepts) and `clients/<client>/<workshop>/**` (one workshop). The AKU
> workshop's files are at
> `src/content/clients/aku/digital-health-2026/`. `src/lib/workshop.ts`,
> `docs/architecture.md`, and the README cover routing, the content model, and
> how to add a client / workshop / module / slide. This guide covers editing
> the existing AKU content.

## Where things live

| File | Contents |
| --- | --- |
| `clients/aku/digital-health-2026/workshop.ts` | `WorkshopConfig` — `creator` / `methodology` / `program` (all stable); `industry` / `organization` / `audience` / `engagement` (editable); `moduleOrder`, `visibility`, `safety`, `links`, `storageVersion` |
| `clients/aku/digital-health-2026/modules.ts` | Cross-link table — participant href ↔ facilitator segment ↔ presentation section |
| `clients/aku/digital-health-2026/presentation.ts` | The slide deck (7 sections). `draft: true` flags a slide for review |
| `clients/aku/digital-health-2026/agenda.ts` | Agenda blocks; durations must sum to `TOTAL_MINUTES` |
| `clients/aku/digital-health-2026/build-one.ts` | Build 1 steps, command blocks, Prompts 1–3, test tables, troubleshooting, `DISCLAIMER` |
| `clients/aku/digital-health-2026/{outbreak-ai,team-challenge,resources,facilitator}.ts` | The other modules |
| `clients/aku/digital-health-2026/participant-nav.ts` | Participant Mode navigation + step order |
| `shared/{build-cycle,ai-evolution,responsible-ai,economic-value,frictionless-building,safety}.ts` | Reusable concept content used by slides and the Concepts page |

## Editing the presentation

- Each slide has a unique, URL-safe `id` — **that id is its direct link**
  (`…/present/<id>`), so do not change ids casually.
- Pick an existing `type` (`title`, `section`, `statement`, `concept`,
  `timeline`, `comparison`, `process`, `demo-intro`, `exercise-launch`,
  `discussion`, `reflection`, `closing`). New visual → add a `case` to
  `src/components/slides/SlideRenderer.tsx`.
- Keep `body` bullets short. If a slide is too full, **split it** — do not
  shrink the type.
- `exercise-launch` slides set `participantHref` (a value from
  `participant-nav.ts`), not embedded commands.
- `draft: true` puts a slide on the review list (`DRAFT_SLIDES`, shown on the
  slide and in `backup/slides`).

## Draft content to confirm before delivery

Public surfaces never show any of these as "unconfirmed" — see **Public vs
facilitator content** below. This list is what the facilitator still needs to
finalise in `workshop.ts`:

- `engagement.date` / `location` / `department` / `course` — unset. Never invent
  them. Public pages omit them; the facilitator dashboard shows "<Field>
  requires confirmation".
- `audience.description` — unconfirmed (`audience.confirmed: false`). Do not
  claim every listed group will attend. Set `audience.confirmed: true` after
  review.
- `organization.publicRelationshipLabel` — keep `"Prepared for"`. Change to
  `"Hosted by"` / `"Presented at"` only with AKU's confirmation.
- Slides marked `draft: true`: `welcome-7` ("first-build clock" timing),
  `ai-and-building-2` (AI-evolution framing). Listed on the facilitator
  dashboard; **not** flagged on the projected deck.
- The QR / short URL target is derived from `NEXT_PUBLIC_SITE_URL` — set it for
  the venue.

## Public vs facilitator content

| When | Public surfaces show | Facilitator Mode shows |
| --- | --- | --- |
| `audience.confirmed` is `false` | the neutral fallback **"AKU workshop participants in digital health research"** (`publicAudience()`) | the amber "Review needed" notice + the exact `audience.description` |
| `engagement.date` (or `location` / `department` / `course`) unset | nothing — omitted (`publicDate()` → `null`) | "<Field> requires confirmation" (`facilitatorField()`) |
| a slide has `draft: true` | nothing | listed as "Draft slides" on the dashboard |

Never put "pending confirmation", "requires confirmation", "review needed",
"provisional", or "review before delivery" in a landing / hub / participant /
presentation / OG / public-print file — `src/content/public-content.test.ts`
scans for it and fails the build.

## Brand terminology (do not mix these up)

| Concept | Term | Where the value lives |
| --- | --- | --- |
| The person | Creator and facilitator — **Vajih Khan** | `config.creator` |
| The method | Signature methodology — **Frictionless Building** | `config.methodology` |
| The product | **Build Workshop** | `config.program` |
| The domain | **Healthcare & Epidemiology** | `config.industry` |
| The host | Organization — **Aga Khan University** ("AKU") | `config.organization` |
| The people | **Participants** | `config.audience` |
| This event | Engagement — **AKU Build Workshop 2026** | `config.engagement` |

Never write "AKU Healthcare Edition", "Participant: AKU", or describe AKU as the
creator/owner of the platform. Compose display strings with the helpers in
`src/lib/workshop.ts`, not string literals.

---

## Original guide (field shapes)

All student-facing wording lives under `src/content/`. You can edit these files
without touching any component. After an edit run:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

The test step matters when you change any test table — it checks the tables
still match the classification rules.

---

## General rules

- **Keep commands and prompts exact.** Use backtick template literals. Preserve
  every line break and use straight quotes (`"`), not curly quotes. Students
  copy this text and paste it into a terminal or into Copilot.
- **Never mix operating systems.** Anything with `macos` / `windows` fields must
  have Bash in `macos` and PowerShell in `windows`.
- **No real health data**, even in examples. Use invented locations and counts.
- **No diagnosis or outbreak-confirmation claims.** See the safety section in
  the README.

---

## `participant-nav.ts` (in the workshop folder)

- `PARTICIPANT_NAV` — the participant header, mobile menu, and previous/next
  step order. Hrefs are relative to the workshop base
  (`/aku/digital-health-2026`); the header prepends it.

Add a page here if it should appear in participant navigation and the step flow.

---

## `journey.ts` (`src/content/journey.ts`)

- `JOURNEY` — the seven-stage "Prepare → … → Present" strip.
- The supporting message and purpose statement now live in the workshop
  `config` (`workshop.ts`). The safety statement comes from
  `shared/safety.ts`.

---

## `agenda.ts`

- `TOTAL_MINUTES` — the scheduled total (currently 180).
- `AGENDA` — ordered blocks. Each has `start` (display only), `minutes`
  (duration, used to compute the running clock on the agenda page), `title`,
  `description`, and an optional `href`.
- Keep the sum of `minutes` equal to `TOTAL_MINUTES`.

---

## `before-workshop.ts`

- `BRING_CHECKLIST`, `INSTALL_CHECKLIST`, `OPTIONAL_CHECKLIST` — checklist items.
  Each needs a **stable unique `id`** (used as the localStorage progress key —
  do not reuse ids or completed ticks will move).
- `DIAGNOSTICS` — the four version commands and their expected output.
- `MAC_CODE_COMMAND_STEPS` — the macOS `code` command setup steps.
- `BEFORE_TROUBLESHOOTING` — accordion entries.

---

## `build-one.ts`

The largest content file. It drives the entire Build 1 page.

- `BUILD_STEPS` — the 13 steps. Each has `id`, `number`, `title`, `summary`,
  `minutes`. **The `id` is the progress key.** The per-step completion checkbox
  uses `` `${id}-complete` ``.
- `PROMPT_1`, `PROMPT_2`, `PROMPT_3` — the authoritative Copilot prompts. Edit
  wording carefully; do not drop requirements. Prompt 1 now also specifies the
  **Leaflet + OpenStreetMap map**; `build-one.test.ts` checks the map / no-API-key
  / attribution / threshold requirements survive edits.
- `REPAIR_PROMPT` (calculation) and `MAP_REPAIR_PROMPT` (map) — the two
  fix-a-failing-thing prompts. Both are in `ALL_PROMPTS` (backup page).
- `DEMO_LOCATIONS` — the five Karachi dropdown options and their **approximate
  classroom coordinates** (not administrative centroids). `LOCATIONS_SNIPPET`
  builds the `const locations = {…}` block that Prompt 1 embeds — coordinates
  are defined **once**. `MAP_CENTER` is the initial map centre + zoom.
- `SYNTHETIC_DATA_LABEL`, `DISCLAIMER`, `SIGNAL_NOT_OUTBREAK`, `OSM_ATTRIBUTION`
  — the required safety / attribution strings. `SAFETY_MESSAGES` groups the
  first three. `DISCLAIMER` feeds `config.safety.disclaimer` — keep it identical
  everywhere.
- `*_BLOCK` exports — command blocks with `macos` / `windows` fields.
- `BUILD_ONE_TESTS` (calculation) + `MAP_TESTS` (manual map checks) +
  `TEST_GROUPS` (grouped completion checkboxes: Calculation / Map / Safety /
  Mobile) + `BOUNDARY_TESTS` (1.4 / 1.5 / 2.0). The Vitest suite verifies the
  calculation tables still agree with `lib/outbreak-signal.ts`.
- `PRODUCT_EVOLUTION` — the four-stage arc shown on presentation slide
  `welcome-10` (Calculator → Geospatial signal → Multi-location view →
  Explainable decision support).
- `COMPLETION_CHECKLIST` — final checklist items (own ids).
- `BUILD_ONE_TROUBLESHOOTING` — accordion entries (now includes the Leaflet
  failure modes).

The classification rules the prompts and tables must reflect:

| Ratio                    | Level       |
| ------------------------ | ----------- |
| `< 1.5`                  | STABLE      |
| `>= 1.5` and `< 2.0`     | WATCH       |
| `>= 2.0`                 | INVESTIGATE |

If you change the thresholds, update **all** of: the three prompts,
`lib/outbreak-signal.ts`, `BUILD_ONE_TESTS`, and `BOUNDARY_TESTS`.

---

## `outbreak-ai.ts`

- `OUTBREAK_AI_INTRO` — lead paragraph.
- `OUTBREAK_AI_SECTIONS` — array of `{ id, heading, body: string[] }`. Add or
  reorder freely.
- `DEMO_FLOW`, `AUDIENCE_QUESTIONS`, `BOUNDARIES`, `OUTBREAK_AI_LIMITS`.

---

## `team-challenge.ts`

- `CHALLENGE_OBJECTIVE`, `TEAM_FORMATION`, `MVP_REQUIREMENTS`, `VALUE_PROMPTS`,
  `HEALTH_DATA_GUIDANCE`, `PRESENTATION_STRUCTURE`, `PRESENTATION_TIPS`.
- `RUBRIC` — scoring dimensions; `RUBRIC_NOTE` — the scoring instruction.

**Naming.** The segment participants see is **"Team Challenge"** / **"Team build
sprint"** (agenda). The word **"hackathon"** is used only as a descriptor in
outward marketing copy — the hub hero line and the per-engagement `<meta
description>` — never as an in-workshop label, so the format reads as inclusive
for a non-developer audience and stays inside the Build Workshop vocabulary.

---

## `resources.ts`

- `RESOURCE_SECTIONS` — array of `{ id, title, intro?, links[] }`.
- Each link: `{ label, href, note?, tag }` where `tag` is `"required"`,
  `"optional"`, or `"demo"`. The tag renders as "Required for Build 1",
  "Optional for later builds", or "Instructor demonstration only".
- Prefer official documentation URLs. External links open in a new tab
  automatically.

---

## `facilitator.ts`

- `FACILITATOR_SEGMENTS` — one object per segment with `objective`, `says`,
  `studentsDo`, `checkpoint`, `commonFailure`, `recovery`, `transition`,
  `minutes`.
- `BUILD1_DEBRIEF` — the exact debrief line.
- `BUILD_CYCLE` — the "Define → … → Improve" strip.

The facilitator page is `noindex` and carries a visible notice. It has no
password in Version 1.

---

## Design tokens

Colours, spacing, radius, and shadow are defined once in
`src/app/globals.css` under `@theme`. Change a token there and it updates
across the whole portal. Utility classes like `bg-primary`, `text-ink-muted`,
`border-border-strong`, `bg-watch-soft` are generated from those tokens.
