"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { WorkshopConfig } from "@/content/types";
import { createWorkshopStore, STORAGE_NAMES } from "./workshop-storage";
import { workshopBase } from "./workshop";

export type OS = "macos" | "windows";

interface WorkshopState {
  config: WorkshopConfig;
  /** absolute app path prefix, e.g. "/aku/digital-health-2026" */
  base: string;

  /** Hydration guard — false during SSR and the first client render. */
  ready: boolean;

  os: OS;
  setOS: (os: OS) => void;

  completed: Record<string, boolean>;
  isComplete: (id: string) => boolean;
  toggleStep: (id: string) => void;
  completedCount: (ids: readonly string[]) => number;

  liveUrl: string;
  setLiveUrl: (url: string) => void;

  /** last visited participant step (workshop-relative href) */
  lastStep: string;
  setLastStep: (href: string) => void;

  /** presenter's last slide id */
  presenterSlide: string;
  setPresenterSlide: (id: string) => void;

  isDismissed: (id: string) => boolean;
  dismiss: (id: string) => void;

  resetAll: () => void;
}

const WorkshopContext = createContext<WorkshopState | null>(null);

export function WorkshopProvider({
  config,
  children,
}: {
  config: WorkshopConfig;
  children: ReactNode;
}) {
  // The store is a stable object keyed by the (immutable) workshop slugs.
  const [store] = useState(() =>
    createWorkshopStore(config.clientSlug, config.slug, config.storageVersion),
  );

  const [ready, setReady] = useState(false);
  const [os, setOSState] = useState<OS>("macos");
  const [completed, setCompleted] = useState<Record<string, boolean>>({});
  const [liveUrl, setLiveUrlState] = useState("");
  const [lastStep, setLastStepState] = useState("");
  const [presenterSlide, setPresenterSlideState] = useState("");
  const [dismissed, setDismissed] = useState<string[]>([]);

  // Read persisted state once, after mount. Server and the first client render
  // both use the defaults above, so the markup matches and there is no hydration
  // mismatch; this effect then swaps in the stored values. This is a deliberate
  // one-time "read from an external store on mount" — the rule below is about
  // avoiding cascading renders from ongoing effect-driven state, which does not
  // apply here.
  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    store.init();
    setOSState(store.read<OS>(STORAGE_NAMES.os, "macos"));
    setCompleted(store.read<Record<string, boolean>>(STORAGE_NAMES.progress, {}));
    setLiveUrlState(store.read<string>(STORAGE_NAMES.liveUrl, ""));
    setLastStepState(store.read<string>(STORAGE_NAMES.lastStep, ""));
    setPresenterSlideState(store.read<string>(STORAGE_NAMES.presenterSlide, ""));
    setDismissed(store.read<string[]>(STORAGE_NAMES.dismissed, []));
    setReady(true);
  }, [store]);
  /* eslint-enable react-hooks/set-state-in-effect */

  const setOS = useCallback(
    (next: OS) => {
      setOSState(next);
      store.write(STORAGE_NAMES.os, next);
    },
    [store],
  );

  const toggleStep = useCallback(
    (id: string) => {
      setCompleted((prev) => {
        const next = { ...prev };
        if (next[id]) delete next[id];
        else next[id] = true;
        store.write(STORAGE_NAMES.progress, next);
        return next;
      });
    },
    [store],
  );

  const setLiveUrl = useCallback(
    (url: string) => {
      setLiveUrlState(url);
      store.write(STORAGE_NAMES.liveUrl, url);
    },
    [store],
  );

  const setLastStep = useCallback(
    (href: string) => {
      setLastStepState(href);
      store.write(STORAGE_NAMES.lastStep, href);
    },
    [store],
  );

  const setPresenterSlide = useCallback(
    (id: string) => {
      setPresenterSlideState(id);
      store.write(STORAGE_NAMES.presenterSlide, id);
    },
    [store],
  );

  const dismiss = useCallback(
    (id: string) => {
      setDismissed((prev) => {
        if (prev.includes(id)) return prev;
        const next = [...prev, id];
        store.write(STORAGE_NAMES.dismissed, next);
        return next;
      });
    },
    [store],
  );

  const resetAll = useCallback(() => {
    setCompleted({});
    setLiveUrlState("");
    setLastStepState("");
    setPresenterSlideState("");
    setDismissed([]);
    store.reset();
  }, [store]);

  const value = useMemo<WorkshopState>(
    () => ({
      config,
      base: workshopBase(config),
      ready,
      os,
      setOS,
      completed,
      isComplete: (id) => Boolean(completed[id]),
      toggleStep,
      completedCount: (ids) =>
        ids.reduce((n, id) => n + (completed[id] ? 1 : 0), 0),
      liveUrl,
      setLiveUrl,
      lastStep,
      setLastStep,
      presenterSlide,
      setPresenterSlide,
      isDismissed: (id) => dismissed.includes(id),
      dismiss,
      resetAll,
    }),
    [
      config,
      ready,
      os,
      setOS,
      completed,
      toggleStep,
      liveUrl,
      setLiveUrl,
      lastStep,
      setLastStep,
      presenterSlide,
      setPresenterSlide,
      dismissed,
      dismiss,
      resetAll,
    ],
  );

  return (
    <WorkshopContext.Provider value={value}>{children}</WorkshopContext.Provider>
  );
}

export function useWorkshop(): WorkshopState {
  const ctx = useContext(WorkshopContext);
  if (!ctx) throw new Error("useWorkshop must be used within WorkshopProvider");
  return ctx;
}
