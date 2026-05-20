"use client";

import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

export default function TechnologiesSection() {
  return (
    // Mobile is transparent (letting background flow), Desktop is white
    <section className="w-full flex flex-col items-center justify-start pt-16 pb-8 lg:pt-24 text-center overflow-hidden lg:bg-white lg:rounded-t-[12px]">
      
      <div className="w-full px-6 lg:px-10 max-w-5xl mx-auto mb-10">
        <div className="flex items-center justify-center gap-2 mb-3">
          <RotatingDots variant="light"/>
          <span className="body-small !text-[#01030B] lg:!text-[#01030B] !tracking-[1.2px]">Technologies</span>
        </div>
        {/* Only show text on desktop as requested */}
        <h2 className="heading-2 !text-[#01030B] max-w-[800px] mx-auto text-center hidden lg:block">
           We use advanced technologies to deliver smart, scalable solutions for business growth.
        </h2>
      </div>

      <div className="w-full box-border px-10 lg:px-36">
        <TechStackCarousel />
      </div>
    </section>
  );
}