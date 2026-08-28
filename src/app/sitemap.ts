import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { WORKSHOPS } from "@/content/registry";
import { workshopBase } from "@/lib/workshop";
import { PARTICIPANT_NAV } from "@/content/clients/aku/digital-health-2026/participant-nav";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified: now, changeFrequency: "monthly", priority: 1 },
  ];

  for (const { config } of WORKSHOPS) {
    const base = `${SITE_URL}${workshopBase(config)}`;
    entries.push({
      url: base,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    });
    entries.push({
      url: `${base}/present`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    });
    for (const item of PARTICIPANT_NAV) {
      entries.push({
        url: `${base}${item.href}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.7,
      });
    }
    // Facilitator routes are intentionally omitted (noindex).
  }

  return entries;
}
