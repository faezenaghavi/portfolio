"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const links = [
  { href: "#work",       label: "Work"       },
  { href: "#skills",     label: "Skills"     },
  { href: "#experience", label: "Experience" },
  { href: "#resume",     label: "Resume"     },
  { href: "#contact",    label: "Contact"    },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    // Subtle progress line at top — shrinks header on deep scroll
    ScrollTrigger.create({
      start: 200,
      onEnter:  () => gsap.to(el, { borderBottomColor: "rgba(33,56,90,1)", duration: 0.4 }),
      onLeaveBack: () => gsap.to(el, { borderBottomColor: "rgba(33,56,90,0.7)", duration: 0.4 }),
    });
  }, []);

  return (
    <header
      ref={navRef}
      className="fixed top-0 inset-x-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-sm transition-all"
    >
      <nav className="mx-auto max-w-sheet px-6 md:px-10 h-16 flex items-center justify-between">
        <a
          href="#top"
          className="font-mono text-sm tracking-widest2 text-paper hover:text-copper transition-colors"
        >
          Faeze Naghavi
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="font-mono text-xs tracking-widest2 uppercase text-slate hover:text-paper transition-colors duration-200"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="font-mono text-xs tracking-widest2 uppercase border border-copper text-copper px-4 py-2 hover:bg-copper hover:text-ink transition-all duration-300"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
