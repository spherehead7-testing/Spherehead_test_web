"use client";

import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  motion,
  AnimatePresence,
  useInView,
} from "motion/react";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";

import SiteContainer from "@/components/layout/site-container";
import Footer from "@/components/layout/footer";

import LandingHeroSection from "@/components/landing/landing-hero-section";
import LandingAboutSection from "@/components/landing/landing-about-section";
import LandingServicesSection from "@/components/landing/landing-services-section";
import LandingIndustriesSection from "@/components/landing/landing-industries-section";
import TechnologiesSection from "@/components/common-sections/technologies-section";
import TestimonialSection from "@/components/common-sections/testimonial-section";
import { useIsMobile } from "@/hooks/use-is-mobile";

// Slower durations as requested
const ENTER_DURATION = 1.0;
const EXIT_DURATION = 0.8;

function FloatingLetsTalkButton({
  isVisible,
  onClick,
}: {
  isVisible: boolean;
  onClick: () => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layoutId="lets-talk-morph"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClick}
          className="fixed bottom-0 left-0 z-[100] flex h-[120px] w-[48px] cursor-pointer items-center justify-center bg-[#0D54CA] shadow-2xl hover:bg-blue-700 transition-colors sm:h-[150px] sm:w-[56px] overflow-hidden"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="[writing-mode:vertical-rl] rotate-180 text-sm font-medium tracking-widest text-white sm:text-base"
          >
            Let's Talk
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function AnimatedFooterOverlay({
  isVisible,
  onClose,
}: {
  isVisible: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          layoutId="lets-talk-morph"
          transition={{
            duration: isVisible ? ENTER_DURATION : EXIT_DURATION,
            ease: [0.32, 0.72, 0, 1],
          }}
          className="fixed inset-0 z-[110] bg-animated-gradient flex flex-col overflow-y-auto overflow-x-hidden shadow-[0_-8px_40px_rgba(0,0,0,0.12)]"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { delay: 0.3, duration: 0.5 },
            }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
            className="w-full min-h-full flex flex-col relative z-10 bg-transparent"
          >
            <div className="w-full bg-animated-gradient mt-auto shrink-0">
              <Footer />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const { setScrollContainerRef } = useScrollContainerContext();

  useEffect(() => {
    setScrollContainerRef(scrollContainerRef);
    return () => {
      setScrollContainerRef(null);
    };
  }, [scrollContainerRef, setScrollContainerRef]);

  const isMobile = useIsMobile();

  const { viewportWidth, viewportHeight, containerWidth } =
    useViewportSizes(measureRef);

  // Untouched Smooth Scroll Engine (Naturally ignores touch swiping!)
  // NOTE: Hooks cannot be called conditionally. We keep it mounted, but it should no-op on mobile.
  useSmoothScrollEngine(scrollContainerRef, viewportHeight, isMobile);

  const { scrollY } = useScroll({ container: scrollContainerRef });

  const techAreaRef = useRef<HTMLDivElement | null>(null);
  const testimonialAreaRef = useRef<HTMLDivElement | null>(null);
  const footerAreaRef = useRef<HTMLDivElement | null>(null);

  const isTechInView = useInView(techAreaRef, {
    root: scrollContainerRef,
    amount: 0.2,
  });
  const isTestimonialInView = useInView(testimonialAreaRef, {
    root: scrollContainerRef,
    amount: 0.4,
  });
  const isFooterInView = useInView(footerAreaRef, {
    root: scrollContainerRef,
    amount: 0.1,
  });

  const currentViewportHeight = viewportHeight || 900;
  const animationEnd = 100;
  const swapStart = currentViewportHeight;
  const swapEnd = currentViewportHeight * 2;
  const springConfig = { stiffness: 85, damping: 20, mass: 0.8 };

  const barHeight = useSpring(
    useTransform(scrollY, [0, animationEnd], [60, currentViewportHeight]),
    springConfig,
  );
  const barWidth = useSpring(
    useTransform(
      scrollY,
      [0, animationEnd],
      [containerWidth || 1200, viewportWidth || 1440],
    ),
    springConfig,
  );
  const barRadius = useSpring(
    useTransform(scrollY, [0, animationEnd], [4, 4]),
    springConfig,
  );

  const heroContentOpacity = useSpring(
    useTransform(scrollY, [0, 2, 5, animationEnd], [1, 0.12, 0, 0]),
    { stiffness: 180, damping: 14, mass: 0.5 },
  );
  const subtextOpacity = useSpring(
    useTransform(scrollY, [0, 1, 3, animationEnd], [1, 0.12, 0, 0]),
    { stiffness: 180, damping: 14, mass: 0.5 },
  );

  const cutHeight = useSpring(
    useTransform(scrollY, [0, animationEnd], ["0%", "40%"]),
    springConfig,
  );
  const rightPanelWidth = useSpring(
    useTransform(scrollY, [0, animationEnd], ["100%", "40%"]),
    springConfig,
  );
  const rightPanelCutBottom = useSpring(
    useTransform(scrollY, [0, animationEnd], ["0%", "12%"]),
    springConfig,
  );

  const aboutContentOpacity = useSpring(
    useTransform(scrollY, [10, 28, 52], [0, 0.35, 1]),
    { stiffness: 100, damping: 20, mass: 0.8 },
  );
  const labelOpacity = useSpring(useTransform(scrollY, [0, 40], [1, 0]), {
    stiffness: 100,
    damping: 22,
    mass: 0.7,
  });

  const cardY = useTransform(
    scrollY,
    [swapStart, swapEnd],
    [0, -currentViewportHeight],
  );
  const rawServicesY = useTransform(
    scrollY,
    [
      swapStart,
      swapEnd,
      currentViewportHeight * 2.45,
      currentViewportHeight * 3,
    ],
    [currentViewportHeight, 0, 0, -currentViewportHeight],
  );

  const rightPanelHeight = useMotionTemplate`calc(${cutHeight} + 2px)`;
  const leftPanelWidth = useMotionTemplate`calc(100% - ${rightPanelWidth})`;
  const rightPanelClipPath = useMotionTemplate`inset(0% 0% ${rightPanelCutBottom} 0% round 4px)`;

  const scrollToBottom = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  };

  const scrollUpFromFooter = () => {
    scrollContainerRef.current?.scrollTo({
      top: scrollContainerRef.current.scrollTop - viewportHeight * 0.8,
      behavior: "smooth",
    });
  };

  return (
    <>
      <Head>
        <title>Spherehead Technologies</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        ref={scrollContainerRef}
        className="h-screen w-full overflow-y-auto overflow-x-hidden relative"
      >
        <FloatingLetsTalkButton
          isVisible={isTestimonialInView && !isTechInView && !isFooterInView}
          onClick={scrollToBottom}
        />

        <div
          id="navbar-sentinel"
          className="absolute top-0 left-0 w-full h-[80vh] pointer-events-none"
          aria-hidden="true"
        />

        {/* MOBILE LAYOUT */}
        <div className="flex flex-col w-full bg-transparent lg:hidden">
          <LandingHeroSection isMobile={true} />
          <LandingAboutSection isMobile={true} />

          <div className="bg-white">
            <LandingServicesSection />
            <LandingIndustriesSection />
            <div className="relative z-30 w-full bg-white mt-5">
              <TechnologiesSection />
            </div>
          </div>

          {/* White container for Testimonials */}
          <div className="relative z-30 w-full bg-white">
            <TestimonialSection />
          </div>

          <div className="relative z-50 w-full bg-animated-gradient">
            <Footer />
          </div>
        </div>

        {/* ========================================================
                    DESKTOP LAYOUT
                    ======================================================== */}
        <div className="hidden lg:block relative h-[408vh] w-full">
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col">
            <div className="h-screen w-full" aria-hidden="true" />
            <section
              id="about"
              className="h-screen w-full pointer-events-auto"
            />
            <section
              id="services"
              className="h-screen w-full pointer-events-auto"
            />
            <section
              id="industries"
              className="h-screen w-full pointer-events-auto"
            />
          </div>

          <div className="sticky top-0 h-screen overflow-visible">
            <section className="absolute inset-0 z-0 overflow-visible">
              <LandingHeroSection
                heroContentOpacity={heroContentOpacity}
                subtextOpacity={subtextOpacity}
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-0">
                <SiteContainer>
                  <div ref={measureRef} className="h-0 w-full" />
                </SiteContainer>
              </div>
            </section>

            <motion.div
              style={{ y: rawServicesY }}
              className="absolute inset-0 z-10 pointer-events-none"
            >
              <div
                className="absolute inset-x-0 top-[38vh] rounded-[12px] bg-[#ffffff]"
                style={{ height: "155vh" }}
              />
              <LandingServicesSection />
              <LandingIndustriesSection />
            </motion.div>

            <LandingAboutSection
              cardY={cardY}
              barHeight={barHeight}
              barWidth={barWidth}
              barRadius={barRadius}
              cutHeight={cutHeight}
              rightPanelWidth={rightPanelWidth}
              rightPanelHeight={rightPanelHeight}
              rightPanelClipPath={rightPanelClipPath}
              leftPanelWidth={leftPanelWidth}
              aboutContentOpacity={aboutContentOpacity}
              labelOpacity={labelOpacity}
            />
          </div>
        </div>

        <div
          ref={techAreaRef}
          id="tech-section"
          className="hidden lg:block relative z-30 bg-transparent"
          style={{ marginTop: "-8vh" }}
        >
          <TechnologiesSection />
        </div>

        <div className="hidden lg:block relative z-30 w-full h-[200vh]">
          <div
            ref={testimonialAreaRef}
            className="sticky top-0 h-[100vh] w-full bg-white flex flex-col justify-center overflow-hidden"
          >
            <TestimonialSection compactDesktop />
          </div>

          <div
            ref={footerAreaRef}
            className="absolute bottom-0 left-0 h-[100vh] w-full bg-transparent pointer-events-none"
          />
        </div>

        <div className="hidden lg:block">
          <AnimatedFooterOverlay
            isVisible={isFooterInView}
            onClose={scrollUpFromFooter}
          />
        </div>
      </main>
    </>
  );
}

