"use client";

import { useEffect } from "react";
import Head from "next/head";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";
import Footer from "@/components/layout/footer";

export default function ServicesPage() {
  useEffect(() => {
    document.documentElement.classList.add("snap-y", "snap-mandatory");
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    };
  }, []);

  return (
    // THE FIX: Removed 'h-screen' and 'overflow-y-auto' so the window handles the scrolling normally!
    <main className="w-full">
      <Head>
        <title>Digital Services | Spherehead Technologies</title>
      </Head>

      <ServicesHeroSection />
      <ServicesIntroSection />
      <ServicesApproachSection />
      <ServicesListSection />
      <div className="w-full shrink-0 snap-start">
        <Footer />
      </div>
    </main>
  );
}