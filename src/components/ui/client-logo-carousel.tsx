"use client";
import React from "react";

const LOGOS = [
  { name: "Hour Markers",   url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776751738/HourMarkers_sbveeh.png" },
  { name: "A La Mer",       url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/A_LA_MER_tctzby.png" },
  { name: "Echo Media",     url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/echo_media_d6lzam.png" },
  { name: "ShiftX",         url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684952/ShiftX_zdwxyg.png" },
  { name: "Aegis Pinnacle", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684959/Aegis_Pinnacle_kmobmi.png" },
  { name: "Winlo",          url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684959/Winlo_bjjbuv.png" },
  { name: "Enrich Dairies", url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684958/Enrich_Diaries_j60qdn.png" },
  { name: "Ninja Xpress",   url: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776684953/Ninja_Xpress_k88rle.png" },
];

export default function ClientLogoCarousel() {
  return (
    <>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 30s linear infinite;
          /* -50% of the track = exactly one set of logos */
          will-change: transform;
        }
      `}</style>

      <div
        className="w-full overflow-hidden relative z-10 py-6 lg:py-8 border-t border-white/5 bg-transparent"
        style={{
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >

        <div className="marquee-track flex w-max items-center gap-14">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center justify-center w-[140px]"
            >
              <img
                src={logo.url}
                alt={logo.name}
                className="max-h-12 lg:max-h-16 max-w-full object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}