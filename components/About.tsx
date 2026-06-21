import PlateLabel from "@/components/PlateLabel";
import Reveal from "@/components/Reveal";
import { strengths } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="py-24 md:py-28 border-b border-line">
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        <PlateLabel index="01" title="About" />

        <div className="grid md:grid-cols-[1fr_1fr] gap-12">
          <Reveal>
            <p className="font-display text-2xl md:text-3xl leading-snug text-paper">
              I came to front-end development from a biology degree —
              and kept the same instinct for structure, precision and
              careful observation, now applied to interfaces instead of
              cells.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="space-y-4">
              {strengths.map((s) => (
                <li
                  key={s}
                  className="flex items-start gap-3 text-slate text-sm leading-relaxed"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 bg-copper" />
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
