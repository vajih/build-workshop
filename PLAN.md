# PLAN.md — AKU Build Workshop Portal (Version 1)

## Goal

A guided, interactive student workbook for a three-hour "AKU Build Workshop" at
Aga Khan University. Not a marketing site. The portal delivers exact setup
steps, copyable terminal commands, copyable AI prompts, expected outputs, test
cases, completion checkpoints, troubleshooting, and visible progress.

## Technology

- Next.js 16 App Router (scaffolded with `create-next-app`)
- TypeScript (strict)
- Tailwind CSS v4
- ESLint (`eslint-config-next`)
- npm
- lucide-react icons
- Vitest for a small utility test suite
- Browser `localStorage` for OS preference, workshop progress, optional live URL,
  and dismissed notices

No database, no auth (Version 1), no analytics, no external APIs, no student
tracking, no state-management library.

## Architecture

```
src/
├── app/
│   ├── layout.tsx            # WorkshopProvider, header, footer, metadata
│   ├── page.tsx              # Home
│   ├── before-workshop/page.tsx
│   ├── agenda/page.tsx
│   ├── build-1/page.tsx      # Most complete page — 13 progressive steps
│   ├── outbreak-ai/page.tsx
│   ├── team-challenge/page.tsx
│   ├── resources/page.tsx
│   ├── facilitator/page.tsx
│   ├── sitemap.ts
│   ├── robots.ts
│   └── not-found.tsx
├── components/               # Reusable UI + design system
├── content/                  # Editable workshop content (TS data files)
│   ├── types.ts
│   ├── nav.ts
│   ├── journey.ts
│   ├── agenda.ts
│   ├── before-workshop.ts
│   ├── build-one.ts
│   ├── outbreak-ai.ts
│   ├── team-challenge.ts
│   ├── resources.ts
│   └── facilitator.ts
└── lib/
    ├── workshop-context.tsx  # OS + progress + live URL + dismissed notices
    ├── use-mounted.ts        # SSR-safe hydration guard
    └── outbreak-signal.ts    # ratio + classification utility (unit tested)
```

## Reusable components

SiteHeader, MobileNav, Footer, PageIntro, StepCard, CommandBlock, PromptBlock,
CopyButton, ExpectedResult, TestCaseTable, CompletionCheckbox, ProgressIndicator,
OSSelector, Troubleshooting (accordion), SafetyNotice, TimeAllocation, StepNav
(prev/next), Journey, Notice (dismissible), ResetProgress.

## Design system

- Deep green primary, teal accents, amber watch, red investigate-only
- Warm white / neutral surfaces, subtle borders + shadows
- Strong typography, generous spacing, high contrast, visible focus rings
- Restrained animation, `prefers-reduced-motion` respected
- Responsive mobile + laptop; status never communicated by color alone
- Light theme only (committed), no AKU logo or brand imitation

## Persistence (localStorage)

| Key             | Purpose                              |
| --------------- | ------------------------------------ |
| `aku-os`        | `macos` \| `windows`                 |
| `aku-progress`  | `{ [checkpointId]: true }`           |
| `aku-live-url`  | optional student Vercel URL          |
| `aku-dismissed` | dismissed notice ids                 |

"Reset my workshop progress" clears all four after a confirmation step. No
personal or health information is stored.

## Build & quality gates

1. `npm run lint`
2. `npx tsc --noEmit`
3. `npm run build`
4. `npm test` (utility suite)
5. Manual pass: mobile + laptop widths, OS switching, copy buttons, progress
   persistence, reset, navigation, exact command line breaks, no OS command
   cross-contamination, no secrets, no diagnostic/outbreak-confirmation claims,
   external links valid.

## Out of scope for Version 1

Password protection (added only after go-live), deployment, GitHub repo creation,
any external service connection.

---

# Integrated Workshop Platform

_Added 2026-08-28. Evolves the single-workshop portal into a reusable,
content-driven Workshop Operating System with three rendering modes. The AKU
healthcare Build Workshop remains the first (and only) implementation. No
database, no authentication, no multi-tenant admin product yet._

## Product definition

