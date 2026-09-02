import { NextResponse } from "next/server";
import { existsSync } from "node:fs";
import { writeFile } from "node:fs/promises";
import path from "node:path";
import type { DeckOrder } from "@/lib/deck-order";

const SLUG_PATTERN = /^[a-z0-9-]+$/;

interface SavePayload extends DeckOrder {
  clientSlug: string;
  workshopSlug: string;
}

/**
 * Persists deck-order.json for a workshop — used by the Deck Editor
 * (Facilitate Mode → Reorder & hide slides). Dev-only: the deployed app's
 * filesystem is read-only and any write there would vanish on the next
 * deploy, so this refuses outside `next dev`. Save locally, then commit and
 * push (or ask Claude to) to make the change live.
 */
export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      {
        error:
          "Editing only works when running the app locally (npm run dev). The deployed site can't save changes to itself.",
      },
      { status: 403 },
    );
  }

  const body = (await request.json()) as Partial<SavePayload>;
  const { clientSlug, workshopSlug, hidden, order } = body;

  if (
    typeof clientSlug !== "string" ||
    typeof workshopSlug !== "string" ||
    !SLUG_PATTERN.test(clientSlug) ||
    !SLUG_PATTERN.test(workshopSlug) ||
    !Array.isArray(hidden) ||
    !hidden.every((id) => typeof id === "string") ||
    typeof order !== "object" ||
    order === null
  ) {
    return NextResponse.json({ error: "Malformed request." }, { status: 400 });
  }

  const filePath = path.join(
    process.cwd(),
    "src/content/clients",
    clientSlug,
    workshopSlug,
    "deck-order.json",
  );

  if (!existsSync(filePath)) {
    return NextResponse.json(
      { error: `No deck-order.json found for ${clientSlug}/${workshopSlug}.` },
      { status: 404 },
    );
  }

  const payload: DeckOrder = { hidden, order: order as Record<string, string[]> };
  await writeFile(filePath, `${JSON.stringify(payload, null, 2)}\n`, "utf-8");

  return NextResponse.json({ ok: true });
}
