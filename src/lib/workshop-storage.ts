/**
 * Namespaced, versioned localStorage for the workshop platform.
 *
 * Every key is scoped to a client + workshop so future workshops never collide:
 *
 *   workshop:aku:digital-health-2026:participant-progress
 *
 * A `__meta` record holds the schema version. On load, if the stored version is
 * behind the code's version, `migrate()` runs. V1 has no migrations; the hook
 * exists so a future schema change does not break existing participants.
 *
 * All access is wrapped in try/catch — the portal works with storage disabled,
 * it just does not persist.
 */

export const STORAGE_NAMES = {
  meta: "__meta",
  os: "os",
  progress: "participant-progress",
  liveUrl: "live-url",
  ideaCard: "idea-card",
  lastStep: "last-step",
  dismissed: "dismissed",
  presenterSlide: "presenter-last-slide",
  feedbackSubmission: "feedback-submission",
} as const;

export type StorageName = (typeof STORAGE_NAMES)[keyof typeof STORAGE_NAMES];

/**
 * Names cleared by "Reset my workshop progress".
 *
 * The OS choice, feedback submission receipt, and meta record deliberately stay
 * in place. Resetting lesson progress must not reopen an already-submitted form.
 */
const RESETTABLE: StorageName[] = [
  STORAGE_NAMES.progress,
  STORAGE_NAMES.liveUrl,
  STORAGE_NAMES.ideaCard,
  STORAGE_NAMES.lastStep,
  STORAGE_NAMES.dismissed,
  STORAGE_NAMES.presenterSlide,
];

export function nsKey(
  clientSlug: string,
  workshopSlug: string,
  name: string,
): string {
  return `workshop:${clientSlug}:${workshopSlug}:${name}`;
}

interface Meta {
  version: number;
}

export interface WorkshopStore {
  read<T>(name: StorageName, fallback: T): T;
  write(name: StorageName, value: unknown): void;
  remove(name: StorageName): void;
  /** Clear workshop progress, but keep OS choice, feedback receipt, and meta. */
  reset(): void;
  /** Run once on mount: migrate legacy/older data, stamp the current version. */
  init(): void;
}

export function createWorkshopStore(
  clientSlug: string,
  workshopSlug: string,
  schemaVersion: number,
): WorkshopStore {
  const k = (name: string) => nsKey(clientSlug, workshopSlug, name);

  function read<T>(name: StorageName, fallback: T): T {
    try {
      const raw = window.localStorage.getItem(k(name));
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  }

  function write(name: StorageName, value: unknown): void {
    try {
      window.localStorage.setItem(k(name), JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }

  function remove(name: StorageName): void {
    try {
      window.localStorage.removeItem(k(name));
    } catch {
      /* ignore */
    }
  }

  function reset(): void {
    for (const name of RESETTABLE) remove(name);
  }

  function migrate(from: number): void {
    // V1: no data-shape migrations yet. Add `if (from < 2) { ... }` blocks here.
    void from;
  }

  function importLegacyKeys(): void {
    // The pre-platform build used un-namespaced keys (aku-os, aku-progress, …).
    // Import them once so an early tester keeps their progress.
    try {
      const legacy: Record<string, StorageName> = {
        "aku-os": STORAGE_NAMES.os,
        "aku-progress": STORAGE_NAMES.progress,
        "aku-live-url": STORAGE_NAMES.liveUrl,
        "aku-dismissed": STORAGE_NAMES.dismissed,
      };
      for (const [oldKey, name] of Object.entries(legacy)) {
        const raw = window.localStorage.getItem(oldKey);
        if (raw !== null && window.localStorage.getItem(k(name)) === null) {
          window.localStorage.setItem(k(name), raw);
        }
      }
    } catch {
      /* ignore */
    }
  }

  function init(): void {
    try {
      const meta = read<Meta | null>(STORAGE_NAMES.meta, null);
      if (meta === null) {
        importLegacyKeys();
        write(STORAGE_NAMES.meta, { version: schemaVersion });
        return;
      }
      if (meta.version < schemaVersion) {
        migrate(meta.version);
        write(STORAGE_NAMES.meta, { version: schemaVersion });
      }
    } catch {
      /* ignore */
    }
  }

  return { read, write, remove, reset, init };
}