> AKU Build Workshop is the first implementation of a reusable, content-driven
> workshop platform with Presentation, Participant, and Facilitator modes. It
> combines teaching, live presentation, guided exercises, AI prompts, terminal
> commands, demonstrations, participant progress, and facilitator support in one
> coherent environment.

Positioning: _"A platform for workshops where participants don't just
learn — they build."_

## Architecture-gap analysis (current → target)

| # | Current state | Gap | Resolution |
|---|---|---|---|
| 1 | Flat routes (`/build-1`, `/agenda`, `/facilitator`) | No workshop namespace; can't host a second workshop | Dynamic segments `src/app/[clientSlug]/[workshopSlug]/{present,participate,facilitate}`; concrete URLs `/aku/digital-health-2026/...`; old flat routes become redirects |
| 2 | One experience (participant instructions) + a static `/facilitator` page | No Presentation Mode; facilitator page is not operational | Three modes rendered from one content source; new slide engine; rebuilt facilitator dashboard |
| 3 | Content in flat `src/content/*.ts`, each file tailored to one page | No separation of reusable vs client-specific; no module concept linking modes | `src/content/shared/**` (reusable concepts) + `src/content/clients/aku/digital-health-2026/**` (this workshop); a `modules` cross-link table |
| 4 | No workshop configuration object | "AKU" and nav hardcoded in components | `WorkshopConfig` type + `workshop.ts`; a `registry.ts` mapping slugs → config; components read config, not constants |
| 5 | localStorage keys `aku-os`, `aku-progress`, … | Collisions between future workshops; no schema versioning | `workshop:<client>:<workshop>:<name>` keys + a `__meta` version record + migration hook in `src/lib/workshop-storage.ts` |
| 6 | Design tokens in `globals.css` `@theme` (implicitly "AKU") | Not identified as a swappable theme | Keep AKU tokens as the default theme; `data-theme="aku-healthcare"` on the workshop root; documented path to add a second theme. No theme editor. |
| 7 | Tests cover only the signal utility | Need coverage for config, routing, presentation nav, storage namespacing/versioning | Extend the Vitest suite (pure logic + a small render smoke where cheap) |
| 8 | No resilience / print story | Portal may be the whole presentation environment | Print stylesheet + `/backup` routes: all commands, all prompts, print participant, print facilitator, print slides; documented local-run + PDF-print procedure |

## Content model (practical TypeScript, not a framework)

```
WorkshopConfig         # one per workshop — identity, theme, routes, modules, safety
  └── ClientConfig     # client identity (AKU = Aga Khan University)

WorkshopModule[]       # ordered; each links the three modes for one segment
  ├── participant?     # href into Participant Mode + step ids for progress
  ├── facilitatorId?   # -> FacilitatorSegment
  └── presentationSectionId?  # -> PresentationSection

Presentation
  └── PresentationSection[]
        └── Slide[]     # typed: title | section | statement | concept | timeline
                        #        | comparison | process | demo-intro
                        #        | exercise-launch | discussion | reflection | closing
```

Authoritative content is defined **once**:

- Commands / prompts / tests / thresholds / troubleshooting → the existing
  `build-one.ts`, `outbreak-ai.ts`, etc. (moved under the client folder).
- Reusable concepts (build cycle, AI evolution, responsible-AI principles,
  economic value, frictionless building) → `src/content/shared/**`.
- Slides reference participant steps by href/anchor; they never re-embed
  command text or full prompts.

## Target file layout

