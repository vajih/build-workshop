"use client";

import { useState } from "react";
import { ExternalLink, Save } from "lucide-react";
import { useWorkshop } from "@/lib/workshop-context";

export function LiveUrlField() {
  const { ready, liveUrl, setLiveUrl } = useWorkshop();
  const [draft, setDraft] = useState<string | null>(null);
  const value = draft ?? (ready ? liveUrl : "");

  return (
    <div className="my-4 rounded-[var(--radius-card)] border border-border-strong bg-surface-muted/50 p-4">
      <label
        htmlFor="live-url"
        className="text-sm font-semibold text-ink"
      >
        Your live Vercel URL (optional)
      </label>
      <p className="mt-0.5 text-xs text-ink-subtle">
        Saved on this device only so you can reopen it later. Nothing is sent
        anywhere.
      </p>
      <div className="mt-2 flex flex-col gap-2 sm:flex-row">
        <input
          id="live-url"
          type="url"
          inputMode="url"
          placeholder="https://aku-outbreak-signal-yourname.vercel.app"
          value={value}
          onChange={(e) => setDraft(e.target.value)}
          className="min-w-0 flex-1 rounded-md border border-border-strong bg-surface px-3 py-2 text-sm text-ink outline-none focus-visible:border-primary"
        />
        <button
          type="button"
          onClick={() => {
            setLiveUrl(value.trim());
            setDraft(null);
          }}
          className="inline-flex items-center justify-center gap-1.5 rounded-md bg-primary px-3 py-2 text-sm font-semibold text-on-primary hover:bg-primary-strong"
        >
          <Save className="size-4" aria-hidden />
          Save URL
        </button>
      </div>
      {ready && liveUrl ? (
        <a
          href={liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
        >
          <ExternalLink className="size-4" aria-hidden />
          Open my live site
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}
    </div>
  );
}
