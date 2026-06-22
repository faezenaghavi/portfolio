"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { profile } from "@/lib/data";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText);

const TO = "nqwyfayzh@gmail.com";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const sideRef = useRef<HTMLDivElement>(null);
  const emailBtnRef = useRef<HTMLAnchorElement>(null);
  const githubBtnRef = useRef<HTMLAnchorElement>(null);

  // ── entrance animations ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 78%", once: true },
        defaults: { ease: "power3.out" },
      });

      tl.from(eyebrowRef.current, { opacity: 0, y: 10, duration: 0.4 });

      SplitText.create(headRef.current!, {
        type: "chars,words",
        mask: "chars",
        autoSplit: true,
        onSplit(self) {
          return tl.from(
            self.chars,
            { opacity: 0, yPercent: 110, stagger: 0.02, duration: 0.5 },
            "-=0.15",
          );
        },
      });

      tl.from(subRef.current, { opacity: 0, y: 14, duration: 0.45 }, "-=0.25")
        .from(cardsContainerRef.current, { opacity: 0, y: 32, duration: 0.6 }, "-=0.3")
        .from(sideRef.current, { opacity: 0, x: 20, duration: 0.55 }, "-=0.45");
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // ── magnetic button effect for email ──
  useEffect(() => {
    const btn = emailBtnRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      xTo((e.clientX - (left + width / 2)) * 0.3);
      yTo((e.clientY - (top + height / 2)) * 0.3);
    };
    const onLeave = () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── magnetic button effect for github ──
  useEffect(() => {
    const btn = githubBtnRef.current;
    if (!btn) return;

    const xTo = gsap.quickTo(btn, "x", { duration: 0.4, ease: "power2.out" });
    const yTo = gsap.quickTo(btn, "y", { duration: 0.4, ease: "power2.out" });

    const onMove = (e: MouseEvent) => {
      const { left, top, width, height } = btn.getBoundingClientRect();
      xTo((e.clientX - (left + width / 2)) * 0.3);
      yTo((e.clientY - (top + height / 2)) * 0.3);
    };
    const onLeave = () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);
    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-40 border-b border-line overflow-hidden bg-gradient-to-b from-panel/30 to-transparent"
    >
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        {/* ── header ── */}
        <div className="mb-20 md:mb-24">
          <p
            ref={eyebrowRef}
            className="font-mono text-xs tracking-widest2 uppercase text-copper mb-6"
          >
            Plate — 06 / Contact
          </p>
          <h2
            ref={headRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-paper leading-[1.08] max-w-3xl"
          >
            Let&apos;s build something worth noticing.
          </h2>
          <p
            ref={subRef}
            className="mt-6 text-slate text-base md:text-lg leading-relaxed max-w-md"
          >
            {profile.location}. Open to remote and international projects.
          </p>
        </div>

        {/* ── grid ── */}
        <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 items-start">
          {/* ── contact cards ── */}
          <div ref={cardsContainerRef} className="grid sm:grid-cols-2 gap-6">
            {/* Email card */}
            <a
              ref={emailBtnRef}
              href={`https://mail.google.com/mail?q=mailto:${TO}?subject=${encodeURIComponent("Project Inquiry — Let's Build Something")}&body=${encodeURIComponent("Hi Faeze,\n\nI found your portfolio and would like to discuss a project.\n\nBest regards,")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-copper/30 hover:border-copper bg-copper/5 hover:bg-copper/10 p-8 md:p-10 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-copper/0 via-copper/5 to-copper/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <svg
                    className="w-6 h-6 text-copper group-hover:text-copper/80 transition-colors"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <p className="font-mono text-[10px] tracking-widest2 uppercase text-copper">
                    Email
                  </p>
                </div>

                <p className="text-paper text-lg group-hover:text-copper transition-colors font-medium">
                  {TO}
                </p>

                <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-widest2 uppercase text-copper/60 group-hover:text-copper transition-colors">
                  Open Gmail
                  <span className="group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform inline-block">
                    ↗
                  </span>
                </div>
              </div>
            </a>

            {/* GitHub card */}
            <a
              ref={githubBtnRef}
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block border border-line hover:border-slate/50 bg-panel/40 hover:bg-panel/60 p-8 md:p-10 transition-all duration-300 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-slate/0 via-slate/5 to-slate/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                  <svg
                    className="w-6 h-6 text-slate group-hover:text-copper transition-colors"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.768-1.587 8.205-6.087 8.205-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <p className="font-mono text-[10px] tracking-widest2 uppercase text-slate group-hover:text-copper transition-colors">
                    GitHub
                  </p>
                </div>

                <p className="text-paper text-lg group-hover:text-copper transition-colors font-medium">
                  github.com/{profile.github.replace(/\/$/, "").split("/").pop()}
                </p>

                <div className="mt-6 flex items-center gap-2 font-mono text-[10px] tracking-widest2 uppercase text-slate/50 group-hover:text-slate transition-colors">
                  View repositories
                  <span className="group-hover:translate-x-1.5 group-hover:-translate-y-0.5 transition-transform inline-block">
                    ↗
                  </span>
                </div>
              </div>
            </a>
          </div>

          {/* ── sidebar ── */}
          <div ref={sideRef} className="space-y-5">
            {/* Availability card */}
            <div className="border border-line bg-panel/40 p-8 md:p-10 rounded-2xl">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-slate mb-5">
                Availability
              </p>
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-paper text-base font-medium">
                  Open to new projects
                </span>
              </div>
              <p className="font-mono text-[10px] text-slate/50 mt-2">
                Remote • Worldwide • Full-time & contract
              </p>
            </div>

            {/* Quick note */}
            <div className="border border-line bg-panel/30 p-8 md:p-10 rounded-2xl">
              <p className="text-slate text-sm leading-relaxed">
                I reply within 24 hours. For faster response, include project details
                and timeline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}