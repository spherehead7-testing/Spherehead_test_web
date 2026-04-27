"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";
import RotatingDots from "@/components/ui/rotating-dots";

const steps = [
  { num: "01", title: "Hands-On Experience", desc: "Work on real projects that build practical skills and confidence." },
  { num: "02", title: "Mentorship & Guidance", desc: "Learn directly from industry experts who support your growth." },
  { num: "03", title: "Career Development", desc: "Gain exposure to modern tools, technologies, and best practices." },
  { num: "04", title: "Pathway to Opportunities", desc: "Top interns and graduates can transition into full-time roles." },
];

export default function InternshipPrograms() {
  return (
    <section className="relative w-full flex flex-col">

      {/* 1. HEADER SECTION — tight padding, no min-height */}
      <SiteContainer className="pt-12 lg:pt-16 pb-10 lg:pb-14">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4 text-blue/90 text-sm font-medium tracking-wide">
            <RotatingDots />
            Internship and Graduate Programs
          </div>

          <h2 className="text-3xl lg:text-[44px] leading-tight text-white font-medium max-w-2xl mt-2">
            Grow, Learn, and Begin Your Professional Journey
          </h2>
        </div>
      </SiteContainer>

      {/* 2. WHITE CONTENT SECTION — sits directly below header, no gap */}
      <div className="w-full bg-white rounded-t-[32px] lg:rounded-t-[48px] pt-8 lg:pt-10 pb-8 lg:pb-10">
        <SiteContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full aspect-[3/2] relative overflow-hidden bg-gray-100"
            >
              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776932601/careers_gfefwe.png"
                alt="Interns working together"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right 2x2 Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
              {steps.map((step, idx) => {

                let borderAndPadding = "";
                if (idx === 0) borderAndPadding = "pb-10 sm:pr-10 border-b border-[#E5E5E5] sm:border-r";
                if (idx === 1) borderAndPadding = "py-10 sm:py-0 sm:pb-10 sm:pl-10 border-b border-[#E5E5E5]";
                if (idx === 2) borderAndPadding = "py-10 sm:py-0 sm:pt-10 sm:pr-10 border-b sm:border-b-0 border-[#E5E5E5] sm:border-r";
                if (idx === 3) borderAndPadding = "pt-10 sm:pl-10";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                    className={`flex flex-col gap-4 ${borderAndPadding}`}
                  >
                    <span className="text-4xl lg:text-[44px] text-[#0D54CA] font-normal leading-none">
                      {step.num}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h4 className="text-[17px] font-medium text-[#01030B]">{step.title}</h4>
                      <p className="text-[14px] text-[#6B6B6B] leading-relaxed">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>
        </SiteContainer>
      </div>

    </section>
  );
}