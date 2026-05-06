"use client";

import Image from "next/image";
import { ChevronsDown } from "lucide-react";
import { motion, MotionValue } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import AboutUsButton from "@/components/ui/about-us-button";

type Props = {
  cardY: MotionValue<number>;
  barHeight: MotionValue<number>;
  barWidth: MotionValue<number>;
  barRadius: MotionValue<number>;
  cutHeight: MotionValue<string>;
  rightPanelWidth: MotionValue<string>;
  rightPanelHeight: MotionValue<string>;
  rightPanelClipPath: MotionValue<string>;
  leftPanelWidth: MotionValue<string>;
  aboutContentOpacity: MotionValue<number>;
  labelOpacity: MotionValue<number>;
};

export default function LandingAboutSection({
  cardY,
  barHeight,
  barWidth,
  barRadius,
  cutHeight,
  rightPanelWidth,
  rightPanelHeight,
  rightPanelClipPath,
  leftPanelWidth,
  aboutContentOpacity,
  labelOpacity,
}: Props) {
  return (
    <motion.div
      style={{
        y: cardY,
        height: barHeight,
        width: barWidth,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
      }}
      className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 overflow-hidden"
    >
      <motion.div
        style={{
          bottom: cutHeight,
          borderTopLeftRadius: barRadius,
          borderTopRightRadius: barRadius,
        }}
        className="absolute inset-x-0 top-0 bg-[#ffffff]"
      />

      <motion.div
        style={{
          width: rightPanelWidth,
          height: rightPanelHeight,
          clipPath: rightPanelClipPath,
        }}
        className="absolute bottom-0 right-0 bg-[#ffffff]"
      />

      <motion.div
        style={{ opacity: labelOpacity }}
        className="pointer-events-none absolute inset-x-0 top-8 z-10 flex items-center justify-center gap-2"
      >
        <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#0D54CA]">
          Scroll to Discover
        </span>
        <ChevronsDown className="h-5 w-5 text-[#0D54CA]" strokeWidth={2.5} />
      </motion.div>

      {/* Top Text Content */}
      <motion.div
        style={{ bottom: cutHeight, opacity: aboutContentOpacity }}
        className="absolute inset-x-0 top-0 z-[3] overflow-hidden"
      >
        <SiteContainer className="h-full">
          <div className="flex h-full flex-col items-center justify-center gap-6 px-6 pt-10 pb-10 text-center">
            <div className="scale-125">
              <RotatingDots variant="light" />
            </div>
            <p
              className="max-w-[1257px] font-[400] text-[28px] leading-[1.22] tracking-[0.03em] text-black sm:text-[34px] sm:leading-[1.22] lg:text-[30px] lg:leading-[38px]"
              style={{
                fontFamily: "var(--font-archivo), Arial, Helvetica, sans-serif",
              }}
            >
              <span className="text-[#2666D2]">Spherehead Technologies</span> is
              a <span className="text-[#2666D2]">USA established</span>{" "}
              technology
              <br />
              solutions company delivering end-to-end digital services,
              <br />
              including software development, digital transformation, and
              <br />
              creative technology{" "}
              <span className="text-[#2666D2]">
                solutions for global clients.
              </span>
            </p>
          </div>
        </SiteContainer>
      </motion.div>

      {/* Left Panel (Stats) */}
      <motion.div
        style={{
          width: leftPanelWidth,
          height: cutHeight,
          opacity: aboutContentOpacity,
        }}
        className="absolute bottom-0 left-0 z-[3] overflow-hidden"
      >
        <div className="flex h-full items-center px-10 pl-6 sm:px-14 lg:px-16 lg:pl-24">
          <div className="flex w-full max-w-[912px] items-start justify-start gap-8">
            <div className="about-stat-item">
              <span className="about-stat-number">30+</span>
              <span className="about-stat-label mt-3">Projects Delivered</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">98%</span>
              <span className="about-stat-label mt-3">Client Satisfaction</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">16+</span>
              <span className="about-stat-label mt-3">Countries Served</span>
            </div>
            <div className="about-stat-item">
              <span className="about-stat-number">100+</span>
              <span className="about-stat-label mt-3">Project Completion</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Right Panel (Image & Button) */}
      <motion.div
        style={{
          width: rightPanelWidth,
          height: rightPanelHeight,
          clipPath: rightPanelClipPath,
          opacity: aboutContentOpacity,
        }}
        className="absolute bottom-0 right-0 z-[4] overflow-hidden"
      >
        <div className="flex h-full flex-col items-start bg-[#ffffff] px-6 pl-6 pt-10 pb-8 sm:px-8 lg:px-14 lg:pl-14">
          <p className="inter-tight text-[#676767]">
            Driven by client satisfaction and continuous
            <br />
            feedback, we deliver tailored digital solutions
            <br />
            that empower businesses worldwide, building
            <br />
            lasting partnerships through trust, innovation,
            <br />
            and measurable results.
          </p>
          <div className="mt-6 -ml-3 flex items-center gap-0">
            <Image
              src="/images/landingPage/aboutsection.svg"
              alt="About section team"
              width={154}
              height={57}
              className="h-auto w-[154px] scale-[0.85]"
            />
            <AboutUsButton className="scale-[0.75]" />
          </div>
        </div>
      </motion.div>

      <div className="relative z-[2] h-screen box-border">
        <SiteContainer className="h-full">
          <div className="h-full" />
        </SiteContainer>
      </div>
    </motion.div>
  );
}
