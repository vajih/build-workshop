import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  createWorkshopStore,
  nsKey,
  STORAGE_NAMES,
} from "./workshop-storage";

class MemoryStorage {
  private map = new Map<string, string>();
  getItem(k: string) {
    return this.map.has(k) ? this.map.get(k)! : null;
  }
  setItem(k: string, v: string) {
    this.map.set(k, String(v));
  }
  removeItem(k: string) {
    this.map.delete(k);
  }
  get size() {
    return this.map.size;
  }
  keys() {
    return [...this.map.keys()];
  }
}

let mem: MemoryStorage;

beforeEach(() => {
  mem = new MemoryStorage();
  vi.stubGlobal("window", { localStorage: mem } as unknown as Window);
});

describe("nsKey", () => {
  it("namespaces by client and workshop", () => {
    expect(nsKey("aku", "digital-health-2026", "participant-progress")).toBe(
      "workshop:aku:digital-health-2026:participant-progress",
    );
  });
});

describe("createWorkshopStore", () => {
  it("reads and writes under the namespaced key", () => {
    const store = createWorkshopStore("aku", "dh-2026", 1);
    store.write(STORAGE_NAMES.os, "windows");
    expect(mem.getItem("workshop:aku:dh-2026:os")).toBe('"windows"');
    expect(store.read(STORAGE_NAMES.os, "macos")).toBe("windows");
  });

  it("keys for two workshops never collide", () => {
    const a = createWorkshopStore("aku", "dh-2026", 1);
    const b = createWorkshopStore("aku", "other-2027", 1);
    a.write(STORAGE_NAMES.progress, { x: true });
    b.write(STORAGE_NAMES.progress, { y: true });
    expect(a.read(STORAGE_NAMES.progress, {})).toEqual({ x: true });
    expect(b.read(STORAGE_NAMES.progress, {})).toEqual({ y: true });
  });

  it("falls back cleanly on malformed JSON", () => {
    const store = createWorkshopStore("aku", "dh-2026", 1);
    mem.setItem("workshop:aku:dh-2026:live-url", "{not json");
    expect(store.read(STORAGE_NAMES.liveUrl, "")).toBe("");
  });

  it("init() stamps the schema version", () => {
    const store = createWorkshopStore("aku", "dh-2026", 3);
    store.init();
    expect(mem.getItem("workshop:aku:dh-2026:__meta")).toBe('{"version":3}');
  });

  it("init() imports legacy un-namespaced keys once", () => {
    mem.setItem("aku-progress", '{"b1-01-os-complete":true}');
    const store = createWorkshopStore("aku", "digital-health-2026", 1);
    store.init();
    expect(store.read(STORAGE_NAMES.progress, {})).toEqual({
      "b1-01-os-complete": true,
    });
  });

  it("init() does not overwrite newer data when a legacy key also exists", () => {
    const store = createWorkshopStore("aku", "digital-health-2026", 1);
    store.write(STORAGE_NAMES.progress, { new: true });
    mem.setItem("aku-progress", '{"old":true}');
    store.init();
    expect(store.read(STORAGE_NAMES.progress, {})).toEqual({ new: true });
  });

  it("reset() clears progress but keeps the OS choice and feedback receipt", () => {
    const store = createWorkshopStore("aku", "dh-2026", 1);
    store.write(STORAGE_NAMES.os, "windows");
    store.write(STORAGE_NAMES.progress, { a: true });
    store.write(STORAGE_NAMES.dismissed, ["x"]);
    store.write(STORAGE_NAMES.feedbackSubmission, {
      version: 1,
      submittedAt: "2026-09-04T09:30:00.000Z",
    });
    store.reset();
    expect(store.read(STORAGE_NAMES.progress, null)).toBeNull();
    expect(store.read(STORAGE_NAMES.dismissed, null)).toBeNull();
    expect(store.read(STORAGE_NAMES.os, "macos")).toBe("windows");
    expect(store.read(STORAGE_NAMES.feedbackSubmission, null)).toEqual({
      version: 1,
      submittedAt: "2026-09-04T09:30:00.000Z",
    });
  });
});
