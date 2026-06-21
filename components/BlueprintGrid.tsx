export default function BlueprintGrid() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 bg-blueprint-grid bg-grid opacity-40"
      style={{
        maskImage:
          "radial-gradient(ellipse at top, black 0%, transparent 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse at top, black 0%, transparent 75%)",
      }}
    />
  );
}
