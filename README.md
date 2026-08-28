# Build Workshop — Integrated Workshop Platform

> **Build Workshop** is a reusable, content-driven workshop platform by
> **Vajih Khan**, built on the **Frictionless Building** methodology, with
> **Presentation**, **Participant**, and **Facilitator** modes. It combines
> teaching, live presentation, guided exercises, AI prompts, terminal commands,
> demonstrations, participant progress, and facilitator support in one coherent
> environment.

_A platform for workshops where participants don't just learn — they build._

**Current engagement:** AKU Build Workshop 2026 — Healthcare & Epidemiology,
prepared for Aga Khan University.

## Brand architecture

Five concepts are kept separate so the same platform serves any engagement:

| Concept | Value | Stable? |
|---|---|---|
| Creator | Vajih Khan | yes |
| Signature methodology | Frictionless Building (+ the Frictionless Build Cycle) | yes |
| Program / product | Build Workshop — "From Idea to Working Application" | yes |
| Industry / domain | Healthcare & Epidemiology | configurable |
| Host organization | Aga Khan University ("AKU"), label "Prepared for" | configurable |
| Participants | provisional description, `confirmed: false` | configurable |
| Engagement | AKU Build Workshop 2026 | configurable |

The industry is never part of the creator or product name. AKU is the host of
this engagement, not the owner of the platform. No partnership, endorsement, or
sponsorship is implied.

> Educational prototype only — not a surveillance, diagnostic, or clinical
> decision tool. Synthetic classroom data. The portal collects and stores no
> personal or health information.

---

## Three modes, one content source

| Mode | URL | For |
| --- | --- | --- |
| Present | `/aku/digital-health-2026/present` | The projector — full-screen slides, keyboard-controlled |
| Participate | `/aku/digital-health-2026/participate` | Each participant's laptop — the guided workbook |
| Facilitate | `/aku/digital-health-2026/facilitate` | The instructor — timing, checkpoints, recovery (`noindex`) |
| Hub | `/aku/digital-health-2026` | Picks a mode |
| Backup | `/aku/digital-health-2026/backup` | Print-friendly commands, prompts, notes, slides |

The old flat routes (`/build-1`, `/facilitator`, …) 307-redirect to their new
homes.

---

## Technology

| Area | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router), scaffolded with `create-next-app` |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 (design tokens in `globals.css`) |
| Icons | `lucide-react` |
| QR codes | `qrcode-generator` (zero-dependency, ~15 kB) |
| Tests | Vitest |
| Persistence | Browser `localStorage` only, namespaced + versioned |
| Package manager | npm |

No database, no authentication (Version 1), no analytics, no external APIs, no
tracking, no state-management library.

---

## Folder structure

```
src/
├── app/
│   ├── page.tsx                          # platform landing (Participate is primary)
│   ├── layout.tsx  not-found.tsx  robots.ts  sitemap.ts  icon.svg  opengraph-image.tsx
│   └── [clientSlug]/[workshopSlug]/
│       ├── layout.tsx                     # resolves config, WorkshopProvider, data-theme
│       ├── page.tsx                       # workshop hub
│       ├── not-found.tsx
│       ├── participate/                   # overview + before-workshop, agenda, concepts,
│       │                                  #   build-1, outbreak-ai, team-challenge, resources
│       ├── present/[[...slide]]/page.tsx  # client Deck; deep-linkable slide ids
│       ├── facilitate/                    # dashboard + per-segment operational view
│       └── backup/                        # commands, prompts, participant, facilitator, slides
├── components/
│   ├── chrome/                            # PlatformHeader/Footer, ParticipantHeader, ModeCards, Breadcrumbs
│   ├── slides/                            # SlideFrame, SlideRenderer, Deck
│   ├── facilitator/SessionClock.tsx
│   └── … (CommandBlock, PromptBlock, CopyButton, StepCard, TestCaseTable, …)
├── content/
│   ├── types.ts                          # config + module + slide types
│   ├── registry.ts                       # slug → WorkshopBundle
│   ├── journey.ts
│   ├── shared/                            # build-cycle, ai-evolution, responsible-ai,
│   │                                     #   economic-value, frictionless-building, safety
│   └── clients/aku/digital-health-2026/
│       ├── workshop.ts   # WorkshopConfig — creator / methodology / program /
│       │                 #   industry / organization / audience / engagement
│       ├── modules.ts  presentation.ts  participant-nav.ts
│       ├── agenda.ts  before-workshop.ts  build-one.ts
│       └── outbreak-ai.ts  team-challenge.ts  resources.ts  facilitator.ts
└── lib/
    ├── workshop.ts                        # URL + brand-string helpers (no hardcoded "aku")
    ├── workshop-route.ts                  # getBundle(params) for server pages
    ├── workshop-context.tsx               # WorkshopProvider / useWorkshop
    ├── workshop-storage.ts                # namespaced + versioned localStorage
    ├── deck-nav.ts                        # pure slide-navigation helpers
    ├── qr.ts                              # QR → inline SVG
    ├── outbreak-signal.ts (+ .test.ts)
    └── site.ts
```

