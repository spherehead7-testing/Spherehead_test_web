"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";

export default function ContactHero() {
  return (
    // THE FIX: Removed h-[70svh] and justify-center. Added pt-40 lg:pt-56 and pb-12 lg:pb-16 to shape the box naturally.
    <section className="relative w-full flex flex-col overflow-hidden snap-start bg-transparent pt-40 lg:pt-56 pb-12 lg:pb-16">
      <SiteContainer className="relative z-10 flex flex-col w-full">
        
        {/* THE FIX: Changed lg:items-center to lg:items-end so the button and text align at their bottom edges */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-end">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="heading-1">
              Contact Us
            </h1>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex lg:justify-end"
          >
            <CyclicButton onClick={() => console.log("Start Project Clicked!")}>
              Start A Project
            </CyclicButton>
          </motion.div>
          
        </div>
      </SiteContainer>
    </section>
  );
}