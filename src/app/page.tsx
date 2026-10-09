import Header from "@/components/Header";
import Hero from "@/components/Hero";
import BrandTicker from "@/components/BrandTicker";
import Categories from "@/components/Categories";
import SpecFinder from "@/components/SpecFinder";
import QuickQuote from "@/components/QuickQuote";
import Collections from "@/components/Collections";
import WhyUs from "@/components/WhyUs";
import TwoDoors from "@/components/TwoDoors";
import Support from "@/components/Support";
import EventsDocs from "@/components/EventsDocs";
import Quote from "@/components/Quote";
import Footer from "@/components/Footer";
import ChatWidget from "@/components/ChatWidget";
import AccessibilityWidget from "@/components/AccessibilityWidget";
import MobileActionBar from "@/components/MobileActionBar";
import QuoteDrawer from "@/components/QuoteDrawer";
import { PipeSizeProvider } from "@/components/PipeSize";

/*
 * The homepage, in the order of Yash's references and the team's call to
 * revamp desktop first and hold the phone to the same design.
 *
 *   Show the goods. Hero with the numbers, the brands, the shelves by
 *   category, then the catalog itself with price, stock and filters, and a
 *   two-field way to get a person on the phone about what was just seen.
 *
 *   Then the reasons. Collections, why contractors buy here, which crew it
 *   is for, and the four problems the support side solves.
 *
 *   Then commit. Training dates and documents, and the full quote form,
 *   which by now already knows the size, the job and the quote list.
 *
 * The provider wraps the header too: its search box writes to the same job
 * the catalog filters and the quote form read.
 */
export default function Home() {
  return (
    <PipeSizeProvider>
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <BrandTicker />
        <Categories />
        <SpecFinder />
        <QuickQuote />

        <Collections />
        <WhyUs />
        <TwoDoors />
        <Support />

        <EventsDocs />
        <Quote />
      </main>
      <Footer />
      <QuoteDrawer />
      <AccessibilityWidget />
      <ChatWidget />
      <MobileActionBar />
    </PipeSizeProvider>
  );
}
