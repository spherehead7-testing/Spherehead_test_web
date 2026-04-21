import React from "react";
import Image from "next/image";

// Using the provided Cloudinary URL as a placeholder for all logos.
// Replace the URLs with the specific assets for each brand once uploaded.
const LOGOS = [
  { name: "Hour Markers", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684953/HourMarkers_oikf7m.png" },
  { name: "A La Mer", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/A_LA_MER_tctzby.png" },
  { name: "Echo Media", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/echo_media_d6lzam.png" },
  { name: "ShiftX", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/ShiftX_zdwxyg.png" },
  { name: "Aegis Pinnacle", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684959/Aegis_Pinnacle_kmobmi.png" },
  { name: "Winlo", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684959/Winlo_bjjbuv.png" },
  { name: "Enrich Dairies", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684958/Enrich_Diaries_j60qdn.png" },
  { name: "Ninja Xpress", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684953/Ninja_Xpress_k88rle.png" },
];

export default function ClientLogoCarousel() {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex items-center relative z-10 py-6 lg:py-8 border-t border-white/5 bg-transparent">
      {/* The container width is strictly managed. 
        It holds two identical sets of logos side-by-side to allow seamless looping. 
      */}
      <div className="flex w-max animate-marquee items-center gap-12 lg:gap-24 px-6 lg:px-12">
        {/* First Set */}
        {LOGOS.map((logo, index) => (
          <div key={`logo-1-${index}`} className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300">
            {/* Using standard img tag to avoid Next.js domain config requirements during testing, switch to next/image in prod if preferred */}
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="h-8 lg:h-12 w-auto object-contain brightness-0 invert" 
            />
          </div>
        ))}
        {/* Second Set (Duplicate for smooth infinite scroll) */}
        {LOGOS.map((logo, index) => (
          <div key={`logo-2-${index}`} className="flex-shrink-0 opacity-70 hover:opacity-100 transition-opacity duration-300">
            <img 
              src={logo.url} 
              alt={logo.name} 
              className="h-8 lg:h-12 w-auto object-contain brightness-0 invert" 
            />
          </div>
        ))}
      </div>
    </div>
  );
}