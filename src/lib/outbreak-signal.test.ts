import { describe, expect, it } from "vitest";
import { classifySignal, isSignalError } from "./outbreak-signal";
import {
  BUILD_ONE_TESTS,
  BOUNDARY_TESTS,
} from "@/content/clients/aku/digital-health-2026/build-one";

describe("classifySignal", () => {
  it("classifies a stable ratio below 1.5x", () => {
    const r = classifySignal(20, 20);
    expect(isSignalError(r)).toBe(false);
    if (!isSignalError(r)) {
      expect(r.level).toBe("stable");
      expect(r.ratioLabel).toBe("1.0×");
    }
  });

  it("treats exactly 1.5x as watch (inclusive lower boundary)", () => {
    const r = classifySignal(30, 20);
    if (!isSignalError(r)) {
      expect(r.level).toBe("watch");
      expect(r.ratioLabel).toBe("1.5×");
    }
  });

  it("keeps 1.9x in watch (below the 2.0x boundary)", () => {
    const r = classifySignal(38, 20);
    if (!isSignalError(r)) expect(r.level).toBe("watch");
  });

  it("treats exactly 2.0x as investigate (inclusive)", () => {
    const r = classifySignal(40, 20);
    if (!isSignalError(r)) {
      expect(r.level).toBe("investigate");
      expect(r.ratioLabel).toBe("2.0×");
    }
  });

  it("rejects a baseline of zero with a validation error", () => {
    const r = classifySignal(40, 0);
    expect(isSignalError(r)).toBe(true);
  });

  it("rejects negative and non-finite inputs", () => {
    expect(isSignalError(classifySignal(-1, 20))).toBe(true);
    expect(isSignalError(classifySignal(Number.NaN, 20))).toBe(true);
  });

  it("rounds the ratio to one decimal place", () => {
    const r = classifySignal(25, 20); // 1.25 -> "1.3×"
    if (!isSignalError(r)) expect(r.ratioLabel).toBe("1.3×");
  });
});

describe("portal test tables stay in sync with the classifier", () => {
  it("matches every Build 1 acceptance test", () => {
    for (const tc of BUILD_ONE_TESTS) {
      const cases = Number(tc.inputs.Cases);
      const baseline = Number(tc.inputs.Baseline);
      const r = classifySignal(cases, baseline);
      if (tc.expected.startsWith("Validation")) {
        expect(isSignalError(r)).toBe(true);
      } else if (!isSignalError(r)) {
        expect(`${r.levelLabel} — ${r.ratioLabel}`).toBe(tc.expected);
      }
    }
  });

  it("matches every threshold boundary test", () => {
    for (const tc of BOUNDARY_TESTS) {
      const r = classifySignal(
        Number(tc.inputs.Cases),
        Number(tc.inputs.Baseline),
      );
      if (!isSignalError(r)) {
        expect(r.levelLabel).toBe(tc.expected);
        expect(r.ratioLabel).toBe(tc.inputs.Ratio);
      }
    }
  });
});
