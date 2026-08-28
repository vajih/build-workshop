import { ArrowRightCircle, MessageCircleQuestion } from "lucide-react";
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
            className="mt-3 block h-1.5 w-24 rounded-full bg-[#0d7d7d]"
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
                    className="mt-[0.55em] size-2 shrink-0 rounded-full bg-[#0d7d7d]"
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
                  className="flex size-[1.7em] shrink-0 items-center justify-center rounded-full border border-[#0d7d7d]/60 text-[0.7em] font-semibold text-[#6fd0c4]"
                >
                  {i + 1}
                </span>
                <span>
                  <span className="font-semibold text-[#f2f6f3]">
                    {item.label}
                  </span>
                  {item.detail ? (
                    <span className="text-[#b9cbc3]"> — {item.detail}</span>
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
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-[clamp(1rem,2.4vw,1.75rem)]"
              >
                <p className="slide-body font-semibold text-[#6fd0c4]">
                  {col.heading}
                </p>
                <ul className="slide-body mt-2 space-y-2 text-[0.92em]">
                  {col.points.map((p) => (
                    <li key={p} className="flex gap-2">
                      <span
                        aria-hidden
                        className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-[#0d7d7d]"
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
                    className="mt-[0.55em] size-2 shrink-0 rounded-full bg-[#0d7d7d]"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
          {participantUrl ? (
            <p className="slide-body mt-4 inline-flex items-center gap-2 rounded-full border border-[#0d7d7d]/50 bg-[#0d7d7d]/15 px-4 py-2 text-[0.85em] text-[#bfe8e2]">
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
            <p className="slide-lead max-w-[46ch] font-medium text-[#f2f6f3]">
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
