"use client";

import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";


export default function TechnologiesSection() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-start pt-12 text-center px-6 bg-white">

      <div className="max-w-6xl mx-auto">

        {/* Label */}
        <div className="flex items-center justify-center gap-2 mb-3">
          <RotatingDots />
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