import React from "react";
// Import the hero section we just created
import PortfolioHeroSection from "@/components/portfolio/portfolio-hero-section";

// ✅ GOOD: MUST have "export default" for Next.js pages
export default function PortfolioPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Render your hero section here */}
      <PortfolioHeroSection />
    </main>
  );
}