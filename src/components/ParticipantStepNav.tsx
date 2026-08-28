import { StepNav } from "./StepNav";
import { PARTICIPANT_STEP_ORDER } from "@/content/clients/aku/digital-health-2026/participant-nav";

/** Previous / next navigation for Participant Mode pages. */
export function ParticipantStepNav({
  base,
  current,
}: {
  base: string;
  current: string;
}) {
  return (
    <StepNav order={PARTICIPANT_STEP_ORDER} current={current} base={base} />
  );
}
