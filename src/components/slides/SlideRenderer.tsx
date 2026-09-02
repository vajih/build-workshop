"use client";

import Image from "next/image";
import {
  BarChart3,
  ArrowRightCircle,
  ArrowRight,
  BrainCircuit,
  Cloud,
  Code2,
  Coffee,
  Database,
  ExternalLink,
  Headset,
  Home,
  LayoutDashboard,
  MessageCircleQuestion,
  MessageSquareText,
  PhoneIncoming,
  Play,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState, type CSSProperties } from "react";
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

  if (slide.layout === "click-video") {
    return <ClickVideoSlide slide={slide} />;
  }

  if (slide.layout === "discussion-build") {
    return <DiscussionBuildSlide slide={slide} />;
  }

  if (slide.layout === "break-timer") {
    return <BreakTimerSlide slide={slide} />;
  }

  if (slide.layout === "mobile-showcase") {
    return <MobileShowcaseSlide slide={slide} />;
  }

  if (slide.layout === "khayal-architecture") {
    return <KhayalArchitectureSlide slide={slide} />;
  }

  if (slide.layout === "build-open") {
    return <BuildOpenSlide slide={slide} />;
  }

  if (slide.layout === "dcp-opportunity") {
    return <DcpOpportunitySlide slide={slide} />;
  }

  if (slide.layout === "desktop-showcase") {
    return <DesktopShowcaseSlide slide={slide} />;
  }

  if (slide.layout === "dcp-architecture") {
    return <DcpArchitectureSlide slide={slide} />;
  }

  if (slide.layout === "human-responsibility") {
    return (
      <EditorialConceptSlide
        slide={slide}
        imageLabel="Human review / final sign-off"
      />
    );
  }

  if (slide.layout === "pair-programmer") {
    return <EditorialConceptSlide slide={slide} imageLabel="AI types / You direct" />;
  }

  if (slide.layout === "build-cycle-visual") {
    return <EditorialProcessSlide slide={slide} />;
  }

  if (slide.layout === "editorial-list") {
    return <EditorialListSlide slide={slide} />;
  }

  if (slide.layout === "outbreak-ai") {
    return <OutbreakAiSlide />;
  }

  if (slide.layout === "share-post") {
    return <SharePostSlide slide={slide} />;
  }

  if (slide.layout === "qr-join") {
    return <QrJoinSlide slide={slide} participantUrl={participantUrl} />;
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
      return <SectionSlide slide={slide} />;

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
            className={`image-compare-content flex w-full min-h-0 flex-col items-stretch gap-6 lg:flex-row ${
              two ? "shrink-0 justify-center" : "flex-1"
            }`}
          >
            <div
              className={`image-compare-images flex min-h-0 flex-col items-center justify-center gap-6 sm:gap-10 ${
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
                            height: `clamp(${scaled(150)}px,min(${scaled(44)}vh,${scaled(24.75)}vw),${scaled(520)}px)`,
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
                className={`image-compare-callout flex shrink-0 flex-col justify-center gap-3 rounded-2xl border border-[var(--deck-highlight)] bg-[var(--deck-highlight-soft)] p-[clamp(1.25rem,2.4vw,2.25rem)] lg:self-center ${
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

function SectionSlide({ slide }: { slide: Slide }) {
  const takeaways = slide.items ?? [];
  const [revealed, setRevealed] = useState(0);
  const hasBuild = takeaways.length > 0;
  const isComplete = revealed >= takeaways.length;

  function revealNext() {
    if (!hasBuild) return;
    setRevealed((current) => Math.min(current + 1, takeaways.length));
  }

  return (
    <SlideFrame>
      <div
        className={
          hasBuild
            ? "section-build-layout section-build-interactive"
            : "flex flex-col gap-[clamp(0.75rem,2vh,1.75rem)]"
        }
      >
        {hasBuild ? (
          <button
            type="button"
            className="section-build-click-target"
            onClick={revealNext}
            onKeyDown={(event) => event.stopPropagation()}
            disabled={isComplete}
            aria-label={
              isComplete
                ? "All three takeaways revealed"
                : `Reveal takeaway ${revealed + 1} of ${takeaways.length}`
            }
          />
        ) : null}

        <div className="section-build-heading">
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2 className="slide-title text-[clamp(2rem,7vw,5rem)]">
            {slide.title}
          </h2>
          <span
            aria-hidden
            className="mt-3 block h-1.5 w-24 rounded-full bg-[var(--deck-accent)]"
          />
          {slide.note ? <p className="slide-lead mt-3">{slide.note}</p> : null}
        </div>

        {hasBuild ? (
          <aside className="section-build-panel" aria-label="Three key takeaways">
            <div className="section-build-panel-header">
              <p className="section-build-label">Three things just happened</p>
              <p className="section-build-hint" aria-hidden>
                {isComplete ? "Build complete" : "Click to reveal"}
              </p>
            </div>
            <ul className="section-build-list">
              {takeaways.map((takeaway, index) => {
                const isVisible = index < revealed;
                return (
                  <li
                    key={takeaway.label}
                    className={`section-build-item ${isVisible ? "is-visible" : ""}`}
                    aria-hidden={!isVisible}
                  >
                    <span className="section-build-index" aria-hidden>
                      0{index + 1}
                    </span>
                    <span>
                      <strong>{takeaway.label}</strong>{" "}
                      {takeaway.detail ? <span>{takeaway.detail}</span> : null}
                    </span>
                  </li>
                );
              })}
            </ul>
          </aside>
        ) : null}

        <p className="sr-only" aria-live="polite">
          {revealed > 0 && takeaways[revealed - 1]
            ? `${takeaways[revealed - 1].label} ${takeaways[revealed - 1].detail ?? ""}`
            : ""}
        </p>
      </div>
    </SlideFrame>
  );
}

function ClickVideoSlide({ slide }: { slide: Slide }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const video = slide.video;

  if (!video) {
    return (
      <SlideFrame>
        <h2 className="slide-title">{slide.title}</h2>
      </SlideFrame>
    );
  }

  const watchUrl = `https://www.youtube.com/watch?v=${video.youtubeId}`;

  return (
    <div className="blueprint-slide click-video-layout">
      <div className="click-video-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2 className="blueprint-display-title click-video-title">{slide.title}</h2>
        {slide.lead ? <p className="blueprint-serif-lead">{slide.lead}</p> : null}
        {slide.note ? <p className="blueprint-question">{slide.note}</p> : null}
      </div>

      <div className="click-video-player">
        <div className="click-video-screen">
          {isPlaying ? (
            <iframe
              className="size-full border-0"
              src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          ) : (
            <button
              type="button"
              className="click-video-trigger"
              onClick={() => setIsPlaying(true)}
              onKeyDown={(event) => event.stopPropagation()}
              aria-label={`Play ${video.title}`}
            >
              {/* The external thumbnail is supplied by YouTube for this video;
                  a native image avoids adding a one-off Next image host rule. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={video.thumbnail} alt="" className="click-video-poster" />
              <span className="click-video-scrim" aria-hidden />
              <span className="click-video-play" aria-hidden>
                <Play className="size-[38%] fill-current" />
              </span>
              <span className="click-video-play-label">Click to play comparison</span>
            </button>
          )}
        </div>
        <div className="click-video-meta">
          <span>{video.title} · {video.author}</span>
          <a href={watchUrl} target="_blank" rel="noopener noreferrer">
            Open on YouTube <ExternalLink className="size-[0.9em]" aria-hidden />
          </a>
        </div>
      </div>
    </div>
  );
}

function DiscussionBuildSlide({ slide }: { slide: Slide }) {
  const takeaways = slide.items ?? [];
  const totalReveals = takeaways.length + (slide.conclusion ? 1 : 0);
  const [revealed, setRevealed] = useState(0);
  const isComplete = revealed >= totalReveals;
  const conclusionVisible = Boolean(
    slide.conclusion && revealed > takeaways.length,
  );

  function revealNext() {
    setRevealed((current) => Math.min(current + 1, totalReveals));
  }

  const latest =
    revealed > takeaways.length
      ? slide.conclusion
      : revealed > 0
        ? takeaways[revealed - 1]
        : undefined;

  return (
    <div className="blueprint-slide discussion-build-layout">
      <button
        type="button"
        className="discussion-build-click-target"
        onClick={revealNext}
        onKeyDown={(event) => event.stopPropagation()}
        disabled={isComplete}
        aria-label={
          isComplete
            ? "Discussion synthesis complete"
            : revealed < takeaways.length
              ? `Reveal learning ${revealed + 1} of ${takeaways.length}`
              : "Reveal the conclusion"
        }
      />

      <div className="discussion-build-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2 className="blueprint-display-title discussion-build-title">
          {slide.title}
        </h2>
        {slide.question ? (
          <p className="blueprint-serif-lead">{slide.question}</p>
        ) : null}
        {slide.note ? <p className="blueprint-question">{slide.note}</p> : null}
      </div>

      <aside className="discussion-build-panel" aria-label="Discussion synthesis">
        <div className="discussion-build-panel-header">
          <p>Five patterns</p>
          <span aria-hidden>{isComplete ? "Build complete" : "Click to reveal"}</span>
        </div>
        <ol className="discussion-build-list">
          {takeaways.map((takeaway, index) => {
            const isVisible = index < revealed;
            return (
              <li
                key={takeaway.label}
                className={isVisible ? "is-visible" : ""}
                aria-hidden={!isVisible}
              >
                <span className="discussion-build-index" aria-hidden>
                  0{index + 1}
                </span>
                <span>
                  <strong>{takeaway.label}</strong>{" "}
                  {takeaway.detail ? <span>{takeaway.detail}</span> : null}
                </span>
              </li>
            );
          })}
        </ol>
        {slide.conclusion ? (
          <div
            className={`discussion-build-conclusion ${conclusionVisible ? "is-visible" : ""}`}
            aria-hidden={!conclusionVisible}
          >
            <strong>{slide.conclusion.label}</strong>
            {slide.conclusion.detail ? <span>{slide.conclusion.detail}</span> : null}
          </div>
        ) : null}
      </aside>

      <p className="sr-only" aria-live="polite">
        {latest ? `${latest.label} ${latest.detail ?? ""}` : ""}
      </p>
    </div>
  );
}

function BreakTimerSlide({ slide }: { slide: Slide }) {
  const initialMinutes = slide.timerMinutes ?? 10;
  const [minutesInput, setMinutesInput] = useState(String(initialMinutes));
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(
    initialMinutes * 60,
  );
  const [endsAt, setEndsAt] = useState<number | null>(null);
  const [decision, setDecision] = useState<"break" | "continue" | null>(null);

  useEffect(() => {
    if (endsAt === null) return;

    function tick() {
      const next = Math.max(0, Math.ceil((endsAt! - Date.now()) / 1000));
      setRemainingSeconds(next);
      if (next === 0) setEndsAt(null);
    }

    tick();
    const interval = window.setInterval(tick, 250);
    return () => window.clearInterval(interval);
  }, [endsAt]);

  const isRunning = endsAt !== null;
  const hasFinished = !isRunning && remainingSeconds === 0;
  const progress = totalSeconds > 0 ? remainingSeconds / totalSeconds : 0;
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const timerStyle = {
    "--timer-progress": `${progress * 360}deg`,
  } as CSSProperties;

  function normalizedMinutes() {
    const parsed = Number(minutesInput);
    return Number.isFinite(parsed) ? Math.min(60, Math.max(1, parsed)) : 10;
  }

  function startTimer() {
    const nextMinutes = normalizedMinutes();
    const nextTotal = Math.round(nextMinutes * 60);
    setDecision("break");
    setMinutesInput(String(nextMinutes));
    setTotalSeconds(nextTotal);
    setRemainingSeconds(nextTotal);
    setEndsAt(Date.now() + nextTotal * 1000);
  }

  function resetTimer() {
    const nextMinutes = normalizedMinutes();
    const nextTotal = Math.round(nextMinutes * 60);
    setEndsAt(null);
    setMinutesInput(String(nextMinutes));
    setTotalSeconds(nextTotal);
    setRemainingSeconds(nextTotal);
  }

  function updateMinutes(value: string) {
    setMinutesInput(value);
    const parsed = Number(value);
    if (!isRunning && Number.isFinite(parsed) && parsed >= 1 && parsed <= 60) {
      const nextTotal = Math.round(parsed * 60);
      setTotalSeconds(nextTotal);
      setRemainingSeconds(nextTotal);
    }
  }

  function chooseContinue() {
    setDecision("continue");
    setEndsAt(null);
  }

  return (
    <div className="blueprint-slide break-slide-layout">
      <div className="break-slide-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2 className="blueprint-display-title break-slide-title">
          {slide.title}
        </h2>
        {slide.lead ? <p className="blueprint-serif-lead">{slide.lead}</p> : null}
        {slide.note ? <p className="break-slide-vote-note">{slide.note}</p> : null}

        <div className="break-vote" aria-label="Optional break vote">
          <button
            type="button"
            className={decision === "break" ? "is-selected" : ""}
            onClick={() => setDecision("break")}
            onKeyDown={(event) => event.stopPropagation()}
            aria-pressed={decision === "break"}
          >
            <Coffee aria-hidden />
            <span><strong>Take a breather</strong>Stretch · hydrate · reset</span>
          </button>
          <button
            type="button"
            className={decision === "continue" ? "is-selected" : ""}
            onClick={chooseContinue}
            onKeyDown={(event) => event.stopPropagation()}
            aria-pressed={decision === "continue"}
          >
            <Zap aria-hidden />
            <span><strong>Keep the flow</strong>One more chapter</span>
          </button>
        </div>

        {slide.stoicMessage ? (
          <blockquote className="break-stoic-message">
            <span>A Stoic pause</span>
            “{slide.stoicMessage}”
          </blockquote>
        ) : null}
      </div>

      <section
        className={`break-timer-panel ${decision === "continue" ? "is-continuing" : ""}`}
        aria-label="Customizable break timer"
      >
        {decision === "continue" ? (
          <div className="break-continue-state">
            <Zap aria-hidden />
            <strong>Momentum wins.</strong>
            <span>Advance when the room is ready.</span>
          </div>
        ) : (
          <>
            <div className="break-timer-header">
              <span>{decision === "break" ? "Break selected" : "If break wins"}</span>
              <span>{isRunning ? "Timer running" : hasFinished ? "Welcome back" : "Ready"}</span>
            </div>

            <div className="break-timer-ring" style={timerStyle}>
              <div>
                {hasFinished ? <Coffee className="break-timer-finished-icon" aria-hidden /> : null}
                <strong aria-live="off">
                  {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                </strong>
                <span>{hasFinished ? "Refreshed?" : isRunning ? "Breathe" : "Minutes"}</span>
              </div>
            </div>

            <div className="break-timer-controls">
              <label>
                <span>Break length</span>
                <span className="break-minutes-field">
                  <input
                    type="number"
                    min="1"
                    max="60"
                    step="1"
                    inputMode="numeric"
                    value={minutesInput}
                    onChange={(event) => updateMinutes(event.target.value)}
                    disabled={isRunning}
                    aria-label="Break length in minutes"
                  />
                  min
                </span>
              </label>
              <div>
                <button
                  type="button"
                  className="break-start-button"
                  onClick={startTimer}
                  onKeyDown={(event) => event.stopPropagation()}
                  disabled={isRunning}
                >
                  <Play aria-hidden />
                  {hasFinished ? "Start again" : "Start break"}
                </button>
                <button
                  type="button"
                  className="break-reset-button"
                  onClick={resetTimer}
                  onKeyDown={(event) => event.stopPropagation()}
                  aria-label="Reset break timer"
                >
                  <RotateCcw aria-hidden />
                </button>
              </div>
            </div>

            <p className="sr-only" aria-live="polite">
              {hasFinished
                ? "Break complete. Welcome back."
                : decision === "break"
                  ? "The class selected a break."
                  : "Waiting for the class vote."}
            </p>
          </>
        )}
      </section>
    </div>
  );
}

function MobileShowcaseSlide({ slide }: { slide: Slide }) {
  const screens = slide.mobileScreens ?? [];
  const [revealed, setRevealed] = useState(0);
  const isComplete = revealed >= screens.length;

  function revealNext() {
    setRevealed((current) => Math.min(current + 1, screens.length));
  }

  return (
    <div className="blueprint-slide mobile-showcase-layout">
      <button
        type="button"
        className="mobile-showcase-click-target"
        onClick={revealNext}
        onKeyDown={(event) => event.stopPropagation()}
        disabled={isComplete}
        aria-label={
          isComplete
            ? "All three Khayal screens revealed"
            : `Reveal Khayal screen ${revealed + 1} of ${screens.length}`
        }
      />

      <div className="mobile-showcase-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2 className="blueprint-display-title mobile-showcase-title">
          {slide.title}
        </h2>
        {slide.lead ? <p className="blueprint-serif-lead">{slide.lead}</p> : null}
        {slide.note ? <p className="blueprint-spec-line">{slide.note}</p> : null}
        <div className="mobile-showcase-actions">
          <span aria-hidden>
            {isComplete ? "Screens revealed" : `Click to reveal · ${revealed}/${screens.length}`}
          </span>
          {slide.externalCta ? (
            <a
              href={slide.externalCta.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {slide.externalCta.label}
              <ExternalLink aria-hidden />
            </a>
          ) : null}
        </div>
      </div>

      <ol className="mobile-showcase-screens" aria-label="Khayal mobile screens">
        {screens.map((screen, index) => (
          <li key={screen.label}>
            <figure>
              <div
                className={`mobile-phone mobile-phone-${index + 1} ${index < revealed ? "is-revealed" : ""}`}
              >
                <span className="mobile-phone-speaker" aria-hidden />
                <div className="mobile-phone-screen">
                  {screen.src && index < revealed ? (
                    <Image
                      src={screen.src}
                      alt={screen.alt ?? `${screen.label} screen in the Khayal app`}
                      fill
                      sizes="20vw"
                      className="mobile-real-screen object-cover object-top"
                    />
                  ) : (
                    <div className="khayal-screen-stub" aria-label={`${screen.label} screenshot placeholder`}>
                      <div className="khayal-status" aria-hidden>
                        <span>9:41</span>
                        <span>● ● ▰</span>
                      </div>
                      <div className="khayal-wordmark">KHAYAL</div>
                      <div className="khayal-stub-art" aria-hidden>
                        <span />
                        <span />
                        <span />
                      </div>
                      <div className="khayal-stub-copy">
                        <span>SCREEN 0{index + 1}</span>
                        <strong>{screen.label}</strong>
                        <i />
                        <i />
                      </div>
                      <span className="khayal-stub-action" aria-hidden>
                        Continue
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <figcaption>
                <span>0{index + 1}</span>
                <strong>{screen.label}</strong>
                <small>{screen.detail}</small>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      <p className="sr-only" aria-live="polite">
        {revealed > 0 && screens[revealed - 1]
          ? `${screens[revealed - 1].label} screen revealed.`
          : ""}
      </p>
    </div>
  );
}

const BUILD_OPEN_EMPHASIS = [
  "Share the idea before it is polished",
  "A rough prototype posted publicly",
  "The work compounds",
  "It builds a reputation for shipping",
] as const;

function BuildOpenSlide({ slide }: { slide: Slide }) {
  const visual = slide.images?.[0];

  return (
    <div className="blueprint-slide build-open-layout">
      <section className="build-open-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2>{slide.title}</h2>

        <ol className="build-open-points">
          {(slide.body ?? []).map((point, index) => {
            const emphasis = BUILD_OPEN_EMPHASIS[index];
            const remainder = emphasis && point.startsWith(emphasis)
              ? point.slice(emphasis.length)
              : point;

            return (
              <li key={point}>
                <span>0{index + 1}</span>
                <p>
                  {emphasis && point.startsWith(emphasis) ? <strong>{emphasis}</strong> : null}
                  {remainder}
                </p>
              </li>
            );
          })}
        </ol>

        {slide.note ? (
          <p className="build-open-practice">
            <Sparkles aria-hidden />
            {slide.note}
          </p>
        ) : null}
      </section>

      {visual ? (
        <figure className="build-open-visual">
          <div className="build-open-image-frame" style={{ position: "relative" }}>
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              sizes="42vw"
              className="build-open-image"
              priority
            />
            <span aria-hidden className="build-open-image-index">01 / OPEN WORK</span>
          </div>
          {visual.caption ? <figcaption>{visual.caption}</figcaption> : null}
        </figure>
      ) : null}
    </div>
  );
}

function EditorialConceptSlide({
  slide,
  imageLabel,
}: {
  slide: Slide;
  imageLabel: string;
}) {
  const visual = slide.images?.[0];

  return (
    <div className="blueprint-slide editorial-concept-layout">
      <section className="editorial-concept-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2>{slide.title}</h2>

        <ol className="editorial-concept-points">
          {(slide.body ?? []).map((point, index) => (
            <li key={point}>
              <span aria-hidden>0{index + 1}</span>
              <p>{point}</p>
            </li>
          ))}
        </ol>
      </section>

      {visual ? (
        <figure className="editorial-concept-visual">
          <div className="editorial-concept-image-frame">
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              sizes="42vw"
              className="editorial-concept-image"
              priority
            />
            <span aria-hidden className="editorial-concept-image-label">
              {imageLabel}
            </span>
          </div>
          {visual.caption ? <figcaption>{visual.caption}</figcaption> : null}
        </figure>
      ) : null}
    </div>
  );
}

function EditorialProcessSlide({ slide }: { slide: Slide }) {
  const visual = slide.images?.[0];

  return (
    <div className="blueprint-slide editorial-process-layout">
      <section className="editorial-process-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2>{slide.title}</h2>

        <ol className="editorial-process-steps">
          {(slide.items ?? []).map((item, index) => (
            <li key={item.label}>
              <span aria-hidden>0{index + 1}</span>
              <p>
                <strong>{item.label}</strong>
                {item.detail ? <small>{item.detail}</small> : null}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {visual ? (
        <figure className="editorial-concept-visual">
          <div
            className="editorial-concept-image-frame editorial-process-image-frame"
            style={{ aspectRatio: visual.aspectRatio ?? "1003 / 1568" }}
          >
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              sizes="38vw"
              className="editorial-concept-image"
              priority
            />
            <span aria-hidden className="editorial-concept-image-label">
              Continuous loop / Human led
            </span>
          </div>
          {visual.caption ? <figcaption>{visual.caption}</figcaption> : null}
        </figure>
      ) : null}
    </div>
  );
}

function EditorialListSlide({ slide }: { slide: Slide }) {
  const visual = slide.images?.[0];

  return (
    <div className="blueprint-slide editorial-list-layout">
      <section className="editorial-list-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2>{slide.title}</h2>

        <ol className="editorial-list-items">
          {(slide.items ?? []).map((item, index) => (
            <li key={item.label}>
              <span aria-hidden>0{index + 1}</span>
              <p>
                <strong>{item.label}</strong>
                {item.detail ? <small>{item.detail}</small> : null}
              </p>
            </li>
          ))}
        </ol>

        {slide.note ? <p className="editorial-list-note">{slide.note}</p> : null}
      </section>

      {visual ? (
        <figure className="editorial-concept-visual">
          <div className="editorial-concept-image-frame editorial-list-image-frame">
            <Image
              src={visual.src}
              alt={visual.alt}
              fill
              sizes="42vw"
              className="editorial-concept-image"
              priority
            />
            {visual.tag ? (
              <span aria-hidden className="editorial-concept-image-label">
                {visual.tag}
              </span>
            ) : null}
          </div>
          {visual.caption ? <figcaption>{visual.caption}</figcaption> : null}
        </figure>
      ) : null}
    </div>
  );
}

function OutbreakAiSlide() {
  return (
    <div className="blueprint-slide outbreak-ai-layout">
      <header className="oai-header">
        <p className="oai-eyebrow">
          AKU Build Workshop · On-device demo · Node KHI-07 (simulated)
        </p>
        <h2>Outbreak-AI</h2>
        <p className="oai-lede">
          A disease-surveillance assistant that runs a language model{" "}
          <b>entirely on one ESP32-S3</b> microcontroller — no cloud, no network,
          nothing stored. The chip computes the alert; the model only explains
          it.
        </p>
      </header>

      <div className="oai-grid">
        <section className="oai-col">
          <h3>What it is</h3>
          <ul className="oai-what">
            <li>
              Deterministic integer-C logic turns a positivity reading and a
              clinical signal into a{" "}
              <span className="oai-chips">
                <span className="oai-chip g">GREEN</span>
                <span className="oai-chip y">YELLOW</span>
                <span className="oai-chip r">RED</span>
              </span>{" "}
              alert. The model never decides the alert.
            </li>
            <li>
              An ~8.5M-parameter Tiny-LLM — Gemma-style Per-Layer Embeddings
              mapped onto the chip&rsquo;s SRAM/flash hierarchy — explains the
              evidence, the uncertainty, and the next investigation steps.
            </li>
            <li>
              A router, verifier and fallbacks wrap every answer: a wrong colour,
              an invented number, or any &ldquo;confirmed outbreak&rdquo; claim is
              caught and replaced before it is shown.
            </li>
          </ul>
          <dl className="oai-thresholds">
            <div>
              <dt className="g">GREEN</dt>
              <dd>below 2.5%, no clinical signal</dd>
            </div>
            <div>
              <dt className="y">YELLOW</dt>
              <dd>2.5&ndash;5.0%, or clinical below 5.0%</dd>
            </div>
            <div>
              <dt className="r">RED</dt>
              <dd>5.0% or above — investigate, never &ldquo;confirmed&rdquo;</dd>
            </div>
          </dl>
        </section>

        <section className="oai-col">
          <h3>What we&rsquo;ve achieved</h3>
          <ul className="oai-ticks">
            <li>
              <b>Runs fully offline</b> on a single ESP32-S3 — the 4-bit model is
              4.36 MB and leaves 72% of the flash partition free.
            </li>
            <li>
              <b>Verified answer quality 1.00</b> semantic (raw model 0.70);
              every safety gate passes.
            </li>
            <li>
              <b>Flash-ready firmware</b> — 258/258 host-parity checks, 27/27
              firmware tests, 22/22 INT4 golden vectors, 19/19 build gates, 16/16
              deploy preflight.
            </li>
            <li>
              <b>Compact</b> — 1.14 MB application, 55 KB static RAM.
            </li>
            <li>
              Built on the Per-Layer-Embedding architecture already proven by
              Barista-AI and Machine-AI on the same chip.
            </li>
          </ul>
          <p className="oai-note">
            Not yet on a physical board — Phase 12 stopped at preflight because
            no ESP32-S3 was connected.
          </p>
        </section>
      </div>

      <footer className="oai-demo">
        <div className="oai-creds">
          <p className="oai-creds-h">Join the demo</p>
          <dl>
            <div>
              <dt>Wi-Fi</dt>
              <dd>Outbreak-AI</dd>
            </div>
            <div>
              <dt>Password</dt>
              <dd>investigate</dd>
            </div>
            <div>
              <dt>Open</dt>
              <dd>192.168.4.1</dd>
            </div>
          </dl>
        </div>
        <ol className="oai-steps">
          <li>
            Power the board over USB — it starts its own offline Wi-Fi access
            point.
          </li>
          <li>Join the network above from a phone or laptop.</li>
          <li>
            Open the page and pick a scenario preset — or turn the potentiometer
            and press the button, if wired.
          </li>
          <li>
            Ask <i>&ldquo;Why did the alert occur?&rdquo;</i> or{" "}
            <i>&ldquo;Is this enough evidence to call an outbreak?&rdquo;</i>
          </li>
          <li>
            Every answer is labelled <b>Tiny LLM</b> or <b>Verified response</b>.
          </li>
        </ol>
      </footer>

      <p className="oai-disclaimer">
        Educational simulation for the AKU Build Workshop. Node KHI-07 is
        fictional; every positivity, baseline and clinical value is simulated and
        de-identified. Outbreak-AI is not a clinical or public-health decision
        system.
      </p>
    </div>
  );
}

function DcpOpportunitySlide({ slide }: { slide: Slide }) {
  const images = slide.images ?? [];
  const [activeImage, setActiveImage] = useState(0);
  const current = images[activeImage];

  function rotateImage() {
    setActiveImage((index) => (index + 1) % images.length);
  }

  return (
    <div className="blueprint-slide dcp-opportunity-layout">
      <section className="dcp-opportunity-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        <h2>{slide.title}</h2>
        {slide.lead ? <p className="dcp-opportunity-lead">{slide.lead}</p> : null}

        <ul className="dcp-opportunity-signals">
          {(slide.body ?? []).map((point, index) => (
            <li key={point}>
              <span>0{index + 1}</span>
              <p>{point}</p>
            </li>
          ))}
        </ul>

        {slide.note ? (
          <div className="dcp-opportunity-answer">
            <span>THE OPENING</span>
            <p>{slide.note}</p>
            <strong>
              That opportunity became Dental Connect Pro.
              <ArrowRight aria-hidden />
            </strong>
          </div>
        ) : null}
      </section>

      <section className="dcp-opportunity-evidence" aria-label="Dental industry opportunity concept views">
        {current ? (
          <button
            type="button"
            className="dcp-opportunity-visual"
            style={{ position: "relative" }}
            onClick={rotateImage}
            onKeyDown={(event) => event.stopPropagation()}
            aria-label={`Showing ${current.tag}. Click to show ${images[(activeImage + 1) % images.length]?.tag}.`}
          >
            <Image
              key={current.src}
              src={current.src}
              alt={current.alt}
              fill
              sizes="58vw"
              className="dcp-opportunity-image"
              priority
            />
            <span className="dcp-opportunity-image-tag">{current.tag}</span>
            <span className="dcp-opportunity-click-hint">
              Click image to rotate
              <RotateCcw aria-hidden />
            </span>
          </button>
        ) : null}

        <div className="dcp-opportunity-caption">
          <p>{current?.caption}</p>
          <div aria-label={`Image ${activeImage + 1} of ${images.length}`}>
            {images.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={index === activeImage ? "is-active" : ""}
                onClick={() => setActiveImage(index)}
                onKeyDown={(event) => event.stopPropagation()}
                aria-label={`Show ${image.tag}`}
                aria-current={index === activeImage ? "true" : undefined}
              />
            ))}
          </div>
        </div>

        {slide.source ? <p className="dcp-opportunity-source">{slide.source}</p> : null}
      </section>

      <p className="sr-only" aria-live="polite">
        {current ? `${current.tag}: ${current.caption}` : ""}
      </p>
    </div>
  );
}

function DesktopShowcaseSlide({ slide }: { slide: Slide }) {
  const screens = slide.desktopScreens ?? [];
  const [revealed, setRevealed] = useState(0);
  const isComplete = revealed >= screens.length;

  function revealNext() {
    setRevealed((current) => Math.min(current + 1, screens.length));
  }

  return (
    <div className="blueprint-slide desktop-showcase-layout">
      <button
        type="button"
        className="desktop-showcase-click-target"
        onClick={revealNext}
        onKeyDown={(event) => event.stopPropagation()}
        disabled={isComplete}
        aria-label={
          isComplete
            ? "All three Dental Connect Pro screens revealed"
            : `Reveal Dental Connect Pro screen ${revealed + 1} of ${screens.length}`
        }
      />

      <header className="desktop-showcase-heading">
        <div className="desktop-showcase-heading-copy">
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2>{slide.title}</h2>
          {slide.lead ? <p>{slide.lead}</p> : null}
        </div>
        <div className="desktop-showcase-meta">
          {slide.note ? <p>{slide.note}</p> : null}
          <div className="desktop-showcase-actions">
            <span aria-hidden>
              {isComplete ? "Screens revealed" : `Click to reveal · ${revealed}/${screens.length}`}
            </span>
            {slide.externalCta ? (
              <a
                href={slide.externalCta.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {slide.externalCta.label}
                <ExternalLink aria-hidden />
              </a>
            ) : null}
          </div>
        </div>
      </header>

      <ol className="desktop-showcase-screens" aria-label="Dental Connect Pro desktop surfaces">
        {screens.map((screen, index) => (
          <li key={screen.label}>
            <figure>
              <div className={`desktop-window desktop-window-${index + 1} ${index < revealed ? "is-revealed" : ""}`}>
                <div className="desktop-window-chrome" aria-hidden>
                  <span />
                  <span />
                  <span />
                  <i>{index === 0 ? "dentalconnectpro.com" : index === 1 ? "sales.dcp.app" : "practice.dcp.app"}</i>
                </div>
                <div className="desktop-window-screen">
                  {screen.src && index < revealed ? (
                    <Image
                      src={screen.src}
                      alt={screen.alt ?? `${screen.label} in Dental Connect Pro`}
                      fill
                      sizes="31vw"
                      className="desktop-real-screen object-cover object-top"
                    />
                  ) : (
                    <div className="dcp-desktop-stub" aria-label={`${screen.label} screenshot placeholder`}>
                      <aside aria-hidden>
                        <strong>DCP</strong>
                        <span />
                        <span />
                        <span />
                        <span />
                      </aside>
                      <main>
                        <header aria-hidden>
                          <div>
                            <small>Workspace 0{index + 1}</small>
                            <strong>{screen.label}</strong>
                          </div>
                          <i />
                        </header>
                        <section aria-hidden>
                          <span />
                          <span />
                          <span />
                        </section>
                        <article aria-hidden>
                          <div />
                          <div />
                          <div />
                          <div />
                          <div />
                        </article>
                      </main>
                    </div>
                  )}
                </div>
              </div>
              <figcaption>
                <span>0{index + 1}</span>
                <strong>{screen.label}</strong>
                <small>{screen.detail}</small>
              </figcaption>
            </figure>
          </li>
        ))}
      </ol>

      <p className="sr-only" aria-live="polite">
        {revealed > 0 && screens[revealed - 1]
          ? `${screens[revealed - 1].label} screen revealed.`
          : ""}
      </p>
    </div>
  );
}

type KhayalArchitectureStageProps = {
  number: string;
  eyebrow: string;
  title: string;
  icon: LucideIcon;
  items?: string[];
  pipeline?: string[];
  footer: string;
  tone?: "intelligence" | "record";
  tags?: { label: string; tone: "current" | "pilot" | "planned" }[];
};

function KhayalArchitectureStage({
  number,
  eyebrow,
  title,
  icon: Icon,
  items,
  pipeline,
  footer,
  tone,
  tags,
}: KhayalArchitectureStageProps) {
  return (
    <article className={`khayal-architecture-stage ${tone ? `is-${tone}` : ""}`}>
      <header>
        <span>{number}</span>
        <Icon aria-hidden />
      </header>
      <p className="khayal-architecture-eyebrow">{eyebrow}</p>
      <h3>{title}</h3>
      {pipeline?.length ? (
        <ol className="khayal-architecture-ai-pipeline">
          {pipeline.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ol>
      ) : (
        <ul>
          {items?.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
      {tags?.length ? (
        <div className="khayal-architecture-tags" aria-label="Capability status">
          {tags.map((tag) => (
            <span key={tag.label} className={`is-${tag.tone}`}>
              {tag.label}
            </span>
          ))}
        </div>
      ) : null}
      <p className="khayal-architecture-stage-footer">{footer}</p>
    </article>
  );
}

function KhayalArchitectureConnector() {
  return (
    <div className="khayal-architecture-connector" aria-hidden>
      <span />
      <ArrowRight />
    </div>
  );
}

function KhayalArchitectureSlide({ slide }: { slide: Slide }) {
  return (
    <div className="blueprint-slide khayal-architecture-layout">
      <header className="khayal-architecture-heading">
        <div>
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2>{slide.title}</h2>
        </div>
        {slide.lead ? <p>{slide.lead}</p> : null}
      </header>

      <div className="khayal-architecture-flow" aria-label="Khayal information flow">
        <KhayalArchitectureStage
          number="01"
          eyebrow="Care environment"
          title="What happens at home"
          icon={Home}
          items={["Parent + care circle", "Family, nurses, caregivers", "Many languages and comfort levels"]}
          tags={[{ label: "Optional · home camera", tone: "pilot" }]}
          footer="Karachi"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="02"
          eyebrow="Natural input"
          title="WhatsApp + app"
          icon={MessageSquareText}
          items={["Typed care updates", "Voice notes in a preferred language", "Medicines, symptoms and vitals"]}
          tags={[
            { label: "Pilot · device photos", tone: "pilot" },
            { label: "Planned · wearables", tone: "planned" },
          ]}
          footer="No specialized training"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="03"
          eyebrow="Khayal intelligence"
          title="Voice to insight"
          icon={BrainCircuit}
          pipeline={[
            "AI speech to text",
            "Translation + language normalization",
            "AI ingestion + validation",
            "AI summary",
          ]}
          tags={[
            {
              label: "Patient context · medicines · baselines · history",
              tone: "current",
            },
          ]}
          footer="Supports coordination — never diagnosis"
          tone="intelligence"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="04"
          eyebrow="Secure patient record"
          title="Supabase backend"
          icon={Database}
          items={["Postgres system of record", "RLS + organization scope", "Vitals, medicines and care tasks", "Evidence, summaries and history"]}
          footer="One continuously updated care picture"
          tone="record"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="05"
          eyebrow="Family experience"
          title="Clarity from anywhere"
          icon={LayoutDashboard}
          items={["Today dashboard", "What changed?", "Needs attention", "Shared care timeline"]}
          footer="Houston"
        />
      </div>

      <section className="khayal-architecture-foundation" aria-label="Cross-cutting trust foundation">
        <div className="khayal-architecture-foundation-label">
          <ShieldCheck aria-hidden />
          <span>Trust foundation</span>
        </div>
        <ul>
          <li>Privacy + consent</li>
          <li>Scoped access</li>
          <li>Audit + provenance</li>
          <li>Human review</li>
          <li>Safety boundaries</li>
          <li>Multilingual access</li>
        </ul>
      </section>

      <section className="khayal-architecture-build" aria-label="Khayal build and deployment stack">
        <div className="khayal-architecture-build-label">
          <Code2 aria-hidden />
          <span>Build + delivery</span>
        </div>
        <div className="khayal-architecture-build-flow">
          <span>
            <Sparkles aria-hidden />
            <strong>VS Code</strong>
            <small>AI pair programming</small>
          </span>
          <ArrowRight aria-hidden />
          <span>
            <Smartphone aria-hidden />
            <strong>Next.js + React</strong>
            <small>Application</small>
          </span>
          <ArrowRight aria-hidden />
          <span>
            <Cloud aria-hidden />
            <strong>Vercel</strong>
            <small>Deployment</small>
          </span>
          <ArrowRight aria-hidden />
          <span>
            <Database aria-hidden />
            <strong>Supabase</strong>
            <small>Backend + storage</small>
          </span>
        </div>
      </section>

      <footer className="khayal-architecture-footer">
        <div className="khayal-architecture-journey">
          <Users aria-hidden />
          <span>Caregiver + parent in Karachi</span>
          <ArrowRight aria-hidden />
          <strong>KHAYAL</strong>
          <ArrowRight aria-hidden />
          <span>Family in Houston</span>
        </div>
        <p>{slide.note}</p>
        <span className="khayal-architecture-runtime">Runtime: Vercel + Supabase</span>
      </footer>
    </div>
  );
}

function DcpArchitectureSlide({ slide }: { slide: Slide }) {
  return (
    <div className="blueprint-slide khayal-architecture-layout dcp-architecture-layout">
      <header className="khayal-architecture-heading">
        <div>
          {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
          <h2>{slide.title}</h2>
        </div>
        {slide.lead ? <p>{slide.lead}</p> : null}
      </header>

      <div className="khayal-architecture-flow" aria-label="Dental Connect Pro information flow">
        <KhayalArchitectureStage
          number="01"
          eyebrow="Patient demand"
          title="Every inquiry counts"
          icon={PhoneIncoming}
          items={["Calls, missed + after-hours", "Website + Google demand", "New and returning patients"]}
          footer="A delayed response is a lost opportunity"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="02"
          eyebrow="Immediate engagement"
          title="DCP responds 24/7"
          icon={Headset}
          items={["Vapi voice + web booking", "Answers routine questions", "Books, changes or routes", "Captures missed opportunities"]}
          footer="Immediate response · less front-desk load"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="03"
          eyebrow="DCP intelligence"
          title="Conversation to action"
          icon={BrainCircuit}
          pipeline={[
            "Speech recognition",
            "Intent + patient routing",
            "Availability + booking workflow",
            "Transcript + AI summary",
            "Conversion analytics",
          ]}
          tags={[{ label: "Human escalation · clinical boundary", tone: "current" }]}
          footer="Administrative support — never diagnosis"
          tone="intelligence"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="04"
          eyebrow="Practice operations"
          title="Connected systems"
          icon={Database}
          items={["Supabase records + Auth/RLS", "Kolla → Eaglesoft / OpenDental", "Vapi calls + hourly reconciliation", "Stripe subscriptions + billing"]}
          tags={[
            { label: "Optional · eligibility verification", tone: "pilot" },
            { label: "Integration-ready · more PMS", tone: "planned" },
          ]}
          footer="Practice-scoped data · auditable workflows"
          tone="record"
        />
        <KhayalArchitectureConnector />
        <KhayalArchitectureStage
          number="05"
          eyebrow="Practice experience"
          title="Measure what converts"
          icon={BarChart3}
          items={["Live calls + bookings", "Missed + recovered demand", "Follow-up + feedback", "Conversion + ROI signals"]}
          footer="More patients · appointments · revenue"
        />
      </div>

      <section className="khayal-architecture-foundation" aria-label="Dental Connect Pro trust foundation">
        <div className="khayal-architecture-foundation-label">
          <ShieldCheck aria-hidden />
          <span>Control foundation</span>
        </div>
        <ul>
          <li>Patient privacy</li>
          <li>Practice isolation</li>
          <li>Role-based access</li>
          <li>Human escalation</li>
          <li>Audit + provenance</li>
          <li>Clinical boundaries</li>
        </ul>
      </section>

      <section className="khayal-architecture-build" aria-label="Dental Connect Pro build and deployment stack">
        <div className="khayal-architecture-build-label">
          <Code2 aria-hidden />
          <span>Build + delivery</span>
        </div>
        <div className="khayal-architecture-build-flow">
          <span>
            <Sparkles aria-hidden />
            <strong>React + Vite</strong>
            <small>Practice dashboards</small>
          </span>
          <ArrowRight aria-hidden />
          <span>
            <Code2 aria-hidden />
            <strong>Node + Express</strong>
            <small>Workflow APIs</small>
          </span>
          <ArrowRight aria-hidden />
          <span>
            <Cloud aria-hidden />
            <strong>Vercel</strong>
            <small>Deployment</small>
          </span>
          <ArrowRight aria-hidden />
          <span>
            <Database aria-hidden />
            <strong>Supabase + Stripe</strong>
            <small>Data + subscriptions</small>
          </span>
        </div>
      </section>

      <footer className="khayal-architecture-footer">
        <div className="khayal-architecture-journey">
          <PhoneIncoming aria-hidden />
          <span>Patient inquiry</span>
          <ArrowRight aria-hidden />
          <strong>DCP</strong>
          <ArrowRight aria-hidden />
          <span>Practice growth</span>
        </div>
        <p>{slide.note}</p>
        <span className="khayal-architecture-runtime">Runtime: Vapi + Kolla + Vercel</span>
      </footer>
    </div>
  );
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

function SharePostSlide({ slide }: { slide: Slide }) {
  return (
    <div className="blueprint-slide share-post-slide">
      <div className="share-post-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        {slide.title ? <h2 className="slide-title">{slide.title}</h2> : null}
        {slide.lead ? <p className="slide-lead">{slide.lead}</p> : null}
        {slide.note ? <p className="slide-note mt-2">{slide.note}</p> : null}
      </div>

      <div className="share-post-graphic" aria-hidden="true">
        <svg viewBox="0 0 640 560" role="presentation">
          <defs>
            <clipPath id="share-post-avatar-clip">
              <circle cx="58" cy="98" r="23" />
            </clipPath>
          </defs>

          {/* the work compounds — reach fans out behind the card */}
          <path
            className="blueprint-post-reach"
            d="M360 300 C 410 250 430 190 448 138 M362 330 C 420 320 450 260 468 214 M366 372 C 430 400 480 420 500 434"
          />
          <g transform="translate(448 128)">
            <circle className="blueprint-diagram-node" r="16" />
            <text className="blueprint-diagram-node-text" y="4" textAnchor="middle">+1</text>
          </g>
          <g transform="translate(486 214)">
            <circle className="blueprint-diagram-node" r="18" />
            <text className="blueprint-diagram-node-text" y="5" textAnchor="middle">+1</text>
          </g>
          <g transform="translate(516 436)">
            <circle className="blueprint-diagram-node blueprint-diagram-node-accent" r="21" />
            <text
              className="blueprint-diagram-node-text blueprint-diagram-node-text-light"
              y="5"
              textAnchor="middle"
            >
              NEXT
            </text>
          </g>

          {/* the post card */}
          <g transform="rotate(-1.4 190 220)">
            <rect
              className="blueprint-post-card"
              x="16"
              y="48"
              width="352"
              height="332"
              rx="16"
            />

            {/* author */}
            <circle className="blueprint-post-avatar" cx="58" cy="98" r="23" />
            <g clipPath="url(#share-post-avatar-clip)">
              <circle className="blueprint-post-glyph" cx="58" cy="90" r="8.5" />
              <ellipse className="blueprint-post-glyph" cx="58" cy="120" rx="16" ry="13" />
            </g>
            <rect className="blueprint-post-bar" x="94" y="84" width="146" height="12" rx="6" />
            <rect className="blueprint-post-bar-faint" x="94" y="105" width="100" height="9" rx="4.5" />

            {/* post text */}
            <rect className="blueprint-post-bar-faint" x="40" y="146" width="288" height="8" rx="4" />
            <rect className="blueprint-post-bar-faint" x="40" y="166" width="308" height="8" rx="4" />
            <rect className="blueprint-post-bar-faint" x="40" y="186" width="196" height="8" rx="4" />
            <text className="blueprint-post-hashtag" x="40" y="220">
              #AKUBuildWorkshop
            </text>

            {/* the demo screenshot */}
            <rect
              className="blueprint-post-thumb"
              x="40"
              y="238"
              width="308"
              height="96"
              rx="8"
            />
            <path className="blueprint-post-play" d="M180 268 l22 15 -22 15 z" />

            {/* engagement bar */}
            <line
              x1="40"
              y1="352"
              x2="348"
              y2="352"
              stroke="var(--deck-blue)"
              strokeOpacity="0.3"
            />
            <path
              className="blueprint-post-icon"
              d="M58 378 c-7 -5 -13 -9 -13 -16 a6 6 0 0 1 13 -3 a6 6 0 0 1 13 3 c0 7 -6 11 -13 16 z"
            />
            <rect className="blueprint-post-bar-faint" x="78" y="366" width="24" height="7" rx="3.5" />

            <path
              className="blueprint-post-icon-accent"
              d="M138 358 h32 a8 8 0 0 1 8 8 v10 a8 8 0 0 1 -8 8 h-20 l-10 9 v-9 h-2 a8 8 0 0 1 -8 -8 v-10 a8 8 0 0 1 8 -8 z"
              fill="none"
            />
            <rect
              className="blueprint-post-icon-accent"
              x="190"
              y="366"
              width="28"
              height="7"
              rx="3.5"
              stroke="none"
            />

            <path
              className="blueprint-post-icon"
              d="M250 364 h20 v-6 l10 10 -10 10 v-6 h-20 z M280 380 h-20 v6 l-10 -10 10 -10 v6 h20 z"
              fill="none"
            />
            <rect className="blueprint-post-bar-faint" x="296" y="366" width="20" height="7" rx="3.5" />
          </g>

          <path
            className="blueprint-dimension"
            d="M24 512 h584 M24 503 v18 M608 503 v18"
          />
          <text
            className="blueprint-dimension-text"
            x="316"
            y="503"
            textAnchor="middle"
          >
            THE WORK COMPOUNDS — SEE YOU IN THE COMMENTS
          </text>
        </svg>
      </div>
    </div>
  );
}

function QrJoinSlide({
  slide,
  participantUrl,
}: {
  slide: Slide;
  participantUrl?: string;
}) {
  const { joinLink } = slide;
  return (
    <div className="blueprint-slide qr-join-slide">
      <div className="qr-join-copy">
        {slide.kicker ? <p className="slide-kicker">{slide.kicker}</p> : null}
        {slide.title ? <h2 className="slide-title">{slide.title}</h2> : null}
        {slide.lead ? (
          <p className="slide-lead max-w-[48ch]">{slide.lead}</p>
        ) : null}
        {slide.note ? <p className="slide-note mt-1">{slide.note}</p> : null}
        {participantUrl && slide.participantCta ? (
          <a
            href={participantUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 grid w-full max-w-xl grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-5 rounded-[1.4rem] border-2 border-[var(--deck-accent)] bg-[var(--deck-accent)] px-[clamp(1.25rem,2.4vw,2rem)] py-[clamp(1.1rem,2.2vw,1.75rem)] text-left text-white shadow-[0_1.25rem_3rem_rgba(0,0,0,0.22)] transition duration-300 hover:-translate-y-1 hover:brightness-110 focus-visible:-translate-y-1"
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
        ) : null}
      </div>

      {joinLink ? (
        <div className="qr-join-graphic">
          <img
            src={joinLink.qrSrc}
            alt={joinLink.qrAlt}
            className="qr-join-code"
          />
          <p className="qr-join-url">{joinLink.url}</p>
        </div>
      ) : null}
    </div>
  );
}
