import Image from "next/image";
import { ArrowRightCircle, ExternalLink, MessageCircleQuestion } from "lucide-react";
import type { Slide } from "@/content/types";
import { SlideFrame } from "./SlideFrame";

/**
 * Renders one slide by type. Reusable across the deck — add a new `case` here
 * rather than hand-building slides. Content comes from `presentation.ts`.
 *
 * `participantUrl` is the absolute participant href for exercise-launch slides
 * (resolved by the Deck so this component stays pure).
 */
export function SlideRenderer({
  slide,
  participantUrl,
}: {
  slide: Slide;
  participantUrl?: string;
}) {
  if (slide.layout === "frictionless-embed") {
    return (
      <iframe
        className="frictionless-embed-frame absolute inset-0 size-full border-0"
        src={`/presentations/frictionless-building-8.html?embed=1#${slide.embedSlide ?? 1}`}
        title={slide.title ?? `Frictionless Building slide ${slide.embedSlide ?? 1}`}
        sandbox="allow-scripts allow-same-origin"
      />
    );
  }

  if (slide.layout === "blueprint-hero") {
    return <BlueprintHero slide={slide} />;
  }

  if (slide.layout === "blueprint-product") {
    return <BlueprintProduct slide={slide} />;
  }

  switch (slide.type) {
    case "title":
      return (
        <SlideFrame>
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h1 className="slide-title text-[clamp(2rem,6vw,4.5rem)]">
            {slide.title}
          </h1>
          {slide.lead ? <p className="slide-lead max-w-[42ch]">{slide.lead}</p> : null}
          {slide.note ? <p className="slide-note mt-2">{slide.note}</p> : null}
        </SlideFrame>
      );

    case "section":
      return (
        <SlideFrame>
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2 className="slide-title text-[clamp(2rem,7vw,5rem)]">
            {slide.title}
          </h2>
          <span
            aria-hidden
            className="mt-3 block h-1.5 w-24 rounded-full bg-[var(--deck-accent)]"
          />
          {slide.note ? <p className="slide-lead mt-3">{slide.note}</p> : null}
        </SlideFrame>
      );

    case "statement":
    case "closing":
      return (
        <SlideFrame>
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          {slide.title ? <h2 className="slide-title">{slide.title}</h2> : null}
          {slide.lead ? (
            <p className="slide-lead max-w-[48ch]">{slide.lead}</p>
          ) : null}
          {slide.body?.length ? (
            <ul className="slide-body mt-1 space-y-2">
              {slide.body.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
          {slide.note ? <p className="slide-note mt-3">{slide.note}</p> : null}
          {participantUrl ? (
            slide.participantCta ? (
              <a
                href={participantUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-7 grid w-full max-w-3xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 rounded-[1.4rem] border-2 border-[var(--deck-accent)] bg-[var(--deck-accent)] px-[clamp(1.25rem,2.4vw,2rem)] py-[clamp(1.1rem,2.2vw,1.75rem)] text-left text-white shadow-[0_1.25rem_3rem_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:brightness-110 focus-visible:-translate-y-1"
              >
                <span className="flex size-[clamp(3rem,5.5vw,4.5rem)] items-center justify-center rounded-full border border-white/30 bg-white/15">
                  <ArrowRightCircle
                    className="size-[clamp(1.65rem,3vw,2.5rem)]"
                    aria-hidden
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-[clamp(0.68rem,1.1vw,0.9rem)] font-semibold tracking-[0.14em] text-white/75 uppercase">
                    {slide.participantCta.eyebrow}
                  </span>
                  <strong className="mt-1 block text-[clamp(1.25rem,2.5vw,2rem)] leading-tight font-bold text-white">
                    {slide.participantCta.label}
                  </strong>
                  <span className="mt-1.5 block max-w-[56ch] text-[clamp(0.8rem,1.35vw,1.05rem)] leading-snug text-white/85">
                    {slide.participantCta.detail}
                  </span>
                </span>
                <ExternalLink
                  className="size-[clamp(1.25rem,2vw,1.75rem)] transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </a>
            ) : (
              <a
                href={participantUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="slide-body mt-5 inline-flex items-center gap-2 rounded-full border border-[var(--deck-accent)] bg-[var(--deck-accent-soft)] px-4 py-2 text-[0.85em] text-[var(--deck-ink)] transition-colors hover:bg-[var(--deck-accent)]/20"
              >
                <ArrowRightCircle className="size-[1.1em]" aria-hidden />
                Open the participant activity
                <ExternalLink className="size-[0.95em]" aria-hidden />
              </a>
            )
          ) : null}
        </SlideFrame>
      );

    case "concept":
      return (
        <SlideFrame align="start">
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2 className="slide-title">{slide.title}</h2>
          {slide.lead ? <p className="slide-lead">{slide.lead}</p> : null}
          {slide.body?.length ? (
            <ul className="slide-body mt-2 space-y-3">
              {slide.body.map((b) => (
                <li key={b} className="flex gap-3">
                  <span
                    aria-hidden
                    className="mt-[0.55em] size-2 shrink-0 rounded-full bg-[var(--deck-accent)]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {slide.note ? <p className="slide-note mt-3">{slide.note}</p> : null}
        </SlideFrame>
      );

    case "timeline":
    case "process":
    case "demo-intro":
      return (
        <SlideFrame align="start">
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2 className="slide-title">{slide.title}</h2>
          <ol className="slide-body mt-2 space-y-3">
            {slide.items?.map((item, i) => (
              <li key={item.label} className="flex gap-3">
                <span
                  aria-hidden
                  className="flex size-[1.7em] shrink-0 items-center justify-center rounded-full border border-[var(--deck-accent)] text-[0.7em] font-semibold text-[var(--deck-accent-bright)]"
                >
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold text-[var(--deck-ink)]">
                    {item.label}
                  </span>
                  {item.detail ? (
                    <span className="text-[var(--deck-muted)]"> — {item.detail}</span>
                  ) : null}
                </span>
              </li>
            ))}
          </ol>
          {slide.note ? <p className="slide-note mt-3">{slide.note}</p> : null}
        </SlideFrame>
      );

    case "comparison":
      return (
        <SlideFrame align="start">
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2 className="slide-title">{slide.title}</h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {slide.columns?.map((col) => (
              <div
                key={col.heading}
                className="rounded-2xl border border-[var(--deck-border)] bg-[var(--deck-panel)] p-[clamp(1rem,2.4vw,1.75rem)]"
              >
                <p className="slide-body font-semibold text-[var(--deck-accent-bright)]">
                  {col.heading}
                </p>
                <ul className="slide-body mt-2 space-y-2 text-[0.92em]">
                  {col.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[var(--deck-accent)]"
                      />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SlideFrame>
      );

    case "image-compare": {
      const imgs = slide.images ?? [];
      const two = imgs.length > 1;
      const callout = slide.callout;
      const imageScale = slide.imageScale ?? 1;
      const scaled = (value: number) =>
        Math.round(value * imageScale * 100) / 100;
      /* One image → a hero that fills the space left after the heading. Two
         images → a real comparison: each photo sits in its own box with a clear
         gap between them, and an optional `callout` panel stands beside them. */
      return (
        <SlideFrame>
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          {slide.title ? (
            <h2 className="shrink-0 text-[clamp(1.1rem,2.3vw,1.85rem)] leading-tight font-semibold text-balance text-[var(--deck-ink)]">
              {slide.title}
            </h2>
          ) : null}
          {slide.lead ? (
            <p className="max-w-[64ch] shrink-0 text-[clamp(0.85rem,1.4vw,1.15rem)] leading-snug text-[var(--deck-lead)]">
              {slide.lead}
            </p>
          ) : null}

          <div
            className={`flex w-full min-h-0 flex-col items-stretch gap-6 lg:flex-row ${
              two ? "shrink-0 justify-center" : "flex-1"
            }`}
          >
            <div
              className={`flex min-h-0 flex-col items-center justify-center gap-6 sm:gap-10 ${
                two ? "sm:flex-row" : "w-full flex-1"
              }`}
            >
              {imgs.map((img) => (
                <figure
                  key={img.src}
                  className={
                    two
                      ? "flex min-h-0 shrink flex-col items-center gap-2"
                      : "flex min-h-0 w-full flex-1 flex-col items-center gap-2"
                  }
                >
                  <div
                    className={
                      two
                        ? "relative h-[clamp(150px,44vh,520px)] max-w-[42vw]"
                        : "relative min-h-0 w-full flex-1"
                    }
                    style={
                      two
                        ? {
                            aspectRatio: img.aspectRatio ?? "1 / 1",
                            height: `clamp(${scaled(150)}px,${scaled(44)}vh,${scaled(520)}px)`,
                            maxWidth: `${scaled(42)}vw`,
                          }
                        : undefined
                    }
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes={two ? "42vw" : "92vw"}
                      className="rounded-xl object-contain"
                      priority
                    />
                    {img.tag ? (
                      <span className="absolute top-3 left-3 rounded-full bg-black/70 px-3 py-1 text-[0.7em] font-semibold tracking-wide text-white">
                        {img.tag}
                      </span>
                    ) : null}
                  </div>
                  {img.caption ? (
                    <figcaption className="max-w-[40ch] shrink-0 text-center text-[0.72em] text-[var(--deck-note)]">
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>

            {callout ? (
              <aside
                className={`flex shrink-0 flex-col justify-center gap-3 rounded-2xl border border-[var(--deck-highlight)] bg-[var(--deck-highlight-soft)] p-[clamp(1.25rem,2.4vw,2.25rem)] lg:self-center ${
                  imageScale > 1
                    ? "lg:w-[clamp(15rem,21vw,21rem)]"
                    : "lg:w-[clamp(16rem,25vw,23rem)]"
                }`}
              >
                {callout.stat ? (
                  <p className="text-[clamp(2.5rem,5vw,4rem)] leading-none font-bold tracking-tight text-[var(--deck-highlight)]">
                    {callout.stat}
                  </p>
                ) : null}
                <p className="text-[clamp(0.95rem,1.5vw,1.4rem)] leading-snug text-[var(--deck-ink)]">
                  {callout.text}
                </p>
              </aside>
            ) : null}
          </div>

          {!callout && slide.note ? (
            <p className="slide-note mx-auto max-w-[80ch] shrink-0 text-center">
              {slide.note}
            </p>
          ) : null}
          {slide.source ? (
            <p className="shrink-0 pb-10 text-center text-[0.62em] text-[var(--deck-source)]">
              {slide.source}
            </p>
          ) : (
            <div className="shrink-0 pb-10" aria-hidden />
          )}
        </SlideFrame>
      );
    }

    case "exercise-launch":
      return (
        <SlideFrame>
          <p className="slide-kicker">{slide.kicker ?? "Exercise"}</p>
          <h2 className="slide-title">{slide.title}</h2>
          {slide.lead ? <p className="slide-lead max-w-[46ch]">{slide.lead}</p> : null}
          {slide.body?.length ? (
            <ul className="slide-body mt-1 grid gap-x-8 gap-y-1.5 sm:grid-cols-2">
              {slide.body.map((b) => (
                <li key={b} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-[0.55em] size-2 shrink-0 rounded-full bg-[var(--deck-accent)]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {participantUrl ? (
            <p className="slide-body mt-4 inline-flex items-center gap-2 rounded-full border border-[var(--deck-accent)] bg-[var(--deck-accent-soft)] px-4 py-2 text-[0.85em] text-[var(--deck-ink)]">
              <ArrowRightCircle className="size-[1.1em]" aria-hidden />
              Open the participant workbook to follow along
            </p>
          ) : null}
        </SlideFrame>
      );

    case "discussion":
    case "reflection":
      return (
        <SlideFrame>
          <p className="slide-kicker">
            <MessageCircleQuestion
              className="mr-2 inline size-[1.1em] align-[-0.15em]"
              aria-hidden
            />
            {slide.type === "reflection" ? "Reflection" : "Discussion"}
          </p>
          {slide.title ? <h2 className="slide-title">{slide.title}</h2> : null}
          {slide.question ? (
            <p className="slide-lead max-w-[46ch] font-medium text-[var(--deck-ink)]">
              {slide.question}
            </p>
          ) : null}
          {slide.body?.length ? (
            <ul className="slide-body mt-2 space-y-2 text-[0.92em]">
              {slide.body.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : null}
        </SlideFrame>
      );

    default:
      return (
        <SlideFrame>
          <h2 className="slide-title">{slide.title ?? slide.id}</h2>
        </SlideFrame>
      );
  }
}

function BlueprintHero({ slide }: { slide: Slide }) {
  return (
    <div className="blueprint-slide blueprint-hero">
      <div className="blueprint-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h1 className="blueprint-display-title">{slide.title}</h1>
        {slide.lead ? <p className="blueprint-serif-lead">{slide.lead}</p> : null}
        {slide.body?.[0] ? (
          <p className="blueprint-spec-line">{slide.body[0]}</p>
        ) : null}
        {slide.body?.[1] ? (
          <p className="blueprint-question">{slide.body[1]}</p>
        ) : null}
        {slide.note ? <p className="slide-note">{slide.note}</p> : null}
      </div>

      <div className="blueprint-hero-diagram" aria-hidden="true">
        <svg viewBox="0 0 620 520" role="presentation">
          <path className="blueprint-diagram-faint" d="M93 133 308 56 520 140 554 342 330 461 108 364Z" />
          <path className="blueprint-diagram-line" d="M93 133 310 260 520 140M108 364 310 260 554 342M308 56 310 260 330 461" />
          <circle className="blueprint-diagram-orbit" cx="310" cy="260" r="124" />
          <circle className="blueprint-diagram-core" cx="310" cy="260" r="76" />
          <text className="blueprint-diagram-core-text" x="310" y="268" textAnchor="middle">IDEA</text>

          <g transform="translate(93 133)">
            <circle className="blueprint-diagram-node" r="35" />
            <text className="blueprint-diagram-node-text" y="5" textAnchor="middle">PROMPT</text>
          </g>
          <g transform="translate(308 56)">
            <circle className="blueprint-diagram-node" r="35" />
            <text className="blueprint-diagram-node-text" y="5" textAnchor="middle">MAKE</text>
          </g>
          <g transform="translate(520 140)">
            <circle className="blueprint-diagram-node" r="35" />
            <text className="blueprint-diagram-node-text" y="5" textAnchor="middle">TEST</text>
          </g>
          <g transform="translate(554 342)">
            <circle className="blueprint-diagram-node blueprint-diagram-node-accent" r="35" />
            <text className="blueprint-diagram-node-text blueprint-diagram-node-text-light" y="5" textAnchor="middle">LEARN</text>
          </g>
          <g transform="translate(330 461)">
            <circle className="blueprint-diagram-node" r="35" />
            <text className="blueprint-diagram-node-text" y="5" textAnchor="middle">SHIP</text>
          </g>
          <g transform="translate(108 364)">
            <circle className="blueprint-diagram-node" r="35" />
            <text className="blueprint-diagram-node-text" y="5" textAnchor="middle">REFINE</text>
          </g>

          <path className="blueprint-dimension" d="M63 89h480M63 80v18M543 80v18" />
          <text className="blueprint-dimension-text" x="303" y="80" textAnchor="middle">DISTANCE TO FIRST PROTOTYPE</text>
        </svg>
      </div>
    </div>
  );
}

function BlueprintProduct({ slide }: { slide: Slide }) {
  return (
    <div className="blueprint-slide blueprint-product">
      <div className="blueprint-product-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2 className="blueprint-display-title blueprint-display-title-product">
          {slide.title}
        </h2>
        {slide.lead ? <p className="blueprint-serif-lead">{slide.lead}</p> : null}
      </div>

      <ol className="blueprint-product-flow">
        {slide.items?.map((item, index) => (
          <li key={item.label}>
            <span className="blueprint-flow-index">0{index + 1}</span>
            <span className="blueprint-flow-copy">
              <strong>{item.label}</strong>
              {item.detail ? <span>{item.detail}</span> : null}
            </span>
          </li>
        ))}
      </ol>

      {slide.question ? (
        <p className="blueprint-product-question">{slide.question}</p>
      ) : null}
    </div>
  );
}