```
src/
├── app/
│   ├── page.tsx                         # platform landing (Present / Participate / Facilitate)
│   ├── layout.tsx                       # minimal root shell + metadata
│   ├── (marketing)/…                    # optional platform-level pages
│   ├── [clientSlug]/[workshopSlug]/
│   │   ├── layout.tsx                   # resolves config, WorkshopProvider, theme attr
│   │   ├── page.tsx                     # workshop hub → links to the 3 modes
│   │   ├── participate/…                # overview + before-workshop, agenda, build-1, …
│   │   ├── present/[[...slide]]/page.tsx# client Deck; deep-linkable slide ids
│   │   ├── facilitate/…                 # dashboard + per-segment operational view
│   │   └── backup/…                     # print-friendly command / prompt / notes pages
│   ├── build-1/… (etc.)                 # thin redirects to the participant routes
│   ├── robots.ts / sitemap.ts / not-found.tsx
├── components/
│   ├── (existing reusable components, made config-aware)
│   └── slides/                          # SlideFrame + one component per slide type + Deck shell
├── content/
│   ├── types.ts                         # + config / module / slide types
│   ├── registry.ts                      # slug → WorkshopConfig
│   ├── shared/
│   │   ├── build-cycle.ts  ai-evolution.ts  responsible-ai.ts
│   │   ├── economic-value.ts  frictionless-building.ts
│   └── clients/aku/digital-health-2026/
│       ├── workshop.ts  modules.ts  presentation.ts
│       ├── agenda.ts  before-workshop.ts  build-one.ts
│       ├── outbreak-ai.ts  team-challenge.ts  resources.ts  facilitator.ts
└── lib/
    ├── workshop-context.tsx             # config + state (namespaced storage)
    ├── workshop-storage.ts              # namespaced + versioned localStorage
    ├── workshop.ts                      # resolve config, build cross-mode links
    ├── outbreak-signal.ts (+ .test.ts)
    └── qr.ts                            # tiny QR (SVG) via qrcode-generator
```

## Presentation Mode requirements (V1)

Full-screen 16:9 compositions; projector typography; minimal chrome; Prev/Next
buttons; ←/→/Space/Home/End keys; Esc to exit full-screen; slide number + total;
section indicator; direct slide URLs; jump-to-section; Fullscreen API; presenter
progress persisted (namespaced key `presenter-last-slide`); reduced-motion; high
contrast; accessible controls; a keyboard-shortcut help overlay; a QR / short-URL
overlay; a "open the participant activity" action; **no facilitator notes on the
projected view**. Slide types listed above are reusable components. No slide-deck
framework dependency — a focused React implementation.

## Synchronization (V1 = links only, no network)

Exercise-launch slides link to the exact participant step; participant modules
link to a condensed concept summary; facilitator view links to both; QR codes
encode the participant URL. A documented interface boundary (`LiveSessionHook`,
unused) marks where a future live-session feature (current section, workshop
code, "go to current step", announcements, timers) would attach. Not built.

## localStorage (namespaced + versioned)

| Name (suffix)        | Purpose                          |
| -------------------- | -------------------------------- |
| `participant-progress` | `{ [checkpointId]: true }`     |
| `os`                 | `macos` \| `windows`             |
| `live-url`           | optional participant Vercel URL  |
| `last-step`          | last visited participant step    |
| `dismissed`          | dismissed notice ids             |
| `presenter-last-slide` | presenter's last slide id      |
| `__meta`             | `{ version: number }`            |

Full key: `workshop:aku:digital-health-2026:participant-progress`. On read, if
`__meta.version` is behind, a migration function runs (identity in V1). "Reset
my progress" clears every namespaced key for the active workshop after a
confirmation step. No personal or health data.

## Theme architecture

`globals.css` keeps two layers: design **behaviour** (spacing, radius, focus,
motion, typography scale) and the **AKU healthcare theme** palette (deep green,
teal, warm neutrals, amber = Watch, red = Investigate/warnings only). The
workshop root carries `data-theme="aku-healthcare"`. Adding a client theme =
add a `[data-theme="x"]` block + set `theme` in that workshop's config. No
visual theme editor.

## Administrative direction (documented only — not built)

Future Administrative Mode would: create client; create/duplicate workshop;
select + reorder modules; edit content; configure branding; control visibility;
invite facilitators; publish workshop versions; view aggregate, privacy-
conscious completion data. V1 ships **no** `/admin` with working controls and no
fake actions. Content and config are organised for future editing only.

## Backup and resilience (V1)

Print stylesheet; `/…/backup` index; `/…/backup/commands` (every Build 1
command); `/…/backup/prompts` (every prompt, verbatim); print-friendly
participant, facilitator, and slide views. Documented procedures: run the portal
locally if venue internet fails; produce a PDF via browser print. A PWA /
offline-cache option is documented as future work, not added.

