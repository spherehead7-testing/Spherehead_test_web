"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";

export default function StayConnected() {
  return (
      <section className="relative w-full flex flex-col items-center justify-center overflow-hidden snap-start" id="stay-connected">
      {/* THE FIX: Solid white bar to restore the white gap above the blue section! */}
      <div className="hidden lg:block w-full h-32 bg-white shrink-0" />

      <div className="w-full py-8 lg:py-24 flex justify-center items-center px-4 md:px-8">
        
        <motion.div 
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1100px] h-[400px] lg:h-[480px] bg-white relative overflow-hidden flex flex-col items-center justify-center text-center shadow-lg"
        >
          
          {/* Typography */}
          <div className="relative z-10 flex flex-col items-center px-6 w-full">
            <h2 className="heading-2 !text-[#3F3F3F] !text-center">
              Come back later and <br />
              <span className="text-[#0D54CA]">stay connected!</span>
            </h2>
            <p className="body-medium text-[#0A0D0F] mt-4 max-w-[600px] !text-center">
              We're not hiring at the moment, but new positions may open soon.
            </p>
          </div>

          {/* Left Graphic: Socket (Top Left) */}
          <div className="absolute left-0 top-0 h-full w-[160px] lg:w-[260px] hidden md:block">
            <img 
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777269546/connect_Icon2_nxbt0n.png" 
              alt="Socket graphic" 
              className="w-full h-full object-contain object-left-top pt-4 pl-4 lg:pt-8 lg:pl-8" 
            />
          </div>

          {/* Right Graphic: Plug (Bottom Right) */}
          <div className="absolute right-0 top-0 h-full w-[160px] lg:w-[260px] hidden md:block">
            <img 
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777269546/connect_Icon1_nyua2x.png" 
              alt="Plug graphic"    
              className="w-full h-full object-contain object-right-bottom pb-4 pr-4 lg:pb-8 lg:pr-8" 
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}