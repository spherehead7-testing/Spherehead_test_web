import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";

export default function ServicesIntroSection() {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    mass: 0.5
  });

  const col1Y = useTransform(smoothProgress, [0, 0.4], ["100%", "0%"]);
  const col2Y = useTransform(smoothProgress, [0.1, 0.5], ["100%", "0%"]);
  const col3Y = useTransform(smoothProgress, [0.2, 0.6], ["100%", "0%"]);

  const content1Opacity = useTransform(smoothProgress, [0.3, 0.5], [0, 1]);
  const content1Y = useTransform(smoothProgress, [0.3, 0.5], [30, 0]);

  const content2Opacity = useTransform(smoothProgress, [0.5, 0.7], [0, 1]);
  const content2Y = useTransform(smoothProgress, [0.5, 0.7], [30, 0]);

  const content3Opacity = useTransform(smoothProgress, [0.7, 0.9], [0, 1]);
  const content3Y = useTransform(smoothProgress, [0.7, 0.9], [30, 0]);

  const ringImageY = useTransform(smoothProgress, [0.5, 0.95], [120, 0]);

  return (
    <section
      ref={containerRef}
      className="relative z-30 isolate w-full max-w-full h-[100vh] flex flex-col justify-center overflow-hidden"
    >
      {/* Columns */}
      <div className="absolute inset-0 flex w-full h-full pointer-events-none">
        <motion.div style={{ y: col1Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col2Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col3Y }} className="w-1/3 h-full bg-white" />
      </div>

      <SiteContainer className="relative flex flex-col justify-center py-6 lg:py-10 h-full max-h-[950px]">

        {/* Heading 2 */}
        <motion.div style={{ opacity: content1Opacity, y: content1Y }} className="w-full max-w-[1100px]">
          <p className="heading-2 !text-[#01030B]">
            With a passionate team driving{" "}
            <span style={{ color: "#0D54CA" }}>innovation</span>, Spherehead
            delivers cutting-edge{" "}
            <span style={{ color: "#0D54CA" }}>digital services</span> that help
            brands grow, adapt, and stand out in{" "}
            <span style={{ color: "#0D54CA" }}>today’s competitive</span> landscape.
          </p>
        </motion.div>

        <motion.div
          style={{ opacity: content2Opacity, y: content2Y }}
          className="w-full h-[1px] bg-gray-200 my-5 lg:my-8"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-8 lg:gap-16 items-center w-full">

          {/* Image */}
          <motion.div
            style={{ opacity: content2Opacity, y: content2Y }}
            // 1. ADD bg-animated-gradient to this outer wrapper
            className="relative w-full aspect-square max-w-[280px] lg:max-w-none mx-auto lg:mx-0 overflow-hidden bg-animated-gradient"
          >
            <motion.div style={{ y: ringImageY }} className="absolute inset-0 z-10">
              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776313260/Services_y83dyy.png"
                alt="Abstract 3D rings"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // 2. REMOVE site-background-fixed from here
                className="object-cover scale-105"
              />
            </motion.div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            style={{ opacity: content3Opacity, y: content3Y }}
            className="flex flex-col gap-4 lg:gap-6 w-full"
          >
            {/* Heading 3 */}
            <p className="heading-3" style={{ color: "#01030B" }}>
              We focus on creating meaningful digital experiences that connect your
              business with real growth, because that’s where true transformation
              begins and lasting success is achieved.
            </p>

            {/* Body Small */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8 mt-2 lg:mt-4">
              <p className="body-small" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
                Our approach begins by understanding what makes your business
                unique—your vision, your goals, and your competitive edge. We
                explore how your digital presence can better serve your audience.
              </p>

              <p className="body-small" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
                The real impact happens when strategy and execution come together.
                We shape solutions that enhance performance, improve efficiency,
                and elevate your brand experience.
              </p>
            </div>
          </motion.div>

        </div>
      </SiteContainer>
    </section>
  );
}