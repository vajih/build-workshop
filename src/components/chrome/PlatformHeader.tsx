import Link from "next/link";
import { Activity } from "lucide-react";

interface PlatformHeaderProps {
  /** Wordmark shown in the header. Defaults to the platform brand. */
  mark?: string;
  /** Small line under the wordmark. */
  tagline?: string;
  /** Optional trailing slot, e.g. a "Participate" button. */
  right?: React.ReactNode;
}

/** Header for the platform landing page and the workshop hub. */
export function PlatformHeader({
  mark = "Build Workshop",
  tagline = "A workshop platform where participants build",
  right,
}: PlatformHeaderProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-ink"
          aria-label={`${mark} — platform home`}
        >
          <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-on-primary">
            <Activity className="size-4" aria-hidden />
          </span>
          <span className="leading-tight">
            {mark}
            <span className="block text-[11px] font-medium text-ink-subtle">
              {tagline}
            </span>
          </span>
        </Link>
        {right ? <div className="flex items-center gap-3">{right}</div> : null}
      </div>
    </header>
  );
}
