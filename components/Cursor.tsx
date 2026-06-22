"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mm = window.matchMedia("(pointer: fine)");
    if (!mm.matches) return;

    document.documentElement.classList.add("has-custom-cursor");

    const dot  = dotRef.current!;
    const ring = ringRef.current!;

    let mx = window.innerWidth  / 2;
    let my = window.innerHeight / 2;

    const moveDot = (x: number, y: number) =>
      gsap.set(dot, { x, y });

    const moveRing = (x: number, y: number) =>
      gsap.to(ring, { x, y, duration: 0.5, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      mx = e.clientX; my = e.clientY;
      moveDot(mx, my);
      moveRing(mx, my);
    };

    const onEnterLink = () =>
      gsap.to(ring, { scale: 1.9, borderColor: "rgba(217,139,75,0.9)", duration: 0.25 });

    const onLeaveLink = () =>
      gsap.to(ring, { scale: 1, borderColor: "rgba(217,139,75,0.55)", duration: 0.25 });

    window.addEventListener("pointermove", onMove, { passive: true });

    const interactives = document.querySelectorAll("a, button, [role=button]");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", onEnterLink);
      el.addEventListener("mouseleave", onLeaveLink);
    });

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", onEnterLink);
        el.removeEventListener("mouseleave", onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
    </>
  );
}
