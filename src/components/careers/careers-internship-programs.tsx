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
    <section className="relative w-full flex flex-col snap-start bg-white rounded-md">
      {/* HEADER SECTION */}
      <SiteContainer className="pt-12 lg:pt-16 pb-8 lg:pb-10">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="flex items-center gap-4 text-sm font-medium tracking-wide">
            <RotatingDots variant="light" />
            <span className="body-small !text-[#55565C]">
              Internship and Graduate Programs
            </span>
          </div>

          <h2 className="heading-2 !text-[#01030B] !text-center max-w-2xl mt-2">
            Grow, Learn, and Begin Your Professional Journey
          </h2>
        </div>
      </SiteContainer>

      {/* CONTENT SECTION */}
      <div className="w-full pt-0 pb-10 lg:pb-14">
        {/* Full-width image — taller crop to show all 3 people */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full aspect-[4/3] relative overflow-hidden bg-gray-100"
        >
          <Image
            src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776932601/careers_gfefwe.png"
            alt="Interns working together"
            fill
            className="object-cover object-center"
          />
        </motion.div>

        {/* 2x2 steps grid */}
        <SiteContainer className="pt-8 lg:pt-12">
          <div className="grid grid-cols-2">
            {steps.map((step, idx) => (
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
                className="flex flex-col items-center text-center gap-3 py-8 px-4"
              >
                <span className="service-whitecard-number !m-0 !text-[40px]">
                  {step.num}
                </span>
                <h4 className="body-medium text-[#01030B] text-center max-w-[120px]">
                  {step.title}
                </h4>
              </motion.div>
            ))}
          </div>
        </SiteContainer>
      </div>
    </section>
  );
}