## Implementation sequence — status (all done, 2026-08-28)

1. ✅ **Types + config + registry** — `WorkshopConfig`, slide/module types,
   `registry.ts`, AKU `workshop.ts`.
2. ✅ **Namespaced storage** — `workshop-storage.ts` (`workshop:<c>:<w>:<name>`,
   `__meta` version, legacy-key import); `WorkshopProvider` takes `config`.
3. ✅ **Content restructure** — `content/*.ts` moved under
   `clients/aku/digital-health-2026/`; `shared/**` extracted; `modules.ts` added.
4. ✅ **Workshop routes** — `[clientSlug]/[workshopSlug]` layout + hub; participant
   pages under `participate/`; flat-route redirects in `next.config.ts`.
5. ✅ **Participant Mode** — `ParticipantHeader`, breadcrumbs, `ContinuePanel`
   ("continue where I left off" / "go to current step"), `concepts` page,
   `RecordLastStep`.
6. ✅ **Presentation Mode** — `SlideRenderer` (12 types), `Deck` shell
   (←/→/Space/Home/End/F/G/Q/?/Esc, Fullscreen API, help overlay, section
   jumper, QR overlay, open-participant-activity, progress, SR live region),
   `presentation.ts` (7 sections, 45 slides), `deck-nav.ts` pure helpers.
7. ✅ **Facilitator Mode** — dashboard with `SessionClock` (elapsed +
   expected-segment), per-segment page with slide/participant links + QR,
   section jumper, presenter checklist, backup/recovery instructions.
8. ✅ **Backup / print** — `backup/{commands,prompts,participant,facilitator,slides}`
   + `@media print` stylesheet.
9. ✅ **Landing page** — platform framing; "Participate in the workshop" primary.
10. ✅ **Tests + docs + quality gate** — 46 Vitest tests; README, PLAN,
    CONTENT_GUIDE, `docs/architecture.md`; lint + typecheck + build green.

## Decisions taken (flagged for review, not blocking)

- **Dynamic route segments** `[clientSlug]/[workshopSlug]` with a static
  registry and `generateStaticParams`, rather than hand-coded `/aku/...` folders
  — more reusable, still fully static.
- **Old flat routes kept as redirects** (not deleted) so nothing that already
  links to `/build-1` breaks. Not deployed, so no external URLs exist yet.
- **`qrcode-generator`** (zero-dependency, ~15 kB) added for QR overlays —
  explicitly required by the brief; writing a QR encoder by hand is not
  justified.
- **Presentation deck authored from existing portal content.** Anything needing
  an institutional fact (exact workshop date, room/short URL, speaker
  credentials) is marked `draft: true` and listed in the review checklist.
  No facts, dates, stats, or branding invented.

## Draft content review checklist

- [ ] `engagement.date` / `location` / `department` / `course` — unset. Public
      pages omit them entirely; Facilitator Mode shows "<Field> requires
      confirmation". Fill in `workshop.ts` once known.
- [ ] `audience.description` — unconfirmed. Public pages show the neutral
      fallback; Facilitator Mode shows the draft. Set `audience.confirmed: true`
      once the wording is approved.
- [ ] `organization.publicRelationshipLabel` — keep "Prepared for" unless AKU confirms otherwise.
- [ ] Public short URL / QR target — currently the local/deploy route.
- [ ] Section 1 "while you build" countdown slide wording.
- [ ] Section 3 AI-evolution timeline — verify framing is acceptable.
- [ ] Slides marked `draft: true` — `welcome-7`, `ai-and-building-2` (listed on
      the facilitator dashboard).

---

# Brand architecture

_Added 2026-08-28. Supersedes any "AKU Healthcare Edition" framing. AKU is not an
"edition"; it is the host organization for the first engagement._

## Five separated concepts

