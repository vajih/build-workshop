# Architecture — Integrated Workshop Platform

_Concise architecture notes. The project does not use formal ADRs; this file is
the single reference for how the platform is put together and why._

## 1. Product shape

One content source, three rendering modes:

| Mode | Route | Audience | Chrome |
| --- | --- | --- | --- |
| **Present** | `/{client}/{workshop}/present[/{slideId}]` | Projected to the room | None — full-bleed deck |
| **Participate** | `/{client}/{workshop}/participate/…` | Each participant's laptop | Focused workshop nav + progress |
| **Facilitate** | `/{client}/{workshop}/facilitate[/{segmentId}]` | The instructor | Operational nav, `noindex`, notice banner |

Plus `/{client}/{workshop}` (hub) and `/{client}/{workshop}/backup/…` (print).

The first (and currently only) workshop is `aku / digital-health-2026`.

## 2. Routing

Dynamic segments `src/app/[clientSlug]/[workshopSlug]/…` resolve against a static
**registry** (`src/content/registry.ts`). `generateStaticParams` pre-renders
every route for every registered workshop, so the whole site is static HTML.

- `src/lib/workshop-route.ts` → `getBundle(params)` awaits params, resolves the
  bundle, and `notFound()`s on an unknown slug pair.
- `src/lib/workshop.ts` → pure URL helpers (`workshopBase`, `modeHref`, `rel`,
  `presentSlideHref`, `backupHref`). Nothing hardcodes `"aku"`.
- Old flat routes (`/build-1`, `/facilitator`, …) are 307 redirects in
  `next.config.ts`.

Adding a workshop:

1. `src/content/clients/<client>/<workshop>/` — `workshop.ts` (config) plus the
   content files that workshop needs.
2. Register a `WorkshopBundle` in `src/content/registry.ts`.
3. If the workshop's participant modules differ from AKU's, add its own pages
   under `participate/` (the AKU participant detail pages import AKU content
   directly — they are workshop-shaped by design).

## 3. Content model

`src/content/types.ts` defines it. Practical types, not a framework.

```
WorkshopConfig            # brand architecture, kept as separate typed fields:
  creator                 #   Vajih Khan ............................ stable
  methodology             #   Frictionless Building + build cycle .... stable
  program                 #   Build Workshop + tagline .............. stable
  industry                #   Healthcare & Epidemiology ............. configurable
  organization            #   Aga Khan University + relationship label configurable
  audience                #   the people attending (+ confirmed flag)  configurable
  engagement              #   AKU Build Workshop 2026 ............... configurable
  clientSlug / slug       #   routing (may keep "aku")
  theme / visibility / moduleOrder / safety / links / storageVersion
WorkshopModule[]          # cross-link table: participant href + facilitatorId + presentationSectionId
Presentation ── PresentationSection[] ── Slide[]   # 12 slide types
FacilitatorSegment[]
```

- **No hardcoded identity.** Components compose display strings via the helpers
  in `src/lib/workshop.ts` (`workshopMark`, `relationshipLine`,
  `creatorAttribution`, `engagementWhen`, …). The industry never appears in the
  creator or product name.
- **Authoritative once.** Commands, prompts, tests, thresholds, troubleshooting
  live in `clients/aku/digital-health-2026/build-one.ts` (and siblings).
  Reusable concepts live in `content/shared/**`. Slides **reference** participant
  steps by href — they never re-embed command text or full prompts.
- `registry.ts` assembles a `WorkshopBundle` (config + agenda + modules +
  presentation + facilitatorSegments) that every route reads from;
  `resolveWorkshop` matches on `config.clientSlug` + `config.slug`.

## 4. Presentation Mode

- `src/components/slides/SlideRenderer.tsx` — one `case` per slide type. Add a
  type here, not a bespoke slide.
- `src/components/slides/Deck.tsx` — client shell: keyboard control
  (←/→/Space/Home/End/F/G/Q/?/Esc), Fullscreen API, help overlay, section
  jumper, QR overlay, "open participant activity", progress bar, SR live region.
  Slide changes are pure client state; the URL is kept in sync with
  `history.replaceState` (instant, no route transition). `popstate` handles
  back/forward. The presenter's last slide persists via the workshop store.
- `src/lib/deck-nav.ts` — pure navigation helpers (`clampIndex`,
  `resolveStartIndex`, …), unit-tested and used by the Deck.
- Route `present/[[...slide]]/page.tsx` — optional catch-all; a slide id that
  does not exist → `notFound()`.
- No slide-deck framework. Typography scales with `clamp()` (`.slide-*` classes
  in `globals.css`); the stage is letterboxed to 16:9.

## 5. localStorage

`src/lib/workshop-storage.ts`. Keys are
`workshop:<client>:<workshop>:<name>`. A `__meta` record holds the schema
version; `store.init()` runs on mount, imports legacy un-namespaced keys once,
and calls `migrate()` if the stored version is behind (identity in V1).
`store.reset()` clears everything except the OS choice.

`src/lib/workshop-context.tsx` (`WorkshopProvider` / `useWorkshop`) wires the
store to React state behind a `ready` flag so SSR and the first client render
use defaults (no hydration mismatch), then stored values swap in.

## 6. Theme

`globals.css` separates **behaviour** (spacing, radius, focus, motion,
type scale) from the **AKU healthcare palette** (`@theme` tokens: deep green,
teal, warm neutrals, amber = Watch, red = Investigate/warnings only). The
workshop root carries `data-theme="aku-healthcare"` from `config.theme`. A second
client theme = add a `[data-theme="x"]` override block and set `theme` in that
workshop's config. No theme editor.

## 7. Synchronisation (V1 = links only)

Exercise-launch slides link to the exact participant step; participant modules
link to a condensed concept summary; the facilitator view links to both; QR
codes encode the participant URL. `LiveSessionHook` in `types.ts` marks where a
future networked feature (current section, workshop code, "go to current step",
announcements, timers) would attach. Not built — no WebSockets, no forced
navigation.

## 8. Backup and resilience

`backup/` routes render every command, every prompt, the participant path, the
facilitator notes, and the deck as text — all print-optimised (`@media print`
in `globals.css` hides nav and expands `<details>`). Local-run and PDF-print
procedures are in the README. A PWA / offline-cache option is future work.

## 9. Future: Administrative Mode (not built)

Documented in `PLAN.md`. Would cover: create client, create/duplicate workshop,
select + reorder modules, edit content, configure branding, control visibility,
invite facilitators, publish versions, view aggregate privacy-conscious
completion data. V1 ships no `/admin` and no non-functional controls.
