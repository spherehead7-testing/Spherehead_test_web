"use client";

import { useEffect } from "react";
import Head from "next/head";
import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";
import Footer from "@/components/layout/footer";

// 1. Import your centralized data
import { categoryData } from "@/data/service-categories";

export default function ServicesPage() {
  useEffect(() => {
    document.documentElement.classList.add("snap-y", "snap-mandatory");
    return () => {
      document.documentElement.classList.remove("snap-y", "snap-mandatory");
    };
  }, []);

  // 2. Select the data you want to display on this main overview page
  const data = categoryData["digital-services"];

  return (
    // THE FIX: Removed 'h-screen' and 'overflow-y-auto' so the window handles the scrolling normally!
    <main className="w-full">
      <Head>
        <title>{data.metaTitle} | Spherehead Technologies</title>
      </Head>

      {/* 3. Pass the specific data chunks as props to the components */}
      <ServicesHeroSection data={data.hero} />
      <ServicesIntroSection data={data.intro} />
      <ServicesApproachSection />
      <ServicesListSection data={data} />
      
      <div className="w-full shrink-0 snap-start">
        <Footer />
      </div>
    </main>
  );
}