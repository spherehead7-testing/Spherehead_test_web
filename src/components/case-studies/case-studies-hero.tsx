"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button"; // Assuming you have this from earlier!

export default function CaseStudiesHero() {
  return (
    <section className="relative w-full flex flex-col overflow-hidden snap-start pt-48 lg:pt-64 pb-16 lg:pb-24">
      {/* If your layout uses the global background animated class, this container sits on top of it */}
      <SiteContainer className="relative z-10 flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-8 flex flex-col gap-6"
          >
            <h1 className="heading-1 !leading-tight">
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
            {/* Replace with your actual button logic/text based on your components */}
            <CyclicButton onClick={() => console.log("Apply Now Clicked!")}>
              Apply Now
            </CyclicButton>
          </motion.div>
          
        </div>
      </SiteContainer>
    </section>
  );
}