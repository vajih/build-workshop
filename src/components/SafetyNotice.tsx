import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";

interface SafetyNoticeProps {
  children?: ReactNode;
  title?: string;
  /** "standard" is the calm green treatment; "strong" adds amber emphasis. */
  tone?: "standard" | "strong";
}

export function SafetyNotice({
  children,
  title = "Safety and scope",
  tone = "standard",
}: SafetyNoticeProps) {
  const strong = tone === "strong";
  return (
    <aside
      className={`my-6 rounded-[var(--radius-card)] border p-4 ${
        strong
          ? "border-watch/40 bg-watch-soft/60"
          : "border-primary/25 bg-primary-soft/50"
      }`}
    >
      <p
        className={`mb-1.5 inline-flex items-center gap-2 text-sm font-semibold ${
          strong ? "text-watch" : "text-primary"
        }`}
      >
        <ShieldAlert className="size-4" aria-hidden />
        {title}
      </p>
      <div className="prose-block text-sm text-ink-muted">{children}</div>
    </aside>
  );
}
