"use client"; // 1. Added use client directive

import { useEffect, useRef, useState } from "react";
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
  
  // 2. Add a mounted state to delay rendering children
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setScrollContainerRef(scrollContainerRef);
    setIsMounted(true); // 3. Set to true once the ref is successfully attached
    
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  return (
    <main
      ref={scrollContainerRef}
      className="w-full h-screen overflow-y-auto"
    >
      {/* 4. Only render the components once the ref is fully hydrated */}
      {isMounted && (
        <>
          <AboutHero />
          <AboutIntro />
          <AboutFounder />
          <CoreValues />
          <CommunitySection />
          <Footer />
        </>
      )}
    </main>
  );
}