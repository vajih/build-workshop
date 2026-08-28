import type { NextConfig } from "next";

/**
 * The portal moved from flat routes (/build-1, /facilitator, …) to namespaced
 * workshop routes (/aku/digital-health-2026/participate/build-1, …). These
 * redirects keep any existing links working. They are temporary (307) so the
 * mapping can change while the platform is still evolving.
 */
const WORKSHOP_BASE = "/aku/digital-health-2026";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/build-1", destination: `${WORKSHOP_BASE}/participate/build-1`, permanent: false },
      { source: "/before-workshop", destination: `${WORKSHOP_BASE}/participate/before-workshop`, permanent: false },
      { source: "/agenda", destination: `${WORKSHOP_BASE}/participate/agenda`, permanent: false },
      { source: "/outbreak-ai", destination: `${WORKSHOP_BASE}/participate/outbreak-ai`, permanent: false },
      { source: "/team-challenge", destination: `${WORKSHOP_BASE}/participate/team-challenge`, permanent: false },
      { source: "/resources", destination: `${WORKSHOP_BASE}/participate/resources`, permanent: false },
      { source: "/facilitator", destination: `${WORKSHOP_BASE}/facilitate`, permanent: false },
    ];
  },
};

export default nextConfig;