| Concept | Value (current) | Stability |
|---|---|---|
| Creator | Vajih Khan (Creator and facilitator) | **stable** |
| Signature methodology | Frictionless Building + the Frictionless Build Cycle | **stable** |
| Program / product | Build Workshop — "From Idea to Working Application" | **stable** |
| Industry / domain | Healthcare & Epidemiology | configurable |
| Host organization | Aga Khan University ("AKU"), relationship label "Prepared for" | configurable |
| Participants | "AKU researchers, clinicians, data scientists, faculty, and students" — **provisional, `confirmed: false`** | configurable |
| Engagement | AKU Build Workshop 2026 | configurable |

The industry is never part of the creator or product name. The reusable pieces —
Vajih Khan, Frictionless Building, Build Workshop, the Frictionless Build Cycle,
the core teaching principles, and the platform — do not change per engagement.

## Config model (`WorkshopConfig` in `src/content/types.ts`)

Nested, typed fields: `creator`, `methodology` (`{ name, buildCycleName, buildCycle }`),
`program` (`{ name, tagline }`), `industry` (`{ name, focusAreas? }`),
`organization` (`{ name, shortName, publicRelationshipLabel }`),
`audience` (`{ label, description, confirmed }`),
`engagement` (`{ name, year, date?, location?, department?, course? }`),
plus routing (`clientSlug`, `slug`) and platform mechanics (`theme`, `visibility`,
`moduleOrder`, `safety`, `links`, `storageVersion`). `ClientConfig` and
`content/clients/aku/client.ts` were removed.

## Display-string helpers (`src/lib/workshop.ts`)

`workshopMark` → "AKU Build Workshop" · `engagementName` → "AKU Build Workshop 2026" ·
`relationshipLine` → "Prepared for Aga Khan University" ·
`creatorAttribution` → "Designed and facilitated by Vajih Khan" ·
`engagementWhen` → the date or "2026 — date to be confirmed". No component
hardcodes an organization, industry, or engagement name.

## Public title treatment

- **Platform landing (`/`):** header wordmark "Build Workshop"; hero =
  `BUILD WORKSHOP` / `Healthcare & Epidemiology` / `From Idea to Working
  Application` / `Prepared for Aga Khan University · Designed and facilitated by
  Vajih Khan`.
- **Workshop hub & mode pages:** wordmark "AKU Build Workshop" (org short name +
  program — names this engagement).
- **Presentation opening slide (compact):** `AKU Build Workshop · Healthcare &
  Epidemiology` / `From Idea to Working Application` / `Prepared for Aga Khan
  University` / `Vajih Khan`.

## Reusability

Routes keep `aku` in the slug because they name this specific engagement.
Swapping `industry` + `organization` + `audience` + `engagement` in a new
`workshop.ts` yields e.g. "Build Workshop · Robotics & Industrial Automation ·
Prepared for Bahria University" with no component change.

## Public vs facilitator content (added 2026-08-28)

Internal uncertainty and configuration warnings must never appear on a public
surface (landing, hub, participant, presentation, Open Graph, public print/PDF).
Helpers in `src/lib/workshop.ts` enforce this:

| Config state | Public surface shows | Facilitator Mode shows |
|---|---|---|
| `audience.confirmed === false` | `publicAudience()` → the exact neutral fallback **"AKU workshop participants in digital health research"** | the amber "Review needed" notice + the precise unconfirmed `audience.description` |
| `engagement.date` unset | nothing — the field is omitted (`publicDate()` → `null`); never "date to be confirmed" | `facilitatorField()` → "Date requires confirmation" (amber) |
| `engagement.location` / `department` / `course` unset | omitted (`publicLocation()` etc → `null`) | "<Field> requires confirmation" (amber) |
| a slide has `draft: true` | nothing — no badge on the projected deck | listed on the facilitator dashboard as "Draft slides" needing review |

Once confirmed, set `audience.confirmed: true` and fill `engagement.date` etc —
public surfaces then show the precise values automatically. The words "pending
confirmation", "requires confirmation", "review needed", "provisional", and
"review before delivery" appear only in facilitator files. A source-scan test
(`src/content/public-content.test.ts`) fails the build if any of them, or a
direct read of `audience.description` / `engagement.date`, reaches a public file.

