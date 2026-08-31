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
    setup: {
      docHref: "https://code.visualstudio.com/download",
      docLabel: "code.visualstudio.com/download",
      steps: [
        "Open the download page and choose the build for your machine — Apple Silicon or Intel on a Mac, the User Installer on Windows.",
        "Windows: run the installer and keep every default, especially “Add to PATH” and “Register Code as an editor for supported file types”.",
        "macOS: drag Visual Studio Code into your Applications folder, then open it once so macOS clears the “downloaded from the internet” prompt.",
        "Open VS Code and sign in with your GitHub account from the account icon at the bottom-left, so Copilot and settings are ready.",
      ],
      verify:
        "Terminal → New Terminal, then run `code --version` — you should see a version number. If not, follow “enable the code command” below.",
    },
  },
  {
    id: "bw-git",
    label: "Git",
    detail: "Version control. Needed for every commit checkpoint.",
    required: true,
    setup: {
      docHref: "https://git-scm.com/downloads",
      docLabel: "git-scm.com/downloads",
      steps: [
        "macOS: the quickest route is to run `xcode-select --install` in Terminal and accept the prompt. Otherwise download the macOS installer from the Git site.",
        "Windows: download “Git for Windows”, run it, and accept the defaults — the important one lets the installer add Git to your PATH.",
        "Close and reopen every terminal window so the new PATH takes effect.",
        "Set your identity once — Git needs it to record commits: `git config --global user.name \"Your Name\"` then `git config --global user.email \"you@example.com\"`.",
      ],
      verify: "`git --version` prints something like `git version 2.43.0`.",
    },
  },
  {
    id: "bw-node",
    label: "Node.js and npm (LTS)",
    detail: "Runs the local development server and the Vercel CLI.",
    required: true,
    setup: {
      docHref: "https://nodejs.org/en/download",
      docLabel: "nodejs.org/en/download",
      steps: [
        "Download the LTS installer — the one marked “Recommended for most users”, not “Current”.",
        "Run it with all defaults. npm is bundled with Node.js; you do not install it separately.",
        "Windows: if it asks about “Tools for Native Modules”, you can leave it unchecked — Build 1 does not need it.",
        "Open a new terminal window so it picks up the newly installed commands.",
      ],
      verify:
        "`node --version` shows `v20.x` or `v22.x`, and `npm --version` shows `10.x` or newer.",
    },
  },
  {
    id: "bw-github",
    label: "A GitHub account",
    detail: "Sign in and verify your email before the workshop.",
    required: true,
    setup: {
      docHref: "https://github.com/join",
      docLabel: "github.com/join",
      steps: [
        "Create an account using an email address you can open during the workshop.",
        "Open the verification email from GitHub and click the link — an unverified account cannot use Copilot or push code.",
        "Sign in to GitHub inside VS Code (the account icon, bottom-left) so it is ready for Copilot and deployment.",
        "If your institution uses single sign-on, complete that sign-in once now so it does not interrupt you later.",
      ],
      verify:
        "github.com shows you signed in, and the VS Code account menu shows your GitHub username.",
    },
  },
  {
    id: "bw-copilot",
    label: "GitHub Copilot access",
    detail:
      "Copilot enabled in VS Code, signed in, with Chat and Agent mode available.",
    required: true,
    setup: {
      docHref: "https://docs.github.com/en/copilot/get-started/quickstart",
      docLabel: "GitHub Copilot quickstart",
      steps: [
        "Confirm you have Copilot access — a paid plan, an active trial, or free access through GitHub Education (students and educators can apply at education.github.com).",
        "In VS Code, open Extensions and install both “GitHub Copilot” and “GitHub Copilot Chat”. Reload the window when prompted.",
        "Sign in when Copilot asks, using the same GitHub account.",
        "Open Copilot Chat and check the mode selector at the bottom of the chat box offers “Agent” — Build 1 uses Agent mode. If it is missing, update VS Code and both extensions, then reload the window.",
      ],
      verify:
        "Copilot Chat opens with no “sign in” banner, and the chat mode selector includes Agent.",
    },
  },
  {
    id: "bw-vercel",
    label: "A Vercel account",
    detail: "Sign up with your GitHub account so deployment is one step.",
    required: true,
    setup: {
      docHref: "https://vercel.com/signup",
      docLabel: "vercel.com/signup",
      steps: [
        "Sign up choosing “Continue with GitHub” — this links the two accounts so deployment is a single command.",
        "Choose the Hobby (free) plan when asked. No credit card is required.",
        "You do not need to install the Vercel CLI now — Build 1 runs it with `npx` and you sign in from the terminal during the exercise.",
        "Optional: sign in early by running `npx vercel@latest login` so the deployment step in Build 1 is instant.",
      ],
      verify:
        "vercel.com/dashboard loads and shows your account — it will have no projects yet.",
    },
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
