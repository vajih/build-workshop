import type { Metadata } from "next";
import { Clock3 } from "lucide-react";
import { Breadcrumbs } from "@/components/chrome/Breadcrumbs";
import { PageIntro } from "@/components/PageIntro";
import { ParticipantStepNav } from "@/components/ParticipantStepNav";
import { WorkshopFeedbackForm } from "@/components/WorkshopFeedbackForm";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";
import { workshopBase } from "@/lib/workshop";

export const metadata: Metadata = {
  title: "Post-workshop feedback",
  description:
    "A short feedback form for the AKU Build Workshop: five ratings, Net Promoter Score, and one optional comment.",
};

export default async function FeedbackPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { config } = await getBundle(params);
  const base = workshopBase(config);

  return (
    <div className="container-page py-10">
      <Breadcrumbs
        items={[
          { label: "Participant", href: `${base}/participate` },
          { label: "Post-workshop feedback" },
        ]}
      />
      <PageIntro
        eyebrow="Help us improve"
        title="Post-workshop feedback"
        subtitle="A quick pulse on what worked, what changed, and what we should improve."
        aside={
          <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-surface px-3 py-1.5 text-sm font-medium text-ink-muted">
            <Clock3 className="size-4 text-accent" aria-hidden />
            About 2 minutes
          </span>
        }
      >
        <p>
          Your perspective will help the facilitator and workshop organizers strengthen the next Build Workshop.
        </p>
      </PageIntro>

      <WorkshopFeedbackForm workshopName={config.engagement.name} />

      <ParticipantStepNav base={base} current="/participate/feedback" />
    </div>
  );
}
