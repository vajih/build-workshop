"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  ChevronLeft,
  ChevronRight,
  Expand,
  ExternalLink,
  Keyboard,
  ListTree,
  Minimize,
  QrCode,
  X,
} from "lucide-react";
import type { Slide } from "@/content/types";
import { useWorkshop } from "@/lib/workshop-context";
import { clampIndex, resolveStartIndex } from "@/lib/deck-nav";
import { SlideRenderer } from "./SlideRenderer";

interface DeckSection {
  id: string;
  title: string;
  index: number;
  firstSlideId?: string;
  slideCount: number;
}

interface DeckProps {
  slides: Slide[];
  sections: DeckSection[];
  base: string;
  initialSlideId?: string;
  /** slide id -> absolute participant href (exercise-launch slides) */
  participantUrls: Record<string, string>;
  /** absolute URL encoded by the QR overlay */
  participantOverviewUrl: string;
  /** pre-rendered QR SVG string for `participantOverviewUrl` */
  qrSvg: string;
  /** visual system selected by the presentation route */
  theme?: "frictionless-blueprint";
}

type Overlay = "help" | "sections" | "qr" | null;

const SHORTCUTS: [string, string][] = [
  ["→ / Space / Page Down", "Next slide"],
  ["← / Page Up", "Previous slide"],
  ["Home / End", "First / last slide"],
  ["F", "Toggle full screen"],
  ["G", "Jump to a section"],
  ["Q", "Show the participant QR code"],
  ["? or H", "This help"],
  ["Esc", "Close overlay or exit full screen"],
];

