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
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left gap-4">
          <div className="flex items-center gap-4 text-sm font-medium tracking-wide">
            <RotatingDots variant="light" />
            <span className="body-small !text-[#55565C]">
              Internship and Graduate Programs
            </span>
          </div>

          <h2 className="heading-2 !text-[#01030B] !text-center lg:!text-left max-w-2xl mt-2">
            Grow, Learn, and Begin Your Professional Journey
          </h2>
        </div>
      </SiteContainer>

      {/* CONTENT SECTION */}
      <SiteContainer className="pb-10 lg:pb-14">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-stretch">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-[40%] relative overflow-hidden rounded-lg bg-gray-100 min-h-[280px] lg:min-h-[400px]"
          >
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776932601/careers_gfefwe.png"
              alt="Interns working together"
              fill
              className="object-cover object-center"
            />
          </motion.div>

          {/* 2x2 steps grid */}
          <div className="w-full lg:w-[60%] grid grid-cols-2">
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
                className={`flex flex-col gap-2 p-6 lg:p-8 ${
                  idx % 2 === 0 ? "border-r border-gray-200" : ""
                } ${idx < 2 ? "border-b border-gray-200" : ""}`}
              >
                <span className="service-whitecard-number !m-0 !text-[36px] lg:!text-[40px]">
                  {step.num}
                </span>
                <h4 className="body-medium text-[#01030B] font-semibold">
                  {step.title}
                </h4>
                <p className="body-small !text-[#55565C] hidden lg:block">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
