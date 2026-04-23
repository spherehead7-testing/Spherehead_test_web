"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";

const steps = [
  { num: "01", title: "Hands-On Experience", desc: "Work on real projects that build practical skills and confidence." },
  { num: "02", title: "Mentorship & Guidance", desc: "Learn directly from industry experts who support your growth." },
  { num: "03", title: "Career Development", desc: "Gain exposure to modern tools, technologies, and best practices." },
  { num: "04", title: "Pathway to Opportunities", desc: "Top interns and graduates can transition into full-time roles." },
];

export default function InternshipPrograms() {
  return (
    <section className="w-full py-20 lg:py-32">
      <SiteContainer className="flex flex-col gap-16">
        
        {/* Header */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2 text-[#0D54CA] inter-tight text-sm font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#0D54CA]"></span>
            Internship and Graduate Programs
          </div>
          <h2 className="heading-3 max-w-xl">
            Grow, Learn, and Begin Your Professional Journey
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Image */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full aspect-square relative rounded-xl overflow-hidden bg-gray-100"
          >
            {/* Swap with your actual intern photo */}
            <Image 
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776932601/careers_gfefwe.png" 
              alt="Interns working together" 
              fill 
              className="object-cover"
            />
          </motion.div>

          {/* Right 2x2 Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-12">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                className="flex flex-col gap-4 border-l border-[#E5E5E5] pl-6"
              >
                <span className="heading-2 !text-[#0D54CA] !text-4xl">{step.num}</span>
                <div className="flex flex-col gap-2">
                  <h4 className="body-small font-bold">{step.title}</h4>
                  <p className="body-Extrasmall text-[#6B6B6B]">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </SiteContainer>
    </section>
  );
}