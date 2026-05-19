"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";
import RotatingDots from "@/components/ui/rotating-dots";

const steps = [
  {
    num: "01",
    title: "Hands-On Experience",
    desc: "Work on real projects that build practical skills and confidence.",
  },
  {
    num: "02",
    title: "Mentorship & Guidance",
    desc: "Learn directly from industry experts who support your growth.",
  },
  {
    num: "03",
    title: "Career Development",
    desc: "Gain exposure to modern tools, technologies, and best practices.",
  },
  {
    num: "04",
    title: "Pathway to Opportunities",
    desc: "Top interns and graduates can transition into full-time roles.",
  },
];

export default function InternshipPrograms() {
  return (
    // 1. CHANGED: Added min-h-[100svh] so the section is always at least full-screen height
    <section className="relative w-full min-h-[100svh] flex flex-col snap-start">
      {/* 1. HEADER SECTION — tight padding, no min-height */}
      <SiteContainer className="pt-12 lg:pt-16 pb-10 lg:pb-14">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-4 text-blue/90 text-sm font-medium tracking-wide">
            <RotatingDots variant="dark" />
            <span className="body-small !text-white">
              Internship and Graduate Programs
            </span>
          </div>

          <h2 className="heading-2 max-w-2xl mt-2">
            Grow, Learn, and Begin Your Professional Journey
          </h2>
        </div>
      </SiteContainer>

      {/* 2. WHITE CONTENT SECTION */}
      <div className="w-full flex-1 bg-white rounded-t-[8px] lg:rounded-t-[12px] pt-8 lg:pt-10 pb-8 lg:pb-10">
        <SiteContainer>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="w-full aspect-[3/2] relative overflow-hidden bg-gray-100 rounded-[4px]"
            >
              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776932601/careers_gfefwe.png"
                alt="Interns working together"
                fill
                className="object-cover"
              />
            </motion.div>

            {/* Right 2x2 Grid */}
            {/* Note: Removed the sm:gap we added previously so they touch again */}
            <div className="grid grid-cols-1 sm:grid-cols-2 w-full">
              {steps.map((step, idx) => {
                let borderAndPadding = "";
                if (idx === 0)
                  borderAndPadding =
                    "pb-10 sm:pr-10 border-b-[1.5px] border-[#D4D4D4] sm:border-r-[1.5px]";
                if (idx === 1)
                  borderAndPadding =
                    "py-10 sm:py-0 sm:pb-10 sm:pl-10 border-b-[1.5px] border-[#D4D4D4]";
                if (idx === 2)
                  borderAndPadding =
                    "py-10 sm:py-0 sm:pt-10 sm:pr-10 sm:border-b-0 border-[#D4D4D4] sm:border-r-[1.5px]";
                if (idx === 3) borderAndPadding = "pt-10 sm:pl-10";

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: idx * 0.1,
                      ease: "easeOut",
                    }}
                    // 2. SETUP: Added 'relative' and gave Box 01 a higher z-index
                    className={`relative flex flex-col gap-4 ${borderAndPadding} ${
                      idx === 0 ? "sm:z-10" : ""
                    }`}
                  >
                    {/* 3. THE ERASER TRICK: A 40x40 white box placed directly over the center intersection */}
                    {idx === 0 && (
                      <div className="hidden sm:block absolute -bottom-5 -right-5 w-10 h-10 bg-white z-10" />
                    )}

                    <span className="service-whitecard-number !mb-[28px]">
                      {step.num}
                    </span>
                    <div className="flex flex-col gap-2">
                      <h4 className="body-medium text-[#01030B]">
                        {step.title}
                      </h4>
                      <p className="body-small text-[#8A8B8F]">{step.desc}</p>
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
