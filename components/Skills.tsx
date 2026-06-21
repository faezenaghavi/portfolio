import PlateLabel from "@/components/PlateLabel";
import Reveal from "@/components/Reveal";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="py-24 md:py-28 border-b border-line">
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        <PlateLabel index="02" title="Spec / Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line border border-line">
          {skillGroups.map((group, i) => (
            <Reveal
              key={group.id}
              delay={i * 0.06}
              className="bg-ink p-7"
            >
              <p className="font-mono text-[11px] tracking-widest2 uppercase text-copper mb-5">
                {group.id} — {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="font-mono text-sm text-paper/90 border-l border-line pl-3"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
