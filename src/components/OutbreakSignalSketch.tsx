/**
 * A schematic sketch of the AKU Outbreak Signal app after "Analyze signal" —
 * shown in Build 1 Step 3 so participants have a concrete target to check their
 * result against. It is deliberately a wireframe, not a screenshot: Copilot's
 * layout, colours, spacing, and fonts will differ from team to team. What must
 * match is called out in the caption.
 *
 * Light-theme only, in line with the participant workbook. Colours are keyed to
 * the design tokens so the classification colours match the rest of the portal.
 */
interface OutbreakSignalSketchProps {
  /** Authoritative "Synthetic classroom data" label. */
  syntheticLabel: string;
  /** Authoritative educational-prototype disclaimer. */
  disclaimer: string;
}

export function OutbreakSignalSketch({
  syntheticLabel,
  disclaimer,
}: OutbreakSignalSketchProps) {
  return (
    <figure className="my-4">
      <div className="overflow-x-auto rounded-[var(--radius-card)] border border-border-strong bg-surface p-3">
        <svg
          viewBox="0 0 480 300"
          role="img"
          aria-labelledby="sketch-title sketch-desc"
          className="mx-auto block h-auto w-full max-w-[30rem]"
        >
          <title id="sketch-title">
            Sketch of the AKU Outbreak Signal app after analysing a signal
          </title>
          <desc id="sketch-desc">
            A form on the left with a location dropdown, a cases field showing
            40, a baseline field showing 20, an Analyze signal button, and a red
            INVESTIGATE 2.0 times result. A map on the right shows five location
            markers with one enlarged and red, a green, amber and red legend, and
            an OpenStreetMap attribution. A synthetic classroom data label and
            the educational prototype disclaimer run along the bottom.
          </desc>

          {/* card */}
          <rect
            x="4"
            y="4"
            width="472"
            height="292"
            rx="10"
            fill="var(--color-surface)"
            stroke="var(--color-border-strong)"
          />

          {/* header */}
          <text
            x="20"
            y="30"
            fontSize="13"
            fontWeight="700"
            fill="var(--color-ink)"
          >
            AKU Outbreak Signal
          </text>
          <rect
            x="300"
            y="16"
            width="160"
            height="18"
            rx="9"
            fill="var(--color-surface-muted)"
          />
          <text
            x="380"
            y="29"
            fontSize="9"
            textAnchor="middle"
            fill="var(--color-ink-muted)"
          >
            {syntheticLabel}
          </text>
          <line
            x1="4"
            y1="46"
            x2="476"
            y2="46"
            stroke="var(--color-border)"
          />

          {/* ---- left: the form + result ---- */}
          <g fill="var(--color-ink-muted)" fontSize="9">
            <text x="20" y="66">Location</text>
            <text x="20" y="104">Cases this week</text>
            <text x="120" y="104">Baseline</text>
          </g>
          <g fill="none" stroke="var(--color-border-strong)">
            <rect x="20" y="72" width="180" height="18" rx="4" />
            <rect x="20" y="110" width="80" height="18" rx="4" />
            <rect x="120" y="110" width="80" height="18" rx="4" />
          </g>
          <text x="28" y="85" fontSize="9" fill="var(--color-ink)">
            Karachi East ▾
          </text>
          <text x="30" y="123" fontSize="9" fill="var(--color-ink)">40</text>
          <text x="130" y="123" fontSize="9" fill="var(--color-ink)">20</text>

          <rect
            x="20"
            y="142"
            width="110"
            height="22"
            rx="4"
            fill="var(--color-primary)"
          />
          <text
            x="75"
            y="156"
            fontSize="9"
            fontWeight="600"
            textAnchor="middle"
            fill="#fff"
          >
            Analyze signal
          </text>

          {/* result chip */}
          <rect
            x="20"
            y="180"
            width="180"
            height="34"
            rx="5"
            fill="var(--color-investigate-soft)"
            stroke="var(--color-investigate)"
          />
          <rect
            x="20"
            y="180"
            width="6"
            height="34"
            rx="0"
            fill="var(--color-investigate)"
          />
          <text
            x="36"
            y="196"
            fontSize="11"
            fontWeight="700"
            fill="var(--color-investigate)"
          >
            INVESTIGATE
          </text>
          <text x="36" y="208" fontSize="9" fill="var(--color-ink-muted)">
            ratio 2.0× · notify the outbreak team
          </text>

          {/* ---- right: the map ---- */}
          <rect
            x="216"
            y="58"
            width="244"
            height="150"
            rx="6"
            fill="#e9eef2"
            stroke="var(--color-border-strong)"
          />
          <g stroke="#d3dde4" strokeWidth="1">
            <line x1="216" y1="108" x2="460" y2="108" />
            <line x1="216" y1="158" x2="460" y2="158" />
            <line x1="297" y1="58" x2="297" y2="208" />
            <line x1="378" y1="58" x2="378" y2="208" />
          </g>
          {/* other locations — neutral */}
          <g fill="#9aa8b2">
            <circle cx="262" cy="96" r="4" />
            <circle cx="410" cy="88" r="4" />
            <circle cx="300" cy="176" r="4" />
            <circle cx="388" cy="168" r="4" />
          </g>
          {/* the analysed location — red, enlarged, with a focus ring */}
          <circle
            cx="338"
            cy="128"
            r="15"
            fill="none"
            stroke="var(--color-investigate)"
            strokeWidth="1.5"
            opacity="0.5"
          />
          <circle
            cx="338"
            cy="128"
            r="8"
            fill="var(--color-investigate)"
            stroke="#fff"
            strokeWidth="1.5"
          />
          <text
            x="452"
            y="202"
            fontSize="7"
            textAnchor="end"
            fill="var(--color-ink-subtle)"
          >
            © OpenStreetMap contributors
          </text>

          {/* legend */}
          <g fontSize="9" fill="var(--color-ink-muted)">
            <circle cx="220" cy="228" r="4" fill="var(--color-stable)" />
            <text x="229" y="231">Stable</text>
            <circle cx="278" cy="228" r="4" fill="var(--color-watch)" />
            <text x="287" y="231">Watch</text>
            <circle cx="334" cy="228" r="4" fill="var(--color-investigate)" />
            <text x="343" y="231">Investigate</text>
          </g>

          {/* safety strip */}
          <line
            x1="4"
            y1="252"
            x2="476"
            y2="252"
            stroke="var(--color-border)"
          />
          <g fontSize="8" fill="var(--color-ink-subtle)">
            <text x="20" y="268">{syntheticLabel}</text>
            <text x="20" y="281">{disclaimer}</text>
          </g>
        </svg>
      </div>
      <figcaption className="mt-2 text-xs text-ink-subtle">
        A sketch of one possible result — Copilot&rsquo;s layout, colours, and
        fonts will differ. What should match: the{" "}
        <strong className="text-ink-muted">INVESTIGATE — 2.0×</strong> result, a
        coloured marker on the Karachi map, the green / amber / red legend, the
        visible OpenStreetMap attribution, and the three safety lines.
      </figcaption>
    </figure>
  );
}
