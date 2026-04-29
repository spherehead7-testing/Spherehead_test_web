"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";

export default function CareersHero() {
  return (
    <section className="relative w-full snap-start min-h-[50vh] lg:min-h-[60vh] flex flex-col justify-center pt-32 lg:pt-48 pb-20 lg:pb-32 overflow-hidden">
      <SiteContainer className="relative z-10 flex flex-col w-full">
        
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
          
          {/* Title Column */}
          <motion.div 
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4 lg:gap-6"
          >
            <h1 className="inner-hero !text-5xl md:!text-7xl lg:!text-[72px] lg:!leading-[90px] text-white">
              Careers at<br />Spherehead
            </h1>
          </motion.div>

          {/* Button Column */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start justify-start lg:justify-end"
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