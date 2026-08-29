import { PageIntro } from "@/components/PageIntro";
import { PrintButton } from "@/components/PrintButton";
import { getBundle, type WorkshopRouteParams } from "@/lib/workshop-route";

export const metadata = { title: "Presentation as text (print)" };

export default async function BackupSlidesPage({
  params,
}: {
  params: Promise<WorkshopRouteParams>;
}) {
  const { presentation } = await getBundle(params);

  return (
    <div className="container-page py-8">
      <PageIntro
        eyebrow="Backup"
        title="Presentation, as text"
        subtitle="Every slide's content as a readable outline — for printing or if the deck cannot be projected."
        aside={<PrintButton />}
      />

      <div className="mt-6 space-y-8">
        {presentation.sections.map((section, si) => (
          <section key={section.id}>
            <h2 className="border-b border-border pb-1 text-xl font-bold text-ink">
              {si + 1}. {section.title}
            </h2>
            <div className="mt-3 space-y-4">
              {section.slides.map((slide) => (
                <article key={slide.id} className="text-sm">
                  <p className="font-semibold text-ink">
                    {slide.kicker ? (
                      <span className="text-accent">{slide.kicker} · </span>
                    ) : null}
                    {slide.title ?? slide.question ?? slide.id}
                    <span className="ml-2 font-normal text-ink-subtle">
                      ({slide.type})
                    </span>
                  </p>
                  {slide.lead ? (
                    <p className="mt-0.5 text-ink-muted">{slide.lead}</p>
                  ) : null}
                  {slide.body?.length ? (
                    <ul className="mt-1 list-disc pl-5 text-ink-muted">
                      {slide.body.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  ) : null}
                  {slide.items?.length ? (
                    <ul className="mt-1 list-disc pl-5 text-ink-muted">
                      {slide.items.map((it) => (
                        <li key={it.label}>
                          <span className="font-medium text-ink">
                            {it.label}
                          </span>
                          {it.detail ? ` — ${it.detail}` : ""}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {slide.columns?.length ? (
                    <div className="mt-1 grid gap-2 sm:grid-cols-2">
                      {slide.columns.map((col) => (
                        <div key={col.heading}>
                          <p className="font-medium text-ink">{col.heading}</p>
                          <ul className="list-disc pl-5 text-ink-muted">
                            {col.points.map((p) => (
                              <li key={p}>{p}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  ) : null}
                  {slide.images?.length ? (
                    <ul className="mt-1 list-disc pl-5 text-ink-muted">
                      {slide.images.map((img) => (
                        <li key={img.src}>
                          {img.tag ? (
                            <span className="font-medium text-ink">
                              {img.tag}:{" "}
                            </span>
                          ) : null}
                          {img.caption ?? img.alt}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {slide.callout ? (
                    <p className="mt-0.5 text-ink-muted">
                      {slide.callout.stat ? (
                        <span className="font-semibold text-ink">
                          {slide.callout.stat}{" "}
                        </span>
                      ) : null}
                      {slide.callout.text}
                    </p>
                  ) : null}
                  {slide.note ? (
                    <p className="mt-0.5 text-xs text-ink-subtle">
                      Note: {slide.note}
                    </p>
                  ) : null}
                  {slide.source ? (
                    <p className="mt-0.5 text-xs text-ink-subtle">
                      Source: {slide.source}
                    </p>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
