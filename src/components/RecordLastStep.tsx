"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useWorkshop } from "@/lib/workshop-context";

/**
 * Records the current Participant Mode page as "last visited" so the hub and
 * overview can offer "continue where I left off". Renders nothing.
 */
export function RecordLastStep({ base }: { base: string }) {
  const pathname = usePathname();
  const { ready, setLastStep, lastStep } = useWorkshop();

  useEffect(() => {
    if (!ready) return;
    const rel = pathname.startsWith(base)
      ? pathname.slice(base.length) || "/participate"
      : pathname;
    if (rel !== lastStep) setLastStep(rel);
  }, [ready, pathname, base, lastStep, setLastStep]);

  return null;
}
