import { describe, expect, it } from "vitest";
import { MODULES, moduleByFacilitatorId, moduleById } from "./modules";
import { PRESENTATION_SECTIONS } from "./presentation";
import { FACILITATOR_SEGMENTS } from "./facilitator";
import { PARTICIPANT_NAV } from "./participant-nav";

describe("module cross-links", () => {
  const sectionIds = new Set(PRESENTATION_SECTIONS.map((s) => s.id));
  const segmentIds = new Set(FACILITATOR_SEGMENTS.map((s) => s.id));
  const navHrefs = new Set(PARTICIPANT_NAV.map((n) => n.href));

  it("presentationSectionId always resolves", () => {
    for (const m of MODULES) {
      if (m.presentationSectionId) {
        expect(sectionIds.has(m.presentationSectionId)).toBe(true);
      }
    }
  });

  it("facilitatorId always resolves", () => {
    for (const m of MODULES) {
      if (m.facilitatorId) expect(segmentIds.has(m.facilitatorId)).toBe(true);
    }
  });

  it("participantHref points at a real participant page (or an anchor on one)", () => {
    for (const m of MODULES) {
      if (!m.participantHref) continue;
      const base = m.participantHref.split("#")[0];
      expect(navHrefs.has(base)).toBe(true);
    }
  });

  it("lookup helpers work both ways", () => {
    expect(moduleById("build-1")?.title).toContain("Build 1");
    expect(moduleByFacilitatorId("f-build1")?.id).toBe("build-1");
    expect(moduleById("nope")).toBeUndefined();
  });

  it("Build 2 is an optional module after Build 1", () => {
    const b2 = moduleById("build-2");
    expect(b2?.optional).toBe(true);
    expect(b2?.participantHref).toBe("/participate/build-2");
    expect(navHrefs.has("/participate/build-2")).toBe(true);
    const ids = MODULES.map((m) => m.id);
    expect(ids.indexOf("build-2")).toBe(ids.indexOf("build-1") + 1);
  });
});
