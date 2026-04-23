"use client";

import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";


const leftCards = [
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Big-Data_lhvogj.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Big-Data_lhvogj.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Data-Science_va9nzk.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839143/Industries-Cloud-Computing_ngcrbu.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839477/Industries-Virtual-Reality_uussk4.webp",
  "https://res.cloudinary.com/dku9in8sb/image/upload/v1776839477/Industries-Artificial-Inteligence_towg6p.webp",
];

const rightCards = [...leftCards];

export default function TechScrollSection() {
  return (
    <section className="bg-[#f5f7fb]">

      {/* ================= HERO (FIRST VIEW) ================= */}
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">

        {/* Label */}
        <div className="flex items-center gap-2 mb-6">
          <RotatingDots />
          <span className="text-sm text-gray-500">Technologies</span>
        </div>

        {/* Heading */}
        <h2 className="text-[30px] md:text-[38px] lg:text-[44px] text-[#0b0f19] max-w-[800px] mb-10">
          We use advanced technologies to deliver smart,
          scalable solutions for business growth.
        </h2>

        {/* Icons Row */}
        <TechStackCarousel />
      </div>

      {/* ================= SCROLL SECTION ================= */}
      <section className="relative h-[100vh]">

        <div className="sticky top-0 h-screen flex items-start pt-8">

          <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* LEFT TEXT */}
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-6">
                <RotatingDots />
                <span className="text-sm text-gray-500">
                  Advance Technologies
                </span>
              </div>

              <h2 className="text-[34px] lg:text-[42px] leading-[1.3] font-medium text-[#0b0f19] max-w-[520px]">
                Driving Innovation and Impact through Advanced Technologies Worldwide
              </h2>

              <p className="text-gray-500 mt-8 max-w-[420px] text-sm leading-relaxed">
                Leveraging cutting-edge technologies and innovative tools, we deliver digital
                solutions that solve complex challenges, drive measurable impact, and empower
                businesses to thrive in a rapidly evolving world.
              </p>
            </div>

            {/* RIGHT SCROLL AREA */}
            <div className="grid grid-cols-2 gap-6 h-[80vh] overflow-hidden">

              {/* LEFT COLUMN (scroll up) */}
              <div className="relative overflow-hidden">
                <div className="animate-scrollUp flex flex-col gap-6">
                  {[...leftCards, ...leftCards].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="rounded-xl shadow-md"
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT COLUMN (scroll down) */}
              <div className="relative overflow-hidden">
                <div className="animate-scrollDown flex flex-col gap-6">
                  {[...rightCards, ...rightCards].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      className="rounded-xl shadow-md"
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>
    </section>
  );
}