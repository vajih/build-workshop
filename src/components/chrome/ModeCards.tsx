import Link from "next/link";
import { ArrowRight, MonitorPlay, NotebookPen, Presentation } from "lucide-react";
import type { WorkshopConfig, WorkshopMode } from "@/content/types";
import { modeHref, MODE_META } from "@/lib/workshop";

const ICONS: Record<WorkshopMode, typeof Presentation> = {
  present: Presentation,
  participate: NotebookPen,
  facilitate: MonitorPlay,
};

/** The three-mode picker shown on the platform landing and the workshop hub. */
export function ModeCards({
  config,
  emphasise = "participate",
}: {
  config: WorkshopConfig;
  emphasise?: WorkshopMode;
}) {
  const modes = (["participate", "present", "facilitate"] as WorkshopMode[]).filter(
    (m) => config.visibility[m],
  );

  return (
    <ul className="grid gap-4 sm:grid-cols-3">
      {modes.map((mode) => {
        const Icon = ICONS[mode];
        const meta = MODE_META[mode];
        const primary = mode === emphasise;
        return (
          <li key={mode}>
            <Link
              href={modeHref(config, mode)}
              className={`group flex h-full flex-col rounded-[var(--radius-card)] border p-5 transition-colors ${
                primary
                  ? "border-primary bg-primary-soft/50 hover:bg-primary-soft"
                  : "border-border-strong bg-surface hover:border-primary hover:bg-primary-soft/30"
              }`}
            >
              <span
                className={`flex size-10 items-center justify-center rounded-lg ${
                  primary
                    ? "bg-primary text-on-primary"
                    : "bg-primary-soft text-primary"
                }`}
              >
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="mt-3 text-lg font-semibold text-ink">
                {meta.verb}
              </span>
              <span className="mt-1 flex-1 text-sm text-ink-muted">
                {meta.blurb}
              </span>
              <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary">
                Open {meta.label}
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-0.5"
                  aria-hidden
                />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
