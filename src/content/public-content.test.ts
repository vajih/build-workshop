import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import {
  PRESENTATION,
  SLIDES,
} from "./clients/aku/digital-health-2026/presentation";
import { PRIMARY_WORKSHOP } from "./registry";
import { publicAudience } from "@/lib/workshop";

/**
 * Guard: internal uncertainty / configuration-warning language must never reach
 * a PUBLIC surface (landing, hub, participant, presentation, Open Graph, public
 * print / PDF). It is allowed only in Facilitator Mode files.
 */

const ROOT = process.cwd();

/** Phrases that signal internal review / unconfirmed status. */
const REVIEW_LANGUAGE =
  /pending confirmation|requires confirmation|review needed|needs review|review before delivery|to be confirmed|\bprovisional\b|not yet confirmed|awaiting confirmation/i;

/** Direct config reads that would leak the unconfirmed draft or a placeholder. */
const LEAKY_CONFIG_ACCESS =
  /audience\.description|audience\.confirmed|engagement\.(date|location|department|course)|engagementWhen|facilitatorField/;

/** Files that render on public surfaces. */
const PUBLIC_GLOBS = [
  "src/app/page.tsx",
  "src/app/layout.tsx",
  "src/app/opengraph-image.tsx",
  "src/app/not-found.tsx",
  "src/app/robots.ts",
  "src/app/sitemap.ts",
  "src/app/[clientSlug]/[workshopSlug]/page.tsx",
  "src/app/[clientSlug]/[workshopSlug]/layout.tsx",
  "src/app/[clientSlug]/[workshopSlug]/not-found.tsx",
  "src/app/[clientSlug]/[workshopSlug]/participate",
  "src/app/[clientSlug]/[workshopSlug]/present",
  "src/app/[clientSlug]/[workshopSlug]/backup/page.tsx",
  "src/app/[clientSlug]/[workshopSlug]/backup/layout.tsx",
  "src/app/[clientSlug]/[workshopSlug]/backup/commands",
  "src/app/[clientSlug]/[workshopSlug]/backup/prompts",
  "src/app/[clientSlug]/[workshopSlug]/backup/participant",
  "src/app/[clientSlug]/[workshopSlug]/backup/slides",
  "src/content/clients/aku/digital-health-2026/presentation.ts",
];

/** Public component files (everything except the facilitator-only folder). */
const PUBLIC_COMPONENT_ROOT = "src/components";
const FACILITATOR_ONLY = ["src/components/facilitator"];

function walk(rel: string): string[] {
  const abs = join(ROOT, rel);
  let s;
  try {
    s = statSync(abs);
  } catch {
    return [];
  }
  if (s.isFile()) return [rel];
  return readdirSync(abs).flatMap((entry) => walk(join(rel, entry)));
}

function collectPublicFiles(): string[] {
  const fromGlobs = PUBLIC_GLOBS.flatMap(walk);
  const components = walk(PUBLIC_COMPONENT_ROOT).filter(
    (f) => !FACILITATOR_ONLY.some((dir) => f.startsWith(dir)),
  );
  return [...new Set([...fromGlobs, ...components])].filter(
    (f) => (f.endsWith(".ts") || f.endsWith(".tsx")) && !f.endsWith(".test.ts"),
  );
}

function stripComments(src: string): string {
  return src
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/(^|[^:])\/\/.*$/gm, "$1");
}

const PUBLIC_FILES = collectPublicFiles();

describe("public content contains no internal review language", () => {
  it("collected a meaningful set of public files", () => {
    expect(PUBLIC_FILES.length).toBeGreaterThan(20);
  });

  it.each(PUBLIC_FILES)("%s — no review/uncertainty phrases", (file) => {
    const code = stripComments(readFileSync(join(ROOT, file), "utf8"));
    expect(code).not.toMatch(REVIEW_LANGUAGE);
  });

  it.each(PUBLIC_FILES)("%s — no direct leaky config access", (file) => {
    const code = stripComments(readFileSync(join(ROOT, file), "utf8"));
    expect(code).not.toMatch(LEAKY_CONFIG_ACCESS);
  });
});

