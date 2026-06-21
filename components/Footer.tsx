export default function Footer() {
  return (
    <footer className="border-t border-line py-8">
      <div className="mx-auto max-w-sheet px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-slate">
          Drafted &amp; built by Faeze Naghavi
        </p>
        <p className="font-mono text-[11px] tracking-widest2 uppercase text-slate/70">
          Rev. {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
