import { useEffect, useRef } from "react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import AboutHero from "@/components/about/about-hero";
import AboutIntro from "@/components/about/about-intro";
import AboutFounder from "@/components/about/about-founder";
import CoreValues from "@/components/about/about-core-values";
import CommunitySection from "@/components/about/about-community";
import Footer from "@/components/layout/footer";

export default function AboutPage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();

  useEffect(() => {
    setScrollContainerRef(scrollContainerRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  return (
    <main
      ref={scrollContainerRef}
      className="w-full h-screen overflow-y-auto"
    >
      <AboutHero />
      <AboutIntro />
      <AboutFounder />
      <CoreValues />
      <CommunitySection />
      <Footer />
    </main>
  );
}
