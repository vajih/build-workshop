import type { ReactNode } from "react";
import { ParticipantHeader } from "@/components/chrome/ParticipantHeader";
import { PlatformFooter } from "@/components/chrome/PlatformFooter";
import { RecordLastStep } from "@/components/RecordLastStep";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase, workshopMark } from "@/lib/workshop";
import { PARTICIPANT_NAV } from "@/content/clients/aku/digital-health-2026/participant-nav";
import { moduleById } from "@/content/clients/aku/digital-health-2026/modules";

export const metadata = { title: "Participant workbook" };

export default async function ParticipantLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<WorkshopRouteParams>;
}) {
  const { config } = await getBundle(params);
  const base = workshopBase(config);
  const progressIds = moduleById("build-1")?.checkpointIds ?? [];

  return (
    <>
      <ParticipantHeader
        base={base}
        title={workshopMark(config)}
        navItems={PARTICIPANT_NAV}
        progressIds={progressIds}
      />
      <RecordLastStep base={base} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <PlatformFooter config={config} />
    </>
  );
}
