import type { Presentation } from "@/content/types";
import {
  DISCLAIMER,
  SYNTHETIC_DATA_LABEL,
  SIGNAL_NOT_OUTBREAK,
  PRODUCT_EVOLUTION,
} from "./build-one";
import { BUILD1_DEBRIEF } from "./facilitator";
import { DEMO_FLOW, AUDIENCE_QUESTIONS } from "./outbreak-ai";
import { RUBRIC, PROMPTING_TIPS } from "./team-challenge";
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
  BUILD_IN_THE_OPEN,
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
          note: "On your laptop, type: aku-build-workshop-portal.vercel.app/build-1",
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
          kicker: "Build 1 · about 20 minutes",
          title: "AKU Outbreak Signal",
          lead: "Go from an empty folder to a live prototype with an interactive Karachi map.",
          body: [
            "Set up the project and open Copilot",
            "One prompt builds the calculator and the map",
            "Test it in the browser",
            "Commit and deploy — you leave with a live URL",
          ],
          participantHref: "/participate/build-1",
        },
        {
          id: "welcome-7",
          type: "process",
          section: "welcome",
          kicker: "While you build · about 20 minutes",
          title: "A number becomes a place",
          items: [
            { label: "Enter", detail: "cases this week and the normal weekly baseline" },
            { label: "Calculate & classify", detail: "cases ÷ baseline → Stable · Watch · Investigate" },
            { label: "Locate", detail: "a coloured marker on the Karachi map" },
            { label: "Analyse", detail: "open the popup — location, cases, baseline, ratio, classification" },
            { label: "Pace", detail: "setup → build → test → deploy, about 20 minutes — not a race. Finished early? Build 2." },
          ],
          note: `${SYNTHETIC_DATA_LABEL} · A red marker is powerful — a prompt to verify, not proof of an outbreak.`,
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
          id: "welcome-11b-build-2",
          type: "statement",
          section: "welcome",
          kicker: "If you have time",
          title: "Finished early? Keep building",
          lead: "Build 2 adds features to the same app — a geospatial history, then explainable signals. Optional today; there for you after the workshop.",
          participantHref: "/participate/build-2",
        },
        {
          id: "welcome-12",
          type: "process",
          section: "welcome",
          kicker: "Product evolution",
          title: "Where the app goes — Build 1, then Build 2",
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
          items: [
            { label: "You led.", detail: "AI turned your intent into a working app." },
            { label: "Data became insight.", detail: "Raw numbers became a clear signal." },
            { label: "You shipped.", detail: "A tested app went live." },
          ],
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
          imageScale: 1.08,
          callout: {
            stat: "8.3%",
            text: "of U.S. healthcare firms reported using AI in 2025 — about a third the rate of information services. Not merely a lag; an opening for the researchers, clinicians, and builders in this room.",
          },
          source:
            "McKinsey, Digital America (2015) · Nguyen et al., JAMA Health Forum (2025), U.S. Census BTOS",
          draft: true,
        },
        ...FRICTIONLESS_CHAPTER_SLIDES.slice(1, 5),
        {
          id: "what-changed-pit-stops",
          type: "concept",
          section: "what-changed",
          layout: "click-video",
          kicker: "Observe the system",
          title: "Faster is built.",
          lead: "The same job, separated by seven decades.",
          note: "As you watch: what changed beyond the stopwatch?",
          video: {
            youtubeId: "RRy_73ivcms",
            title: "Formula 1 Pit Stops 1950 & Today",
            author: "Pictures of the Past",
            thumbnail: "https://i.ytimg.com/vi/RRy_73ivcms/hqdefault.jpg",
          },
        },
        {
          id: "what-changed-pit-stops-discussion",
          type: "discussion",
          section: "what-changed",
          layout: "discussion-build",
          kicker: "Class discussion",
          title: "What did you notice?",
          question: "What changed — and what made the change possible?",
          note: "Discuss first. Then click to synthesize.",
          items: [
            { label: "Small gains compound.", detail: "Seconds fall through relentless iteration." },
            { label: "Systems beat heroics.", detail: "Roles, tools, and timing work as one." },
            { label: "Parallel work wins.", detail: "Specialists act simultaneously, not sequentially." },
            { label: "Feedback fuels speed.", detail: "Every stop becomes data for the next." },
            { label: "Tools reset limits.", detail: "Better tools make new performance possible." },
          ],
          conclusion: {
            label: "New tools accelerate innovation.",
            detail: "They shorten every build–test–learn loop.",
          },
        },
        ...FRICTIONLESS_CHAPTER_SLIDES.slice(5, 7),
        {
          id: "what-changed-optional-break",
          type: "reflection",
          section: "what-changed",
          layout: "break-timer",
          kicker: "Room vote · optional break",
          title: "Pause or press on?",
          lead: "Stretch. Hydrate. Let your neurons cache.",
          note: "Vote with a show of hands. The presenter selects the room’s choice.",
          timerMinutes: 10,
          stoicMessage:
            "Pause on purpose. What matters is how deliberately you return.",
        },
        ...FRICTIONLESS_CHAPTER_SLIDES.slice(7, 10),
        {
          id: "what-changed-khayal",
          type: "concept",
          section: "what-changed",
          layout: "mobile-showcase",
          kicker: "Family care companion",
          title: "Meet Khayal.",
          lead:
            "Everyday care updates become one calm, shared picture for the family.",
          note: "Caregiver update → Daily orientation → Medication clarity",
          externalCta: {
            label: "Open Khayal",
            href: "https://khayal-vert.vercel.app/",
          },
          mobileScreens: [
            {
              label: "Caregiver update",
              detail: "Report care in plain language",
              src: "/images/presentation/khayal/caregiver-update.png",
              alt: "Khayal caregiver message simulator showing the kinds of simple care updates a caregiver can report",
            },
            {
              label: "Today at a glance",
              detail: "A calm orientation for Ami",
              src: "/images/presentation/khayal/today-at-a-glance.png",
              alt: "Khayal orientation screen showing Ami's location, next routine, family call, and medication reminder",
            },
            {
              label: "Medication clarity",
              detail: "Routines and adherence together",
              src: "/images/presentation/khayal/medication-clarity.png",
              alt: "Khayal medications screen showing doses taken, adherence, next dose, and today's medicines",
            },
          ],
        },
        {
          id: "what-changed-khayal-architecture",
          type: "process",
          section: "what-changed",
          layout: "khayal-architecture",
          kicker: "From report to shared understanding",
          title: "Khayal — Family Care Coordination Architecture",
          lead:
            "WhatsApp and voice updates become validated context, a secure care record and one useful family summary.",
          note: "Caring for them, even when you can’t be there.",
        },
        {
          id: "what-changed-dcp-opportunity",
          type: "concept",
          section: "what-changed",
          layout: "dcp-opportunity",
          kicker: "The industry opportunity",
          title: "The patient was ready. The practice never answered.",
          lead:
            "Across U.S. dentistry, the opportunity is often not more demand—it is capturing the demand already calling.",
          body: [
            "Calls arrive while teams are caring for patients.",
            "Manual follow-up loses urgency and intent.",
            "Disconnected systems hide the cost of every missed moment.",
          ],
          note:
            "We saw an opening for AI: respond instantly, coordinate the next action and make growth measurable.",
          images: [
            {
              src: "/images/presentation/dcp/industry-problem-solution.png",
              alt: "Illustrated comparison between a chaotic manual dental front desk and a streamlined AI scheduling experience",
              tag: "01 · Operational friction",
              caption: "A busy front desk turns patient intent into queues, callbacks and missed moments.",
              aspectRatio: "1695 / 928",
            },
            {
              src: "/images/presentation/dcp/industry-revenue-recovery.png",
              alt: "Illustrated Dental Connect Pro concept showing missed calls becoming AI-assisted bookings and recovered revenue",
              tag: "02 · Growth opportunity",
              caption: "AI can help practices answer sooner, book consistently and see what converts.",
              aspectRatio: "2752 / 1536",
            },
          ],
          source:
            "Illustrative DCP concept visuals · figures shown are not independently verified",
        },
        {
          id: "what-changed-dcp",
          type: "concept",
          section: "what-changed",
          layout: "desktop-showcase",
          kicker: "Patient growth platform",
          title: "Meet Dental Connect Pro.",
          lead:
            "Answer every opportunity. Convert inquiries into appointments. Measure what drives growth.",
          note: "Acquire patients → Activate practices → Grow with evidence",
          externalCta: {
            label: "Open DCP",
            href: "https://dcp-dusky.vercel.app/demo5",
          },
          desktopScreens: [
            {
              label: "Patient acquisition",
              detail: "Turn website demand into bookings",
              src: "/images/presentation/dcp/patient-acquisition.png",
              alt: "Dental Connect Pro public booking experience inviting patients to book a dental appointment",
            },
            {
              label: "Sales operations",
              detail: "Move practices from prospect to go-live",
              src: "/images/presentation/dcp/sales-territories.png",
              alt: "Dental Connect Pro protected sales portal sign-in describing clinic onboarding, integrations, pipeline, and commissions",
            },
            {
              label: "Practice intelligence",
              detail: "See calls, bookings and growth signals",
              src: "/images/presentation/dcp/practice-portal.png",
              alt: "Dental Connect Pro protected practice portal sign-in describing bookings, call volume, booking history, and billing",
            },
          ],
        },
        {
          id: "what-changed-dcp-architecture",
          type: "process",
          section: "what-changed",
          layout: "dcp-architecture",
          kicker: "From inquiry to measurable growth",
          title: "Dental Connect Pro — AI-Powered Patient Growth Architecture",
          lead:
            "Every patient inquiry becomes an immediate response, a coordinated action and a measurable growth signal.",
          note:
            "The AI front desk—and patient growth platform—built for modern dental practices.",
        },
        ...FRICTIONLESS_CHAPTER_SLIDES.slice(10),
        {
          id: "what-changed-3",
          type: "concept",
          section: "what-changed",
          title: FRICTIONLESS_BUILDING.headline,
          body: FRICTIONLESS_BUILDING.points,
        },
        {
          id: "what-changed-open",
          type: "concept",
          section: "what-changed",
          layout: "build-open",
          kicker: "A working habit",
          title: BUILD_IN_THE_OPEN.headline,
          body: BUILD_IN_THE_OPEN.points,
          note: "You will practise this today — the idea thread, then the build post.",
          images: [
            {
              src: "/images/presentation/build-open/build-in-the-open.png",
              alt: "A maker posts an early prototype sketch on an open workshop wall while collaborators add feedback and build connected ideas around it",
              caption: "A rough idea, made visible, becomes a place for others to contribute.",
              aspectRatio: "1122 / 1402",
            },
          ],
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
        {
          id: "responsible-ai-prompting",
          type: "process",
          section: "responsible-ai",
          kicker: "For the Team Challenge",
          title: "Five ways to prompt well",
          items: PROMPTING_TIPS,
          note: "Copilot builds what you describe.",
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
          note: "Idea first. Then build.",
        },
        {
          id: "team-challenge-2",
          type: "exercise-launch",
          section: "team-challenge",
          kicker: "Post your idea · 8 minutes",
          title: "Put your idea in the thread before you build",
          lead: "One page: the user, the problem, the one thing, the payoff, what it is not.",
          body: [
            "Fill the Idea Card in the workbook",
            "Post it as a comment on the workshop's LinkedIn thread",
            "No prompting until it is posted",
          ],
          note: "This is building in the open — share it before it is polished.",
          participantHref: "/participate/team-challenge#idea",
        },
        {
          id: "team-challenge-3",
          type: "process",
          section: "team-challenge",
          kicker: "Comment round · 12 minutes",
          title: "Read the thread. Comment on two or three.",
          items: [
            { label: "Read", detail: "every team's idea in the thread — about four minutes" },
            { label: "Comment", detail: "one question or one strength, on two or three other cards" },
            { label: "Round", detail: "twenty seconds per team in the room: the user and the one thing" },
            { label: "Your card", detail: "read your comments — more will land after today" },
          ],
          note: "Questions, not verdicts. Every team builds.",
        },
        {
          id: "team-challenge-sharpen",
          type: "process",
          section: "team-challenge",
          kicker: "Sharpen · 3 minutes",
          title: "Three questions, then lock it",
          items: [
            { label: "The user", detail: "still the right person — and just one?" },
            { label: "The scope", detail: "cut it in half; keep the one function that matters" },
            { label: "The room", detail: "did another idea show a gap, an overlap, a simpler version?" },
          ],
          note: "Update the card. This version is what you build and present.",
        },
        {
          id: "team-challenge-clock",
          type: "process",
          section: "team-challenge",
          kicker: "The Section 6 clock",
          title: "About 60 minutes",
          items: [
            { label: "Write + post your idea", detail: "8 min" },
            { label: "Comment on the thread + sharpen", detail: "12 min" },
            { label: "Build", detail: "40 min" },
            { label: "Then", detail: "five-minute presentations" },
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
          id: "presentations-close-share",
          type: "exercise-launch",
          section: "presentations-close",
          kicker: "Before you leave",
          title: "Post what you built",
          lead: "Close the arc — the build post, on the same thread as your idea.",
          body: [
            "One line on what it does, the named user, and a screenshot of the demo.",
            "One thing AI did well, one thing you corrected.",
            "Honest framing: an educational prototype on synthetic data — not a real deployment.",
            "Tag Vajih Khan and use #AKUBuildWorkshop — the comments keep coming.",
          ],
          participantHref: "/participate/team-challenge#share",
        },
        {
          id: "presentations-close-5",
          type: "process",
          section: "presentations-close",
          title: "Next steps",
          items: [
            { label: "Keep the repo", detail: "Your Build 1 project is yours." },
            { label: "Post about today", detail: "Your build, what surprised you, what's next — #AKUBuildWorkshop, tag Vajih Khan." },
            { label: "Use the resources page", detail: "Official docs for every tool." },
            { label: "Repeat the cycle", detail: "Define, prompt, supervise, test, commit, publish — in the open." },
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
          layout: "share-post",
          kicker: "Build in the open",
          title: "Thank you — now post about it",
          lead: "Tell people what you built today and what you will try next. #AKUBuildWorkshop, tag Vajih Khan — see you in the comments.",
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
