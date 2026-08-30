import type { Slide } from "@/content/types";

/**
 * The original Frictionless Building deck is embedded as a self-contained
 * chapter. Set `include` to false to skip a source slide without renumbering
 * routes or editing the original HTML asset.
 */
export const FRICTIONLESS_CHAPTER_CONFIG = [
  {
    sourceSlide: 1,
    id: "frictionless-01-build-something",
    title: "Build Something",
    include: true,
  },
  {
    sourceSlide: 2,
    id: "frictionless-02-introduction",
    title: "Introduction",
    include: true,
  },
  {
    sourceSlide: 3,
    id: "what-changed-2",
    title: "Then → Now",
    include: true,
  },
  {
    sourceSlide: 4,
    id: "what-changed-ai-primer",
    title: "AI in 120 Seconds",
    include: true,
  },
  {
    sourceSlide: 5,
    id: "frictionless-05-model-efficiency",
    title: "Model Efficiency",
    include: true,
  },
  {
    sourceSlide: 6,
    id: "frictionless-06-workbench",
    title: "The Workbench",
    include: true,
  },
  {
    sourceSlide: 7,
    id: "frictionless-07-one-window",
    title: "One Window",
    include: true,
  },
  {
    sourceSlide: 8,
    id: "frictionless-08-start-before-ready",
    title: "Start Before You Are Ready",
    include: true,
  },
  {
    sourceSlide: 9,
    id: "frictionless-09-barista-ai",
    title: "Barista-AI",
    include: true,
  },
  {
    sourceSlide: 10,
    id: "frictionless-10-edge-hardware",
    title: "Edge Hardware",
    include: true,
  },
  {
    sourceSlide: 11,
    id: "frictionless-11-useful-experience",
    title: "The Useful Experience Is the Product",
    include: true,
  },
  {
    sourceSlide: 12,
    id: "frictionless-12-code-can-act",
    title: "Code Can Move, Sense, Understand, Decide, and Act",
    include: true,
  },
  {
    sourceSlide: 13,
    id: "frictionless-13-what-will-you-build",
    title: "What Will You Build?",
    include: true,
  },
] as const;

export const FRICTIONLESS_CHAPTER_SLIDES: Slide[] =
  FRICTIONLESS_CHAPTER_CONFIG.filter((entry) => entry.include).map((entry) => ({
    id: entry.id,
    type: "concept",
    section: "what-changed",
    layout: "frictionless-embed",
    embedSlide: entry.sourceSlide,
    title: entry.title,
  }));
