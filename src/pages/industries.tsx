import React, { useRef, useEffect } from "react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";

import IndustriesHero from "@/components/industries/industries-hero";
import IndustriesIntro from "@/components/industries/industries-intro";
import IndustriesList from "@/components/industries/industries-list";
import DesignStack from "@/components/industries/industries-design-stack";
import TechScrollSection from "@/components/industries/industries-advanced-technologies";
import Footer from "@/components/layout/footer";

export default function IndustriesPage() {
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
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden"
    >
      <IndustriesHero />
      <IndustriesIntro />
      <IndustriesList />
      <DesignStack />
      <TechScrollSection />
      <Footer />
    </main>
  );
}