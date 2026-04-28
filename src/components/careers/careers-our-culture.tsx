"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";
import RotatingDots from "@/components/ui/rotating-dots";

const cards = [
  {
    title: "Growth Opportunities",
    desc: "We support your career development with mentoring, training, and chances to upskill in the latest technologies.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/growth_ul8taw.png",
  },
  {
    title: "Innovative Projects",
    desc: "Be part of exciting projects that use modern tools and ideas to create real impact in industries and communities.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/projects_eyuhrf.png",
  },
  {
    title: "Collaborative Culture",
    desc: "Work in a friendly, supportive environment where teamwork and creativity are encouraged every day.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/culture_hdgwsl.png",
  },
  {
    title: "Work-Life Balance",
    desc: "Enjoy flexible work options and a culture that values well-being and a good professional balance.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/worklife_m4yida.png",
  },
];

export default function WhyWorkWithUs() {
  return (
      <section className="w-full relative bg-white snap-start">
      <SiteContainer className="w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start relative">
        {/* LEFT COLUMN: Sticky Text */}
        <div className="lg:col-span-6 sticky top-0 h-screen flex flex-col justify-center items-start gap-6 pb-20">
          <div className="flex items-center gap-4 text-[#0D54CA] inter-tight text-sm font-semibold">
            <RotatingDots variant="light" />
            <span className="tracking-[0.1em] uppercase">
              WHY WORK WITH US
            </span>
          </div>

          <h2 className="heading-2 !text-[#01030B] !text-[44px]">
            Empowering Careers<br />
            through Growth,<br />
            Innovation, and<br />
            Collaborative<br />
            Culture
          </h2>

          <p className="body-small text-[#6B6B6B] max-w-md">
            We foster a people-first environment where innovation, continuous
            learning, and collaboration empower individuals to grow, succeed,
            and make a meaningful impact.
          </p>
        </div>

        {/* RIGHT COLUMN: Scrolling Cards with Fade Edges */}
        <div className="lg:col-span-5 lg:col-start-8 relative flex flex-col h-full">
          
          {/* THE FIX: Thinner, softer top fade */}
          <div className="sticky top-0 w-full h-12 lg:h-20 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />

          {/* Cards Container */}
          <div className="flex flex-col gap-12 py-[5vh] lg:py-[10vh]">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, margin: "-10%" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="w-full bg-[#F6F6F6] p-6 lg:p-8 flex flex-col gap-5 shadow-sm"
              >
                <div className="w-full aspect-[2/1] bg-white rounded-xl overflow-hidden flex items-center justify-center">
                  <div className="relative w-[85%] h-[85%]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3">
                  <h3 className="body-large font-medium !text-[#01030B]">
                    {card.title}
                  </h3>
                  <p className="body-small text-[#6B6B6B] leading-relaxed">{card.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* THE FIX: Thinner, softer bottom fade */}
          <div className="sticky bottom-0 w-full h-12 lg:h-20 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />

        </div>
        
      </SiteContainer>
    </section>
  );
}