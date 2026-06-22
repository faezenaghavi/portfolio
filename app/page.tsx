import BlueprintGrid  from "@/components/BlueprintGrid";
import Cursor        from "@/components/Cursor";
import Nav           from "@/components/Nav";
import Hero          from "@/components/Hero";
import Ticker        from "@/components/Ticker";
import About         from "@/components/About";
import Skills        from "@/components/Skills";
import Work          from "@/components/Work";
import Experience    from "@/components/Experience";
import Resume        from "@/components/Resume";
import Contact       from "@/components/Contact";
import Footer        from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative font-body">
      <BlueprintGrid />
      <Cursor />
      <Nav />
      <Hero />
      <Ticker />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Resume />
      <Contact />
      <Footer />
    </main>
  );
}
