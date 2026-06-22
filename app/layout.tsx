import type { Metadata } from "next";
import "./globals.css";
import { JsClassProvider } from "./providers"; // یا مسیر درست

export const metadata: Metadata = {
  title: "Faeze Naghavi — Front-End Developer",
  description:
    "Front-End Developer specializing in React, Next.js, TypeScript, GSAP animation and Three.js. Available for remote, international projects.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@500;600;700;800&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <JsClassProvider />
      </body>
    </html>
  );
}