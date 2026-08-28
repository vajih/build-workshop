import { ImageResponse } from "next/og";
import { PRIMARY_WORKSHOP } from "@/content/registry";

export const alt = "Build Workshop — a workshop platform where participants build";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  const { config } = PRIMARY_WORKSHOP;
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#fbfaf7",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#0b5d3b",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontSize: 30,
              fontWeight: 700,
            }}
          >
            BW
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, fontWeight: 700, color: "#0d7d7d" }}>
              {config.program.name}
            </div>
            <div style={{ fontSize: 20, color: "#7a746a" }}>
              {config.industry.name}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#1b1a17" }}>
            {config.program.tagline}
          </div>
          <div style={{ fontSize: 30, color: "#55514a" }}>
            A platform for workshops where participants don&rsquo;t just learn —
            they build.
          </div>
        </div>

        <div style={{ fontSize: 22, color: "#7a746a" }}>
          {`${config.organization.publicRelationshipLabel} ${config.organization.name}  ·  Designed and facilitated by ${config.creator.name}`}
        </div>
      </div>
    ),
    size,
  );
}
