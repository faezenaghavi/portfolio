export const profile = {
  name: "Faeze Naghavi",
  role: "Front-End Developer",
  location: "Iran — Available Remote / Worldwide",
  email: "nqwyfayzh@gmail.com",
  github: "https://github.com/faezenaghavi",
  tagline: "Building interfaces with React, motion & dimension.",
  summary:
    "Front-end developer with 1.5+ years of experience building modern, responsive web applications with React, Next.js, and TypeScript. I work closely with backend and design teams to ship scalable interfaces, connect REST/GraphQL APIs, and optimize performance — with a particular focus on bringing interfaces to life through GSAP animation and Three.js.",
};

export const stats = [
  { value: "1.5+", label: "Years building production UI" },
  { value: "5", label: "Shipped client & product builds" },
  { value: "2", label: "Native languages, EN working fluency" },
];

export const skillGroups = [
  {
    id: "01",
    title: "Core Front-End",
    items: ["HTML5", "CSS3", "JavaScript (ES6+)", "TypeScript", "React.js", "Next.js", "Tailwind CSS"],
  },
  {
    id: "02",
    title: "State & Data",
    items: ["Context API", "Redux Toolkit", "React Query", "REST API", "GraphQL"],
  },
  {
    id: "03",
    title: "Animation & 3D",
    items: ["GSAP", "ScrollTrigger", "Three.js", "Interaction Design", "Micro-animation"],
  },
  {
    id: "04",
    title: "Tooling",
    items: ["Git / GitHub", "Vite", "Webpack", "npm / Yarn", "Figma"],
  },
];

export type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  linkLabel?: string;
};

export const projects: Project[] = [
  {
    id: "01",
    title: "Cinema Booking Platform",
    description:
      "A responsive movie booking interface built with Next.js and TypeScript, with lazy-loading and code-splitting for fast first paint, and React Query handling API state and error/loading flows.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "React Query"],
    link: "https://github.com/faezenaghavi/tazmin-intern",
    linkLabel: "View repository",
  },
  {
    id: "02",
    title: "Javaneh Sabz — Online Tutoring Panel",
    description:
      "Student and teacher dashboards for an elementary tutoring platform, including purchased courses, saved favorites, and a reusable component system shared across both roles.",
    tags: ["React.js", "UI/UX", "REST API", "GraphQL"],
  },
  {
    id: "03",
    title: "Bahaam — Team Task & Attendance Platform",
    description:
      "A multi-user web platform for logging attendance, assigning tasks, and forecasting completion times for teams and classrooms, with calendar-based scheduling views.",
    tags: ["React.js", "TypeScript", "Tailwind CSS", "Figma"],
  },
  {
    id: "04",
    title: "Sepidbam — Corporate Site & Landing Pages",
    description:
      "Company website and a set of conversion-focused landing pages, built in close collaboration with the design team and optimized for mobile and desktop performance.",
    tags: ["React.js", "Next.js", "Tailwind CSS"],
  },
  {
    id: "05",
    title: "UrumTrade — Trading Management Dashboard",
    description:
      "An internal dashboard for managing trading accounts, built with **Next.js 16** (App Router), featuring advanced form flows, client-side validation, and live data from backend APIs. I contributed collaboratively to the **Frontend section only** for **Arom Sima Company**.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "REST API"],
    link: "https://github.com/faezenaghavi/urumtrade",
    linkLabel: "View repository",
  },
  {
    id: "06",
    title: "Saray Mobl Iranian — Online Furniture Store",
    description:
      "An e-commerce furniture store website built with Next.js and Tailwind CSS, featuring fabric material selection, product detail customization by users, and an interactive UI for personalizing products before purchase.",
    tags: ["Next.js", "Tailwind CSS", "React.js", "UI/UX", "Product Customization"],
    link: "https://github.com/faezenaghavi/mobliranian",
    linkLabel: "View repository",
  },
];

export const experience = [
  {
    period: "8 months",
    role: "Front-End Developer",
    org: "Pars Sakhtar — Tabriz University Science & Technology Park",
    description:
      "Developed user interfaces with React and JavaScript, implemented responsive layouts for mobile and desktop, connected to backend APIs, and optimized page performance in close collaboration with backend and design teams.",
  },
  {
    period: "Contract",
    role: "Front-End Developer",
    org: "Sepidbam, UrumTrade, Bahaam, Joone Sabz",
    description:
      "Delivered front-end builds for multiple independent clients and products — corporate sites, internal dashboards, and multi-user platforms — from Figma hand-off to deployed, API-connected interfaces.",
  },
  {
    period: "2021 – 2025",
    role: "BSc, Biology",
    org: "Urmia University",
    description:
      "Transitioned into front-end development after completing a biology degree — bringing the same attention to structure and detail to interface work.",
  },
];

export const strengths = [
  "Fast learner across new tools and stacks",
  "Detail-oriented UI implementation",
  "Strong team collaboration with design & backend",
  "Reliable follow-through on deadlines",
];