---

## Local setup

Prerequisites: Node.js 20 or 22 LTS, npm 10+.

```bash
npm install
npm run dev            # http://localhost:3000
```

---

## Development commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest once |
| `npm run test:watch` | Vitest watch |
| `npm run build` | Production build |
| `npm start` | Serve the production build |

Full gate:

```bash
npm run lint && npm run typecheck && npm test && npm run build
```

---

## Testing

`src/**/*.test.ts`, run with Vitest:

- **`lib/outbreak-signal.test.ts`** — the signal classifier and the on-page test
  tables stay in agreement (`< 1.5` stable, `1.5–<2.0` watch, `>= 2.0`
  investigate; baseline 0 → validation error).
- **`content/…/build-one.test.ts`** — Prompt 1 requires Leaflet + OpenStreetMap +
  visible attribution, prohibits real surveillance data / an API key / geocoding,
  and contains the exact threshold boundaries; Prompt 2 is a multi-marker
  geospatial history; Prompt 3 adds marker explainability; the five demonstration
  coordinates sit inside a greater-Karachi bounding box, are not duplicated, and
  are defined once; every prompt is OS-independent.
- **`content/registry.test.ts`** — the registry resolves AKU routes, rejects
  unknown ones, `moduleOrder` ids exist, agenda sums to its total, the
  disclaimer is exact.
- **`lib/workshop.test.ts`** — URL helpers build the right paths; `publicAudience`
  falls back to the exact neutral phrase while unconfirmed; `publicDate` /
  `publicLocation` / … return `null` (omit) for unset values; `facilitatorField`
  labels unset values for review.
- **`content/public-content.test.ts`** — source-scans every public route,
  component, and the deck: no "pending/requires confirmation", "review needed",
  "provisional", "review before delivery", and no direct read of
  `audience.description` / `engagement.date` can reach a public file. Also
  asserts Facilitator Mode still carries the review warning and the exact draft
  wording.
- **`lib/workshop-storage.test.ts`** — namespaced keys, no cross-workshop
  collisions, legacy-key import, schema-version stamping, `reset()` keeps OS.
- **`content/…/presentation.test.ts`** — 7 sections in order, unique slide ids,
  every slide in a real section, direct-slide-URL resolution, invalid slide id
  handled, exercise-launch links target a real participant page.
- **`content/…/modules.test.ts`** — every cross-link (presentation section,
  facilitator segment, participant href) resolves.
- **`lib/qr.test.ts`** — QR SVG is self-contained and deterministic.

---

## Git workflow

The existing repository is preserved. Nothing is committed automatically.

Suggested loop: make a change, run the full gate, commit with a short imperative
message.

---

## Vercel deployment

Not performed yet — do this only when you are ready.

```bash
npx vercel@latest login
npx vercel@latest          # preview
npx vercel@latest --prod   # production
```

Framework preset: **Next.js** (auto-detected). No environment variables are
required. After the first deploy set `NEXT_PUBLIC_SITE_URL` to the real domain so
metadata, `robots.txt`, the sitemap, and **QR codes** use it.

### Password protection (after go-live)

Version 1 is intentionally open for development and testing. When the portal goes
live, add simple protection — the lightest option is Vercel's built-in password
protection (Project → Settings → Deployment Protection); no code change. If a
code gate is preferred later, add one shared-password check in `middleware.ts` —
no user database.

---

## Running locally at the venue (no internet)

1. On the presenter laptop: `npm install` then `npm run build && npm start` (or
   `npm run dev`).
2. Find the laptop's LAN address (e.g. `192.168.1.20`).
3. Start with `NEXT_PUBLIC_SITE_URL=http://192.168.1.20:3000 npm start` so QR
   codes resolve to the laptop.
4. Participants join the same network and open
   `http://192.168.1.20:3000/aku/digital-health-2026/participate`.
5. Projector: open `…/present` on the presenter laptop and press **F** for full
   screen.

**The Build 1 student app's map needs the internet** — Leaflet and the
OpenStreetMap tiles load over the network. Prompt 1 requires a fallback so the
calculator, classification, tests, and commits all keep working with no map; the
completion checklist marks the map and deployment separately. See the
facilitator segment `f-build1` for the no-internet plan.

## PDF backup

