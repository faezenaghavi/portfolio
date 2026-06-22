"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Menu, X, ArrowUpRight } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const navRef = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#work");

  useEffect(() => {
    const el = navRef.current;
    if (!el) return;

    gsap.from(el, {
      y: -80,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
    });

    ScrollTrigger.create({
      start: 120,

      onEnter() {
        gsap.to(el, {
          backgroundColor: "rgba(15,18,28,.85)",
          backdropFilter: "blur(12px)",
          duration: 0.3,
        });
      },

      onLeaveBack() {
        gsap.to(el, {
          backgroundColor: "rgba(15,18,28,.0)",
          duration: 0.3,
        });
      },
    });

   links.forEach((item)=>{

const section = document.querySelector(item.href);

if(!section) return;


ScrollTrigger.create({

trigger: section,

start:"top center",

onEnter(){
  setActive(item.href);
},

onEnterBack(){
  setActive(item.href);
}

});

});
  }, []);

  return (
    <header
      ref={navRef}
      className="
fixed top-0 inset-x-0 z-[999]
border-b border-line/70
bg-ink/80
backdrop-blur-sm
transition-all
"
    >
      <nav
        className="
mx-auto
max-w-sheet
px-6 md:px-10
h-16
flex
items-center
justify-between
"
      >
        {/* Brand */}

        <a
          href="#top"
          className="
font-mono
text-sm
tracking-widest2
text-paper
flex items-center gap-3
group
"
        >
          <span
            className="
w-8 h-8
border border-copper
flex items-center justify-center
text-copper
group-hover:bg-copper
group-hover:text-ink
transition
"
          >
            F
          </span>
          FAEZE NAGHAVI
        </a>

        {/* Links */}

        <ul
          className="
hidden md:flex
items-center
gap-8
"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`

relative
font-mono
text-xs
tracking-widest2
uppercase
transition-colors

${active === link.href ? "text-copper" : "text-slate hover:text-paper"}

`}
              >
                {link.label}

                <span
                  className={`

absolute
left-0
-bottom-2
h-px
bg-copper
transition-all duration-300

${active === link.href ? "w-full" : "w-0"}

`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* Hire button */}

        <a
          href="#contact"
          className="
hidden md:flex
items-center gap-2
font-mono
text-xs
tracking-widest2
uppercase

border
border-copper

text-copper

px-4
py-2

hover:bg-copper
hover:text-ink

transition-all
duration-300
"
        >
          Hire me
          <ArrowUpRight size={14} />
        </a>

        {/* Mobile */}

        <button
          onClick={() => setOpen(!open)}
          className="
md:hidden
text-paper
"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div
          className="
md:hidden
bg-ink/95
border-t
border-line/70
"
        >
          <ul
            className="
p-6
flex
flex-col
gap-6
"
          >
            {links.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="
font-mono
text-xs
uppercase
tracking-widest2
text-slate
hover:text-copper
transition
"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
