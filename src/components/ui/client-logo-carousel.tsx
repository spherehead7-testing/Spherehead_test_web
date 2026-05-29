"use client";
import React from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/m";

const LOGOS = [
  { name: "Hour Markers", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776751738/HourMarkers_sbveeh.png" },
  { name: "A La Mer", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/A_LA_MER_tctzby.png" },
  { name: "Echo Media", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/echo_media_d6lzam.png" },
  { name: "ShiftX", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/ShiftX_zdwxyg.png" },
  { name: "Aegis Pinnacle", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684959/Aegis_Pinnacle_kmobmi.png" },
  { name: "Winlo", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684959/Winlo_bjjbuv.png" },
  { name: "Enrich Dairies", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684958/Enrich_Diaries_j60qdn.png" },
  { name: "Ninja Xpress", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778841487/Ninja_Xpress_xchn9k.png" },
];

// Doubling the base array so each block is massively wide (fixes the gap on large screens)
const LOGO_GROUP = [...LOGOS, ...LOGOS];

export default function ClientLogoCarousel() {
  return (
    <div className="w-full overflow-hidden flex relative z-10 py-6 lg:py-8 bg-transparent">
      
      <motion.div 
        className="flex flex-nowrap w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 60, // Slower duration because the track is much longer now
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {/* BLOCK 1 */}
        <div className="flex items-center gap-10 lg:gap-16 pr-10 lg:pr-16">
          {LOGO_GROUP.map((logo, index) => (
            <div 
              key={`logo-1-${index}`} 
              className="flex-shrink-0 flex items-center justify-center w-[120px] lg:w-[150px] opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="max-h-14 lg:max-h-14 max-w-full object-contain brightness-0 invert" 
              />
            </div>
          ))}
        </div>

        {/* BLOCK 2 (Exact Clone of Block 1) */}
        <div className="flex items-center gap-10 lg:gap-16 pr-10 lg:pr-16">
          {LOGO_GROUP.map((logo, index) => (
            <div 
              key={`logo-2-${index}`} 
              className="flex-shrink-0 flex items-center justify-center w-[120px] lg:w-[160px] opacity-70 hover:opacity-100 transition-opacity duration-300"
            >
              <img 
                src={logo.url} 
                alt={logo.name} 
                className="max-h-12 lg:max-h-16 max-w-full object-contain brightness-0 invert" 
              />
            </div>
          ))}
        </div>

      </motion.div>
    </div>
  );
}