Preserved on public surfaces regardless of confirmation state: `Prepared for Aga
Khan University`, `Healthcare & Epidemiology`, `Build Workshop`, `From Idea to
Working Application`, `Designed and facilitated by Vajih Khan`, `Frictionless
Building`.

---

# Build 1 — geospatial enhancement

_Added 2026-08-28. Build 1's "AKU Outbreak Signal" app now includes a simple
interactive Karachi map. Portal content only — the portal does not build the
student app. Preserves all platform functionality and branding._

## What changed in the student exercise

- **Prompt 1** now specifies a Leaflet + OpenStreetMap map alongside the
  calculator: five predefined Karachi locations (dropdown, replacing free text),
  approximate **classroom-only** coordinates in one `const locations` object,
  city-level initial view, a neutral marker, a green/amber/red legend, a
  "Synthetic classroom data" label, visible `© OpenStreetMap contributors`
  attribution, coloured `circleMarker` after analysis, a popup with the full
  result in words, a two-column laptop layout that stacks on phones
  (`invalidateSize()`), and a **network-failure fallback** — the calculator must
  keep working with no map. Explicit prohibitions: no framework, DB, geocoding,
  location permission, Mapbox, Google Maps, API key, or surveillance API; no
  real case / patient / epidemiological data.
- **Prompt 2** ("Recent checks") becomes a **geospatial history**: five recent
  checks as coloured markers on the same map, list↔marker focus, "Clear
  history" removes markers + list + storage, one map instance only. Idea made
  visible: _one signal → multiple geospatial signals_.
- **Prompt 3** applies explainability to the current result **and every history
  marker popup** (cases, baseline, calculation, ratio, threshold band,
  responsible interpretation), keeps the collapsible "How it works", and adds:
  _"A red marker is a prompt to verify, not proof."_ Boundary tests unchanged
  (1.4 / 1.5 / 2.0).

## Revised safety wording (authoritative)

- Disclaimer: **"Educational prototype only — not a surveillance, diagnostic, or
  clinical decision tool."** (`DISCLAIMER`, feeds `config.safety.disclaimer`).
- **"Synthetic classroom data"** (`SYNTHETIC_DATA_LABEL`).
- **"A signal is a prompt to verify the data and investigate context. It does
  not confirm an outbreak."** (`SIGNAL_NOT_OUTBREAK`).
All three must appear in the student app and are shown on the Build 1 page, the
`responsible-ai-6` slide, and the backup participant page.

## Tests / grouped checkboxes

- Step 7: four calculation cases (Karachi East / South / Korangi / Malir) +
  `MAP_TESTS` list + grouped completion checkboxes (`TEST_GROUPS`: Calculation,
  Map, Safety, Mobile) + calculation and map repair prompts.
- New `build-one.test.ts` — Prompt 1 requires Leaflet/OSM/attribution, prohibits
  real surveillance data + API key + geocoding, contains the exact threshold
  boundaries; Prompt 2 multi-marker history; Prompt 3 marker explainability;
  coordinates inside a greater-Karachi bounding box, no duplicates, single
  `const locations`; prompts are OS-independent.
- `public-content.test.ts` extended — the deck must **not** embed the full
  prompts; participant + backup pages **must** carry them; the deck keeps the
  public safety language; no public page introduces an API key or geocoding.

## Presentation

Section 1 (welcome) expanded from 6 to 10 slides: `welcome-4` launch (map
mentioned), `welcome-5` "A number becomes a place", `welcome-6` "The map
moment", `welcome-7` first-build clock (`draft: true`), `welcome-8` "Your app is
live", `welcome-9` debrief, `welcome-10` product evolution. No terminal
commands or full prompts on any slide.

## Timing

- Agenda: **Build 1 55 → 60 min**; "Additional applied examples" 10 → 5;
  downstream `start` times realign; total stays 180. `f-build1` segment 55 → 60.
- Facilitator "Recommended timing" panel (new `FacilitatorSegment.timing`):
  setup 2–3 · Copilot 4–6 · testing 3–4 · deploy 2–4 · debrief 2.

