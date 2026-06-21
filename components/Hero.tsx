"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { profile, stats } from "@/lib/data";

export default function Hero() {
  const canvasWrapRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLSpanElement>(null);

  // Three.js signature visual: a wireframe polyhedron, drafted like a
  // compass sketch, rotating slowly with subtle mouse parallax.
  useEffect(() => {
    const wrap = canvasWrapRef.current;
    if (!wrap) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const width = wrap.clientWidth;
    const height = wrap.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    wrap.appendChild(renderer.domElement);

    const outerGeometry = new THREE.IcosahedronGeometry(2.1, 1);
    const outerWireframe = new THREE.WireframeGeometry(outerGeometry);
    const outerLines = new THREE.LineSegments(
      outerWireframe,
      new THREE.LineBasicMaterial({ color: 0xd98b4b, transparent: true, opacity: 0.85 })
    );

    const innerGeometry = new THREE.IcosahedronGeometry(1.3, 0);
    const innerWireframe = new THREE.WireframeGeometry(innerGeometry);
    const innerLines = new THREE.LineSegments(
      innerWireframe,
      new THREE.LineBasicMaterial({ color: 0x8fa0b5, transparent: true, opacity: 0.5 })
    );

    const group = new THREE.Group();
    group.add(outerLines, innerLines);
    scene.add(group);

    let frameId = 0;
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;

    function handlePointerMove(e: PointerEvent) {
      const rect = wrap!.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
    }

    function animate() {
      if (!prefersReducedMotion) {
        group.rotation.y += 0.0028;
        group.rotation.x += 0.0008;
        targetRotX += (mouseY * 0.4 - targetRotX) * 0.04;
        targetRotY += (mouseX * 0.4 - targetRotY) * 0.04;
        group.rotation.x += targetRotX * 0.01;
        group.rotation.y += targetRotY * 0.01;
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    }
    animate();

    function handleResize() {
      if (!wrap) return;
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }

    window.addEventListener("resize", handleResize);
    wrap.addEventListener("pointermove", handlePointerMove);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", handleResize);
      wrap.removeEventListener("pointermove", handlePointerMove);
      outerGeometry.dispose();
      outerWireframe.dispose();
      innerGeometry.dispose();
      innerWireframe.dispose();
      (outerLines.material as THREE.Material).dispose();
      (innerLines.material as THREE.Material).dispose();
      renderer.dispose();
      if (wrap.contains(renderer.domElement)) {
        wrap.removeChild(renderer.domElement);
      }
    };
  }, []);

  // GSAP entrance: the headline rises in, and the divider line "draws"
  // left to right like a ruled blueprint line being inked.
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-eyebrow", { opacity: 0, y: 12, duration: 0.5 })
        .from(
          ".hero-word",
          { opacity: 0, y: 28, stagger: 0.08, duration: 0.7 },
          "-=0.2"
        )
        .from(".hero-sub", { opacity: 0, y: 16, duration: 0.6 }, "-=0.4")
        .from(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left center", duration: 0.8 },
          "-=0.5"
        )
        .from(
          ".hero-cta",
          { opacity: 0, y: 12, stagger: 0.08, duration: 0.5 },
          "-=0.4"
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 10, stagger: 0.08, duration: 0.5 },
          "-=0.3"
        )
        .from(
          canvasWrapRef.current,
          { opacity: 0, scale: 0.92, duration: 1 },
          "-=0.9"
        );
    });
    return () => ctx.revert();
  }, []);

  const headlineWords = profile.tagline.split(" ");

  return (
    <section
      id="top"
      className="relative pt-40 pb-24 md:pt-48 md:pb-32 border-b border-line"
    >
      <div className="mx-auto max-w-sheet px-6 md:px-10 grid md:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        <div>
          <p className="hero-eyebrow font-mono text-xs tracking-widest2 uppercase text-copper mb-6">
            Plate — 00 / Front-End Developer
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.08] text-paper"
          >
            {headlineWords.map((word, i) => (
              <span className="hero-word inline-block mr-3" key={i}>
                {word}
              </span>
            ))}
          </h1>

          <p className="hero-sub mt-7 max-w-md text-slate text-base leading-relaxed">
            {profile.summary}
          </p>

          <span
            ref={lineRef}
            className="block h-px bg-line mt-9 mb-9 w-full"
          />

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="hero-cta font-mono text-xs tracking-widest2 uppercase bg-copper text-ink px-6 py-3 hover:bg-paper transition-colors"
            >
              View selected work
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="hero-cta font-mono text-xs tracking-widest2 uppercase border border-line text-paper px-6 py-3 hover:border-copper hover:text-copper transition-colors"
            >
              Email me
            </a>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 max-w-md">
            {stats.map((s) => (
              <div className="hero-stat" key={s.label}>
                <p className="font-display text-2xl text-paper">{s.value}</p>
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
