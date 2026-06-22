"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { profile, stats } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(SplitText, ScrollTrigger);
}

const TO = "nqwyfayzh@gmail.com";

export default function Hero() {
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef   = useRef<HTMLHeadingElement>(null);
  const lineRef       = useRef<HTMLSpanElement>(null);
  const sectionRef    = useRef<HTMLElement>(null);

  /* ── Three.js scene ── */
  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const W = wrap.clientWidth, H = wrap.clientHeight;

    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    wrap.appendChild(renderer.domElement);

    const mkLines = (radius: number, detail: number, color: number, opacity: number) => {
      const geo  = new THREE.IcosahedronGeometry(radius, detail);
      const wire = new THREE.WireframeGeometry(geo);
      const mat  = new THREE.LineBasicMaterial({ color, transparent: true, opacity });
      const ls   = new THREE.LineSegments(wire, mat);
      return { geo, wire, mat, ls };
    };

    const outer = mkLines(2.1, 1, 0xd98b4b, 0.85);
    const inner = mkLines(1.3, 0, 0x8fa0b5, 0.50);

    const group = new THREE.Group();
    group.add(outer.ls, inner.ls);
    scene.add(group);

    let frameId = 0, mx = 0, my = 0, trX = 0, trY = 0;

    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      mx = (e.clientX - r.left)  / r.width  - 0.5;
      my = (e.clientY - r.top)   / r.height - 0.5;
    };

    const tick = () => {
      if (!reduced) {
        group.rotation.y += 0.0028;
        group.rotation.x += 0.0008;
        trX += (my * 0.4 - trX) * 0.04;
        trY += (mx * 0.4 - trY) * 0.04;
        group.rotation.x += trX * 0.01;
        group.rotation.y += trY * 0.01;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      const nW = wrap.clientWidth, nH = wrap.clientHeight;
      camera.aspect = nW / nH;
      camera.updateProjectionMatrix();
      renderer.setSize(nW, nH);
    };

    window.addEventListener("resize", onResize);
    wrap.addEventListener("pointermove", onPointer);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      wrap.removeEventListener("pointermove", onPointer);
      [outer, inner].forEach(({ geo, wire, mat }) => {
        geo.dispose(); wire.dispose(); mat.dispose();
      });
      renderer.dispose();
      if (wrap.contains(renderer.domElement)) wrap.removeChild(renderer.domElement);
    };
  }, []);

  /* ── GSAP entrance + SplitText ── */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;

      const split = SplitText.create(headlineRef.current!, {
        type: "chars,words",
        mask: "chars",
        autoSplit: true,
      });

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-eyebrow", { opacity: 0, y: 14, duration: 0.55 })
        .from(
          split.chars,
          { opacity: 0, yPercent: 110, stagger: 0.025, duration: 0.65 },
          "-=0.25",
        )
        .from(".hero-sub", { opacity: 0, y: 18, duration: 0.6 }, "-=0.35")
        .from(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center", duration: 0.85, ease: "expo.out" },
          "-=0.55",
        )
        .from(".hero-cta", { opacity: 0, y: 14, stagger: 0.09, duration: 0.5 }, "-=0.45")
        .from(".hero-stat", { opacity: 0, y: 12, stagger: 0.08, duration: 0.5 }, "-=0.35")
        .from(canvasWrapRef.current, { opacity: 0, scale: 0.9, duration: 1.1 }, "-=1.0");

      /* subtle parallax on scroll */
      gsap.to(canvasWrapRef.current, {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative pt-40 pb-24 md:pt-48 md:pb-32 border-b border-line overflow-hidden"
    >
      <div className="mx-auto max-w-sheet px-6 md:px-10 grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <p className="hero-eyebrow font-mono text-xs tracking-widest2 uppercase text-copper mb-6">
            Plate — 00 / Front-End Developer
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl lg:text-[3.6rem] font-semibold leading-[1.08] text-paper"
          >
            {profile.tagline}
          </h1>

          <p className="hero-sub mt-7 max-w-md text-slate text-base leading-relaxed">
            {profile.summary}
          </p>

          <span ref={lineRef} className="block h-px bg-line mt-9 mb-9 w-full" />

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="hero-cta font-mono text-xs tracking-widest2 uppercase bg-copper text-ink px-6 py-3 hover:bg-paper transition-colors duration-300"
            >
              View selected work
            </a>
            
            {/* ✅ اصلاح شده: Gmail مستقیم */}
            <a
              href={`https://mail.google.com/mail?q=mailto:${TO}?subject=${encodeURIComponent("Project Inquiry — Let's Build Something")}&body=${encodeURIComponent("Hi Faeze,\n\nI came across your portfolio and would love to discuss a project.\n\nBest regards,")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta font-mono text-xs tracking-widest2 uppercase border border-line text-paper px-6 py-3 hover:border-copper hover:text-copper transition-colors duration-300"
            >
              Email me
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <p className="font-display text-2xl font-semibold text-paper">{s.value}</p>
                <p className="font-mono text-[10px] tracking-widest2 uppercase text-slate mt-1 leading-tight">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={canvasWrapRef}
          className="relative h-[320px] sm:h-[420px] md:h-[480px] w-full"
          aria-hidden="true"
        />
      </div>
    </section>
  );
}