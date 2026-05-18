import React, { useRef, useEffect } from "react";
import Head from "next/head";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";

import PricingHero from "@/components/pricing/pricing-hero";
import PricingIntro from "@/components/pricing/pricing-intro";
import PricingPackages from "@/components/pricing/pricing-packages";
import ContactSection from "@/components/pricing/pricing-contact";
import FAQSection from "@/components/pricing/pricing-faq";
import TestimonialSection from "@/components/common-sections/testimonial-section";
import Footer from "@/components/layout/footer";

export default function PricingPage() {
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
      <Head>
        <title>Pricing | Spherehead Technologies</title>
        <meta
          name="description"
          content="Transparent pricing and tailored service plans for every digital solution."
        />
      </Head>

      <PricingHero />
      <PricingIntro />
      <PricingPackages />
      <ContactSection />
      <FAQSection />
      <TestimonialSection snapToScreen />
      <Footer />
    </main>
  );
}