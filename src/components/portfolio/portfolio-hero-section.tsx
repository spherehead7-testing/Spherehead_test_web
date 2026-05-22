"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";
import ClientLogoCarousel from "@/components/ui/client-logo-carousel";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function PortfolioHeroSection() {
  const [isDesktop, setIsDesktop] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleScrollToWork = () => {
    if (isMobile) {
      document.getElementById("work-showcase")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.dispatchEvent(new WheelEvent("wheel", { deltaY: 100, bubbles: true }));
    }
  };

  return (
    <section 
      className={
        isMobile 
          ? "relative w-full h-[100svh] flex flex-col overflow-hidden bg-transparent z-10" 
          : "fixed top-0 left-0 z-0 w-full h-[100svh] flex flex-col overflow-hidden"
      }
    >
      <SiteContainer className="relative z-10 flex flex-col h-full flex-grow justify-end pb-8 pt-24 lg:pt-32 lg:pb-12">
        <div className="w-full flex flex-col mt-auto">

          <motion.div
            initial={isMobile ? false : { opacity: 0, scaleX: 0 }}
            animate={isMobile ? false : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-[1px] bg-white mb-6 lg:mb-12 origin-left"
          />

          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-[minmax(0,820px)_1fr] lg:items-end">
            <motion.div
              initial={isMobile ? false : { opacity: 0, y: 36 }}
              animate={isMobile ? false : { opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-4 lg:gap-6"
            >
              <h1 className="heading-1 !text-4xl sm:!text-5xl lg:!text-[72px] lg:leading-[90px] text-white">
                Work Showcase
              </h1>

              {isDesktop && (
                <p className="heading-4 text-white max-w-xl font-light leading-relaxed">
                  A curated collection of our projects, showcasing innovation,
                  exceptional quality, and the tangible impact we deliver for
                  our clients.
                </p>
              )}
            </motion.div>

            <motion.div
              initial={isMobile ? false : { opacity: 0, x: 30 }}
              animate={isMobile ? false : { opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-start justify-start lg:justify-end lg:self-end mt-2 lg:mt-0 lg:pb-2"
            >
              <CyclicButton onClick={handleScrollToWork}>
                Start a Project
              </CyclicButton>
            </motion.div>
          </div>
        </div>
      </SiteContainer>

      <motion.div
        initial={isMobile ? false : { opacity: 0, y: 20 }}
        animate={isMobile ? false : { opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        className="w-full mt-auto pb-8 lg:pb-0"
      >
        <ClientLogoCarousel />
      </motion.div>
    </section>
  );
}