/**
 * Canonical site URL. Update `NEXT_PUBLIC_SITE_URL` once the portal has its real
 * domain. For local venue use (no internet), set it to the presenter laptop's
 * LAN address, e.g. `NEXT_PUBLIC_SITE_URL=http://192.168.1.20:3000`, so QR codes
 * resolve to the right host. Falls back to the Vercel URL on preview deploys.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "https://aku-build-workshop-portal.vercel.app");

/** Absolute URL for an app-relative path (used for QR codes and OG metadata). */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