## Facilitator additions

New `FacilitatorSegment.deepDive` on `f-build1`: why the map creates a visual
payoff (+ the "red marker" framing), one-minute geospatial epidemiology, common
Leaflet failure modes and fixes, and the no-internet fallback plan. `f-build1`
`says` opens with: _"We have moved from a number to a place. That changes how
people understand a signal — but geography adds context, not certainty."_
Presenter checklist + backup instructions gained a map / synthetic-data line.

## Requires facilitator review

- The five approximate coordinates in `DEMO_LOCATIONS` — rough classroom
  placements, **not** administrative centroids. Sanity-check on a map before
  delivery.
- OpenStreetMap's public tile service is fine for this small classroom exercise;
  it is not a production tile provider for a large deployment. Do not prefetch or
  bulk-download tiles.
- Slide `welcome-7` (first-build clock) stays `draft: true` — venue network
  moves these numbers.

---

# Build 1 shortened to a ~20-minute core + optional Build 2

_Added 2026-08-31. Build 1's job is "look how fast" — it was ~60 min over 13
steps. It is now a **5-step, ~20-minute core** that everyone completes (empty
folder → Prompt 1 with the calculator **and** the Karachi map → test → commit →
deploy → live URL) and a new **optional `Build 2`** route for the feature
rounds._

## What changed

- **`build-one.ts`**: `BUILD_STEPS` → `BUILD_1_STEPS` (5) + `BUILD_2_STEPS` (3).
  `COMPLETION_CHECKLIST` → `BUILD_1_CHECKLIST` (compact "you're live") +
  `BUILD_2_CHECKLIST` (full journey). New `BUILD_TWO_TITLE/SUBTITLE/INTRO`.
  `ALL_COMMAND_BLOCKS` keyed by `group` ("Build 1" / "Build 2 (optional)")
  instead of stale step numbers. Every prompt/command/test export is kept.
- **New route** `participate/build-2/page.tsx` — two independent extensions
  (Prompt 2 geospatial history, Prompt 3 explainable signals), each ending in a
  commit + redeploy. Renders `PROMPT_2` / `PROMPT_3` (they left the Build 1
  page). Framed "optional · fast-finisher track · good homework".
- **`build-1/page.tsx`** rebuilt to the 5 steps; setup steps 1–4 merged into
  one, deploy steps 8–10 merged into "Commit and go live". Ends with a compact
  "Your app is live" panel (`#what-you-built` anchor kept) linking to Build 2.
- **`participant-nav.ts`**: "Build 2" after "Build 1".
- **`modules.ts`** + **`types.ts`**: `build-1` now `minutes: 20`; new
  `build-2` module with `optional: true` (new `WorkshopModule` field, rendered
  as an "Optional" chip on the participant overview); `moduleOrder` in
  `workshop.ts` gains `build-2`.
