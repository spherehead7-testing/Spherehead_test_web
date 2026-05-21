"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

export default function AboutIntro() {
  return (
    <section className="bg-white pt-12 pb-8 lg:pb-10">
      <div className="mx-auto px-6 lg:px-20">
        {/* TEXT */}
        <p className="heading-2 max-w-[1100px] !text-[#01030B]">
          <span className="!text-[#0D54CA]">Spherehead</span> is dedicated to
          delivering innovative digital solutions that help businesses grow and
          stand out. With a{" "}
          <span className="!text-[#0D54CA]">strong portfolio</span> of{" "}
          <span className="!text-[#0D54CA]">successfully completed</span>{" "}
          projects, we focus on quality, creativity, and timely delivery. Our
          commitment to{" "}
          <span className="!text-[#0D54CA]">client satisfaction</span> ensures
          every project is crafted to exceed expectations and build lasting
          trust.
        </p>

        {/* STATS */}

        <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-8 md:grid-cols-4 lg:mt-12 lg:gap-x-32">
          <StatItem label="Projects Delivered" value={30} suffix="+" />
          <StatItem label="Client Satisfaction" value={98} suffix="%" />
          <StatItem label="Countries Served" value={16} suffix="+" />
          <StatItem label="Projects Delivered" value={100} suffix="+" />
        </div>

        {/* MAP */}
        <div className="relative -mb-10 mt-8 lg:-mb-40 lg:mt-0">
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
      <p className="body-large text-gray-500 mb-4">
        {label}
      </p>

      <h3 className="about-stat-number !text-[#0B2A5B] text-transparent">
        <span ref={displayRef}>0</span>
        {suffix}
      </h3>
    </motion.div>
  );
}
