export default function Footer() {
  return (
    <footer className="border-t border-line py-8 bg-panel/20">
      <div className="mx-auto max-w-sheet px-6 md:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Left: Name */}
          <div className="flex items-center gap-2">
            <svg
              className="w-3.5 h-3.5 text-copper/50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-slate">
              Drafted &amp; built by <span className="text-slate/90">Faeze Naghavi</span>
            </p>
          </div>

          {/* Right: Year */}
          <div className="flex items-center gap-2">
            <p className="font-mono text-[11px] tracking-widest2 uppercase text-slate/60">
              Rev. {new Date().getFullYear()}
            </p>
            
            <svg
              className="w-2.5 h-2.5 text-slate/40"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Optional: Tiny bottom line */}
        <div className="mt-6 mx-auto w-16 h-0.5 bg-line/50 rounded-full" />
      </div>
    </footer>
  );
}