import Reveal from "@/components/Reveal";
import { profile } from "@/lib/data";


export default function Contact() {
  return (
    <section id="contact" className="py-28 md:py-36">
      <div className="mx-auto max-w-sheet px-6 md:px-10 text-center">
        <Reveal>
          <p className="font-mono text-xs tracking-widest2 uppercase text-copper mb-6">
            Plate — 05 / Contact
          </p>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-paper leading-tight max-w-2xl mx-auto">
            Have a project in mind? Let&#x2019;s build it.
          </h2>
          <p className="text-slate mt-6 max-w-md mx-auto leading-relaxed">
            {profile.location}. Open to remote, international, front-end
            and UI animation projects.
          </p>


          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://mail.google.com/mail?q=${profile.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest2 uppercase bg-copper text-ink px-7 py-3.5 hover:bg-paper transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-xs tracking-widest2 uppercase border border-line text-paper px-7 py-3.5 hover:border-copper hover:text-copper transition-colors"
            >
              GitHub →
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}