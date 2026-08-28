import type { ResourceSection } from "@/content/types";

/**
 * Every link should point at official documentation where one exists.
 * `tag` drives the visible label:
 *   required  -> "Required for Build 1"
 *   optional  -> "Optional for later builds"
 *   demo      -> "Instructor demonstration only"
 */
export const RESOURCE_SECTIONS: ResourceSection[] = [
  {
    id: "vscode",
    title: "Visual Studio Code",
    links: [
      { label: "Download VS Code", href: "https://code.visualstudio.com/download", tag: "required" },
      { label: "VS Code getting started guide", href: "https://code.visualstudio.com/docs/getstarted/getting-started", tag: "required" },
      { label: "Integrated terminal", href: "https://code.visualstudio.com/docs/terminal/basics", tag: "required" },
      { label: "Launching from the command line (code command)", href: "https://code.visualstudio.com/docs/configure/command-line", tag: "required" },
    ],
  },
  {
    id: "git",
    title: "Git",
    links: [
      { label: "Download and install Git", href: "https://git-scm.com/downloads", tag: "required" },
      { label: "Git basics — recording changes", href: "https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository", tag: "required" },
      { label: "First-time Git setup (name and email)", href: "https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup", tag: "required" },
    ],
  },
  {
    id: "github",
    title: "GitHub",
    links: [
      { label: "Create a GitHub account", href: "https://github.com/join", tag: "required" },
      { label: "Verify your email address", href: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-personal-account-on-github/managing-email-preferences/verifying-your-email-address", tag: "required" },
      { label: "GitHub Hello World quickstart", href: "https://docs.github.com/en/get-started/start-your-journey/hello-world", tag: "optional" },
    ],
  },
  {
    id: "copilot",
    title: "GitHub Copilot",
    links: [
      { label: "Set up GitHub Copilot in VS Code", href: "https://docs.github.com/en/copilot/get-started/quickstart", tag: "required" },
      { label: "Copilot Chat in VS Code", href: "https://code.visualstudio.com/docs/copilot/chat/copilot-chat", tag: "required" },
      { label: "Agent mode in VS Code", href: "https://code.visualstudio.com/docs/copilot/chat/chat-agent-mode", tag: "required" },
      { label: "Prompt engineering for Copilot", href: "https://docs.github.com/en/copilot/using-github-copilot/prompt-engineering-for-github-copilot", tag: "optional" },
    ],
  },
  {
    id: "node",
    title: "Node.js",
    links: [
      { label: "Download Node.js (LTS)", href: "https://nodejs.org/en/download", tag: "required" },
      { label: "How to install Node.js", href: "https://nodejs.org/en/learn/getting-started/how-to-install-nodejs", tag: "required" },
      { label: "An introduction to npm", href: "https://docs.npmjs.com/about-npm", tag: "optional" },
    ],
  },
  {
    id: "vercel",
    title: "Vercel",
    links: [
      { label: "Sign up for Vercel", href: "https://vercel.com/signup", tag: "required" },
      { label: "Vercel CLI — overview", href: "https://vercel.com/docs/cli", tag: "required" },
      { label: "Deploying with the Vercel CLI", href: "https://vercel.com/docs/cli/deploying-from-cli", tag: "required" },
      { label: "Deploying static sites", href: "https://vercel.com/docs/deployments/overview", tag: "optional" },
    ],
  },
  {
    id: "supabase",
    title: "Supabase",
    intro: "Only needed if a later build chooses to add a hosted backend. Not used in Build 1.",
    links: [
      { label: "Supabase — getting started", href: "https://supabase.com/docs/guides/getting-started", tag: "optional" },
      { label: "Supabase JavaScript quickstart", href: "https://supabase.com/docs/reference/javascript/introduction", tag: "optional" },
    ],
  },
  {
    id: "twilio",
    title: "Twilio and WhatsApp",
    intro: "Shown by the instructor only. No account is required to attend or to complete any hands-on build.",
    links: [
      { label: "Twilio — SMS quickstart", href: "https://www.twilio.com/docs/messaging/quickstart", tag: "demo" },
      { label: "Twilio WhatsApp sandbox", href: "https://www.twilio.com/docs/whatsapp/sandbox", tag: "demo" },
    ],
  },
  {
    id: "accessibility",
    title: "Accessibility",
    links: [
      { label: "WCAG 2.2 quick reference", href: "https://www.w3.org/WAI/WCAG22/quickref/", tag: "optional" },
      { label: "WAI-ARIA authoring practices", href: "https://www.w3.org/WAI/ARIA/apg/", tag: "optional" },
      { label: "MDN — accessible forms", href: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML", tag: "optional" },
    ],
  },
  {
    id: "responsible-ai",
    title: "Responsible healthcare AI",
    links: [
      { label: "WHO — ethics and governance of AI for health", href: "https://www.who.int/publications/i/item/9789240029200", tag: "optional" },
      { label: "WHO — large multi-modal models guidance", href: "https://www.who.int/publications/i/item/9789240084759", tag: "optional" },
    ],
  },
];
