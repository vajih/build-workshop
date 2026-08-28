import Link from "next/link";

export default function WorkshopNotFound() {
  return (
    <div className="container-page py-20 text-center">
      <p className="text-sm font-semibold tracking-wide text-accent uppercase">
        Workshop not found
      </p>
      <h1 className="mt-2 text-3xl font-bold text-ink">
        No workshop matches this address
      </h1>
      <p className="mx-auto mt-3 max-w-md text-ink-muted">
        The client or workshop in the URL is not registered on this platform.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-lg bg-primary px-5 py-3 text-base font-semibold text-on-primary hover:bg-primary-strong"
      >
        Go to the platform home
      </Link>
    </div>
  );
}
