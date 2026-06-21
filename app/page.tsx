import BlueprintGrid from "@/components/BlueprintGrid";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative font-body">
      <BlueprintGrid />
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}
