/**
 * Outbreak-signal classification used by the "AKU Outbreak Signal" demo app
 * that students build in Build 1. This module mirrors the exact rules given in
 * Prompt 1 so the portal's test tables and the student's app agree.
 *
 * Educational prototype only — not a surveillance, diagnostic, or clinical
 * decision tool. Synthetic classroom data.
 */

export type SignalLevel = "stable" | "watch" | "investigate";

export interface SignalResult {
  /** cases this week ÷ normal weekly baseline */
  ratio: number;
  /** ratio rounded to one decimal place, as shown to the student */
  ratioLabel: string;
  level: SignalLevel;
  /** short human label, e.g. "Stable" */
  levelLabel: string;
  nextStep: string;
}

export interface SignalError {
  ok: false;
  message: string;
}

export const LEVEL_LABEL: Record<SignalLevel, string> = {
  stable: "Stable",
  watch: "Watch",
  investigate: "Investigate",
};

const NEXT_STEP: Record<SignalLevel, string> = {
  stable:
    "Continue routine monitoring. Keep recording weekly counts against the baseline.",
  watch:
    "Review recent counts and data quality. Alert the local surveillance focal point and check again next reporting cycle.",
  investigate:
    "Notify the outbreak investigation team to review case definitions, verify the data, and decide on a field response.",
};

/**
 * Classify a weekly count against its baseline.
 *
 * Rules (from Prompt 1):
 *  - ratio < 1.5            -> STABLE
 *  - 1.5 <= ratio < 2.0     -> WATCH
 *  - ratio >= 2.0           -> INVESTIGATE
 */
export function classifySignal(
  casesThisWeek: number,
  weeklyBaseline: number,
): SignalResult | SignalError {
  if (!Number.isFinite(casesThisWeek) || !Number.isFinite(weeklyBaseline)) {
    return { ok: false, message: "Enter numbers for cases and baseline." };
  }
  if (casesThisWeek < 0 || weeklyBaseline < 0) {
    return { ok: false, message: "Values cannot be negative." };
  }
  if (weeklyBaseline === 0) {
    return {
      ok: false,
      message: "Normal weekly baseline must be greater than zero.",
    };
  }

  const ratio = casesThisWeek / weeklyBaseline;
  const level: SignalLevel =
    ratio >= 2.0 ? "investigate" : ratio >= 1.5 ? "watch" : "stable";

  return {
    ratio,
    ratioLabel: `${ratio.toFixed(1)}×`,
    level,
    levelLabel: LEVEL_LABEL[level],
    nextStep: NEXT_STEP[level],
  };
}

export function isSignalError(
  value: SignalResult | SignalError,
): value is SignalError {
  return (value as SignalError).ok === false;
}