describe("presentation deck (public) is clean", () => {
  const slideText = SLIDES.flatMap((s) => [
    s.title,
    s.lead,
    s.kicker,
    s.note,
    s.source,
    s.callout?.stat,
    s.callout?.text,
    s.question,
    ...(s.body ?? []),
    ...(s.items?.flatMap((i) => [i.label, i.detail]) ?? []),
    ...(s.columns?.flatMap((c) => [c.heading, ...c.points]) ?? []),
    ...(s.images?.flatMap((i) => [i.alt, i.caption, i.tag]) ?? []),
  ])
    .filter(Boolean)
    .join("\n");

  it("no slide text contains review/uncertainty language", () => {
    expect(slideText).not.toMatch(REVIEW_LANGUAGE);
  });

  it("no slide exposes the unconfirmed draft audience description", () => {
    expect(slideText).not.toContain(
      PRIMARY_WORKSHOP.config.audience.description,
    );
  });

  it("no slide shows a date placeholder", () => {
    expect(slideText).not.toMatch(/\b20\d\d\s*[—-]\s*date/i);
  });

  it("preserves the required identity strings somewhere in the deck", () => {
    expect(slideText).toContain("Prepared for Aga Khan University");
    expect(slideText).toContain("Healthcare & Epidemiology");
    expect(slideText).toContain("From Idea to Working Application");
    expect(slideText).toContain("Vajih Khan");
  });

  it("every section still has slides", () => {
    for (const section of PRESENTATION.sections) {
      expect(section.slides.length).toBeGreaterThan(0);
    }
  });

  it("every image-compare image has a real file under /public, and non-empty alt", () => {
    for (const s of SLIDES) {
      if (s.type !== "image-compare") continue;
      expect(s.images?.length ?? 0).toBeGreaterThan(0);
      for (const img of s.images ?? []) {
        expect(img.src).toMatch(/^\/images\/.+\.(jpe?g|png|webp|avif|svg)$/);
        expect(img.alt.trim().length).toBeGreaterThan(0);
        expect(
          existsSync(join(ROOT, "public", img.src)),
          `missing asset: public${img.src}`,
        ).toBe(true);
      }
    }
  });

  it("does NOT embed the full Copilot prompts — those live in Participant Mode", () => {
    // distinctive opening lines / structural markers of the long prompts
    expect(slideText).not.toContain("You are my pair programmer");
    expect(slideText).not.toContain("FILES TO CREATE");
    expect(slideText).not.toContain("AFTER CREATING THE FILES");
    expect(slideText).not.toContain("tile.openstreetmap.org");
    expect(slideText).not.toMatch(/const locations = \{/);
    // and the deck source must not even import the prompt bodies
    const deckSrc = readFileSync(
      join(ROOT, "src/content/clients/aku/digital-health-2026/presentation.ts"),
      "utf8",
    );
    expect(deckSrc).not.toMatch(/\bPROMPT_1\b/);
    expect(deckSrc).not.toMatch(/\bPROMPT_2\b/);
    expect(deckSrc).not.toMatch(/\bPROMPT_3\b/);
  });

  it("keeps the public safety language present in the deck", () => {
    expect(slideText).toContain(
      "Educational prototype only — not a surveillance, diagnostic, or clinical decision tool.",
    );
    expect(slideText).toContain("Synthetic classroom data");
  });
});

describe("participant & backup pages carry the authoritative prompts", () => {
  const buildOnePage = readFileSync(
    join(
      ROOT,
      "src/app/[clientSlug]/[workshopSlug]/participate/build-1/page.tsx",
    ),
    "utf8",
  );
  const backupPrompts = readFileSync(
    join(ROOT, "src/app/[clientSlug]/[workshopSlug]/backup/prompts/page.tsx"),
    "utf8",
  );

  it("the participant Build 1 page renders PROMPT_1 / PROMPT_2 / PROMPT_3", () => {
    for (const p of ["PROMPT_1", "PROMPT_2", "PROMPT_3"]) {
      expect(buildOnePage).toContain(p);
    }
    expect(buildOnePage).toMatch(/<PromptBlock[\s\S]*?text=\{PROMPT_1\}/);
  });

  it("the backup prompts page renders every authoritative prompt", () => {
    expect(backupPrompts).toMatch(/ALL_PROMPTS/);
  });

  it("map instructions on the participant page are OS-independent", () => {
    // the map guidance must not be gated behind macOS / Windows tabs
    const mapSection = buildOnePage.slice(buildOnePage.indexOf("b1-map-internet"));
    expect(mapSection).not.toMatch(/PowerShell/);
    expect(mapSection).not.toMatch(/Command \+ Space/);
  });

  it("no page introduces an API key or geocoding requirement", () => {
    for (const file of PUBLIC_FILES) {
      const code = readFileSync(join(ROOT, file), "utf8");
      expect(code).not.toMatch(/api[_-]?key/i);
      expect(code).not.toMatch(/\bgeocod(e|ing)\b/i);
      expect(code).not.toMatch(/mapbox|maps\.googleapis/i);
    }
  });
});

describe("public fallback wiring", () => {
  it("the neutral audience fallback is defined and used by public pages", () => {
    const lib = readFileSync(join(ROOT, "src/lib/workshop.ts"), "utf8");
    expect(lib).toContain(
      "AKU workshop participants in digital health research",
    );
    for (const page of [
      "src/app/page.tsx",
      "src/app/[clientSlug]/[workshopSlug]/page.tsx",
    ]) {
      expect(readFileSync(join(ROOT, page), "utf8")).toMatch(
        /publicAudience\(/,
      );
    }
  });

  it("with the current (unconfirmed) config, the public audience is the fallback", () => {
    expect(publicAudience(PRIMARY_WORKSHOP.config)).toBe(
      "AKU workshop participants in digital health research",
    );
  });
});

describe("facilitator mode still carries the review warning", () => {
  it("the facilitator dashboard shows the amber review notice and the exact draft wording", () => {
    const page = readFileSync(
      join(
        ROOT,
        "src/app/[clientSlug]/[workshopSlug]/facilitate/page.tsx",
      ),
      "utf8",
    );
    expect(page).toMatch(/Review needed/);
    expect(page).toMatch(/audience\.description/);
    expect(page).toMatch(/DRAFT_SLIDES/);
    expect(page).toMatch(/requires confirmation|facilitatorField/);
  });
});
