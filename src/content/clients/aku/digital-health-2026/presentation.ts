import type { Presentation } from "@/content/types";
import {
  DISCLAIMER,
  SYNTHETIC_DATA_LABEL,
  SIGNAL_NOT_OUTBREAK,
  PRODUCT_EVOLUTION,
} from "./build-one";
import { BUILD1_DEBRIEF } from "./facilitator";
import { DEMO_FLOW, AUDIENCE_QUESTIONS } from "./outbreak-ai";
import { RUBRIC } from "./team-challenge";
import { BUILD_CYCLE } from "@/content/shared/build-cycle";
import { AI_EVOLUTION } from "@/content/shared/ai-evolution";
import {
  SIGNAL_VS_CONCLUSION,
  SUPPORT_VS_DIAGNOSIS,
} from "@/content/shared/responsible-ai";
import { ECONOMIC_VALUE } from "@/content/shared/economic-value";
import {
  FRICTIONLESS_BUILDING,
  HUMAN_RESPONSIBILITY,
} from "@/content/shared/frictionless-building";
import { akuDigitalHealth2026 as CONFIG } from "./workshop";
import { FRICTIONLESS_CHAPTER_SLIDES } from "./frictionless-chapter";

/**
 * The presentation deck for the AKU Build Workshop 2026 engagement. Authored
 * from the portal's existing content. Slides link to participant steps rather
 * than re-embedding commands or full prompts. Slides that depend on an
 * institutional fact not yet confirmed are marked `draft: true` — see the review
 * checklist in PLAN.md.
 *
 * Identity strings (organization, industry, creator) come from the workshop
 * config so nothing here is a separate hardcoded copy.
 *
 * Keep slides projector-friendly: short lines, no long instructions. If a slide
 * has too much content, split it — do not shrink the type.
 */
