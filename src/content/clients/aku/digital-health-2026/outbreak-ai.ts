/** Content for the Outbreak-AI demonstration page. Refine wording here. */

export const OUTBREAK_AI_INTRO =
  "Outbreak-AI is a demonstration of a small, domain-specific model running entirely on an ESP32 microcontroller — a device that costs a few dollars and fits in your palm. It does not call the cloud. It reads a handful of weekly surveillance numbers and returns an interpreted signal: stable, watch, or investigate.";

export interface ContentSection {
  id: string;
  heading: string;
  body: string[];
}

export const OUTBREAK_AI_SECTIONS: ContentSection[] = [
  {
    id: "what",
    heading: "What Outbreak-AI is",
    body: [
      "A compact model trained for one narrow job: turning weekly case counts and baselines for a set of locations into a prioritised watchlist.",
      "It runs on an ESP32 — no laptop, no server, no internet connection required once the device is programmed.",
      "The output is a signal for a human to act on, not a decision. A person still decides what to do.",
    ],
  },
  {
    id: "why-small",
    heading: "Why a small domain-specific model matters",
    body: [
      "A model that only has to do one thing can be tiny, fast, and cheap to run.",
      "It can live at the point of care or in a district office, where connectivity and budgets are limited.",
      "Narrow scope makes its behaviour easier to test, explain, and trust.",
    ],
  },
  {
    id: "edge-vs-cloud",
    heading: "Edge AI versus cloud AI",
    body: [
      "Cloud AI sends data to a remote service and depends on a network, an account, and ongoing cost.",
      "Edge AI runs the model on the device in front of you. The data never leaves the room.",
      "For routine surveillance in a clinic, edge AI removes three points of failure at once: the link, the login, and the bill.",
    ],
  },
  {
    id: "offline",
    heading: "Offline operation",
    body: [
      "The device works during an internet outage, a power-grid problem, or in a facility that never had a reliable connection.",
      "Results are available immediately, on site, without waiting for a sync.",
    ],
  },
  {
    id: "privacy",
    heading: "Privacy and resilience",
    body: [
      "Aggregate counts by location and week are enough for a signal. No patient records are needed and none should be used.",
      "Because nothing is transmitted, there is no data in transit to intercept and no third-party service holding a copy.",
      "If one device fails, another can be programmed from the same small model file.",
    ],
  },
  {
    id: "use-case",
    heading: "The epidemiological use case",
    body: [
      "A district health officer reviews a dozen locations every week. Some weeks a number jumps for a boring reason — a reporting delay, a data-entry error, a clinic reopening.",
      "Outbreak-AI gives a consistent first pass: which locations deserve a closer look this week, ranked, with the ratio that triggered each flag.",
      "It shortens the time between a number moving and a person noticing.",
    ],
  },
];

export const DEMO_FLOW: string[] = [
  "Show the ESP32 and explain that there is no network connection.",
  "Enter this week's counts and baselines for three or four example locations.",
  "The device returns a ranked signal list: stable, watch, investigate.",
  "Change one location's count to cross a threshold and show the signal update.",
  "Disconnect nothing — there was never a connection — and repeat to show it is fully local.",
];

export const AUDIENCE_QUESTIONS: string[] = [
  "What would you want to see before trusting a signal like this in your own district?",
  "Which surveillance numbers do you already collect weekly that this could read?",
  "Where would a device like this sit — the clinic, the district office, the lab?",
  "What is the risk of a false reassurance, and how would you guard against it?",
  "Who owns the threshold values, and how often should they be reviewed?",
];

export const BOUNDARIES: { term: string; definition: string }[] = [
  {
    term: "Signal interpretation",
    definition:
      "Comparing a number to its expected range and flagging it for attention. This is what Outbreak-AI does.",
  },
  {
    term: "Outbreak investigation",
    definition:
      "A structured field process: verifying cases, defining the affected population, generating hypotheses, and responding. People do this, not the device.",
  },
  {
    term: "Medical diagnosis",
    definition:
      "Determining a disease in an individual patient. Outbreak-AI does not do this and must never be presented as if it does.",
  },
];

export const OUTBREAK_AI_LIMITS =
  "Outbreak-AI does not confirm outbreaks and does not replace epidemiologists. It reads aggregate numbers and returns a prioritised signal. Every flag still needs a person to verify the data and decide on a response.";
