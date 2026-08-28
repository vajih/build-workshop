import Link from "next/link";
import { PRIMARY_WORKSHOP } from "@/content/registry";
import { workshopBase } from "@/lib/workshop";

export default function NotFound() {
  const base = workshopBase(PRIMARY_WORKSHOP.config);
  const links = [
    { label: "Platform home", href: "/" },
    { label: "Participant workbook", href: `${base}/participate` },
    { label: "Presentation", href: `${base}/present` },
    { label: "Facilitator view", href: `${base}/facilitate` },
  ];

  return (
    <div className="container-page py-20 text-center">
      <p className="text-sm font-semibold tracking-wide text-accent uppercase">
        Page not found
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink">
        That page isn&rsquo;t part of the workshop
      </h1>
      <p className="mx-auto mt-3 max-w-md text-ink-muted">
        The link may be out of date. Pick up from one of these instead.
      </p>
      <ul className="mx-auto mt-6 flex max-w-md flex-wrap justify-center gap-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="rounded-full border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted hover:border-primary hover:text-primary"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
