import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandTicker from "@/components/BrandTicker";
import Categories from "@/components/Categories";
import MostSearched from "@/components/MostSearched";
import SpecFinder from "@/components/SpecFinder";
import VideoBand from "@/components/VideoBand";
import Collections from "@/components/Collections";
import Gallery from "@/components/Gallery";
import WhyUs from "@/components/WhyUs";
import Support from "@/components/Support";
import PatchBand from "@/components/PatchBand";
import EventsDocs from "@/components/EventsDocs";
import Quote from "@/components/Quote";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import { PipeSizeProvider } from "@/components/PipeSize";

/*
 * Section order answers a contractor's questions in the order they ask them:
 * what size do you cover (hero) -> whose gear is it (ticker) -> what do you
 * sell (categories, products) -> does it fit my job (finder) -> can you
 * actually ship it (video band) -> show me (collections, gallery) -> why you
 * (why us, support) -> how do I start (patch, events, quote).
 */
export default function Home() {
  return (
    <>
      <Header />
      <main id="main" className="flex-1">
        <PipeSizeProvider>
          <Hero />
          <BrandTicker />
          <Categories />
          <MostSearched />
          <SpecFinder />
        </PipeSizeProvider>
        <VideoBand />
        <Collections />
        <Gallery />
        <WhyUs />
        <Support />
        <PatchBand />
        <EventsDocs />
        <Quote />
      </main>
      <Footer />
      <AccessibilityWidget />
      <ChatWidget />
    </>
  );
}
