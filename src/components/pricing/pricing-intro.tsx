"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function PricingIntro() {
  const isMobile = useIsMobile();
  const [mounted, setMounted] = useState(false); // 1. Add mounted state
  const sectionRef = useRef<HTMLElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 2. Set mounted to true after first render to fix hydration
  useEffect(() => {
    setMounted(true);
  }, []);

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
    if (!section || isMobile) return;

    const handleScroll = () => {
      if (snapTimerRef.current) {
        clearTimeout(snapTimerRef.current);
      }

      snapTimerRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldLock = rect.top < viewportHeight * 0.42 && rect.top > 8;

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
  }, [isMobile]);

  // 3. Create a safe mobile check that prevents mismatch during SSR
  const isSafeMobile = mounted ? isMobile : false;

  return (
    <section
      ref={sectionRef}
      className="relative h-auto lg:h-[150vh] text-[#01030B]"
    >
      <div className="sticky top-0 h-auto lg:h-screen overflow-hidden">
        <motion.div
          style={{
            y: isSafeMobile ? 0 : panelY,
            clipPath: isSafeMobile ? "none" : panelClipPath,
          }}
          className="relative lg:absolute inset-x-0 top-0 h-auto lg:h-[90vh] overflow-hidden rounded-md bg-white will-change-transform"
        >
          <SiteContainer className="flex h-full flex-col pt-[8vh] pb-20 lg:pt-[7vh] lg:pb-[9vh]">
            <motion.div
              style={{
                opacity: isSafeMobile ? 1 : contentOpacity,
                y: isSafeMobile ? 0 : headingY,
              }}
              className="hidden md:flex items-center gap-3"
            >
              <RotatingDots variant="light" />
              <p className="body-small">Our Pricing</p>
            </motion.div>

            <motion.div
              style={{
                opacity: isSafeMobile ? 1 : contentOpacity,
                y: isSafeMobile ? 0 : headingY,
              }}
              className="mt-5 max-w-[790px]"
            >
              <h2 className="heading-2 !text-black">
                At Spherehead, we offer{" "}
                <span className="text-[#0D54CA]">transparent</span> and{" "}
                <span className="text-[#0D54CA]">flexible pricing</span>{" "}
                designed to match the unique needs of every business.
              </h2>
            </motion.div>

            <motion.div
              style={{
                opacity: isSafeMobile ? 1 : contentOpacity,
                y: isSafeMobile ? 0 : bodyY,
              }}
              className="max-w-[620px] pt-8 lg:ml-[620px] lg:pt-20"
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
