import { describe, expect, it } from "vitest";
import {
  PROMPT_1,
  PROMPT_2,
  PROMPT_3,
  REPAIR_PROMPT,
  MAP_REPAIR_PROMPT,
  ALL_PROMPTS,
  DEMO_LOCATIONS,
  MAP_CENTER,
  LOCATIONS_SNIPPET,
  DISCLAIMER,
  SYNTHETIC_DATA_LABEL,
  SIGNAL_NOT_OUTBREAK,
  OSM_ATTRIBUTION,
  BUILD_ONE_TESTS,
  BOUNDARY_TESTS,
  MAP_TESTS,
  TEST_GROUPS,
  COMPLETION_CHECKLIST,
  BUILD_ONE_TROUBLESHOOTING,
} from "./build-one";
import { classifySignal, isSignalError } from "@/lib/outbreak-signal";

/* -------------------------------------------------------------------------- */
/* Prompt 1 — the authoritative build spec                                    */
/* -------------------------------------------------------------------------- */
describe("Prompt 1 requires the map exercise", () => {
  it("names Leaflet and OpenStreetMap tiles", () => {
    expect(PROMPT_1).toMatch(/Leaflet/);
    expect(PROMPT_1).toMatch(/OpenStreetMap/);
    expect(PROMPT_1).toMatch(/tile\.openstreetmap\.org/);
  });

  it("requires visible OpenStreetMap attribution", () => {
    expect(PROMPT_1).toContain(OSM_ATTRIBUTION);
    expect(PROMPT_1).toMatch(/attribution/i);
  });

  it("requires the five predefined Karachi locations and classroom coordinates", () => {
    for (const l of DEMO_LOCATIONS) expect(PROMPT_1).toContain(l.label);
    expect(PROMPT_1).toContain("const locations");
    expect(PROMPT_1).toMatch(/classroom (placements|visualisation)/i);
    expect(PROMPT_1).toMatch(/not official administrative centroids/i);
  });

  it("requires the default location, neutral marker, coloured markers, popup, legend and fallback", () => {
    expect(PROMPT_1).toMatch(/Default: "Karachi East"/);
    expect(PROMPT_1).toMatch(/neutral \(grey\) circle marker/i);
    expect(PROMPT_1).toMatch(/circleMarker or circle/);
    expect(PROMPT_1).toMatch(/popup/i);
    expect(PROMPT_1).toMatch(/legend/i);
    expect(PROMPT_1).toMatch(/Map unavailable/);
    expect(PROMPT_1).toMatch(/invalidateSize\(\)/);
  });

  it("contains the exact threshold boundaries", () => {
    expect(PROMPT_1).toContain("ratio below 1.5");
    expect(PROMPT_1).toContain(
      "ratio from 1.5 up to but not including 2.0",
    );
    expect(PROMPT_1).toContain("ratio 2.0 or higher");
  });

  it("carries the revised safety wording", () => {
    expect(PROMPT_1).toContain(SYNTHETIC_DATA_LABEL);
    expect(PROMPT_1).toContain(DISCLAIMER);
    expect(PROMPT_1).toContain(SIGNAL_NOT_OUTBREAK);
    expect(DISCLAIMER).toMatch(/not a surveillance, diagnostic, or clinical/);
  });

  it("prohibits real surveillance / patient data", () => {
    expect(PROMPT_1).toMatch(/No real case data/i);
    expect(PROMPT_1).toMatch(/no real patient data/i);
    expect(PROMPT_1).toMatch(/no live epidemiological data/i);
    expect(PROMPT_1).toMatch(/Do not imply access to real surveillance data/i);
  });

  it("prohibits an API key, geocoding, location permission, and other providers", () => {
    expect(PROMPT_1).toMatch(/Do NOT use[^]*an API key/);
    expect(PROMPT_1).toMatch(/geocoding/);
    expect(PROMPT_1).toMatch(/geolocation|location-permission/);
    expect(PROMPT_1).toMatch(/Mapbox/);
    expect(PROMPT_1).toMatch(/Google Maps/);
    expect(PROMPT_1).toMatch(/disease-surveillance API/);
  });

  it("keeps the calculator working without the map", () => {
    expect(PROMPT_1).toMatch(
      /calculation[^]*classification[^]*keep working with no map/i,
    );
  });

  it("is OS-independent — no macOS-only or Windows-only shell syntax", () => {
    for (const p of [PROMPT_1, PROMPT_2, PROMPT_3, MAP_REPAIR_PROMPT]) {
      expect(p).not.toMatch(/\bpowershell\b/i);
      expect(p).not.toMatch(/Command \+ /);
      expect(p).not.toMatch(/Join-Path|New-Item|Set-Location/);
      expect(p).not.toMatch(/\$HOME|mkdir -p/);
    }
  });

  it("stops before deployment until the tests pass", () => {
    expect(PROMPT_1).toMatch(/Stop before deploying/i);
    expect(PROMPT_1).toMatch(/until these tests pass/i);
  });

  it("still asks for exactly five files and no build step", () => {
    for (const f of [
      "index.html",
      "styles.css",
      "app.js",
      "README.md",
      ".gitignore",
    ]) {
      expect(PROMPT_1).toContain(f);
    }
    expect(PROMPT_1).toMatch(/No build step/i);
  });
});

