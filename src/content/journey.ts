import type { JourneyStage } from "./types";
import { HEALTH_SAFETY_STATEMENT } from "./shared/safety";

/** Prepare -> Build -> Test -> Commit -> Publish -> Improve -> Present */
export const JOURNEY: JourneyStage[] = [
  { label: "Prepare", detail: "Set up your laptop, terminal, and editor." },
  { label: "Build", detail: "Turn a prompt into a working application with AI." },
  { label: "Test", detail: "Run defined test cases and confirm the results." },
  { label: "Commit", detail: "Save your work with version history in Git." },
  { label: "Publish", detail: "Deploy a live global URL with Vercel." },
  { label: "Improve", detail: "Add features and explainable thresholds." },
  { label: "Present", detail: "Show a working prototype to the room." },
];

/** @deprecated use the workshop's `config.safety.statement` */
export const SAFETY_STATEMENT = HEALTH_SAFETY_STATEMENT;
