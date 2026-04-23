"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import Image from "next/image";

const cards = [
  {
    title: "Growth Opportunities",
    desc: "We support your career development with mentoring, training, and chances to upskill in the latest technologies.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/growth_ul8taw.png"
  },
  {
    title: "Innovative Projects",
    desc: "Be part of exciting projects that use modern tools and ideas to create real impact in industries and communities.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/projects_eyuhrf.png"
  },
  {
    title: "Collaborative Culture",
    desc: "Work in a friendly, supportive environment where teamwork and creativity are encouraged every day.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/culture_hdgwsl.png"
  },
  {
    title: "Work-Life Balance",
    desc: "Enjoy flexible work options and a culture that values well-being and a good professional balance.",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776932558/worklife_m4yida.png"
  }
];

export default function WhyWorkWithUs() {
  return (
    <section className="w-full py-20 lg:py-32">
      <SiteContainer className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        
        {/* LEFT COLUMN: Sticky Text */}
        <div className="lg:col-span-4 flex flex-col items-start gap-6">
          <div className="sticky top-32 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-[#0D54CA] inter-tight text-sm font-semibold">
              <div className="flex gap-1">
                <span className="w-2 h-2 rounded-full bg-[#0D54CA]"></span>
                <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
                <span className="w-2 h-2 rounded-full bg-[#E5E5E5]"></span>
              </div>
              WHY WORK WITH US
            </div>
            
            <h2 className="heading-2 !text-[#01030B] !text-[44px] !leading-[1.1]">
              Empowering Careers through Growth, Innovation, and Collaborative Culture
            </h2>
            
            <p className="body-small text-[#6B6B6B] max-w-md">
              We foster a people-first environment where innovation, continuous learning, and collaboration empower individuals to grow, succeed, and make a meaningful impact.
            </p>
          </div>
        </div>

        {/* RIGHT COLUMN: Scrolling Cards */}
        <div className="lg:col-span-7 lg:col-start-6 flex flex-col gap-8">
          {cards.map((card, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full bg-[#FAFAFA] rounded-2xl p-8 border border-[#E5E5E5] flex flex-col gap-6"
            >
              {/* Graphic Placeholder - Replace src with your image */}
              <div className="w-full aspect-[2/1] relative bg-white rounded-lg border border-[#F0F0F0] overflow-hidden flex items-center justify-center">
                 <Image src={card.image} alt={card.title} fill className="object-contain p-4" />
              </div>
              
              <div className="flex flex-col gap-2">
                <h3 className="body-large font-medium !text-[#01030B]">{card.title}</h3>
                <p className="body-small text-[#6B6B6B]">{card.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

      </SiteContainer>
    </section>
  );
}