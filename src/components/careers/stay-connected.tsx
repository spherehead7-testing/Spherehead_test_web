"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";

export default function StayConnected() {
  return (
    <section className="w-full py-24 lg:py-32 text-white">
      <SiteContainer>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full bg-white text-[#01030B] rounded-2xl p-10 lg:p-20 relative overflow-hidden flex flex-col items-center text-center border border-white/20 shadow-2xl"
        >
          <h2 className="heading-3 mb-4">
            Come back later and <br />
            <span className="text-[#0D54CA] font-semibold">stay connected!</span>
          </h2>
          <p className="body-small text-[#6B6B6B] max-w-sm">
            We're not hiring at the moment, but new positions may open soon.
          </p>

          {/* Abstract Plug Graphics - Left and Right */}
          {/* Note: You can replace these with actual SVG exports from your design file */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-32 h-16 border-b-[4px] border-r-[4px] border-[#0D54CA] rounded-br-2xl hidden md:block"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-32 h-16 border-t-[4px] border-l-[4px] border-[#0D54CA] rounded-tl-2xl hidden md:block"></div>
        </motion.div>
      </SiteContainer>
    </section>
  );
}