import { describe, expect, it } from "vitest";
import {
  workshopBase,
  modeHref,
  rel,
  presentSlideHref,
  backupHref,
  workshopMark,
  engagementName,
  relationshipLine,
  creatorAttribution,
  publicAudience,
  publicDate,
  publicLocation,
  publicDepartment,
  publicCourse,
  facilitatorField,
  PUBLIC_AUDIENCE_FALLBACK,
} from "./workshop";
import { PRIMARY_WORKSHOP } from "@/content/registry";
import type { WorkshopConfig } from "@/content/types";

const { config } = PRIMARY_WORKSHOP;

describe("workshop url helpers", () => {
  it("builds the workshop base from the slugs", () => {
    expect(workshopBase(config)).toBe("/aku/digital-health-2026");
  });

  it("builds mode hrefs", () => {
    expect(modeHref(config, "present")).toBe("/aku/digital-health-2026/present");
    expect(modeHref(config, "participate")).toBe(
      "/aku/digital-health-2026/participate",
    );
    expect(modeHref(config, "facilitate")).toBe(
      "/aku/digital-health-2026/facilitate",
    );
  });

  it("resolves workshop-relative hrefs", () => {
    expect(rel(config, "/participate/build-1")).toBe(
      "/aku/digital-health-2026/participate/build-1",
    );
    expect(rel(config, "https://example.com")).toBe("https://example.com");
  });

  it("builds direct slide urls", () => {
    expect(presentSlideHref(config, "welcome-1")).toBe(
      "/aku/digital-health-2026/present/welcome-1",
    );
  });

  it("builds backup hrefs", () => {
    expect(backupHref(config)).toBe("/aku/digital-health-2026/backup");
    expect(backupHref(config, "/commands")).toBe(
      "/aku/digital-health-2026/backup/commands",
    );
  });
});

describe("brand-architecture text helpers", () => {
  it("composes display strings from the separated fields", () => {
    expect(workshopMark(config)).toBe("AKU Build Workshop");
    expect(engagementName(config)).toBe("AKU Build Workshop 2026");
    expect(relationshipLine(config)).toBe("Prepared for Aga Khan University");
    expect(creatorAttribution(config)).toBe(
      "Designed and facilitated by Vajih Khan",
    );
  });

});

describe("public vs facilitator content", () => {
  const REVIEW_LANGUAGE =
    /pending confirmation|requires confirmation|review needed|to be confirmed|provisional|needs review|not (yet )?confirmed|draft/i;

  it("public audience falls back to the exact neutral phrase when unconfirmed", () => {
    expect(config.audience.confirmed).toBe(false);
    expect(publicAudience(config)).toBe(
      "AKU workshop participants in digital health research",
    );
    expect(publicAudience(config)).toBe(PUBLIC_AUDIENCE_FALLBACK);
    // the precise draft is still available in config for Facilitator Mode
    expect(config.audience.description).toContain("clinicians");
  });

  it("the public fallback contains no review or uncertainty language", () => {
    expect(PUBLIC_AUDIENCE_FALLBACK).not.toMatch(REVIEW_LANGUAGE);
  });

  it("public audience uses the precise description once confirmed", () => {
    const confirmed = {
      ...config,
      audience: { ...config.audience, confirmed: true },
    } as WorkshopConfig;
    expect(publicAudience(confirmed)).toBe(config.audience.description);
  });

  it("public engagement facts are omitted (null) when unset — never a placeholder", () => {
    expect(publicDate(config)).toBeNull();
    expect(publicLocation(config)).toBeNull();
    expect(publicDepartment(config)).toBeNull();
    expect(publicCourse(config)).toBeNull();
  });

  it("public engagement facts pass through a real value", () => {
    const dated = {
      ...config,
      engagement: { ...config.engagement, date: "March 2026" },
    } as WorkshopConfig;
    expect(publicDate(dated)).toBe("March 2026");
  });

  it("facilitatorField labels an unset value for review (facilitator only)", () => {
    expect(facilitatorField(undefined, "Date")).toBe("Date requires confirmation");
    expect(facilitatorField("March 2026", "Date")).toBe("March 2026");
  });
});