export function Deck({
  slides,
  sections,
  base,
  initialSlideId,
  participantUrls,
  participantOverviewUrl,
  qrSvg,
  theme,
}: DeckProps) {
  const { setPresenterSlide } = useWorkshop();

  const [index, setIndex] = useState(() =>
    resolveStartIndex(slides, initialSlideId),
  );
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const total = slides.length;
  const slide = slides[index];
  const section = sections.find((s) => s.id === slide.section);

  const go = useCallback(
    (next: number) => {
      setIndex(clampIndex(next, total));
    },
    [total],
  );

  // Sync the URL + persisted presenter position when the slide changes.
  useEffect(() => {
    const id = slides[index]?.id;
    if (!id) return;
    const url = `${base}/present/${id}`;
    if (typeof window !== "undefined" && window.location.pathname !== url) {
      window.history.replaceState({ slideId: id }, "", url);
    }
    setPresenterSlide(id);
  }, [index, slides, base, setPresenterSlide]);

  // Back / forward buttons.
  useEffect(() => {
    function onPop() {
      const parts = window.location.pathname.split("/");
      const id = parts[parts.length - 1];
      const i = slides.findIndex((s) => s.id === id);
      if (i >= 0) setIndex(i);
    }
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [slides]);

  // Fullscreen state tracking.
  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  // Keyboard control.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      switch (e.key) {
        case "ArrowRight":
        case "PageDown":
        case " ":
          e.preventDefault();
          setOverlay(null);
          go(index + 1);
          break;
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          setOverlay(null);
          go(index - 1);
          break;
        case "Home":
          e.preventDefault();
          go(0);
          break;
        case "End":
          e.preventDefault();
          go(total - 1);
          break;
        case "f":
        case "F":
          toggleFullscreen();
          break;
        case "g":
        case "G":
          setOverlay((o) => (o === "sections" ? null : "sections"));
          break;
        case "q":
        case "Q":
          setOverlay((o) => (o === "qr" ? null : "qr"));
          break;
        case "?":
        case "h":
        case "H":
          setOverlay((o) => (o === "help" ? null : "help"));
          break;
        case "Escape":
          if (overlay) {
            e.preventDefault();
            setOverlay(null);
          } else if (document.fullscreenElement) {
            // browser handles exiting fullscreen; nothing to do
          }
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, total, overlay, go, toggleFullscreen]);

  // Move focus into an opened overlay.
  useEffect(() => {
    if (overlay) overlayRef.current?.focus();
  }, [overlay]);

  // When focus is inside the self-contained Frictionless chapter iframe,
  // relay its navigation requests to the surrounding workshop deck.
  useEffect(() => {
    function onEmbeddedNavigate(event: MessageEvent) {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type !== "frictionless-chapter:navigate") return;

      switch (event.data.action) {
        case "next":
          go(index + 1);
          break;
        case "prev":
          go(index - 1);
          break;
        case "first":
          go(0);
          break;
        case "last":
          go(total - 1);
          break;
        case "fullscreen":
          toggleFullscreen();
          break;
        default:
          break;
      }
    }

    window.addEventListener("message", onEmbeddedNavigate);
    return () => window.removeEventListener("message", onEmbeddedNavigate);
  }, [go, index, total, toggleFullscreen]);

  const progress = useMemo(
    () => Math.round(((index + 1) / total) * 100),
    [index, total],
  );

  const participantUrl = participantUrls[slide.id];

  return (
    <div
      className="deck-root relative flex min-h-dvh w-full items-center justify-center overflow-hidden"
      data-deck-theme={theme}
      data-embedded-slide={slide.layout === "frictionless-embed" ? "true" : undefined}
    >
      {/* Stage */}
      <section
        className="slide-stage slide-surface relative overflow-hidden"
        data-slide-layout={slide.layout}
        aria-roledescription="slide"
        aria-label={`Slide ${index + 1} of ${total}`}
      >
        <SlideRenderer slide={slide} participantUrl={participantUrl} />

        {slide.layout !== "frictionless-embed" ? (
          <>
            {/* Chrome: section + counter */}
            <div className="slide-note pointer-events-none absolute top-[var(--slide-pad)] right-[var(--slide-pad)] flex items-center gap-3">
              {section ? (
                <span>
                  {section.title} · Section {section.index + 1}/{sections.length}
                </span>
              ) : null}
              <span className="tabular-nums">
                {index + 1} / {total}
              </span>
            </div>

            {/* Draft / review status is intentionally not shown here — Presentation
                Mode is projected to the room. Draft slides are surfaced only in
                Facilitator Mode. */}

            {/* Progress bar */}
            <div
              className="deck-progress absolute inset-x-0 bottom-0 h-1"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={total}
              aria-valuenow={index + 1}
              aria-label={`Slide ${index + 1} of ${total}`}
            >
              <div
                className="deck-progress-value h-full transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        ) : null}
      </section>

      {/* Live region for screen readers */}
      <p className="sr-only" aria-live="polite">
        Slide {index + 1} of {total}: {slide.title ?? slide.question ?? slide.type}
      </p>

      {/* Controls */}
      <div className="deck-controls absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-white/15 bg-black/40 px-2 py-1.5 backdrop-blur">
        <DeckButton
          label="Previous slide"
          onClick={() => go(index - 1)}
          disabled={index === 0}
        >
          <ChevronLeft className="size-5" aria-hidden />
        </DeckButton>
        <span className="px-1 text-xs text-white/70 tabular-nums">
          {index + 1}/{total}
        </span>
        <DeckButton
          label="Next slide"
          onClick={() => go(index + 1)}
          disabled={index === total - 1}
        >
          <ChevronRight className="size-5" aria-hidden />
        </DeckButton>
        <span className="mx-1 h-5 w-px bg-white/15" aria-hidden />
        <DeckButton
          label="Jump to a section"
          onClick={() => setOverlay("sections")}
        >
          <ListTree className="size-4" aria-hidden />
        </DeckButton>
        <DeckButton
          label="Show participant QR code"
          onClick={() => setOverlay("qr")}
        >
          <QrCode className="size-4" aria-hidden />
        </DeckButton>
        {participantUrl ? (
          <a
            href={participantUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open the participant activity in a new tab"
            className="flex size-9 items-center justify-center rounded-full text-[#7fe3d9] hover:bg-white/10"
          >
            <ExternalLink className="size-4" aria-hidden />
          </a>
        ) : null}
        <DeckButton
          label={isFullscreen ? "Exit full screen" : "Enter full screen"}
          onClick={toggleFullscreen}
        >
          {isFullscreen ? (
            <Minimize className="size-4" aria-hidden />
          ) : (
            <Expand className="size-4" aria-hidden />
          )}
        </DeckButton>
        <DeckButton
          label="Keyboard shortcuts"
          onClick={() => setOverlay("help")}
        >
          <Keyboard className="size-4" aria-hidden />
        </DeckButton>
      </div>

      {/* Exit to workbook */}
      <a
        href={`${base}/participate`}
        className="deck-exit absolute top-4 left-4 rounded-md border border-white/15 bg-black/40 px-2.5 py-1.5 text-xs text-white/70 backdrop-blur hover:text-white"
      >
        Leave presentation
      </a>

      {overlay ? (
        <div
          className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 p-6"
          onClick={() => setOverlay(null)}
        >
          <div
            ref={overlayRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={
              overlay === "help"
                ? "Keyboard shortcuts"
                : overlay === "sections"
                  ? "Jump to a section"
                  : "Participant QR code"
            }
            className="max-h-[80dvh] w-full max-w-lg overflow-auto rounded-2xl border border-white/15 bg-[#0c1c16] p-6 text-[#e9f1ee] shadow-2xl outline-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {overlay === "help"
                  ? "Keyboard shortcuts"
                  : overlay === "sections"
                    ? "Jump to a section"
                    : "Open on your device"}
              </h2>
              <button
                type="button"
                onClick={() => setOverlay(null)}
                aria-label="Close"
                className="rounded-md p-1 text-white/60 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {overlay === "help" ? (
              <dl className="space-y-2 text-sm">
                {SHORTCUTS.map(([keys, desc]) => (
                  <div key={keys} className="flex justify-between gap-4">
                    <dt className="font-mono text-white/80">{keys}</dt>
                    <dd className="text-white/60">{desc}</dd>
                  </div>
                ))}
              </dl>
            ) : null}

            {overlay === "sections" ? (
              <ul className="space-y-1">
                {sections.map((s) => (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => {
                        const i = slides.findIndex(
                          (sl) => sl.id === s.firstSlideId,
                        );
                        if (i >= 0) setIndex(i);
                        setOverlay(null);
                      }}
                      className={`flex w-full items-center justify-between rounded-md px-3 py-2 text-left text-sm hover:bg-white/10 ${
                        s.id === section?.id ? "bg-white/10 font-semibold" : ""
                      }`}
                    >
                      <span>
                        {s.index + 1}. {s.title}
                      </span>
                      <span className="text-white/50">{s.slideCount} slides</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}

            {overlay === "qr" ? (
              <div className="flex flex-col items-center gap-3 text-center">
                <span
                  className="block w-56 rounded-lg bg-white p-3"
                  dangerouslySetInnerHTML={{ __html: qrSvg }}
                />
                <p className="text-sm text-white/70">
                  Scan to open the participant workbook
                </p>
                <p className="text-xs break-all text-white/50">
                  {participantOverviewUrl}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}

function DeckButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex size-9 items-center justify-center rounded-full text-white/80 hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