function useViewportSizes(measureRef: React.RefObject<HTMLDivElement | null>) {
  const [sizes, setSizes] = useState({
    viewportWidth: 0,
    viewportHeight: 0,
    containerWidth: 0,
  });

  useEffect(() => {
    const updateSizes = () => {
      setSizes({
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        containerWidth: measureRef.current?.getBoundingClientRect().width || 0,
      });
    };
    updateSizes();
    const resizeObserver = new ResizeObserver(updateSizes);
    if (measureRef.current) resizeObserver.observe(measureRef.current);
    window.addEventListener("resize", updateSizes);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSizes);
    };
  }, [measureRef]);

  return sizes;
}

function useSmoothScrollEngine(
  scrollContainerRef: React.RefObject<HTMLElement | null>,
  viewportHeight: number,
  isMobile: boolean,
) {
  const isAutoScrollingRef = useRef(false);
  const autoScrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    if (isMobile) return;

    const container = scrollContainerRef.current;
    if (!container || !viewportHeight) return;

    const getSnapPoints = () => {
      const points = [
        0,
        viewportHeight,
        viewportHeight * 2,
        viewportHeight * 3,
        viewportHeight * 4,
      ];
      const techEl = document.getElementById("tech-section");
      if (techEl) {
        points.push(viewportHeight * 4 + techEl.offsetHeight);
        points.push(container.scrollHeight - viewportHeight);
      }
      return points;
    };

    const animateTo = (target: number) => {
      isAutoScrollingRef.current = true;
      const startY = container.scrollTop;
      const distance = target - startY;
      const duration = 1100;
      const startTime = performance.now();

      const easeInOutQuart = (t: number) =>
        t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeInOutQuart(progress);
        container.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          autoScrollRafRef.current = requestAnimationFrame(step);
        } else {
          container.scrollTo(0, target);
          setTimeout(() => {
            isAutoScrollingRef.current = false;
          }, 10);
        }
      };
      autoScrollRafRef.current = requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAutoScrollingRef.current || Math.abs(e.deltaY) < 15) return;

      const points = getSnapPoints();
      const direction = e.deltaY > 0 ? 1 : -1;
      const currentY = container.scrollTop;

      let currentIndex = 0;
      let minDiff = Infinity;
      points.forEach((p, i) => {
        const diff = Math.abs(currentY - p);
        if (diff < minDiff) {
          minDiff = diff;
          currentIndex = i;
        }
      });

      let nextIndex = Math.max(
        0,
        Math.min(currentIndex + direction, points.length - 1),
      );
      if (nextIndex !== currentIndex) animateTo(points[nextIndex]);
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (autoScrollRafRef.current)
        cancelAnimationFrame(autoScrollRafRef.current);
    };
  }, [viewportHeight, scrollContainerRef, isMobile]);
}
