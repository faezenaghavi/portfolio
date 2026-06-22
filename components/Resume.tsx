"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import PlateLabel from "@/components/PlateLabel";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const RESUME_PATH = "/resume.pdf";

export default function Resume() {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef   = useRef<HTMLDivElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* info panel slides in from left */
      gsap.from(infoRef.current, {
        opacity: 0, x: -40, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: infoRef.current, start: "top 82%", once: true },
      });

      /* PDF frame fades + scales in */
      gsap.from(frameRef.current, {
        opacity: 0, y: 36, scale: 0.97, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: frameRef.current, start: "top 82%", once: true },
      });

      /* line-draw on the border */
      gsap.from(".resume-border", {
        scaleX: 0, transformOrigin: "left center",
        duration: 1.1, ease: "expo.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="resume"
      ref={sectionRef}
      className="py-24 md:py-28 border-b border-line"
    >
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        <PlateLabel index="05" title="Resume / CV" />

        {/* thin animated top-rule */}
        <div className="resume-border h-px bg-copper/40 mb-10 w-full" />

        <div className="grid md:grid-cols-[0.85fr_1.15fr] gap-12 items-start">

          {/* ── Left: info + download ── */}
          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="font-display text-2xl md:text-3xl font-semibold text-paper leading-snug">
                Prefer a classic,<br /> one-page format?
              </h3>
              <p className="text-slate text-sm leading-relaxed mt-4 max-w-sm">
                Download the complete PDF version of my résumé — experience,
                skills, projects and education in one print-ready page.
              </p>
            </div>

            <div className="space-y-3">
              <a
                href={RESUME_PATH}
                download
                className="flex items-center justify-between group w-full border border-copper/50 hover:border-copper bg-copper/5 hover:bg-copper/10 px-6 py-4 transition-all duration-300"
              >
                <span className="font-mono text-xs tracking-widest2 uppercase text-copper">
                  Download PDF
                </span>
                <svg className="w-4 h-4 text-copper group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M16 12l-4 4-4-4M12 4v12"/>
                </svg>
              </a>

              <a
                href={RESUME_PATH}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between group w-full border border-line hover:border-slate px-6 py-4 transition-all duration-300"
              >
                <span className="font-mono text-xs tracking-widest2 uppercase text-slate group-hover:text-paper transition-colors">
                  Open in new tab
                </span>
                <svg className="w-4 h-4 text-slate group-hover:text-paper transition-colors" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                </svg>
              </a>
            </div>

            {/* meta tags */}
            <div className="border-t border-line pt-6 space-y-3">
              {[
                ["Format", "PDF — A4, single page"],
                ["Updated", "June 2026"],
                ["Languages", "English"],
              ].map(([k, v]) => (
                <div key={k} className="flex items-baseline gap-3">
                  <span className="font-mono text-[10px] tracking-widest2 uppercase text-copper w-20 shrink-0">{k}</span>
                  <span className="text-slate text-sm">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: inline PDF preview ── */}
          <div ref={frameRef} className="border border-line bg-panel">
            {/* title bar */}
            <div className="flex items-center justify-between px-4 py-2.5 border-b border-line bg-ink/60">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-line" />
                  <span className="w-3 h-3 rounded-full bg-line" />
                  <span className="w-3 h-3 rounded-full bg-copper/50" />
                </div>
              </div>
              <span className="font-mono text-[11px] text-slate">
                Faeze_Naghavi_Resume.pdf
              </span>
              <span className="font-mono text-[10px] tracking-widest2 uppercase text-copper">
                Preview
              </span>
            </div>

            <object
              data={RESUME_PATH}
              type="application/pdf"
              className="w-full h-[520px] md:h-[640px] block"
              aria-label="Faeze Naghavi résumé preview"
            >
              <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                <svg className="w-10 h-10 text-slate/40" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"/>
                </svg>
                <p className="text-slate text-sm leading-relaxed max-w-xs">
                  Your browser doesn't support inline PDF preview. Use the buttons on the left to download or open the résumé in a new tab.
                </p>
              </div>
            </object>
          </div>

        </div>
      </div>
    </section>
  );
}
