import React, { useRef, useEffect } from "react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import PortfolioHeroSection from "@/components/portfolio/portfolio-hero-section";
import WorkShowcaseSection from "@/components/portfolio/portfolio-workshowcase-section";

export default function PortfolioPage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();

  useEffect(() => {
    setScrollContainerRef(scrollContainerRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  return (
    <div
      ref={scrollContainerRef}
      className="relative w-full h-screen overflow-y-auto"
    >
      <PortfolioHeroSection />
      <WorkShowcaseSection />
      <div className="h-screen" /> {/* Dummy scrollable content */}
    </div>
  );
}