"use client";

import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

export default function TechnologiesSection() {
  return (
    // ADDED rounded-t-[12px] here
    <section className="w-full flex flex-col items-center justify-start pt-16 pb-8 lg:pt-24 text-center px-6 bg-white rounded-t-[12px]">
      <div className="max-w-6xl mx-auto w-full">
        
        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <RotatingDots variant="light"/>
          <span className="text-sm text-gray-500">Technologies</span>
        </div>

        {/* Heading */}
        <h2 className="text-[30px] md:text-[28px] lg:text-[34px] text-[#0b0f19] max-w-[800px] mx-auto mb-10">
          We use advanced technologies to deliver smart, scalable solutions for
          business growth.
        </h2>

        {/* Carousel */}
        <TechStackCarousel />
      </div>
    </section>
  );
}