/* -------------------------------------------------------------------------- */
/* Prompt 2 — geospatial history                                              */
/* -------------------------------------------------------------------------- */
describe("Prompt 2 is a multi-marker geospatial history", () => {
  it("saves five checks and shows a coloured marker for each", () => {
    expect(PROMPT_2).toMatch(/five most recent/i);
    expect(PROMPT_2).toMatch(/coloured circle marker on the map for every check/i);
    expect(PROMPT_2).toMatch(
      /green for STABLE[\s\S]*amber for WATCH[\s\S]*red for INVESTIGATE/,
    );
  });

  it("links list rows and markers and has a working clear", () => {
    expect(PROMPT_2).toMatch(/Selecting a row[^]*focuses \/ pans/i);
    expect(PROMPT_2).toMatch(/Selecting a marker opens its popup/i);
    expect(PROMPT_2).toMatch(/"Clear history"[^]*removes the list[^]*markers/i);
  });

  it("forbids a second / conflicting map instance and keeps text understandable", () => {
    expect(PROMPT_2).toMatch(/Do not create a second map or duplicate \/ conflicting map instances/i);
    expect(PROMPT_2).toMatch(/understandable from the on-page text alone/i);
  });

  it("keeps the visible product-evolution idea and the safety text", () => {
    expect(PROMPT_2).toContain("one signal → multiple geospatial signals");
    expect(PROMPT_2).toContain(SYNTHETIC_DATA_LABEL);
    expect(PROMPT_2).toContain(DISCLAIMER);
  });
});

/* -------------------------------------------------------------------------- */
/* Prompt 3 — explainability for result AND markers                           */
/* -------------------------------------------------------------------------- */
describe("Prompt 3 adds explainability to markers", () => {
  it("explains the current result and every history marker popup", () => {
    expect(PROMPT_3).toMatch(
      /current result AND inside each history marker popup/i,
    );
    expect(PROMPT_3).toMatch(/the calculation \(cases ÷ baseline\)/);
    expect(PROMPT_3).toMatch(/which threshold band/i);
  });

  it("tests the exact boundaries 1.4 / 1.5 / 2.0", () => {
    expect(PROMPT_3).toMatch(/ratio 1\.4×.*STABLE/);
    expect(PROMPT_3).toMatch(/ratio 1\.5×.*WATCH/);
    expect(PROMPT_3).toMatch(/ratio 2\.0×.*INVESTIGATE/);
  });

  it("does not imply a marker confirms an outbreak", () => {
    expect(PROMPT_3).toMatch(/prompt to verify, not proof/i);
    expect(PROMPT_3).toMatch(/Do not imply that any marker confirms an outbreak/i);
    expect(PROMPT_3).toContain(SIGNAL_NOT_OUTBREAK);
  });
});

/* -------------------------------------------------------------------------- */
/* Locations + snippet                                                        */
/* -------------------------------------------------------------------------- */
describe("demonstration locations", () => {
  it("has exactly the five required Karachi locations", () => {
    expect(DEMO_LOCATIONS.map((l) => l.label)).toEqual([
      "Karachi East",
      "Karachi South",
      "Karachi Central",
      "Korangi",
      "Malir",
    ]);
  });

  it("places every point inside a greater-Karachi bounding box", () => {
    for (const l of DEMO_LOCATIONS) {
      expect(l.lat).toBeGreaterThan(24.7);
      expect(l.lat).toBeLessThan(25.1);
      expect(l.lng).toBeGreaterThan(66.9);
      expect(l.lng).toBeLessThan(67.4);
    }
    expect(MAP_CENTER.zoom).toBeGreaterThanOrEqual(10);
    expect(MAP_CENTER.zoom).toBeLessThanOrEqual(13);
  });

  it("does not duplicate coordinates across locations", () => {
    const seen = new Set(DEMO_LOCATIONS.map((l) => `${l.lat},${l.lng}`));
    expect(seen.size).toBe(DEMO_LOCATIONS.length);
  });

  it("defines the coordinates once, as a single `const locations` object", () => {
    expect(LOCATIONS_SNIPPET.match(/const locations/g)).toHaveLength(1);
    for (const l of DEMO_LOCATIONS) {
      expect(LOCATIONS_SNIPPET).toContain(`"${l.label}"`);
    }
  });
});

