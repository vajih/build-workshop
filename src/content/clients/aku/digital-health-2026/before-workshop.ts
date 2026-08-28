import type {
  ChecklistItem,
  DiagnosticCommand,
  TroubleshootingEntry,
} from "@/content/types";

export const BRING_CHECKLIST: ChecklistItem[] = [
  {
    id: "bw-laptop",
    label: "Laptop and charger",
    detail: "macOS or Windows. Administrator access to install software.",
    required: true,
  },
  {
    id: "bw-browser",
    label: "A reliable modern browser",
    detail: "Latest Chrome, Edge, or Firefox for the editor and live preview.",
    required: true,
  },
  {
    id: "bw-wifi",
    label: "Ability to join campus Wi-Fi",
    detail: "Test your connection before the session starts.",
    required: true,
  },
];

export const INSTALL_CHECKLIST: ChecklistItem[] = [
  {
    id: "bw-vscode",
    label: "Visual Studio Code",
    detail: "The code editor used throughout the workshop.",
    required: true,
  },
  {
    id: "bw-git",
    label: "Git",
    detail: "Version control. Needed for every commit checkpoint.",
    required: true,
  },
  {
    id: "bw-node",
    label: "Node.js and npm (LTS)",
    detail: "Runs the local development server and the Vercel CLI.",
    required: true,
  },
  {
    id: "bw-github",
    label: "A GitHub account",
    detail: "Sign in and verify your email before the workshop.",
    required: true,
  },
  {
    id: "bw-copilot",
    label: "GitHub Copilot access",
    detail:
      "Copilot enabled in VS Code, signed in, with Chat and Agent mode available.",
    required: true,
  },
  {
    id: "bw-vercel",
    label: "A Vercel account",
    detail: "Sign up with your GitHub account so deployment is one step.",
    required: true,
  },
];

export const OPTIONAL_CHECKLIST: ChecklistItem[] = [
  {
    id: "bw-claude",
    label: "Claude Code",
    detail:
      "Only if the instructor confirms it is required for your session. Not needed for Build 1.",
    required: false,
  },
  {
    id: "bw-supabase",
    label: "Supabase account",
    detail: "Optional. Only for later builds that choose to add a backend.",
    required: false,
  },
  {
    id: "bw-twilio",
    label: "Twilio / WhatsApp sandbox",
    detail:
      "Instructor demonstration only. Not required for any hands-on build today.",
    required: false,
  },
];

export const DIAGNOSTICS: DiagnosticCommand[] = [
  { command: "git --version", expected: "git version 2.x.x" },
  { command: "node --version", expected: "v20.x.x or v22.x.x" },
  { command: "npm --version", expected: "10.x.x or newer" },
  { command: "code --version", expected: "1.x.x on the first line" },
];

export const DIAGNOSTICS_EXPECTED =
  "Each command should print a version number. If any command reports “command not found”, that tool is not installed or not on your PATH — fix it before the workshop using the troubleshooting notes below.";

export const MAC_CODE_COMMAND_STEPS: string[] = [
  "Open VS Code.",
  "Press Command + Shift + P.",
  "Type: Shell Command: Install 'code' command in PATH — and select it.",
  "Close and reopen Terminal.",
  "Run: code --version",
];

export const BEFORE_TROUBLESHOOTING: TroubleshootingEntry[] = [
  {
    problem: "“git: command not found” on macOS",
    fix: "Run xcode-select --install to install the Command Line Tools, then reopen Terminal and try git --version again.",
  },
  {
    problem: "“git is not recognized” on Windows",
    fix: "Install Git for Windows from git-scm.com, accept the default options, then open a new PowerShell window.",
  },
  {
    problem: "“node: command not found”",
    fix: "Install the Node.js LTS installer from nodejs.org, then open a new terminal window so the PATH refreshes.",
  },
  {
    problem: "“code: command not found” on macOS",
    fix: "Follow the five steps above to install the 'code' command in your PATH, then restart Terminal.",
  },
  {
    problem: "Copilot Chat has no Agent mode",
    fix: "Update VS Code and the GitHub Copilot and GitHub Copilot Chat extensions to the latest version, then reload the window. Confirm your Copilot subscription is active.",
  },
];
