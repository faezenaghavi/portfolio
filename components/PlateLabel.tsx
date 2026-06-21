type PlateLabelProps = {
  index: string;
  title: string;
};

export default function PlateLabel({ index, title }: PlateLabelProps) {
  return (
    <div className="flex items-center gap-3 mb-10">
      <span className="font-mono text-xs tracking-widest2 text-copper">
        PLATE — {index}
      </span>
      <span className="h-px flex-1 bg-line" />
      <span className="font-mono text-xs tracking-widest2 text-slate uppercase">
        {title}
      </span>
    </div>
  );
}
