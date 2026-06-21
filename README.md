# Faeze Naghavi — Portfolio (Next.js)

Faeze Naghavi's personal portfolio, built with Next.js 16 (App Router) + TypeScript + Tailwind CSS, with GSAP animation and a 3D visual signature with Three.js in Hero.

## Run the project on your system

```bash
npm install
npm run dev
```

Then open the address `http://localhost:3000` in the browser.

To build the final version (Production Build):

```bash
npm run build
npm start
```

## Project structure

```
app/
layout.tsx ← Metadata, fonts (Space Grotesk / Inter / JetBrains Mono)
page.tsx ← Final page layout (all sections together)
globals.css ← Base styles and color tokens
components/
Hero.tsx ← Introduction section + Three.js scene + GSAP login animation
Reveal.tsx ← Scrolling animation (GSAP ScrollTrigger)
Nav.tsx, About.tsx, Skills.tsx, Work.tsx, Experience.tsx, Contact.tsx, Footer.tsx
BlueprintGrid.tsx ← Blueprint grid background
PlateLabel.tsx ← “PLATE — XX” label above each section
lib/
data.ts ← All text content (Skills, Projects, Experience) — go here for Open Content Editor
```

## Content Personalization

To change any part of the text (skills, projects, work experience, email), just edit the `lib/data.ts` file; the components will automatically display the new content.

## Accessibility and Performance

- `prefers-reduced-motion` respected: 3D rotation and GSAP effects are disabled if the user has reduced animation enabled on their operating system.
- Keyboard Focus is visible on all links and buttons.
- Three.js scene is properly disposed when the component is unmounted to avoid memory leaks.
