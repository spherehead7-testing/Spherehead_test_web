"use client";

import Image from "next/image";
import { ChevronsDown } from "lucide-react";
import { motion, MotionValue } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

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

// Extracted data array to significantly reduce repetitive code
const statsData = [
  { id: 1, value: "30+", label: "Projects Delivered" },
  { id: 2, value: "98%", label: "Client Satisfaction" },
  { id: 3, value: "16+", label: "Countries Served" },
  { id: 4, value: "100+", label: "Project Completion" },
];

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
            <div className="scale-150">
              <RotatingDots variant="light" />
            </div>
            <h2 className="heading-2 max-w-[1257px] !text-black !text-center">
              <span className="text-[#0D54CA]">Spherehead Technologies</span> is
              a <span className="text-[#0D54CA]">USA established</span>{" "}
              technology
              <br />
              solutions company delivering end-to-end digital services,
              <br />
              including software development, digital transformation, and
              <br />
              creative technology{" "}
              <span className="text-[#0D54CA]">
                solutions for global clients.
              </span>
            </h2>
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
          <div className="flex w-full max-w-[912px] items-start justify-start gap-12">
            {/* Reduced code by mapping through the stats array */}
            {statsData.map((stat) => (
              <div key={stat.id} className="flex flex-col items-start w-min">
                <span className="heading-1 !leading-none">{stat.value}</span>
                <span className="body-small text-[#e8e8e8] mt-3 leading-snug tracking-[1.2px]">
                  {stat.label}
                </span>
              </div>
            ))}
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
          <p className="body-small text-[#55565C] max-w-[380px]">
            Driven by client satisfaction and continuous feedback, we deliver
            tailored digital solutions that empower businesses worldwide,
            building lasting partnerships through trust, innovation, and
            measurable results.
          </p>

          {/* Changed gap-0 to gap-6 here to increase the space */}
          <div className="mt-6 -ml-3 flex items-center gap-6">
            <div className="flex items-center -space-x-3 scale-[0.85]">
              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778214138/about_1_sxgz4t.png"
                alt="Team member 1"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border-2 border-white object-cover"
              />

              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778214138/about_2_bmvgxy.png"
                alt="Team member 2"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border-2 border-white object-cover"
              />

              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778214138/about_3_uhxoaz.png"
                alt="Team member 3"
                width={56}
                height={56}
                className="h-14 w-14 rounded-full border-2 border-white object-cover"
              />
            </div>

            <button className="group relative flex h-[54px] cursor-pointer items-center justify-center overflow-hidden bg-animated-gradient px-8 text-white scale-[0.75] origin-left transition-colors duration-300">
              {/* Invisible placeholder to establish the button's natural width based on the text */}
              <span className="invisible body-large">About Us</span>

              {/* The absolute sliding column */}
              <div className="absolute top-0 left-0 flex w-full flex-col transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-1/2">
                <span className="flex h-[54px] w-full items-center justify-center body-large">
                  About Us
                </span>
                <span className="flex h-[54px] w-full items-center justify-center body-large">
                  About Us
                </span>
              </div>
            </button>
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
