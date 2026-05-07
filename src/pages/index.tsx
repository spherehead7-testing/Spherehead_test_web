import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import {
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  motion,
} from "motion/react";

import SiteContainer from "@/components/layout/site-container";
import Footer from "@/components/layout/footer";

import LandingHeroSection from "@/components/landing/landing-hero-section";
import LandingAboutSection from "@/components/landing/landing-about-section";
import LandingServicesSection from "@/components/landing/landing-services-section";
import LandingIndustriesSection from "@/components/landing/landing-industries-section";
import TechnologiesSection from "@/components/common-sections/technologies-section";
import TestimonialSection from "@/components/common-sections/testimonial-section";

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const { scrollY } = useScroll({ container: scrollContainerRef });

  const measureRef = useRef<HTMLDivElement | null>(null);
  
  // Custom scrolling engine refs
  const isAutoScrollingRef = useRef(false);
  const autoScrollRafRef = useRef<number | null>(null);

  const [containerWidth, setContainerWidth] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    const updateSizes = () => {
      setViewportWidth(window.innerWidth);
      setViewportHeight(window.innerHeight);
      if (measureRef.current) {
        setContainerWidth(measureRef.current.getBoundingClientRect().width);
      }
    };

    updateSizes();
    const resizeObserver = new ResizeObserver(updateSizes);
    if (measureRef.current) resizeObserver.observe(measureRef.current);
    window.addEventListener("resize", updateSizes);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", updateSizes);
    };
  }, []);

  const currentViewportHeight = viewportHeight || 900;
  const animationEnd = 100;

  // --- Framer Motion Config ---
  const rawBarHeight = useTransform(scrollY, [0, animationEnd], [88, currentViewportHeight]);
  const rawBarWidth = useTransform(scrollY, [0, animationEnd], [containerWidth || 1200, viewportWidth || 1440]);
  const rawBarRadius = useTransform(scrollY, [0, animationEnd], [4, 4]);
  const rawLabelOpacity = useTransform(scrollY, [0, 40], [1, 0]);
  const rawHeroContentOpacity = useTransform(scrollY, [0, 2, 5, animationEnd], [1, 0.12, 0, 0]);
  const rawSubtextOpacity = useTransform(scrollY, [0, 1, 3, animationEnd], [1, 0.12, 0, 0]);
  const rawCutHeight = useTransform(scrollY, [0, animationEnd], ["0%", "40%"]);
  const rawRightPanelWidth = useTransform(scrollY, [0, animationEnd], ["100%", "40%"]);
  const rawRightPanelCutBottom = useTransform(scrollY, [0, animationEnd], ["0%", "12%"]);
  const rawAboutContentOpacity = useTransform(scrollY, [10, 28, 52], [0, 0.35, 1]);

  const swapStart = currentViewportHeight;
  const swapEnd = currentViewportHeight * 2;
  const servicesHoldEnd = currentViewportHeight * 2.45;
  const industriesEnd = currentViewportHeight * 3;

  const cardY = useTransform(scrollY, [swapStart, swapEnd], [0, -currentViewportHeight]);
  const rawServicesY = useTransform(
    scrollY,
    [swapStart, swapEnd, servicesHoldEnd, industriesEnd],
    [currentViewportHeight, 0, 0, -currentViewportHeight],
  );

  const springConfig = { stiffness: 85, damping: 20, mass: 0.8 };

  const barHeight = useSpring(rawBarHeight, springConfig);
  const barWidth = useSpring(rawBarWidth, springConfig);
  const barRadius = useSpring(rawBarRadius, springConfig);
  const labelOpacity = useSpring(rawLabelOpacity, { stiffness: 100, damping: 22, mass: 0.7 });
  const heroContentOpacity = useSpring(rawHeroContentOpacity, { stiffness: 180, damping: 14, mass: 0.5 });
  const subtextOpacity = useSpring(rawSubtextOpacity, { stiffness: 180, damping: 14, mass: 0.5 });
  const cutHeight = useSpring(rawCutHeight, { stiffness: 85, damping: 20, mass: 0.8 });
  const rightPanelWidth = useSpring(rawRightPanelWidth, { stiffness: 85, damping: 20, mass: 0.8 });
  const rightPanelCutBottom = useSpring(rawRightPanelCutBottom, { stiffness: 85, damping: 20, mass: 0.8 });
  const aboutContentOpacity = useSpring(rawAboutContentOpacity, { stiffness: 100, damping: 20, mass: 0.8 });

  const rightPanelHeight = useMotionTemplate`calc(${cutHeight} + 2px)`;
  const leftPanelWidth = useMotionTemplate`calc(100% - ${rightPanelWidth})`;
  const rightPanelClipPath = useMotionTemplate`inset(0% 0% ${rightPanelCutBottom} 0% round 4px 0px 0px 4px)`;


  // SMOOTH GLIDE ENGINE ---
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !viewportHeight) return;

    const getSnapPoints = () => {
      const points = [
        0,                            // Hero
        viewportHeight,               // About
        viewportHeight * 2,           // Services
        viewportHeight * 3,           // Industries
        viewportHeight * 4,           // Technologies
      ];
      
      const techEl = document.getElementById("tech-section");
      if (techEl) {
        // Testimonials
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

      const easeInOutQuart = (t: number) => t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeInOutQuart(progress);
        
        container.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          autoScrollRafRef.current = requestAnimationFrame(step);
        } else {
          container.scrollTo(0, target);
          setTimeout(() => { isAutoScrollingRef.current = false; }, 10); 
        }
      };
      autoScrollRafRef.current = requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); 

      if (isAutoScrollingRef.current) return;
      if (Math.abs(e.deltaY) < 15) return;

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

      let nextIndex = currentIndex + direction;
      if (nextIndex < 0) nextIndex = 0;
      if (nextIndex >= points.length) nextIndex = points.length - 1;

      if (nextIndex !== currentIndex) {
        animateTo(points[nextIndex]);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (autoScrollRafRef.current) cancelAnimationFrame(autoScrollRafRef.current);
    };
  }, [viewportHeight]);

  return (
    <>
      <Head>
        <title>Spherehead Technologies</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main
        ref={scrollContainerRef}
        className="h-screen w-full overflow-y-auto overflow-x-hidden"
      >
        <div className="relative h-[408vh] w-full">
          <div className="pointer-events-none absolute inset-x-0 top-0 flex flex-col">
            <div className="h-screen w-full" aria-hidden="true" />
            <section id="about" className="h-screen w-full pointer-events-auto" />
            <section id="services" className="h-screen w-full pointer-events-auto" />
            <section id="industries" className="h-screen w-full pointer-events-auto" />
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
                className="absolute inset-x-0 top-[42vh] rounded-[12px] bg-[#ffffff]"
                style={{ height: "150vh" }}
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

        <div id="tech-section" className="relative z-30 bg-white" style={{ marginTop: "-8vh" }}>
          <TechnologiesSection />
        </div>

        <div className="relative z-30 bg-white h-[100vh] w-full flex flex-col justify-center overflow-hidden">
          <TestimonialSection />
        </div>
        
        <div>
          <Footer />
        </div>
      </main>
    </>
  );
}