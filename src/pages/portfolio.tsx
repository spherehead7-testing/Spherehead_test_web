import React from "react";
import PortfolioHeroSection from "@/components/portfolio/portfolio-hero-section"; 
import WorkShowcaseSection from "@/components/portfolio/WorkShowcaseSection";

export default function PortfolioPage() {
  return (
    <>
      {/* Hero section renders first */}
      <PortfolioHeroSection />
      
      {/* Work Showcase renders directly below it in the scroll flow */}
      <WorkShowcaseSection />
    </>
  );
}