/* -------------------------------------------------------------------------- */
/* Test tables + groups                                                       */
/* -------------------------------------------------------------------------- */
describe("Build 1 test tables", () => {
  it("uses the four required calculation cases with the new locations", () => {
    expect(
      BUILD_ONE_TESTS.map((t) => [
        t.inputs.Location,
        t.inputs.Cases,
        t.inputs.Baseline,
      ]),
    ).toEqual([
      ["Karachi East", "20", "20"],
      ["Karachi South", "30", "20"],
      ["Korangi", "40", "20"],
      ["Malir", "40", "0"],
    ]);
  });

  it("every calculation case matches the classifier", () => {
    for (const tc of BUILD_ONE_TESTS) {
      const r = classifySignal(Number(tc.inputs.Cases), Number(tc.inputs.Baseline));
      if (tc.expected.startsWith("Validation")) {
        expect(isSignalError(r)).toBe(true);
      } else if (!isSignalError(r)) {
        expect(`${r.levelLabel} — ${r.ratioLabel}`).toBe(tc.expected);
      }
    }
  });

  it("boundary tests still hit 1.4 / 1.5 / 2.0", () => {
    for (const tc of BOUNDARY_TESTS) {
      const r = classifySignal(Number(tc.inputs.Cases), Number(tc.inputs.Baseline));
      if (!isSignalError(r)) {
        expect(r.levelLabel).toBe(tc.expected);
        expect(r.ratioLabel).toBe(tc.inputs.Ratio);
      }
    }
  });

  it("map checks mention attribution, tile failure, and no-surveillance claim", () => {
    const joined = MAP_TESTS.join("\n");
    expect(joined).toContain(OSM_ATTRIBUTION);
    expect(joined).toMatch(/tile layer is blocked/i);
    expect(joined).toMatch(/No real-surveillance/i);
  });

  it("groups completion checkboxes into Calculation / Map / Safety / Mobile with unique ids", () => {
    expect(TEST_GROUPS.map((g) => g.title)).toEqual([
      "Calculation",
      "Map",
      "Safety",
      "Mobile",
    ]);
    const ids = TEST_GROUPS.flatMap((g) => g.items.map((i) => i.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("completion checklist ids are unique and cover the map + fallback", () => {
    const ids = COMPLETION_CHECKLIST.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(ids).toContain("b1-done-map");
    expect(ids).toContain("b1-done-fallback");
  });
});

/* -------------------------------------------------------------------------- */
/* Repair prompts + troubleshooting                                           */
/* -------------------------------------------------------------------------- */
describe("repair prompts and troubleshooting", () => {
  it("ships a calculation repair prompt and a map repair prompt", () => {
    const labels = ALL_PROMPTS.map((p) => p.label);
    expect(labels).toContain("Repair prompt — calculation");
    expect(labels).toContain("Repair prompt — map");
    expect(ALL_PROMPTS.find((p) => p.text === REPAIR_PROMPT)).toBeDefined();
    expect(ALL_PROMPTS.find((p) => p.text === MAP_REPAIR_PROMPT)).toBeDefined();
  });

  it("the map repair prompt does not introduce an API key or a new provider", () => {
    expect(MAP_REPAIR_PROMPT).toMatch(
      /Do not add an API key, geocoding, or a different map provider/i,
    );
  });

  it("troubleshooting covers the map failure modes", () => {
    const problems = BUILD_ONE_TROUBLESHOOTING.map((t) => t.problem).join("\n");
    expect(problems).toMatch(/map area is blank/i);
    expect(problems).toMatch(/tiles do not load/i);
    expect(problems).toMatch(/Leaflet is not defined/);
    expect(problems).toMatch(/marker colour does not change/i);
    expect(problems).toMatch(/attribution is missing/i);
  });
});
