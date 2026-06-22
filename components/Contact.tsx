"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// اگر ایمپورت profile مشکل دارد، مستقیماً مقادیر را اینجا بگذار:
const profile = {
  name: "Faezeh Naghavi",
  email: "nqwyfayzh@gmail.com",
  location: "Falkenstein, Saxony, DE",
  github: "https://github.com/your-username", // لینک واقعی GitHub خودت را بده
};

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger, SplitText);

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const formCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const split = SplitText.create(headRef.current!, {
        type: "chars,words",
        mask: "chars",
        autoSplit: true,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            once: true,
          },
        })
        .from(".contact-eyebrow", {
          opacity: 0,
          y: 12,
          duration: 0.5,
          ease: "power3.out",
        })
        .from(
          split.chars,
          {
            opacity: 0,
            yPercent: 100,
            stagger: 0.022,
            duration: 0.55,
            ease: "power3.out",
          },
          "-=0.2"
        )
        .from(
          ".contact-sub",
          { opacity: 0, y: 16, duration: 0.55, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          formCardRef.current,
          { opacity: 0, y: 40, duration: 0.7, ease: "power3.out" },
          "-=0.3"
        )
        .from(
          ".contact-link",
          {
            opacity: 0,
            y: 10,
            stagger: 0.07,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.4"
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const btn = btnRef.current;
    if (!btn) return;

    const onMove = (e: MouseEvent) => {
      const r = btn.getBoundingClientRect();
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      gsap.to(btn, {
        x: dx * 0.22,
        y: dy * 0.22,
        duration: 0.4,
        ease: "power2.out",
      });
    };

    const onLeave = () =>
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1,0.5)" });

    btn.addEventListener("mousemove", onMove);
    btn.addEventListener("mouseleave", onLeave);

    return () => {
      btn.removeEventListener("mousemove", onMove);
      btn.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !message.trim()) {
      setError("Please fill in all fields.");
      gsap.fromTo(
        formCardRef.current,
        { x: -6 },
        { x: 0, duration: 0.4, ease: "elastic.out(4,0.3)" }
      );
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (!key) {
      setError(
        "Access key missing — add NEXT_PUBLIC_WEB3FORMS_KEY in .env.local"
      );
      setStatus("error");
      return;
    }

    setError("");
    setStatus("loading");

    try {
      const formData = new FormData();
      formData.append("access_key", key);
      formData.append("subject", `Portfolio inquiry from ${name}`);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      formData.append("botcheck", "false");
      formData.append("replyto", email);

      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Submission failed.");
      }

      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");

      gsap.fromTo(
        ".success-state",
        { opacity: 0, scale: 0.92, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.65, ease: "back.out(1.6)" }
      );
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      setStatus("error");
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 md:py-40 border-b border-line overflow-hidden"
    >
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        <div className="mb-16 md:mb-20">
          <p className="contact-eyebrow font-mono text-xs tracking-widest2 uppercase text-copper mb-5">
            Plate — 06 / Contact
          </p>
          <h2
            ref={headRef}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-semibold text-paper leading-[1.08] max-w-2xl"
          >
            Let&apos;s build something worth noticing.
          </h2>
          <p className="contact-sub mt-5 text-slate text-sm md:text-base leading-relaxed max-w-sm">
            {profile.location}. Open to remote and international projects.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* فرم اصلی */}
          <div
            ref={formCardRef}
            className="border border-line bg-panel/50 p-8 md:p-12"
          >
            {status === "success" ? (
              <div className="success-state py-16 flex flex-col items-center text-center gap-5">
                <svg className="w-16 h-16" viewBox="0 0 64 64" fill="none">
                  <circle cx="32" cy="32" r="30" stroke="#21385A" strokeWidth="1.5" />
                  <circle
                    cx="32"
                    cy="32"
                    r="30"
                    stroke="#D98B4B"
                    strokeWidth="1.5"
                    strokeDasharray="188.5"
                    strokeDashoffset="188.5"
                    style={{ animation: "dash 0.7s ease forwards 0.1s" }}
                  />
                  <path
                    d="M20 33l9 9 15-18"
                    stroke="#D98B4B"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeDasharray="40"
                    strokeDashoffset="40"
                    style={{ animation: "dash 0.4s ease forwards 0.7s" }}
                  />
                </svg>
                <style>{`@keyframes dash { to { stroke-dashoffset: 0 } }`}</style>
                <p className="font-display text-2xl font-semibold text-paper">
                  Message sent, {name.split(" ")[0] || "there"}!
                </p>
                <p className="text-slate text-sm max-w-xs leading-relaxed">
                  I&apos;ll get back to you at <span className="text-paper">{email}</span> within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setName("");
                    setEmail("");
                    setMessage("");
                    setStatus("idle");
                  }}
                  className="font-mono text-[10px] tracking-widest2 uppercase text-copper border border-copper/30 px-5 py-2.5 hover:bg-copper/10 transition-colors mt-2"
                >
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-0">
                <div className="group border-b border-line focus-within:border-copper transition-colors duration-300 pb-1 mb-8">
                  <label className="font-mono text-[10px] tracking-widest2 uppercase text-slate group-focus-within:text-copper transition-colors block mb-1">
                    Your name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-transparent text-paper text-lg placeholder:text-slate/30 focus:outline-none py-1"
                    autoComplete="name"
                  />
                </div>

                <div className="group border-b border-line focus-within:border-copper transition-colors duration-300 pb-1 mb-8">
                  <label className="font-mono text-[10px] tracking-widest2 uppercase text-slate group-focus-within:text-copper transition-colors block mb-1">
                    Email address
                  </label>
                  <input
                    type="email"
                    placeholder="jane@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-transparent text-paper text-lg placeholder:text-slate/30 focus:outline-none py-1"
                    autoComplete="email"
                  />
                </div>

                <div className="group border-b border-line focus-within:border-copper transition-colors duration-300 pb-1 mb-10">
                  <label className="font-mono text-[10px] tracking-widest2 uppercase text-slate group-focus-within:text-copper transition-colors block mb-1">
                    Tell me about your project
                  </label>
                  <textarea
                    rows={4}
                    placeholder="I need a landing page with scroll animations…"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-transparent text-paper text-base placeholder:text-slate/30 focus:outline-none py-1 resize-none leading-relaxed"
                  />
                </div>

                {error && (
                  <p className="font-mono text-xs text-red-400 border-l-2 border-red-400 pl-3 mb-6">
                    {error}
                  </p>
                )}

                <div className="flex items-center gap-5">
                  <button
                    ref={btnRef}
                    type="submit"
                    disabled={status === "loading"}
                    className="font-mono text-xs tracking-widest2 uppercase bg-copper text-ink px-8 py-4 hover:bg-paper transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-3"
                  >
                    {status === "loading" ? (
                      <>
                        <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Sending
                      </>
                    ) : (
                      "Send message →"
                    )}
                  </button>
                  <p className="font-mono text-[10px] tracking-widest2 uppercase text-slate/50">
                    Reply within 24 h
                  </p>
                </div>

                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />
              </form>
            )}
          </div>

          {/* ← اسلاید‌های کنار فرم (email، GitHub، Availability) اینجا هستند */}
          <div className="space-y-3">
            <a
              href={`mailto:${profile.email}?subject=${encodeURIComponent("Project Inquiry — Let's Build Something")}&body=${encodeURIComponent("Hi Faeze,\n\nI found your portfolio and would like to discuss a project.\n\nBest regards,")}`}
              className="contact-link group block border border-copper/30 hover:border-copper bg-copper/5 hover:bg-copper/10 p-7 transition-all duration-300"
            >
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-slate mb-3">
                Or email directly
              </p>
              <p className="text-paper text-sm group-hover:text-copper transition-colors break-all leading-relaxed">
                {profile.email}
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-widest2 uppercase text-copper/60 group-hover:text-copper transition-colors">
                Open email client
                <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform inline-block">
                  ↗
                </span>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link group block border border-line hover:border-slate/50 bg-panel/40 p-7 transition-all duration-300"
            >
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-slate mb-3">
                GitHub
              </p>
              <p className="text-paper text-sm group-hover:text-copper transition-colors">
                github.com/{profile.github.split("/").pop()}
              </p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] tracking-widest2 uppercase text-slate/50 group-hover:text-slate transition-colors">
                View repositories
                <span className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform inline-block">
                  ↗
                </span>
              </div>
            </a>

            <div className="contact-link border border-line bg-panel/40 p-7">
              <p className="font-mono text-[10px] tracking-widest2 uppercase text-slate mb-4">
                Availability
              </p>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-paper text-sm">Open to new projects</span>
              </div>
              <p className="font-mono text-[10px] text-slate/50 mt-1">
                Remote • Worldwide • Full-time & contract
              </p>
            </div>
          </div>
        </div>

        {!process.env.NEXT_PUBLIC_WEB3FORMS_KEY &&
          process.env.NODE_ENV === "development" && (
            <div className="mt-8 border border-amber-500/30 bg-amber-500/5 p-5">
              <p className="font-mono text-xs text-amber-400">
                ⚠ <strong>SETUP:</strong>{" "}
                <a
                  href="https://web3forms.com"
                  target="_blank"
                  rel="noopener"
                  className="underline"
                >
                  web3forms.com
                </a>
                {" "}→ get free key → add to{" "}
                <code className="bg-amber-500/10 px-1">.env.local</code>:{" "}
                <code className="text-amber-300">
                  NEXT_PUBLIC_WEB3FORMS_KEY=your_key
                </code>
              </p>
            </div>
          )}
      </div>
    </section>
  );
}