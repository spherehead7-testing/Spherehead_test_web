import React from "react";
import { motion } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";

export default function ServicesHeroSection() {
  return (
    <section className="relative w-full h-[100svh] flex flex-col overflow-hidden">
      

      <SiteContainer className="relative z-10 flex flex-col h-full flex-grow justify-end pb-12 pt-32 lg:pb-20">
        <div className="w-full flex flex-col mt-auto">
          
          {/* Animated Horizontal Line */}
          <motion.div 
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-[1px] bg-white/20 mb-8 lg:mb-16 origin-left" 
          />
          
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,820px)_1fr] lg:items-end">
            <motion.div 
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-4 lg:gap-6"
            >
              <h1 className="heading-1 !text-5xl lg:!text-[72px] lg:leading-[90px] text-white">
                Digital Services
              </h1>
              <p className="heading-4 text-white/90 max-w-xl font-light leading-relaxed">
                Transforming complex challenges into scalable digital realities. 
                From custom software and IoT to advanced robotics, we build the 
                technical foundations your business needs to lead the market.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-start justify-start lg:justify-end lg:self-end mt-2 lg:mt-0 lg:pb-2"
            >
              <CyclicButton onClick={() => console.log("Start Project Clicked!")}>
                Start a Project
              </CyclicButton>
            </motion.div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}