Open any `…/backup/*` page (or a participant/facilitator page) and use the
browser's **Print → Save as PDF**. The print stylesheet hides navigation and
expands every collapsible section. Recommended: `backup/commands`,
`backup/prompts`, `backup/participant`, `backup/facilitator`, `backup/slides`.

---

## Content-editing guide

All workshop copy is in `src/content/**`. See
[`CONTENT_GUIDE.md`](./CONTENT_GUIDE.md). Architecture notes are in
[`docs/architecture.md`](./docs/architecture.md).

### Adding a future engagement (new industry / organization / audience)

1. `src/content/clients/<org>/<engagement>/workshop.ts` — a `WorkshopConfig`.
   Keep `creator`, `methodology`, and `program` as-is; set `industry`,
   `organization`, `audience`, `engagement`, `clientSlug`, and `slug`.
   Examples: `Build Workshop · Robotics & Industrial Automation · Prepared for
   Bahria University`; `Build Workshop · AI-Enabled Engineering · Prepared for
   NUST`.
2. Add its content files (start by copying the AKU folder's shape).
3. Register a `WorkshopBundle` in `src/content/registry.ts`.
4. If its participant modules differ from AKU's, add pages under a matching
   `participate/` tree.

Only change `organization.publicRelationshipLabel` from "Prepared for" to
"Hosted by" / "Presented at" when that organization confirms it. Set
`audience.confirmed: true` only after the facilitator signs off on the wording.

### Adding a module

Add an entry to `clients/<org>/<engagement>/modules.ts` with its
`participantHref`, `facilitatorId`, and `presentationSectionId`, and list its id
in `workshop.ts` `moduleOrder`.

### Adding a slide

Add a `Slide` object to the right section in `presentation.ts`. Give it a unique,
URL-safe `id` (that id is its direct link: `…/present/<id>`). Pick an existing
`type`; if you need a new visual, add a `case` to
`components/slides/SlideRenderer.tsx`. Mark `draft: true` if it needs review.

### Adding an exercise

Add the authoritative steps/commands/prompts to the workshop's content file
(e.g. a `build-two.ts`), a participant page that renders them with `StepCard` /
`CommandBlock` / `PromptBlock`, and an `exercise-launch` slide whose
`participantHref` points at it.

### Theme customisation

Edit the `@theme` tokens in `src/app/globals.css` for the `aku-healthcare`
palette. For a second engagement theme, add a `[data-theme="<id>"]` block that
overrides the tokens
and set `theme: "<id>"` in that workshop's config.

### localStorage namespacing

Keys are `workshop:<client>:<workshop>:<name>` (see
`src/lib/workshop-storage.ts`). Bump `storageVersion` in a workshop's config and
add a `migrate()` branch when a stored shape changes.

---

## Future authentication and administrative roadmap

Documented in [`PLAN.md`](./PLAN.md) under _Integrated Workshop Platform_.
Summary: no auth and no admin product in V1; a future Administrative Mode would
manage clients, workshops, modules, content, branding, visibility, facilitators,
published versions, and aggregate privacy-conscious completion data.

---

## Accessibility notes

- Semantic landmarks, a skip link, one `<h1>` per page, visible focus rings.
- Presentation Mode: keyboard-operable controls with labels, an SR live region
  announcing the current slide, a shortcut help overlay, `prefers-reduced-motion`
  respected, high contrast, letterboxed 16:9 so nothing is clipped at 1920×1080
  or 1366×768.
- Status is never colour-only — the words STABLE / WATCH / INVESTIGATE and icons
  always accompany colour.
- Accordions use native `<details>`; tables have a stacked-card layout below
  `sm`.
- Copy buttons announce "Copied" via an accessible label change.

---

## Safety wording requirements

Three strings, shown prominently on the Build 1 page, the `responsible-ai-6`
slide, the backup participant page, and required in the student app
(`build-one.ts`: `DISCLAIMER`, `SYNTHETIC_DATA_LABEL`, `SIGNAL_NOT_OUTBREAK`):

- **"Educational prototype only — not a surveillance, diagnostic, or clinical
  decision tool."** (verbatim; feeds `config.safety.disclaimer`)
- **"Synthetic classroom data"**
- **"A signal is a prompt to verify the data and investigate context. It does
  not confirm an outbreak."**

Also:

- No tool in the portal diagnoses disease or confirms an outbreak, and none
  implies access to real surveillance data. Signal interpretation, outbreak
  investigation, and medical diagnosis are distinct and the portal says so.
- The Build 1 map uses **synthetic classroom coordinates** for five Karachi
  locations — rough visual placements, not administrative centroids. It shows
  visible `© OpenStreetMap contributors` attribution and never hides it.
- No real patient data or personal health information anywhere, including
  examples.
- No AKU logo or brand imitation. The workshop mark in `icon.svg` is original.
