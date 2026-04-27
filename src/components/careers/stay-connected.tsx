"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
export default function StayConnected() {

  return (
    <section className="relative w-full h-[100svh] flex flex-col items-center justify-center overflow-hidden">
      
      <SiteContainer className="w-full h-full flex justify-center items-center px-4 md:px-8">
        
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1100px] h-[400px] lg:h-[480px] bg-white relative overflow-hidden flex flex-col items-center justify-center text-center shadow-lg"
        >
          
          {/* Typography */}
          <div className="relative z-10 flex flex-col items-center px-6">
            <h2 className="text-3xl lg:text-[44px] leading-tight text-[#333] font-normal tracking-tight mb-2">
              Come back later and <br />
              <span className="text-[#0D54CA] font-medium">stay connected!</span>
            </h2>
            <p className="text-[13px] lg:text-[15px] text-[#555] max-w-lg mt-4 font-medium">
              We're not hiring at the moment, but new positions may open soon.
            </p>
          </div>

          {/* Left Graphic: Socket (Top Left) */}
          <div className="absolute left-0 top-0 h-full w-[120px] lg:w-[180px] hidden md:block">
            <img 
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777269546/connect_Icon2_nxbt0n.png" 
              alt="Socket graphic" 
              className="w-full h-full object-contain object-left-top pt-2 pl-2 lg:pt-4 lg:pl-4" 
            />
          </div>

          {/* Right Graphic: Plug (Bottom Right) */}
          <div className="absolute right-0 top-0 h-full w-[120px] lg:w-[180px] hidden md:block">
            <img 
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777269546/connect_Icon1_nyua2x.png" 
              alt="Plug graphic"    
              className="w-full h-full object-contain object-right-bottom pb-2 pr-2 lg:pb-4 lg:pr-4" 
            />
          </div>

        </motion.div>
      </SiteContainer>
    </section>
  );
}