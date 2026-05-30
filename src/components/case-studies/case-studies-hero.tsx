"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";

export default function CaseStudiesHero() {
  return (
    // 1. Changed justify-start to justify-end so the space is pushed to the top
    <section className="relative h-full flex flex-col justify-end overflow-hidden pt-32 pb-24 lg:pt-0 lg:pb-56 border-none">
      <SiteContainer className="relative z-10 flex flex-col">
        
        {/* 3. Added the horizontal bar above the content */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full h-[1px] bg-white/30 mb-8 lg:mb-12 origin-left"
        />

        {/* Changed items-start back to items-end to keep grid content anchored to bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <h1 className="inner-hero border-none outline-none">
              Success Stories That
              <br />
              Drive Innovation
            </h1>
            <p className="hidden lg:block heading-4 text-white max-w-xl mb-4 lg:mb-8">
              Explore how we transform challenges into impactful digital
              solutions through innovation and technology.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-4 flex lg:justify-end pb-4"
          >
            <CyclicButton
              onClick={() => {
                window.location.href = "/pricing#contact-pricing";
              }}
            >
              <span>Start a Project</span>
            </CyclicButton>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  );
}