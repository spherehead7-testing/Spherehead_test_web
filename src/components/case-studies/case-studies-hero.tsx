"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button"; 

export default function CaseStudiesHero() {
  return (
    // FIX: Removed 'snap-start' from here to prevent scroll-locking conflicts
    <section className="relative h-full flex flex-col justify-end overflow-hidden pb-32 lg:pb-56">
      <SiteContainer className="relative z-10 flex flex-col">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <h1 className="inner-hero">
              Success Stories That<br />
              Drive Innovation
            </h1>
            <p className="heading-4 text-white max-w-xl mb-4 lg:mb-8">
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
            <CyclicButton onClick={() => console.log("Apply Now Clicked!")}>
              Apply Now
            </CyclicButton>
          </motion.div>
          
        </div>
      </SiteContainer>
    </section>
  );
}