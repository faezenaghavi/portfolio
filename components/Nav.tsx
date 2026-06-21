"use client";

const links = [
  { href: "#work", label: "Work" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-line/70 bg-ink/80 backdrop-blur-sm">
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
                className="font-mono text-xs tracking-widest2 uppercase text-slate hover:text-paper transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#contact"
          className="font-mono text-xs tracking-widest2 uppercase border border-copper text-copper px-4 py-2 hover:bg-copper hover:text-ink transition-colors"
        >
          Hire me
        </a>
      </nav>
    </header>
  );
}
