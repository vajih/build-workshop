import type { TestCase } from "@/content/types";

interface TestCaseTableProps {
  cases: TestCase[];
  /** Column order for the input fields. Defaults to the keys of the first case. */
  columns?: string[];
  caption: string;
}

export function TestCaseTable({ cases, columns, caption }: TestCaseTableProps) {
  const cols = columns ?? Object.keys(cases[0]?.inputs ?? {});

  return (
    <div className="my-4">
      {/* Table for wider screens */}
      <div className="hidden overflow-x-auto rounded-[var(--radius-card)] border border-border-strong sm:block">
        <table className="w-full border-collapse text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="bg-surface-muted text-left">
              {cols.map((c) => (
                <th
                  key={c}
                  scope="col"
                  className="border-b border-border-strong px-3 py-2 font-semibold text-ink"
                >
                  {c}
                </th>
              ))}
              <th
                scope="col"
                className="border-b border-border-strong px-3 py-2 font-semibold text-ink"
              >
                Expected
              </th>
            </tr>
          </thead>
          <tbody>
            {cases.map((tc, i) => (
              <tr key={i} className="odd:bg-surface even:bg-surface-muted/40">
                {cols.map((c) => (
                  <td
                    key={c}
                    className="border-b border-border px-3 py-2 font-mono text-[13px] text-ink-muted"
                  >
                    {tc.inputs[c] ?? "—"}
                  </td>
                ))}
                <td className="border-b border-border px-3 py-2 font-medium text-ink">
                  {tc.expected}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Stacked cards for small screens */}
      <ul className="space-y-3 sm:hidden">
        {cases.map((tc, i) => (
          <li
            key={i}
            className="rounded-[var(--radius-card)] border border-border-strong bg-surface p-3"
          >
            <dl className="space-y-1 text-sm">
              {cols.map((c) => (
                <div key={c} className="flex justify-between gap-3">
                  <dt className="text-ink-subtle">{c}</dt>
                  <dd className="font-mono text-[13px] text-ink-muted">
                    {tc.inputs[c] ?? "—"}
                  </dd>
                </div>
              ))}
              <div className="mt-1 flex justify-between gap-3 border-t border-border pt-1.5">
                <dt className="font-semibold text-ink">Expected</dt>
                <dd className="text-right font-medium text-ink">{tc.expected}</dd>
              </div>
            </dl>
          </li>
        ))}
      </ul>
    </div>
  );
}
