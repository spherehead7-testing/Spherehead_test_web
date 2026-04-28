import React from "react";
import PortfolioHeroSection from "@/components/portfolio/portfolio-hero-section";
import WorkShowcaseSection from "@/components/portfolio/portfolio-workshowcase-section";

export default function PortfolioPage() {
  return (
    <div className="relative w-full h-[100svh] overflow-hidden">
      <PortfolioHeroSection />
      <WorkShowcaseSection />
    </div>
  );
}