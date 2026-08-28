"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

interface Segment {
  id: string;
  title: string;
  start: number;
  end: number;
}

/**
 * An optional session clock the facilitator starts at the top of the workshop.
 * It shows elapsed time and which segment the schedule expects them to be in.
 * State lives in sessionStorage — it is deliberately not part of the persisted
 * workshop store and clears when the tab closes.
 */
export function SessionClock({
  storageKey,
  segments,
}: {
  storageKey: string;
  segments: Segment[];
}) {
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem(storageKey);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (raw) setStartedAt(Number(raw));
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  useEffect(() => {
    if (startedAt === null) return;
    tick.current = setInterval(() => setNow(Date.now()), 1000);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [startedAt]);

  const start = useCallback(() => {
    const t = Date.now();
    setStartedAt(t);
    setNow(t);
    try {
      window.sessionStorage.setItem(storageKey, String(t));
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const reset = useCallback(() => {
    setStartedAt(null);
    try {
      window.sessionStorage.removeItem(storageKey);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const elapsedMin = startedAt ? (now - startedAt) / 60000 : 0;
  const mm = Math.floor(elapsedMin);
  const ss = Math.floor(((now - (startedAt ?? now)) % 60000) / 1000);
  const expected =
    startedAt !== null
      ? segments.find((s) => elapsedMin >= s.start && elapsedMin < s.end) ??
        segments[segments.length - 1]
      : null;

  return (
    <div className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold tracking-wide text-ink-subtle uppercase">
            Session clock
          </p>
          {startedAt !== null ? (
            <p className="mt-0.5 text-2xl font-bold text-ink tabular-nums">
              {String(mm).padStart(2, "0")}:{String(ss).padStart(2, "0")}
              <span className="ml-2 text-sm font-normal text-ink-subtle">
                elapsed
              </span>
            </p>
          ) : (
            <p className="mt-0.5 text-sm text-ink-muted">
              Not started. Start it when the workshop begins.
            </p>
          )}
        </div>
        <div className="flex gap-2">
          {startedAt === null ? (
            <button
              type="button"
              onClick={start}
              className="inline-flex items-center gap-1.5 rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-on-primary hover:bg-primary-strong"
            >
              <Play className="size-4" aria-hidden />
              Start clock
            </button>
          ) : (
            <button
              type="button"
              onClick={reset}
              className="inline-flex items-center gap-1.5 rounded-md border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted hover:bg-surface-muted"
            >
              <RotateCcw className="size-4" aria-hidden />
              Reset
            </button>
          )}
        </div>
      </div>
      {expected ? (
        <p className="mt-3 rounded-md bg-primary-soft/50 px-3 py-2 text-sm text-ink">
          <Pause className="mr-1.5 inline size-3.5 text-primary" aria-hidden />
          The schedule expects you to be in:{" "}
          <span className="font-semibold">{expected.title}</span>{" "}
          <span className="text-ink-subtle">
            ({expected.start}–{expected.end} min)
          </span>
        </p>
      ) : null}
    </div>
  );
}
