"use client";

import RotatingDots from "@/components/ui/rotating-dots";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function TestimonialsSection() {
  const ref = useRef(null);

  const isInView = useInView(ref, { margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth vertical movement for right cards
  const y = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const data = [
    { role: "CEO Clara Agencies", name: "Alice Carlton" },
    { role: "CEO Clara Agencies", name: "Eduardo Joffroy" },
    { role: "CTO Clara Agencies", name: "Stephen Hanah" },
    { role: "CEO Clara Agencies", name: "Alice Carlton" },
  ];

  return (
    <section ref={ref} className="h-[200vh] bg-[#F6F6F6]">
      {/* Sticky container */}
      <div className="sticky top-0 h-screen flex items-center">
        <div className="max-w-7xl mx-auto w-full px-6 grid grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-2 mb-4">
              {/* <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span className="w-2 h-2 bg-orange-400 rounded-full"></span> */}
              <RotatingDots />
              <p className="text-sm text-gray-500">Testimonials</p>
            </div>

            {/* Heading */}
            <h2 className="text-[40px] leading-tight font-semibold mb-12">
              Building Lasting Relationships <br />
              Through Results Our Clients Value
            </h2>

            {/* Content */}
            <div className="flex gap-8 items-start">
              {/* Image */}
              <img
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776396932/About-Us-CEO_yuirce.webp" // replace with your image
                alt="person"
                className="w-[260px] h-[320px] object-cover rounded-lg"
              />

              {/* Text */}
              <div className="max-w-sm">
                <div className="w-8 h-8 bg-blue-600 text-white flex items-center justify-center mb-4">
                  "
                </div>

                <p className="text-gray-600 text-[15px] leading-relaxed">
                  It’s rare to find companies that share our philosophy of
                  making things happen. Our Operations runs smoothly than ever
                  before.
                </p>

                <h3 className="mt-6 text-[20px] font-semibold">
                  Eduardo Joffroy
                </h3>

                <p className="text-sm text-gray-500">CEO Clara Agencies</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - VERTICAL CARDS */}
          <motion.div style={{ y }} className="flex gap-6 justify-end">
            {data.map((item, i) => (
              <div
                key={i}
                className="w-[90px] h-[360px] bg-[#EDEDED] rounded-2xl flex flex-col items-center justify-between py-6"
              >
                {/* TOP TEXT */}
                <span
                  className="text-[12px] text-gray-400"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {item.role}
                </span>

                {/* BOTTOM TEXT */}
                <span
                  className="text-[16px] text-gray-800 font-medium"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                  }}
                >
                  {item.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
              {/* LET'S TALK BUTTON */}
      {isInView && (
        <div className="fixed left-0 bottom-20 z-50">
          <div className="bg-blue-700 text-white px-4 py-6 rounded-r-lg shadow-lg">
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
              className="text-sm tracking-wide"
            >
              Let’s Talk
            </span>
          </div>
        </div>
      )}
      </div>
    </section>
  );
}
