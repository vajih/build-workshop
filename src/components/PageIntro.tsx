import type { ReactNode } from "react";

interface PageIntroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  /** Optional right-aligned slot, e.g. a time badge or OS selector. */
  aside?: ReactNode;
}

export function PageIntro({
  eyebrow,
  title,
  subtitle,
  children,
  aside,
}: PageIntroProps) {
  return (
    <header className="border-b border-border pb-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="mb-1.5 text-sm font-semibold tracking-wide text-accent uppercase">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-3xl font-bold text-ink sm:text-4xl">{title}</h1>
          {subtitle ? (
            <p className="mt-2 text-lg text-ink-muted">{subtitle}</p>
          ) : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>
      {children ? (
        <div className="prose-block mt-4 max-w-2xl text-ink-muted">
          {children}
        </div>
      ) : null}
    </header>
  );
}
