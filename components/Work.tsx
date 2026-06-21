import PlateLabel from "@/components/PlateLabel";
import Reveal from "@/components/Reveal";
import { projects } from "@/lib/data";

export default function Work() {
  return (
    <section id="work" className="py-24 md:py-28 border-b border-line">
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        <PlateLabel index="03" title="Selected Work" />

        <div className="grid md:grid-cols-2 gap-px bg-line border border-line">
          {projects.map((project, i) => (
            <Reveal
              key={project.id}
              delay={(i % 2) * 0.08}
              className="bg-ink p-8 flex flex-col justify-between min-h-[280px]"
            >
              <div>
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  <h3 className="font-display text-xl text-paper">
                    {project.title}
                  </h3>
                  <span className="font-mono text-xs text-slate shrink-0">
                    {project.id}
                  </span>
                </div>
                <p className="text-slate text-sm leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] tracking-wide uppercase text-copper border border-copper/40 px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {project.link ? (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs tracking-widest2 uppercase text-paper hover:text-copper transition-colors inline-flex items-center gap-2"
                  >
                    {project.linkLabel ?? "View project"}
                    <span aria-hidden="true">→</span>
                  </a>
                ) : (
                  <span className="font-mono text-xs tracking-widest2 uppercase text-slate/70">
                    Private client project
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
