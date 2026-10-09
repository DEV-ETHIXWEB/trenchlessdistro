import Header from "@/components/Header";
import Hero from "@/components/Hero";
import QuickQuote from "@/components/QuickQuote";
import BrandTicker from "@/components/BrandTicker";
import SpecFinder from "@/components/SpecFinder";
import MostSearched from "@/components/MostSearched";
import Categories from "@/components/Categories";
import TwoDoors from "@/components/TwoDoors";
import VideoBand from "@/components/VideoBand";
import WhyUs from "@/components/WhyUs";
import Support from "@/components/Support";
import Collections from "@/components/Collections";
import Gallery from "@/components/Gallery";
import PatchBand from "@/components/PatchBand";
import EventsDocs from "@/components/EventsDocs";
import Quote from "@/components/Quote";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import MobileActionBar from "@/components/MobileActionBar";
import { PipeSizeProvider } from "@/components/PipeSize";

/*
 * Three movements, in the order an e-commerce buyer expects rather than the
 * order a brochure is written in.
 *
 *   Show the goods. Hero, a two field price request, the brands we carry,
 *   then price and stock for a real part, then the products themselves at a
 *   size you can see. Nobody should have to read a paragraph to learn what
 *   we sell or what it costs.
 *
 *   Then argue. Which door you came through, the warehouse behind the
 *   catalog, why buy here, what the support actually is. This is the part
 *   that needs sentences, and it earns them by coming after the proof.
 *
 *   Then go deeper. The collections, the cure methods photographed, patch
 *   repair as the way in, events and documents, and the full quote form,
 *   which by now already knows the size and the job.
 *
 * The provider wraps the header too: its search box writes to the same job
 * the hero picker and the quote form read.
 */
export default function Home() {
  return (
    <PipeSizeProvider>
      <Header />
      <main id="main" className="flex-1">
        {/* Show the goods */}
        <Hero />
        <QuickQuote />
        <BrandTicker />
        <SpecFinder />
        <MostSearched />
        <Categories />

        {/* Then argue */}
        <TwoDoors />
        <VideoBand />
        <WhyUs />
        <Support />

        {/* Then go deeper */}
        <Collections />
        <Gallery />
        <PatchBand />
        <EventsDocs />
        <Quote />
      </main>
      <Footer />
      <AccessibilityWidget />
      <ChatWidget />
      <MobileActionBar />
    </PipeSizeProvider>
  );
}
