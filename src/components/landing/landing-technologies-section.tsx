"use client";

import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

export default function TechnologiesSection() {
  return (
    <section className="w-full flex flex-col items-center justify-start pt-16 pb-8 lg:pt-24 text-center bg-white rounded-t-[12px]">
      
      {/* We keep the text contained, but let the carousel below go full width */}
      <div className="w-full px-6 lg:px-10 max-w-5xl mx-auto mb-10">
        
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <RotatingDots />
          <span className="text-sm text-gray-500">Technologies</span>
        </div>

        {/* Heading */}
        <h2 className="text-[30px] md:text-[28px] lg:text-[34px] text-[#0b0f19] max-w-[800px] mx-auto">
          We use advanced technologies to deliver smart, scalable solutions for
          business growth.
        </h2>
      </div>

      {/* Carousel */}
      <TechStackCarousel />
      
    </section>
  );
}