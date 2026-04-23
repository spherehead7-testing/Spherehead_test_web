"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AboutIntro() {
  return (
    <section className="bg-[#f5f7fb] pt-24 pb-6 lg:pb-10">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-20">
        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-[28px] md:text-[34px] leading-[1.35] text-[#0b0f19] max-w-[1100px]"
        >
          <span className="text-[#2563eb]">Spherehead</span> is dedicated to
          delivering innovative digital solutions that help businesses grow and
          stand out. With a{" "}
          <span className="text-[#2563eb]">strong portfolio</span> of{" "}
          <span className="text-[#2563eb]">successfully completed</span>{" "}
          projects, we focus on quality, creativity, and timely delivery. Our
          commitment to{" "}
          <span className="text-[#2563eb]">client satisfaction</span> ensures
          every project is crafted to exceed expectations and build lasting
          trust.
        </motion.p>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-16 md:gap-y-20 gap-x-12 mt-24 md:mt-28">
          <StatItem label="Projects Delivered" value={30} suffix="+" />
          <StatItem label="Client Satisfaction" value={98} suffix="%" />
          <StatItem label="Countries Served" value={16} suffix="+" />
          <StatItem label="Projects Delivered" value={100} suffix="+" />
        </div>

        {/* MAP */}
        <div className="relative mt-12 lg:mt-16 -mb-12 lg:-mb-20">
          <img
            src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776759937/About-Us-World-Map_whcynj.webp"
            alt="world map"
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}

/* ---------- STAT COMPONENT ---------- */

function StatItem({
  label,
  value,
  suffix = "",
}: {
  label: string;
  value: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 20,
    stiffness: 100,
  });

  const displayRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    springValue.on("change", (latest) => {
      if (displayRef.current) {
        displayRef.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="text-left"
    >
      <p className="text-[15px] md:text-[16px] text-gray-500 mb-4 tracking-wide">
        {label}
      </p>

      <h3 className="text-[64px] md:text-[80px] font-light text-[#0B2A5B] leading-none">
        <span ref={displayRef}>0</span>
        {suffix}
      </h3>
    </motion.div>
  );
}