const MARK = `${CONFIG.organization.shortName} ${CONFIG.program.name}`;
const RELATIONSHIP = `${CONFIG.organization.publicRelationshipLabel} ${CONFIG.organization.name}`;
export const PRESENTATION: Presentation = {
  sections: [
    /* ================================================================ */
    {
      id: "welcome",
      title: "Welcome and immediate immersion",
      slides: [
        {
          id: "welcome-1",
          type: "title",
          section: "welcome",
          layout: "blueprint-hero",
          kicker: `${MARK} · ${CONFIG.industry.name}`,
          title: "Build something.",
          lead: CONFIG.program.tagline,
          body: [
            "Creativity · Code · AI · Healthcare · Action",
            "What would you build if starting were almost frictionless?",
          ],
          note: `${RELATIONSHIP} · ${CONFIG.creator.name}`,
        },
        {
          id: "welcome-2",
          type: "image-compare",
          section: "welcome",
          kicker: "Same street, thirteen years apart",
          title: "Technology transformation happens faster than institutions expect",
          lead: "Fifth Avenue, New York City — Easter Sunday, 1900 and 1913. Count the motorcars in each photograph.",
          images: [
            {
              src: "/images/presentation/fifth-avenue-1900.jpg",
              alt: "Fifth Avenue, New York City on Easter Sunday 1900, filled with horse-drawn carriages",
              tag: "1900",
              caption: "Horse-drawn carriages fill the street — motorcars are a rare novelty",
            },
            {
              src: "/images/presentation/fifth-avenue-1913.jpg",
              alt: "The same stretch of Fifth Avenue on Easter Sunday 1913, filled with automobiles",
              tag: "1913",
              caption: "Motorcars fill the street — one horse-drawn carriage remains",
            },
          ],
          note: "Thirteen years replaced a century of horse-drawn transport. The tools in this room can move just as fast — if you pick them up today.",
        },
        {
          id: "welcome-3",
          type: "image-compare",
          section: "welcome",
          kicker: "Why we're here",
          title: "You are here to learn the calculator, not the circuit board",
          lead: "Same object, two views. You will learn the keypad — where to press, what to check, when to trust the answer.",
          images: [
            {
              src: "/images/presentation/calculator-vs-circuit-board.jpg",
              alt: "A basic calculator next to its internal circuit board, showing the keypad on the left and the wired motherboard on the right",
              caption: "Left: what you will use. Right: what you will not need to build.",
              aspectRatio: "3 / 2",
            },
          ],
          note: "This workshop teaches you to use AI tools well — not how a model is trained or wired. Same posture as a calculator: you do not need the circuit board to get a trustworthy answer.",
        },
        {
          id: "welcome-4",
          type: "statement",
          section: "welcome",
          title: "Your first build starts now",
          lead: "No slides to sit through first. You will have a working application before we discuss how it works.",
          participantHref: "/participate/build-1",
          participantCta: {
            eyebrow: "Your first immersive experience",
            label: "Build your first live application",
            detail:
              "Open the participant workspace. Start with an empty folder; leave with something that works.",
          },
        },
        {
          id: "welcome-5",
          type: "statement",
          section: "welcome",
          kicker: "Open this on your laptop",
          title: "Scan to open the participant workbook",
          lead: "Every command and prompt is there to copy. Follow the steps in order.",
          note: "The QR code and short link are shown on this slide in Presentation Mode.",
        },
        {
          id: "welcome-6",
          type: "exercise-launch",
          section: "welcome",
          kicker: "Build 1",
          title: "AKU Outbreak Signal",
          lead: "Go from an empty folder to a live prototype with an interactive Karachi map.",
          body: [
            "Choose your operating system",
            "Create the project and open it in VS Code",
            "One prompt builds the calculator and the map",
            "Test, commit, deploy",
          ],
          participantHref: "/participate/build-1",
        },
        {
          id: "welcome-7",
          type: "process",
          section: "welcome",
          kicker: "What you are building",
          title: "A number becomes a place",
          items: [
            { label: "Enter", detail: "cases this week and the normal weekly baseline" },
            { label: "Calculate", detail: "cases ÷ baseline, to one decimal" },
            { label: "Classify", detail: "Stable · Watch · Investigate" },
            { label: "Locate", detail: "a coloured marker on the Karachi map" },
            { label: "Interpret", detail: "a synthetic signal — verify, do not conclude" },
          ],
          note: SYNTHETIC_DATA_LABEL,
        },
        {
          id: "welcome-8",
          type: "demo-intro",
          section: "welcome",
          kicker: "The map moment",
          title: "Pick a location, analyse, watch it light up",
          items: [
            { label: "Choose", detail: "one of five Karachi demonstration locations" },
            { label: "Analyse", detail: "the marker turns green, amber, or red" },
            { label: "Open the popup", detail: "location, cases, baseline, ratio, classification — in words" },
          ],
          note: "A red marker is powerful. It is a prompt to verify, not proof of an outbreak.",
        },
        {
          id: "welcome-9",
          type: "process",
          section: "welcome",
          kicker: "While you build",
          title: "The first-build clock",
          items: [
            { label: "Project setup", detail: "2–3 min" },
            { label: "Copilot builds it", detail: "4–6 min" },
            { label: "Local testing", detail: "3–4 min" },
            { label: "First deployment", detail: "2–4 min" },
            { label: "Quick debrief", detail: "2 min" },
          ],
          note: "A guide, not a race. Venue network can move these.",
          draft: true,
        },
        {
          id: "welcome-10",
          type: "statement",
          section: "welcome",
          kicker: "Minutes later",
          title: "Your app is live",
          lead: "A public URL you can open on your phone — a working map, a real deployment, and not one line of code typed by hand.",
          note: SYNTHETIC_DATA_LABEL,
        },
        {
          id: "welcome-11",
          type: "statement",
          section: "welcome",
          kicker: "Build 1 debrief",
          title: "Look at what you just did",
          lead: BUILD1_DEBRIEF,
        },
        {
          id: "welcome-12",
          type: "process",
          section: "welcome",
          kicker: "Product evolution",
          title: "Where Build 1 took the app",
          items: PRODUCT_EVOLUTION.map((label, i) => ({
            label,
            detail:
              i === 0
                ? "a number in, a classification out"
                : i === 1
                  ? "the number gets a place on the map"
                  : i === 2
                    ? "five recent checks, five markers"
                    : "every marker explains itself — verify, do not conclude",
          })),
        },
      ],
    },

    /* ================================================================ */
    {
      id: "what-changed",
      title: "What just changed?",
      slides: [
        {
          id: "what-changed-1",
          type: "section",
          section: "what-changed",
          kicker: "Section 2",
          title: "What just changed?",
        },
        ...FRICTIONLESS_CHAPTER_SLIDES.slice(0, 1),
        {
          id: "welcome-3-adoption",
          type: "image-compare",
          section: "what-changed",
          kicker: "The opportunity",
          title:
            "Healthcare has trailed in digitization — and it is continuing into AI",
          images: [
            {
              src: "/images/presentation/healthcare-digitization-index.jpg",
              alt: "The McKinsey Industry Digitization Index (2015) ranks U.S. sectors in three tiers. High digitization: ICT, media, finance and insurance. Medium: advanced manufacturing, wholesale, retail. Low: healthcare, construction, hospitality. The index spans 27 indicators of digital assets, usage and workers — a relative ranking, not a current AI-adoption rate.",
              aspectRatio: "968 / 888",
            },
            {
              src: "/images/presentation/healthcare-ai-adoption-2025.jpg",
              alt: "Measured AI use by U.S. industry in 2025: information services 23.2%, professional, scientific and technical services 19.2%, education 15.1%, finance and insurance 11.6%, healthcare 8.3%. Healthcare adoption is about 64% below information services.",
              aspectRatio: "1172 / 896",
            },
          ],
          imageScale: 1.15,
          callout: {
            stat: "8.3%",
            text: "of U.S. healthcare firms reported using AI in 2025 — about a third the rate of information services. Not merely a lag; an opening for the researchers, clinicians, and builders in this room.",
          },
          source:
            "McKinsey, Digital America (2015) · Nguyen et al., JAMA Health Forum (2025), U.S. Census BTOS",
          draft: true,
        },
        ...FRICTIONLESS_CHAPTER_SLIDES.slice(1),
        {
          id: "what-changed-3",
          type: "concept",
          section: "what-changed",
          title: FRICTIONLESS_BUILDING.headline,
          body: FRICTIONLESS_BUILDING.points,
        },
        {
          id: "what-changed-4",
          type: "concept",
          section: "what-changed",
          title: "AI as a pair programmer",
          body: [
            "It types. You direct.",
            "It is fast and confident, including when it is wrong.",
            "Your job is to define the work and check the result.",
          ],
        },
        {
          id: "what-changed-5",
          type: "concept",
          section: "what-changed",
          title: HUMAN_RESPONSIBILITY.headline,
          body: HUMAN_RESPONSIBILITY.points,
        },
        {
          id: "what-changed-6",
          type: "process",
          section: "what-changed",
          kicker: "The build cycle",
          title: "Define → Prompt → Supervise → Test → Commit → Publish → Learn → Improve",
          items: BUILD_CYCLE,
        },
      ],
    },

    /* ================================================================ */
    {
      id: "ai-and-building",
      title: "AI and building",
      slides: [
        {
          id: "ai-and-building-1",
          type: "section",
          section: "ai-and-building",
          kicker: "Section 3",
          title: "AI and building",
        },
        {
          id: "ai-and-building-2",
          type: "timeline",
          section: "ai-and-building",
          title: "Where AI tooling is heading",
          items: AI_EVOLUTION,
          draft: true,
        },
        {
          id: "ai-and-building-3",
          type: "concept",
          section: "ai-and-building",
          title: "Generative and agentic",
          body: [
            "Generative: produces text, code, and images from a description.",
            "Agentic: works in steps — reads files, edits, runs commands, reports back.",
            "Both need a person supervising the loop.",
          ],
        },
        {
          id: "ai-and-building-4",
          type: "concept",
          section: "ai-and-building",
          title: "Domain-specific and edge AI",
          body: [
            "Domain-specific: a small model trained for one narrow job.",
            "Edge: the model runs on the device, offline, with the data staying local.",
            "Smaller and more specific is easier to test and to trust.",
          ],
        },
        {
          id: "ai-and-building-5",
          type: "concept",
          section: "ai-and-building",
          title: ECONOMIC_VALUE.headline,
          body: ECONOMIC_VALUE.points,
        },
        {
          id: "ai-and-building-6",
          type: "statement",
          section: "ai-and-building",
          layout: "blueprint-product",
          kicker: "Design for usefulness",
          title:
            "The AI was not the product. The useful experience was the product.",
          lead:
            "People do not wake up wanting an LLM. They want a problem to disappear.",
          items: [
            {
              label: "Human need",
              detail: "A frustrating, repetitive, or messy process",
            },
            {
              label: "Interface",
              detail: "A clear way to describe what is happening",
            },
            {
              label: "Understanding",
              detail: "AI extracts or interprets the useful signal",
            },
            {
              label: "Workflow",
              detail: "A person gains awareness or takes action",
            },
          ],
          question:
            "What frustrating, repetitive, or messy process around you deserves a better interface?",
        },
      ],
    },

    /* ================================================================ */
    {
      id: "responsible-ai",
      title: "Responsible healthcare AI",
      slides: [
        {
          id: "responsible-ai-1",
          type: "section",
          section: "responsible-ai",
          kicker: "Section 4",
          title: "Responsible healthcare AI",
        },
        {
          id: "responsible-ai-2",
          type: "comparison",
          section: "responsible-ai",
          title: "Signal versus conclusion",
          columns: [
            { heading: "A signal", points: SIGNAL_VS_CONCLUSION.signal },
            { heading: "A conclusion", points: SIGNAL_VS_CONCLUSION.conclusion },
          ],
        },
        {
          id: "responsible-ai-3",
          type: "comparison",
          section: "responsible-ai",
          title: "Decision support versus diagnosis",
          columns: [
            { heading: "Decision support", points: SUPPORT_VS_DIAGNOSIS.support },
            { heading: "Diagnosis", points: SUPPORT_VS_DIAGNOSIS.diagnosis },
          ],
        },
        {
          id: "responsible-ai-4",
          type: "concept",
          section: "responsible-ai",
          title: "What makes a signal trustworthy",
          body: [
            "Explainability — it shows the inputs and the threshold it crossed.",
            "Data quality — reporting delays and errors look like events.",
            "Corroboration — one flag is a prompt to look, not a finding.",
          ],
        },
        {
          id: "responsible-ai-5",
          type: "concept",
          section: "responsible-ai",
          title: "Privacy and human oversight",
          body: [
            "Aggregate counts by place and time are usually enough.",
            "Do not collect identifiable information you do not need.",
            "Keep a person in the loop for every action that affects someone.",
          ],
        },
        {
          id: "responsible-ai-6",
          type: "statement",
          section: "responsible-ai",
          kicker: "Say it every time",
          title: "Limitation language",
          lead: `"${DISCLAIMER}"`,
          body: [`"${SIGNAL_NOT_OUTBREAK}"`, `"${SYNTHETIC_DATA_LABEL}"`],
        },
      ],
    },

    /* ================================================================ */
    {
      id: "outbreak-ai",
      title: "Outbreak-AI",
      slides: [
        {
          id: "outbreak-ai-1",
          type: "section",
          section: "outbreak-ai",
          kicker: "Section 5",
          title: "Outbreak-AI",
        },
        {
          id: "outbreak-ai-2",
          type: "concept",
          section: "outbreak-ai",
          title: "What Outbreak-AI is",
          body: [
            "A small model trained for one job: turn weekly counts into a ranked watchlist.",
            "It runs on an ESP32 — a few dollars, fits in your palm.",
            "The output is a signal for a person to act on.",
          ],
        },
        {
          id: "outbreak-ai-3",
          type: "comparison",
          section: "outbreak-ai",
          title: "Edge versus cloud AI",
          columns: [
            {
              heading: "Cloud AI",
              points: [
                "Sends data to a remote service",
                "Needs a network, an account, a bill",
                "Fails when any of those fail",
              ],
            },
            {
              heading: "Edge AI",
              points: [
                "Runs on the device in front of you",
                "Works offline, immediately, on site",
                "The data never leaves the room",
              ],
            },
          ],
        },
        {
          id: "outbreak-ai-4",
          type: "demo-intro",
          section: "outbreak-ai",
          kicker: "Demonstration",
          title: "How the demo runs",
          items: DEMO_FLOW.map((step) => ({ label: step })),
        },
        {
          id: "outbreak-ai-5",
          type: "discussion",
          section: "outbreak-ai",
          title: "Questions for the room",
          question: AUDIENCE_QUESTIONS[0],
          body: AUDIENCE_QUESTIONS.slice(1),
        },
        {
          id: "outbreak-ai-6",
          type: "statement",
          section: "outbreak-ai",
          kicker: "Boundary",
          title: "What the device does not do",
          lead: "It interprets a signal. It does not confirm outbreaks and does not replace an epidemiologist.",
        },
      ],
    },

    /* ================================================================ */
    {
      id: "team-challenge",
      title: "Team Challenge",
      slides: [
        {
          id: "team-challenge-1",
          type: "section",
          section: "team-challenge",
          kicker: "Section 6",
          title: "Team Challenge",
          note: "A 40-minute team build sprint",
        },
        {
          id: "team-challenge-2",
          type: "exercise-launch",
          section: "team-challenge",
          title: "Build something useful for one real person",
          lead: "Teams of four to six. About 40 minutes to build, five minutes to present.",
          participantHref: "/participate/team-challenge",
        },
        {
          id: "team-challenge-3",
          type: "process",
          section: "team-challenge",
          title: "Before you write a prompt",
          items: [
            { label: "Name the user", detail: "A role, not 'everyone'." },
            { label: "State the problem", detail: "What do they do today instead?" },
            { label: "Name the value", detail: "Minutes, errors, travel, missed signals." },
            { label: "Agree the one thing", detail: "What the prototype must do." },
          ],
        },
        {
          id: "team-challenge-4",
          type: "concept",
          section: "team-challenge",
          title: "What the prototype must have",
          body: [
            "It runs and you can demo it live.",
            "It does one useful thing end to end.",
            "Inputs are validated; it reads on a phone.",
            "A visible line: educational prototype, not a clinical tool.",
          ],
        },
        {
          id: "team-challenge-5",
          type: "statement",
          section: "team-challenge",
          kicker: "Time check",
          title: "Keep scope small",
          lead: "A small thing that works beats a big thing that does not. Cut to the core function and get it running.",
        },
        {
          id: "team-challenge-6",
          type: "process",
          section: "team-challenge",
          kicker: "Five-minute presentation",
          title: "What to show",
          items: [
            { label: "The problem", detail: "Who has it, how often, what it costs." },
            { label: "The user", detail: "One named role." },
            { label: "Live demo", detail: "The one thing, working." },
            { label: "How you used AI", detail: "Prompted, supervised, rejected." },
            { label: "Responsible design", detail: "What it is not." },
          ],
        },
        {
          id: "team-challenge-7",
          type: "process",
          section: "team-challenge",
          kicker: "Scoring",
          title: "How teams are scored (1–5 each)",
          items: RUBRIC.map((r) => ({ label: r.dimension, detail: r.description })),
        },
      ],
    },

    /* ================================================================ */
    {
      id: "presentations-close",
      title: "Team presentations and close",
      slides: [
        {
          id: "presentations-close-1",
          type: "section",
          section: "presentations-close",
          kicker: "Section 7",
          title: "Presentations and close",
        },
        {
          id: "presentations-close-2",
          type: "process",
          section: "presentations-close",
          title: "Presentation order",
          items: [
            { label: "Five teams", detail: "Five minutes each, held firmly." },
            { label: "One timer", detail: "Visible to the room." },
            { label: "Everyone scores", detail: "Against the six rubric dimensions." },
          ],
        },
        {
          id: "presentations-close-3",
          type: "concept",
          section: "presentations-close",
          title: "Giving feedback",
          body: [
            "Start with what the tool does well for its user.",
            "One concrete suggestion, not a list.",
            "Reward honest framing over overclaiming.",
          ],
        },
        {
          id: "presentations-close-4",
          type: "statement",
          section: "presentations-close",
          title: "What you accomplished today",
          lead: BUILD1_DEBRIEF,
        },
        {
          id: "presentations-close-5",
          type: "process",
          section: "presentations-close",
          title: "Next steps",
          items: [
            { label: "Keep the repo", detail: "Your Build 1 project is yours." },
            { label: "Use the resources page", detail: "Official docs for every tool." },
            { label: "Repeat the cycle", detail: "Define, prompt, supervise, test, commit, publish." },
          ],
        },
        {
          id: "presentations-close-6",
          type: "reflection",
          section: "presentations-close",
          title: "One question to take with you",
          question:
            "What is one problem in your own work that you could now prototype in an afternoon?",
        },
        {
          id: "presentations-close-7",
          type: "closing",
          section: "presentations-close",
          title: "Thank you",
          lead: "A platform for workshops where participants don't just learn — they build.",
          note: `${RELATIONSHIP} · Designed and facilitated by ${CONFIG.creator.name}`,
        },
      ],
    },
  ],
};

/** Flat, ordered list of every slide — used by the deck for navigation. */
export const SLIDES = PRESENTATION.sections.flatMap((s) => s.slides);

export const SLIDE_COUNT = SLIDES.length;

export function slideIndexById(id: string): number {
  return SLIDES.findIndex((s) => s.id === id);
}

export const PRESENTATION_SECTIONS = PRESENTATION.sections.map((s, i) => ({
  id: s.id,
  title: s.title,
  index: i,
  firstSlideId: s.slides[0]?.id,
  slideCount: s.slides.length,
}));

/** Slides still needing facilitator review before delivery. */
export const DRAFT_SLIDES = SLIDES.filter((s) => s.draft).map((s) => s.id);
