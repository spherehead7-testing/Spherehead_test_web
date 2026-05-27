"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function CareersHero() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="w-full min-h-[88svh] flex flex-col overflow-hidden bg-animated-gradient">
        <SiteContainer className="flex flex-col flex-grow justify-end pb-12 pt-24">
          <div className="flex flex-col mt-auto">
            <div className="w-full h-[1px] bg-white/20 mb-8" />
            <h1 className="inner-hero">
              Careers at<br />Spherehead
            </h1>
            <div className="mt-6">
              <CyclicButton onClick={() => {
                document.getElementById("stay-connected")?.scrollIntoView({ behavior: "smooth" });
              }}>
                Apply Now
              </CyclicButton>
            </div>
          </div>
        </SiteContainer>
      </section>
    );
  }

  return (
    <section className="relative w-full flex flex-col overflow-hidden snap-start bg-transparent pt-48 lg:pt-85 pb-16 lg:pb-12">
      <SiteContainer className="relative z-10 flex flex-col w-full">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">

          {/* Title Column */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 lg:gap-6"
          >
            <span className="inner-hero text-white">
              Careers at<br />Spherehead
            </span>
          </motion.div>

          {/* Button Column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start justify-start lg:justify-end"
          >
            <CyclicButton onClick={() => {
              document.getElementById("stay-connected")?.scrollIntoView({ behavior: "smooth" });
            }}>
              Apply Now
            </CyclicButton>
          </motion.div>

        </div>
      </SiteContainer>
    </section>
  );
}