- **`agenda.ts`** (still 180, ends 3:00): Build 1 block 60 → 30; Concepts
  15 → 20; "Additional applied examples" 5 → 15 ("Applied examples and open
  build time", links Build 2); Team build sprint 40 → 55.
- **`facilitator.ts`**: `f-build1` 60 → 30 min, rewritten for the 5-step core +
  a new "Managing fast finishers — Build 2" deep-dive; `BUILD1_DEBRIEF` drops
  the explainability claim; `f-team-build` 45 → 55; `f-concepts` 15 → 20.
  Build 2 has no separate segment — it reuses `f-build1` and overlaps concepts.
- **`presentation.ts`** (welcome section): `welcome-6` body retimed; `welcome-9`
  clock retimed (stays `draft: true`); new `welcome-11b-build-2` slide
  ("Finished early? Keep building"); `welcome-12` retitled.
- **Backup**: `backup/participant` lists Build 1 (5) + Build 2 (3);
  `backup/commands` groups by build.
- **Tests** updated: `public-content` (Prompt 2/3 now on the Build 2 page),
  `build-one.test` (checklist split + a 5/3-step, ≤20-min assertion),
  `modules.test` (Build 2 is optional and follows Build 1).

---

# Team Challenge → idea-first: lock, gallery, sharpen, build

_Added 2026-08-31. Section 6 was form-teams → build → present. Teams burned the
first ~10 min of build time deciding what to make, and no idea was heard outside
its team until the final demo. Now a four-phase flow makes *Define* social._

## The flow (same 1:30–2:30 window)

1. **Lock your idea** (~8 min) — teams fill a 5-field **Idea Card** (user /
   problem / one thing / payoff / what it is NOT) and paste it onto their slide
   on a **shared Google Slides board** the facilitator opens. No prompting until
   it is on the board. (Hybrid approach: the workbook form is real and
   localStorage-backed; the *shared* board is Google for now, an in-portal live
   board is a documented fast-follow.)
2. **Idea gallery** (~8 min, the active break) — read every card, leave **one
   note** (a question or a strength) on one other team's card, 20-second pitch
   per team, facilitator names overlaps. No dots / no ranking.
3. **Sharpen** (~3 min) — three questions, update the card, lock it.
4. **Build** (~40 min, was 55) → presentations unchanged.
   Optional facilitator gut-check (2 min) between 1 and 2.

## What changed

- **`workshop-storage.ts` / `workshop-context.tsx`**: new `ideaCard`
  (`Record<string,string>`) + `setIdeaCard(patch)` merge-and-persist, mirroring
  `liveUrl`; in `RESETTABLE` so "Reset my workshop progress" clears it.
- **New `IdeaCard.tsx`** (client) — autosaving field form, "Copy your card"
  (paste-ready block), QR + link to `config.engagement.teamBoardUrl` when set,
  a `tc-idea-on-board` checkpoint when all fields are filled.
- **`types.ts` / `workshop.ts`**: `WorkshopEngagement.teamBoardUrl?` (unset;
  facilitator pastes the Google board link before the session).
- **`team-challenge.ts`**: `IDEA_CARD_FIELDS`, `IDEA_CARD_RULE`,
  `TEAM_BOARD_INTRO`, `GALLERY_STEPS`, `SHARPEN_QUESTIONS`, `SHARPEN_RULE`;
  `CHALLENGE_OBJECTIVE` rewritten; `VALUE_PROMPTS` removed (folded into field
  hints).
- **`presentation.ts`** team-challenge section: `team-challenge-2` → "Put your
  idea on the board"; `team-challenge-3` → "Idea gallery"; new
  `team-challenge-sharpen` and `team-challenge-clock`.
- **`facilitator.ts`** `f-team-build`: 55 → 60 min, four-phase `timing`,
  rewritten script, deep-dives (board setup, gut-check, running the gallery,
  fast finishers).
- **`agenda.ts`**: the two Section-6 blocks → three (10 + 10 + 40), total
  still 180.
- **`team-challenge/page.tsx`**: four anchored phases (`#idea` / `#gallery` /
  `#sharpen` / `#build`) + phase chips; `backup/participant` gets a compact
  Team Challenge section.
- **New `team-challenge.test.ts`**; 248 tests pass.

## Follow-up (same day): the idea sharing is a live LinkedIn thread

The shared "board" is now a **LinkedIn anchor post** the facilitator publishes
just before Section 6 — teams comment their Idea Card onto it, so the class
finds every idea in one thread, and the comments keep compounding after the
room clears (the real payoff of "connect with me on LinkedIn" from the
welcome). Google Slides is the fallback for anyone who won't post publicly.

- `WORKSHOP_HASHTAG = "#AKUBuildWorkshop"`; `SHARE_IDEA_TEMPLATE` +
  `KEEP_THE_LOOP_GOING`; `IdeaCard` "Copy" now emits a ready-to-post block.
- `f-team-build` deep-dive "The LinkedIn idea thread" — the anchor post, the
  ~1-week engagement commitment, consent/fallback (one post per team, personal
  profile optional).
- Agenda Section 6: 8 (write + post) / 12 (comment round + sharpen) / 40
  (build); team formation moved to the tail of the 1:15 block. Total still 180.
- Slides `team-challenge-2/-3/-clock` and `presentations-close-share` reworded
  to the thread framing.
