"use client";

const SKILLS = [
  "React.js", "Next.js", "TypeScript", "GSAP", "Three.js",
  "Tailwind CSS", "Redux Toolkit", "GraphQL", "REST API",
  "ScrollTrigger", "Figma → Code", "WebGL", "Animation",
];

function TickerItem({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-4 mx-5">
      <span className="w-1.5 h-1.5 rounded-full bg-copper shrink-0" aria-hidden="true" />
      <span className="font-mono text-xs tracking-widest2 uppercase text-slate whitespace-nowrap">
        {label}
      </span>
    </span>
  );
}

export default function Ticker() {
  // duplicate for seamless loop
  const items = [...SKILLS, ...SKILLS];

  return (
    <div
      className="border-y border-line py-5 overflow-hidden"
      aria-label="Skills ticker"
      aria-hidden="true"
    >
      <div className="ticker-track flex w-max">
        {items.map((s, i) => (
          <TickerItem key={i} label={s} />
        ))}
      </div>
    </div>
  );
}
