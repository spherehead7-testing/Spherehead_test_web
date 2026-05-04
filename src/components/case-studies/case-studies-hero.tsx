"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button"; 

export default function CaseStudiesHero() {
  return (
    <section className="relative w-full h-full flex flex-col justify-end overflow-hidden snap-start pb-32 lg:pb-56">
      <SiteContainer className="relative z-10 flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <h1 className="inner-hero !leading-tight">
              Success Stories That<br />
              Drive Innovation
            </h1>
            <p className="body-large text-white/80 max-w-2xl">
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