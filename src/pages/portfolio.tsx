"use client";

import React, { useRef, useEffect } from "react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import PortfolioHeroSection from "@/components/portfolio/portfolio-hero-section";
import WorkShowcaseSection from "@/components/portfolio/portfolio-workshowcase-section";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function PortfolioPage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();
  const isMobile = useIsMobile();

  useEffect(() => {
    setScrollContainerRef(scrollContainerRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className={`relative w-full overflow-y-auto ${
        isMobile ? "h-auto min-h-screen bg-transparent" : "h-screen"
      }`}
    >
      <div className={isMobile ? "flex flex-col relative w-full" : ""}>
        <PortfolioHeroSection />
        <WorkShowcaseSection outerScrollContainerRef={scrollContainerRef} />
      </div>
      {/* Dummy scrollable content only needed for desktop parallax scroll-jacking */}
      {!isMobile && <div className="h-screen" />}
    </div>
  );
}