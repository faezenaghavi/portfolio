import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0F1B2D",
        panel: "#14233A",
        line: "#21385A",
        paper: "#F4EFE4",
        slate: "#8FA0B5",
        copper: "#D98B4B",
        "copper-dim": "#B96F35",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(to right, rgba(33,56,90,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(33,56,90,0.5) 1px, transparent 1px)",
      },
      backgroundSize: {
        grid: "64px 64px",
      },
      maxWidth: {
        sheet: "1180px",
      },
    },
  },
  plugins: [],
};
export default config;
