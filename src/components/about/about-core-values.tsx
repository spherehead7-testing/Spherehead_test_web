"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import RotatingDots from "@/components/ui/rotating-dots";

const values = [
  {
    title: "Service Excellence",
    description:
      "We are committed to exceeding customer expectations by delivering high-quality solutions with attention to detail, reliability, and a deep understanding of client needs at every stage.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776320422/About-Us-Rectangle_xadcv0.webp",
  },
  {
    title: "On-Time Delivery",
    description:
      "We prioritize efficiency and reliability, ensuring every project is delivered on time without compromising quality, enabling our clients to move forward with confidence.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776321150/About-Us-Rectangle-2_uiduew.webp",
  },
  {
    title: "After Service",
    description:
      "Our relationship doesn’t end at delivery. We provide continuous support, maintenance, and guidance to ensure long-term success and build lasting partnerships with our clients.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776322662/About-Us-Rectangle-3_e7k7jl.webp",
  },
  {
    title: "Innovation First",
    description:
      "We embrace creativity and the latest technologies to develop forward-thinking solutions, constantly evolving to meet changing industry demands and drive meaningful results.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776322672/About-Us-Rectangle-4_cwcghf.webp",
  },
];

export default function CoreValues() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gradient-to-r from-[#0b2a5b] to-[#2f5fbf] text-white py-12">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        {/* HEADER */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <RotatingDots />
            <span className="text-sm text-white/70">Our Core Values</span>
          </div>

          <h2 className="text-[34px] md:text-[46px] leading-[1.15] max-w-[700px]">
            Driving Excellence through Strong Values and Purpose
          </h2>
        </div>

        {/* FULL WIDTH TOP LINE */}
        <div className="w-full h-[2px] bg-white/30 mb-2" />

        {/* TABS */}
        <div className="relative mt-12">
          {/* Labels */}
          <div className="grid grid-cols-4 text-white/70 text-sm mb-12">
            {values.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`text-left ${active === i ? "text-white" : ""}`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* LINE */}
          <div className="relative h-[2px] bg-white/30">
            <motion.div
              animate={{ left: `${active * 20}%` }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="absolute top-1/2 -translate-y-1/2 w-full"
            >
              <div className="relative">
                <div className="absolute w-3 h-3 bg-white rounded-full -top-[6px] left-[12.5%] -translate-x-1/2" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-20">
          {/* IMAGE */}
          <motion.div
            key={values[active].image}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="overflow-hidden max-w-[480px]"
          >
            <img
              src={values[active].image}
              className="w-full h-auto"
              alt="value"
            />
          </motion.div>

          {/* TEXT */}
          <motion.div
            key={values[active].title}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-[28px] font-semibold mb-6">
              {values[active].title}
            </h3>

            <p className="text-white/80 leading-[1.8] max-w-[500px]">
              {values[active].description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
