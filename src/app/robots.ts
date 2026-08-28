import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Facilitator views carry notes not meant for participant display.
      disallow: ["/*/facilitate", "/*/backup"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
