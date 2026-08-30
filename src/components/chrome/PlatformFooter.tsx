import Link from "next/link";
import { LinkedInIcon } from "@/components/icons/LinkedInIcon";
import type { WorkshopConfig } from "@/content/types";
import {
  workshopBase,
  workshopMark,
  relationshipLine,
  creatorAttribution,
  creatorLinkedIn,
} from "@/lib/workshop";

interface PlatformFooterProps {
  config?: WorkshopConfig;
}

export function PlatformFooter({ config }: PlatformFooterProps) {
  const base = config ? workshopBase(config) : null;
  const linkedIn = config ? creatorLinkedIn(config) : null;
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container-page py-10">
        <div className="grid gap-8 sm:grid-cols-2">
          <div>
            <p className="font-bold text-ink">
              {config ? workshopMark(config) : "Build Workshop"}
            </p>
            <p className="text-sm text-ink-muted">
              The Build Workshop program — a reusable, content-driven workshop
              platform with Presentation, Participant, and Facilitator modes.
            </p>
            {config ? (
              <p className="mt-3 text-sm text-ink-subtle">
                {relationshipLine(config)}. {creatorAttribution(config)}.
              </p>
            ) : null}
            {config && linkedIn ? (
              <a
                href={linkedIn}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted hover:border-primary hover:text-primary"
              >
                <LinkedInIcon className="size-4" />
                Connect with {config.creator.name} on LinkedIn
              </a>
            ) : null}
          </div>
          {base ? (
            <nav aria-label="Workshop">
              <p className="text-sm font-semibold text-ink">This workshop</p>
              <ul className="mt-2 space-y-1.5">
                <li>
                  <Link
                    href={`${base}/participate`}
                    className="text-sm text-ink-muted hover:text-primary"
                  >
                    Participant workbook
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${base}/present`}
                    className="text-sm text-ink-muted hover:text-primary"
                  >
                    Presentation
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${base}/facilitate`}
                    className="text-sm text-ink-muted hover:text-primary"
                  >
                    Facilitator view
                  </Link>
                </li>
                <li>
                  <Link
                    href={`${base}/backup`}
                    className="text-sm text-ink-muted hover:text-primary"
                  >
                    Backup and print
                  </Link>
                </li>
              </ul>
            </nav>
          ) : null}
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-ink-subtle">
          {config?.safety.disclaimer}{" "}
          This portal is an educational resource and is not affiliated with or
          endorsed as an official system of any institution. No personal or
          health information is collected or stored.
        </p>
      </div>
    </footer>
  );
}
