import { describe, expect, it } from "vitest";
import {
  WORKSHOPS,
  PRIMARY_WORKSHOP,
  resolveWorkshop,
  workshopParams,
} from "./registry";

describe("workshop registry", () => {
  it("registers at least the AKU engagement", () => {
    expect(WORKSHOPS.length).toBeGreaterThanOrEqual(1);
    expect(PRIMARY_WORKSHOP.config.clientSlug).toBe("aku");
    expect(PRIMARY_WORKSHOP.config.slug).toBe("digital-health-2026");
  });

  it("resolves a workshop by client + workshop slug", () => {
    const bundle = resolveWorkshop("aku", "digital-health-2026");
    expect(bundle).toBeDefined();
    expect(bundle?.config.engagement.name).toBe("AKU Build Workshop 2026");
  });

  it("keeps the brand architecture separated", () => {
    const c = PRIMARY_WORKSHOP.config;
    // stable
    expect(c.creator.name).toBe("Vajih Khan");
    expect(c.methodology.name).toBe("Frictionless Building");
    expect(c.program.name).toBe("Build Workshop");
    // configurable, kept distinct
    expect(c.industry.name).toBe("Healthcare & Epidemiology");
    expect(c.organization.name).toBe("Aga Khan University");
    expect(c.organization.shortName).toBe("AKU");
    expect(c.organization.publicRelationshipLabel).toBe("Prepared for");
    // the industry is never part of the product name
    expect(c.program.name).not.toMatch(/health|epidemi/i);
    // audience represents people, not the institution, and needs review
    expect(c.audience.description).not.toBe("AKU");
    expect(c.audience.confirmed).toBe(false);
  });

  it("returns undefined for an unknown route", () => {
    expect(resolveWorkshop("acme", "nope")).toBeUndefined();
    expect(resolveWorkshop("aku", "some-other-workshop")).toBeUndefined();
  });

  it("exposes static params for every registered workshop", () => {
    const params = workshopParams();
    expect(params).toContainEqual({
      clientSlug: "aku",
      workshopSlug: "digital-health-2026",
    });
    expect(params).toHaveLength(WORKSHOPS.length);
  });

  it("has a coherent config: moduleOrder ids all exist as modules", () => {
    const { config, modules } = PRIMARY_WORKSHOP;
    const moduleIds = new Set(modules.map((m) => m.id));
    for (const id of config.moduleOrder) {
      expect(moduleIds.has(id)).toBe(true);
    }
  });

  it("every module's facilitatorId resolves to a real segment", () => {
    const { modules, facilitatorSegments } = PRIMARY_WORKSHOP;
    const segIds = new Set(facilitatorSegments.map((s) => s.id));
    for (const m of modules) {
      if (m.facilitatorId) expect(segIds.has(m.facilitatorId)).toBe(true);
    }
  });

  it("agenda block durations sum to the declared total", () => {
    const { agenda } = PRIMARY_WORKSHOP;
    const sum = agenda.blocks.reduce((n, b) => n + b.minutes, 0);
    expect(sum).toBe(agenda.totalMinutes);
  });

  it("safety disclaimer is the exact required wording", () => {
    expect(PRIMARY_WORKSHOP.config.safety.disclaimer).toBe(
      "Educational prototype only — not a surveillance, diagnostic, or clinical decision tool.",
    );
  });
});
