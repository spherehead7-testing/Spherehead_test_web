"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RotatingDots from "@/components/ui/rotating-dots";

export default function IndustriesIntro() {
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // 🔥 Card comes from bottom → goes up
  const y = useTransform(scrollYProgress, [0, 0.5], ["70vh", "0vh"]);

  // 🔥 Expands width to full screen
  // const width = useTransform(scrollYProgress, [0.2, 0.7], ["80%", "100vw"]);
  const width = useTransform(scrollYProgress, [0.2, 0.7], ["85%", "100%"]);

  // 🔥 Rounded → flat
  const radius = useTransform(scrollYProgress, [0.2, 0.7], ["16px", "0px"]);

  // 🔥 Shadow appears
  const shadow = useTransform(
    scrollYProgress,
    [0, 0.6],
    ["0 0 0 rgba(0,0,0,0)", "0 20px 60px rgba(0,0,0,0.15)"],
  );

  // 🔥 Slight fade-in
  const opacity = useTransform(scrollYProgress, [0, 0.3], [0.6, 1]);

  return (
    <section ref={ref} className="relative h-[100vh]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* 🔥 EXPANDING CARD */}
        <motion.div
          style={{
            y,
            width,
            opacity,
            boxShadow: shadow,
            borderRadius: 0,
          }}
          className="absolute top-0 left-1/2 -translate-x-1/2 h-screen bg-[#f5f7fb]"
        >
          {/* CONTENT */}
          <div className="h-full flex items-center">
            <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-20">
              {/* TOP LABEL */}
              <div className="flex items-center gap-3 mb-8">
                <RotatingDots />
                <span className="text-sm text-gray-500 font-medium">
                  Projects Delivered
                </span>
              </div>

              {/* GRID */}
              <div className="grid lg:grid-cols-2 gap-16 items-start">
                {/* LEFT TEXT */}
                <h2 className="text-[22px] md:text-[30px] lg:text-[28px] leading-[1.3] font-medium text-[#0b0f19] max-w-[720px]">
                  We serve{" "}
                  <span className="text-[#2563eb]">diverse industries</span>{" "}
                  with tailored digital solutions powered by{" "}
                  <span className="text-[#2563eb]">advanced technologies</span>,
                  helping businesses innovate, scale, and succeed in a rapidly
                  evolving world.
                </h2>

                {/* RIGHT TEXT */}
                <div className="flex justify-start lg:justify-end">
                  <p className="text-[16px] text-gray-500 max-w-[420px] leading-[1.8]">
                    By understanding the unique needs of each industry, we apply
                    the right technologies and strategies to build scalable,
                    efficient, and future-ready digital experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
