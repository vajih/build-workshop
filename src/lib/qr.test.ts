import { describe, expect, it } from "vitest";
import { qrSvg } from "./qr";

describe("qrSvg", () => {
  it("produces a self-contained SVG with a module path", () => {
    const svg = qrSvg("https://example.com/aku/digital-health-2026/participate");
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain("viewBox");
    expect(svg).toContain("<path");
    expect(svg).toContain("</svg>");
  });

  it("is deterministic for the same input", () => {
    const a = qrSvg("https://example.com/x");
    const b = qrSvg("https://example.com/x");
    expect(a).toBe(b);
  });

  it("differs for different input", () => {
    expect(qrSvg("https://example.com/a")).not.toBe(
      qrSvg("https://example.com/b"),
    );
  });
});
