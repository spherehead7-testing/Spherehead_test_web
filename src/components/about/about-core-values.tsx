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
      "We prioritize efficiency and reliability, ensuring every project is delivered on time without compromising quality.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776321150/About-Us-Rectangle-2_uiduew.webp",
  },
  {
    title: "After Service",
    description:
      "Our relationship doesn’t end at delivery. We provide continuous support and guidance.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776322662/About-Us-Rectangle-3_e7k7jl.webp",
  },
  {
    title: "Innovation First",
    description:
      "We embrace creativity and the latest technologies to build forward-thinking solutions.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776322672/About-Us-Rectangle-4_cwcghf.webp",
  },
];

export default function CoreValues() {
  const [active, setActive] = useState(0);

  return (
    <section className="bg-gradient-to-r from-[#0b2a5b] to-[#2f5fbf] text-white py-12">
      {/* 🔹 HEADER (CONTAINER) */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-2">
            <RotatingDots />
            <span className="body-small">Our Core Values</span>
          </div>

          <h2 className="heading-2 max-w-[700px]">
            Driving Excellence through Strong Values and Purpose
          </h2>
        </div>
      </div>

      {/* FULL WIDTH TOP LINE */}
      <div className="w-full h-[2px] bg-white/30 mb-7" />

      {/* FULL WIDTH TABS SECTION */}
      <div className="w-full">
        {/* LABELS (still aligned to container) */}
        <div className="w-full px-6 lg:px-20">
          <div className="body-medium flex justify-between text-white/70 mb-6">
            {values.map((item, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`relative ${active === i ? "text-white" : ""}`}
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* FULL WIDTH LINE */}
        <div className="relative h-[2px] bg-white/30 w-full">
          <motion.div
            animate={{ left: `${active * 25}%` }}
            transition={{ duration: 0.3 }}
            className="absolute inset-y-0 w-[25%] flex items-center justify-center"
          >
            <div className="w-3 h-3 bg-white rounded-full" />
          </motion.div>
        </div>
      </div>

      {/* 🔹 CONTENT (BACK TO CONTAINER) */}
      <div className="max-w-[1440px] mx-auto px-6 lg:px-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center mt-10">
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
