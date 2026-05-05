"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

export default function PricingIntro() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    mass: 0.45,
  });

  const panelY = useTransform(smoothProgress, [0, 1], ["28vh", "0vh"]);
  const panelClipPath = useTransform(
    smoothProgress,
    [0, 0.72, 1],
    [
      "polygon(0 22%, 100% 31%, 100% 100%, 0 100%)",
      "polygon(0 5%, 100% 8%, 100% 100%, 0 100%)",
      "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
    ],
  );
  const contentOpacity = useTransform(smoothProgress, [0.35, 0.7], [0, 1]);
  const headingY = useTransform(smoothProgress, [0.32, 0.78], [42, 0]);
  const bodyY = useTransform(smoothProgress, [0.48, 0.88], [52, 0]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleScroll = () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }

      snapTimerRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldLock =
          rect.top < viewportHeight * 0.42 && rect.top > 8;

        if (shouldLock) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative h-[150vh] text-[#01030B]">
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          style={{
            y: panelY,
            clipPath: panelClipPath,
          }}
          className="absolute inset-x-0 top-0 h-[87vh] overflow-hidden rounded-b-[10px] bg-white will-change-transform"
        >
          <SiteContainer className="flex h-full flex-col pt-[8vh] pb-[7vh] lg:pt-[7vh] lg:pb-[9vh]">
            <motion.div
              style={{ opacity: contentOpacity, y: headingY }}
              className="flex items-center gap-3"
            >
              <RotatingDots variant="light" />
              <p className="body-small">Our Pricing</p>
            </motion.div>

            <motion.div
              style={{ opacity: contentOpacity, y: headingY }}
              className="mt-5 max-w-[790px]"
            >
              <h2 className="text-[32px] sm:text-[36px] lg:text-[40px] font-[400] leading-[1.3]">
                At Spherehead, we offer{" "}
                <span className="text-[#155ACD]">transparent</span> and{" "}
                <span className="text-[#155ACD]">flexible pricing</span>{" "}
                designed to match the unique needs of every business.
              </h2>
            </motion.div>

            <motion.div
              style={{ opacity: contentOpacity, y: bodyY }}
              className="mt-auto max-w-[620px] pt-16 lg:ml-[620px] lg:pt-0"
            >
              <p className="body-large text-[#808080]">
                From IT consultation and software development to IoT, web
                solutions, and more, our service packages provide clear value
                without compromising on quality. With tailored plans, innovative
                solutions, and measurable results, we empower businesses to
                grow, innovate, and achieve success with confidence.
              </p>
            </motion.div>
          </SiteContainer>
        </motion.div>
      </div>
    </section>
  );
}
