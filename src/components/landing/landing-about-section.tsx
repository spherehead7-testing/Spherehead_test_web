"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronsDown } from "lucide-react";
import { motion, MotionValue } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import GradientButton from "@/components/ui/gradient-button";
import RotatingDots from "@/components/ui/rotating-dots";

type Props = {
  cardY?: MotionValue<number>;
  barHeight?: MotionValue<number>;
  barWidth?: MotionValue<number>;
  barRadius?: MotionValue<number>;
  cutHeight?: MotionValue<string>;
  rightPanelWidth?: MotionValue<string>;
  rightPanelHeight?: MotionValue<string>;
  rightPanelClipPath?: MotionValue<string>;
  leftPanelWidth?: MotionValue<string>;
  aboutContentOpacity?: MotionValue<number>;
  labelOpacity?: MotionValue<number>;
  isMobile?: boolean;
};

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
  isMobile,
}: Props) {
  const router = useRouter();
  if (isMobile) {
    return (
      <section className="relative z-20 flex w-full flex-col">
        <div className="flex flex-col items-center bg-white px-6 pb-12 pt-8 text-center">
          <div className="mb-8 scale-[1.3]">
          </div>
          {/* Applied heading-2 here */}
          <h2 className="heading-2 mb-6 max-w-[400px] !text-[#01030B] !text-center">
            <span className="text-[#0D54CA]">Spherehead Technologies</span> is a{" "}
            <span className="text-[#0D54CA]">USA established</span> technology
            solutions company delivering end-to-end digital services, including
            software development, digital transformation, and creative
            technology{" "}
            <span className="text-[#0D54CA]">
              solutions for global clients.
            </span>
          </h2>
          {/* Applied body-small here */}
          <p className="body-small mb-8 max-w-[400px] !text-[#55565C]">
            Driven by client satisfaction and continuous feedback, we deliver
            tailored digital solutions that empower businesses worldwide,
            building lasting partnerships through trust, innovation, and
            measurable results.
          </p>
          <div className="mb-8 flex items-center justify-center -space-x-3">
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778214138/about_1_sxgz4t.png"
              width={48}
              height={48}
              className="relative z-10 h-12 w-12 rounded-full border-[3px] border-white object-cover"
              alt="Team member 1"
            />
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778214138/about_2_bmvgxy.png"
              width={48}
              height={48}
              className="relative z-20 h-12 w-12 rounded-full border-[3px] border-white object-cover"
              alt="Team member 2"
            />
            <Image
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1778214138/about_3_uhxoaz.png"
              width={48}
              height={48}
              className="relative z-10 h-12 w-12 rounded-full border-[3px] border-white object-cover"
              alt="Team member 3"
            />
          </div>
          <GradientButton type="button" onClick={() => router.push("/about-us")}>
            About Us
          </GradientButton>
        </div>

        <div className="px-6 py-20">
          <div className="mx-auto grid max-w-[400px] grid-cols-2 gap-x-4 gap-y-14 text-center">
            {statsData.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center">
                <span className="heading-1 mb-3 !leading-none text-white !tracking-none">
                  {stat.value}
                </span>
                <span className="body-small text-white">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ===============================================
  // DESKTOP LAYOUT BELOW
  // ===============================================
  return (
    <motion.div
      style={{
        y: cardY,
        height: barHeight,
        width: barWidth,
        borderRadius: 4,
      }}
      className="absolute bottom-0 left-1/2 z-20 -translate-x-1/2 overflow-hidden"
    >
      <motion.div
        style={{
          bottom: cutHeight,
          borderRadius: barRadius,
        }}
        className="absolute inset-x-0 top-0 bg-[#ffffff]"
      />

      <motion.div
        style={{
          width: rightPanelWidth,
          height: rightPanelHeight,
          clipPath: rightPanelClipPath,
          borderRadius: 4,
        }}
        className="absolute bottom-0 right-0 bg-[#ffffff]"
      />

      <motion.div
        style={{ opacity: labelOpacity }}
        className="pointer-events-none absolute inset-x-0 top-5 z-10 flex items-center justify-center gap-2"
      >
        <span className="body-extra-small font-bold uppercase tracking-[0.12em] text-[#0D54CA]">
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
            <div className="scale-130 mb-5">
              <RotatingDots variant="light" />
            </div>
            <h2 className="heading-2 max-w-[1257px] !text-black !text-center font-bold">
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
          borderRadius: 4,
        }}
        className="absolute bottom-0 left-0 z-[3] overflow-hidden"
      >
        <div className="flex h-full items-center px-4 lg:px-8 xl:px-16 xl:pl-24 w-full">
          <div className="flex w-full max-w-[912px] items-start justify-between xl:justify-start gap-2 lg:gap-4 xl:gap-12">
            {statsData.map((stat) => (
              <div key={stat.id} className="flex flex-col items-center text-center xl:items-start xl:text-left flex-1 xl:flex-none">
                {/* Replaced the messy Tailwind classes with your custom CSS class */}
                <span className="about-stat-number">
                  {stat.value}
                </span>
                <span className="body-small !text-[#e8e8e8] mt-2 xl:mt-3 leading-snug tracking-normal xl:tracking-[1.2px] xl:whitespace-nowrap">
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
          borderRadius: 4,
        }}
        className="absolute bottom-0 right-0 z-[4] overflow-hidden"
      >
        <div className="flex h-full flex-col items-start rounded-tl bg-[#ffffff] px-6 pl-6 pt-10 pb-8 sm:px-8 lg:px-14 lg:pl-14">
          <p className="body-small text-[#55565C] max-w-[420px] !leading-[1.4]">
            Driven by client satisfaction and continuous feedback, we deliver
            tailored digital solutions that empower businesses worldwide,
            building lasting partnerships through trust, innovation, and
            measurable results.
          </p>

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

            <GradientButton
              type="button"
              onClick={() => router.push("/about-us")}
              animated
            >
              About Us
            </GradientButton>
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
