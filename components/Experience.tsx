import PlateLabel from "@/components/PlateLabel";
import Reveal from "@/components/Reveal";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-24 md:py-28 border-b border-line">
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        <PlateLabel index="04" title="Experience" />

        <div className="space-y-0">
          {experience.map((item, i) => (
            <Reveal key={item.org} delay={i * 0.06}>
              <div className="grid md:grid-cols-[140px_1fr] gap-4 md:gap-10 py-7 border-t border-line first:border-t-0 md:first:border-t">
                <p className="font-mono text-xs tracking-widest2 uppercase text-copper">
                  {item.period}
                </p>
                <div>
                  <h3 className="font-display text-lg text-paper">
                    {item.role}{" "}
                    <span className="text-slate font-body text-base">
                      — {item.org}
                    </span>
                  </h3>
                  <p className="text-slate text-sm leading-relaxed mt-2 max-w-2xl">
                    {item.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
