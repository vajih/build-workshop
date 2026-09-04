"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock3, MessageSquareText, ShieldCheck } from "lucide-react";
import {
  FEEDBACK_NPS_VALUES,
  FEEDBACK_RATING_VALUES,
  WORKSHOP_FEEDBACK_QUESTIONS,
  WORKSHOP_NPS_QUESTION,
  WORKSHOP_OPEN_FEEDBACK_QUESTION,
} from "@/content/clients/aku/digital-health-2026/feedback";

type SubmitState =
  | { kind: "idle"; message: "" }
  | { kind: "submitting"; message: string }
  | { kind: "review" | "success" | "error"; message: string };

const FEEDBACK_ENDPOINT = process.env.NEXT_PUBLIC_WORKSHOP_FEEDBACK_ENDPOINT?.trim();

export function WorkshopFeedbackForm({ workshopName }: { workshopName: string }) {
  const [answered, setAnswered] = useState(0);
  const [submitState, setSubmitState] = useState<SubmitState>({ kind: "idle", message: "" });
  const reviewMode = !FEEDBACK_ENDPOINT;
  const ratingNames = [...WORKSHOP_FEEDBACK_QUESTIONS.map((question) => question.id), "nps"];

  function updateProgress(event: FormEvent<HTMLFormElement>) {
    const formData = new FormData(event.currentTarget);
    setAnswered(ratingNames.filter((name) => formData.has(name)).length);
  }

  async function submitFeedback(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    if (!form.reportValidity()) return;

    if (reviewMode) {
      setSubmitState({
        kind: "review",
        message:
          "Preview complete. No response was saved while this form awaits organizer approval.",
      });
      return;
    }

    setSubmitState({ kind: "submitting", message: "Sending your feedback…" });

    try {
      const formData = new FormData(form);
      formData.set("submitted_at", new Date().toISOString());
      const response = await fetch(FEEDBACK_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (!response.ok) throw new Error(`Feedback request failed with ${response.status}`);

      form.reset();
      setAnswered(0);
      setSubmitState({
        kind: "success",
        message: "Thank you — your feedback has been submitted.",
      });
    } catch {
      setSubmitState({
        kind: "error",
        message: "Your feedback could not be sent. Please try again in a moment.",
      });
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-start">
      <form
        className="space-y-8 rounded-[var(--radius-card)] border border-border-strong bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7"
        onChange={updateProgress}
        onSubmit={submitFeedback}
      >
        <input type="hidden" name="workshop" value={workshopName} />
        <input type="hidden" name="form_name" value="Post-workshop feedback" />
        <input
          className="hidden"
          type="text"
          name="_gotcha"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div className="flex flex-col gap-2 border-b border-border pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-primary">Five quick reflections</p>
            <p className="text-sm text-ink-muted">1 = strongly disagree · 5 = strongly agree</p>
          </div>
          <p className="text-sm font-medium text-ink-muted" aria-live="polite">
            {answered} of {ratingNames.length} ratings answered
          </p>
        </div>

        <div className="space-y-7">
          {WORKSHOP_FEEDBACK_QUESTIONS.map((question, questionIndex) => (
            <fieldset key={question.id}>
              <legend className="font-semibold text-ink">
                <span className="mr-2 text-sm text-ink-subtle">{questionIndex + 1}.</span>
                {question.statement}
              </legend>
              <p className="mt-1 text-xs font-medium tracking-wide text-accent uppercase">
                {question.shortLabel}
              </p>
              <div className="mt-3 grid grid-cols-5 gap-2" role="radiogroup">
                {FEEDBACK_RATING_VALUES.map((value) => {
                  const id = `${question.id}-${value}`;
                  return (
                    <div key={value}>
                      <input
                        className="peer sr-only"
                        id={id}
                        type="radio"
                        name={question.id}
                        value={value}
                        required={value === 1}
                      />
                      <label
                        className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-border-strong bg-surface-muted font-semibold text-ink-muted transition hover:border-primary hover:text-primary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                        htmlFor={id}
                      >
                        {value}
                      </label>
                    </div>
                  );
                })}
              </div>
              <div className="mt-1.5 flex justify-between text-xs text-ink-subtle">
                <span>Strongly disagree</span>
                <span>Strongly agree</span>
              </div>
            </fieldset>
          ))}
        </div>

        <fieldset className="border-t border-border pt-7">
          <legend className="font-semibold text-ink">{WORKSHOP_NPS_QUESTION}</legend>
          <p className="mt-1 text-sm text-ink-muted">A standard 0–10 Net Promoter Score question.</p>
          <div className="mt-3 grid grid-cols-6 gap-2 sm:grid-cols-11" role="radiogroup">
            {FEEDBACK_NPS_VALUES.map((value) => {
              const id = `nps-${value}`;
              return (
                <div key={value}>
                  <input
                    className="peer sr-only"
                    id={id}
                    type="radio"
                    name="nps"
                    value={value}
                    required={value === 0}
                  />
                  <label
                    className="flex min-h-11 cursor-pointer items-center justify-center rounded-lg border border-border-strong bg-surface-muted text-sm font-semibold text-ink-muted transition hover:border-primary hover:text-primary peer-checked:border-primary peer-checked:bg-primary peer-checked:text-on-primary peer-focus-visible:ring-2 peer-focus-visible:ring-primary peer-focus-visible:ring-offset-2"
                    htmlFor={id}
                  >
                    {value}
                  </label>
                </div>
              );
            })}
          </div>
          <div className="mt-1.5 flex justify-between text-xs text-ink-subtle">
            <span>Not at all likely</span>
            <span>Extremely likely</span>
          </div>
        </fieldset>

        <div className="border-t border-border pt-7">
          <label className="font-semibold text-ink" htmlFor="open-feedback">
            {WORKSHOP_OPEN_FEEDBACK_QUESTION}
          </label>
          <p className="mt-1 text-sm text-ink-muted">Optional · one or two sentences is enough.</p>
          <textarea
            className="mt-3 min-h-32 w-full resize-y rounded-xl border border-border-strong bg-bg px-4 py-3 text-ink shadow-inner outline-none placeholder:text-ink-subtle focus:border-primary focus:ring-2 focus:ring-primary/20"
            id="open-feedback"
            name="open_feedback"
            maxLength={1000}
            placeholder="The most useful part was… One improvement would be…"
          />
        </div>

        <div className="border-t border-border pt-6">
          <button
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-on-primary transition hover:bg-primary-strong disabled:cursor-wait disabled:opacity-65 sm:w-auto"
            type="submit"
            disabled={submitState.kind === "submitting"}
          >
            <CheckCircle2 className="size-5" aria-hidden />
            {reviewMode ? "Preview submission" : "Submit feedback"}
          </button>
          {submitState.message ? (
            <p
              className={`mt-3 text-sm font-medium ${
                submitState.kind === "error" ? "text-investigate" : "text-primary"
              }`}
              role={submitState.kind === "error" ? "alert" : "status"}
            >
              {submitState.message}
            </p>
          ) : null}
        </div>
      </form>

      <aside className="space-y-4 lg:sticky lg:top-24">
        {reviewMode ? (
          <div className="rounded-[var(--radius-card)] border border-watch/30 bg-watch-soft p-5">
            <p className="text-sm font-semibold tracking-wide text-watch uppercase">Organizer review</p>
            <h2 className="mt-1 text-lg font-semibold text-ink">Submissions are paused</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Explore the full form and preview its completion message. No response is recorded until the questions are approved and a collection endpoint is connected.
            </p>
          </div>
        ) : null}

        <div className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-5 shadow-[var(--shadow-card)]">
          <ul className="space-y-4 text-sm text-ink-muted">
            <li className="flex gap-3">
              <Clock3 className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <span><strong className="block text-ink">About two minutes</strong>Six ratings and one optional comment.</span>
            </li>
            <li className="flex gap-3">
              <ShieldCheck className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <span><strong className="block text-ink">No name or email requested</strong>Please do not include patient or identifiable information.</span>
            </li>
            <li className="flex gap-3">
              <MessageSquareText className="mt-0.5 size-5 shrink-0 text-accent" aria-hidden />
              <span><strong className="block text-ink">Useful by design</strong>Every question supports a concrete workshop decision.</span>
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
