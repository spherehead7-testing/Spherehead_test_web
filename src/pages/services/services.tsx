"use client";

import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";

import ServicesHeroSection from "@/components/services/services-hero-section";
import ServicesIntroSection from "@/components/services/services-intro-section";
import ServicesApproachSection from "@/components/services/services-approach-section";
import ServicesListSection from "@/components/services/services-list-section";
import Footer from "@/components/layout/footer";

// 1. Import your centralized data
import { categoryData } from "@/data/service-categories";

export default function ServicesPage() {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();

  useEffect(() => {
    setScrollContainerRef(scrollContainerRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  // 2. Select the data you want to display on this main overview page
  const data = categoryData["digital-services"];

  return (
    <main
      ref={scrollContainerRef}
      // Note: Added snap-y and snap-mandatory directly to the container
      className="relative w-full h-screen overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
    >
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