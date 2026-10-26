import Collection from "@/components/Collection";
import Enquiry from "@/components/Enquiry";
import Film from "@/components/Film";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Manifesto from "@/components/Manifesto";
import Nav from "@/components/Nav";
import Pillars from "@/components/Pillars";
import Preloader from "@/components/Preloader";
import Sectors from "@/components/Sectors";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Manifesto />
        <Film />
        <Pillars />
        <Collection />
        <Sectors />
        <Enquiry />
      </main>
      <Footer />
    </>
  );
}
