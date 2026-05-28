"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import RotatingDots from "@/components/ui/rotating-dots";
import SiteContainer from "../layout/site-container";

const values = [
  {
    title: "Service Excellence",
    description:
      "We are committed to exceeding customer expectations by delivering high-quality solutions with attention to detail, reliability, and a deep understanding of client needs at every stage.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776320422/About-Us-Rectangle_xadcv0.webp",
  },
  {
    title: "On-Time Delivery",
    description:
      "We prioritize efficiency and reliability, ensuring every project is delivered on time without compromising quality, enabling our clients to move forward with confidence.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776321150/About-Us-Rectangle-2_uiduew.webp",
  },
  {
    title: "After Service",
    description:
      "Our relationship doesn't end at delivery. We provide continuous support, maintenance, and guidance to ensure long-term success and build lasting partnerships with our clients.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776322662/About-Us-Rectangle-3_e7k7jl.webp",
  },
  {
    title: "Innovation First",
    description:
      "We embrace creativity and the latest technologies to develop forward-thinking solutions, constantly evolving to meet changing industry demands and drive meaningful results.",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1776322672/About-Us-Rectangle-4_cwcghf.webp",
  },
];

export default function CoreValues() {
  const [active, setActive] = useState(0);

  // =========================
  // REFS & CONTEXT
  // =========================
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollContainerRef } = useScrollContainerContext();

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Indicator tracking for perfect centering under text
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const desktopTabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const [mobileIndicator, setMobileIndicator] = useState({ width: 0, left: 0 });
  const [desktopIndicator, setDesktopIndicator] = useState({
    width: 0,
    left: 0,
  });

  const mobileTabsScrollRef = useRef<HTMLDivElement | null>(null);

  // =========================
  // MOBILE SWIPE LOGIC
  // =========================
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const deltaX = touchStartX.current - touchEndX.current;

    // Minimum swipe distance
    if (Math.abs(deltaX) < 50) return;

    if (deltaX > 0 && active < values.length - 1) {
      setActive((prev) => prev + 1); // Swipe left
    }

    if (deltaX < 0 && active > 0) {
      setActive((prev) => prev - 1); // Swipe right
    }
  };

  // =========================
  // DYNAMIC ALIGNMENT EFFECT
  // =========================
  useEffect(() => {
    // 1. Align Mobile Progress Bar & Auto-Scroll Tabs
    if (mobileTabsScrollRef.current && mobileTabRefs.current[active]) {
      const tab = mobileTabRefs.current[active];
      const container = mobileTabsScrollRef.current;

      // FIX: Subtract 24 to account for the parent container's px-6 padding
      const centerPos = tab.offsetLeft + tab.offsetWidth / 2 - 24;

      setMobileIndicator({ width: centerPos, left: centerPos });

      const scrollTarget = centerPos - container.clientWidth / 2;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }

    // 2. Align Desktop Progress Bar
    if (desktopTabRefs.current[active]) {
      const tab = desktopTabRefs.current[active];

      // Desktop does not need the padding offset because of its absolute positioning
      const centerPos = tab.offsetLeft + tab.offsetWidth / 2;
      setDesktopIndicator({ width: centerPos, left: centerPos });
    }
  }, [active]);

  // =========================
  // DESKTOP SCROLL SYNC
  // =========================
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollContainerRef ?? undefined,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (window.innerWidth < 768) return;

    // Map the scroll progress (0 to 1) directly to the active slide
    if (latest < 0.25) setActive(0);
    else if (latest < 0.5) setActive(1);
    else if (latest < 0.75) setActive(2);
    else setActive(3);
  });

  // =========================
  // DESKTOP TAB CLICK HANDLER
  // =========================
  const handleDesktopTabClick = (index: number) => {
    setActive(index);
    if (window.innerWidth < 768) return;

    if (!sectionRef.current || !scrollContainerRef?.current) return;

    const container = scrollContainerRef.current;
    const section = sectionRef.current;

    const containerRect = container.getBoundingClientRect();
    const sectionRect = section.getBoundingClientRect();

    // Calculate exact top position relative to the scroll container
    const sectionTop =
      container.scrollTop + (sectionRect.top - containerRect.top);
    const scrollableHeight = section.offsetHeight - container.clientHeight;

    // Smooth scroll to the relevant percentage of the 300vh height
    const targetScroll =
      sectionTop + scrollableHeight * (index / (values.length - 1));

    container.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <>
      {/* ========================= */}
      {/* MOBILE */}
      {/* ========================= */}
      <section className="relative bg-transparent text-white md:hidden py-16">
        <div
          className="flex w-full flex-col overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <SiteContainer className="flex flex-col">
            {/* HEADER */}
            <div className="mb-6">
              <div className="mb-3 flex items-center gap-3">
                <RotatingDots />
                <span className="body-small">Our Core Values</span>
              </div>

              <h2 className="heading-2 max-w-[320px]">
                Driving Excellence through Strong Values and Purpose
              </h2>
            </div>
          </SiteContainer>

          {/* TOP LINE - Moved OUTSIDE of SiteContainer so it ignores padding */}
          <div className="h-[1px] w-full shrink-0 bg-white/30" />

          {/* DYNAMIC SCROLLING TABS & PROGRESS */}
          <div
            ref={mobileTabsScrollRef}
            className="w-full overflow-x-auto shrink-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] touch-pan-x"
          >
            <div className="relative flex min-w-max flex-col pb-2 px-6 lg:px-8">
              {/* Tabs */}
              <div className="body-small flex gap-10 py-5 whitespace-nowrap">
                {values.map((item, i) => (
                  <button
                    key={i}
                    ref={(el) => {
                      mobileTabRefs.current[i] = el;
                    }}
                    onClick={() => setActive(i)}
                    className={`transition-opacity duration-300 ${
                      active === i ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Progress Container (MOBILE) */}
              <div className="relative h-4 w-full mt-2">
                {/* Background line stretched to negate the px-6 (24px) padding on both sides */}
                <div className="absolute top-1/2 -left-6 -right-6 h-[2px] -translate-y-1/2 bg-white/30" />

                {/* Active white line starts at left edge of screen (-left-6) and adds 24px to width */}
                <motion.div
                  className="absolute top-1/2 -left-6 h-[2px] -translate-y-1/2 bg-white"
                  animate={{ width: mobileIndicator.width + 24 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />

                {/* Dot tracks perfectly under text */}
                <motion.div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  animate={{ left: mobileIndicator.left }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* HORIZONTAL SLIDING CONTENT */}
          <div className="w-full overflow-hidden pt-4">
            <motion.div
              className="flex w-full"
              animate={{ x: `-${active * 100}%` }}
              transition={{ type: "tween", ease: "easeInOut", duration: 0.4 }}
            >
              {values.map((item, i) => (
                <div key={i} className="min-w-full flex-shrink-0 flex flex-col">
                  <SiteContainer className="flex flex-col">
                    <div className="mb-5 overflow-hidden flex justify-center">
                      <img
                        src={item.image}
                        alt={item.title}
                        draggable="false"
                        className="w-full object-cover max-h-[25vh] pointer-events-none"
                      />
                    </div>

                    <div>
                      <p className="body-small max-w-[320px] text-white">
                        {item.description}
                      </p>
                    </div>
                  </SiteContainer>
                </div>
              ))}
            </motion.div>
          </div>

          {/* BOTTOM DOT INDICATORS */}
          <div className="mt-8 flex w-full justify-center items-center gap-2 pb-2">
            {values.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  active === i
                    ? "h-2 w-2 bg-blue-500" // Active dot (blue)
                    : "h-2 w-2 bg-white" // Inactive dot (white transparent)
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* DESKTOP */}
      <section
        ref={sectionRef}
        className="relative hidden h-[300vh] text-white md:block"
      >
        {/* Removed mt-8 and reduced pb-16 to pb-4 to pull the next section closer */}
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden pb-4 pt-18">
          {/* HEADER */}
          <SiteContainer>
            <div className="mb-10">
              <div className="mb-2 flex items-center gap-3">
                <RotatingDots />
                <span className="body-small">Our Core Values</span>
              </div>

              <h2 className="heading-2 max-w-[700px]">
                Driving Excellence through Strong Values and Purpose
              </h2>
            </div>
          </SiteContainer>

          {/* LINE */}
          <div className="h-[1px] w-full bg-white/30" />

          {/* DYNAMIC TABS & PROGRESS (DESKTOP) */}
          <div className="w-full">
            <SiteContainer className="relative">
              <div className="body-medium flex justify-between py-6">
                {values.map((item, i) => (
                  <button
                    key={i}
                    ref={(el) => {
                      desktopTabRefs.current[i] = el;
                    }}
                    onClick={() => handleDesktopTabClick(i)}
                    className={`transition-opacity duration-300 ${
                      active === i
                        ? "text-white opacity-100"
                        : "text-white/50 opacity-70"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Progress Container (DESKTOP) */}
              {/* Changed from left-4 right-4 to left-0 right-0 */}
              <div className="absolute bottom-0 left-0 right-0 h-4">
                {/* Faint background line stretching full width of viewport */}
                <div
                  className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-white/30"
                  style={{ width: "100vw", left: "calc(-50vw + 50%)" }}
                />

                {/* Active progress line stretching from viewport left edge to the dot */}
                <motion.div
                  className="absolute top-1/2 h-[2px] -translate-y-1/2 bg-white"
                  animate={{
                    width: `calc(50vw - 50% + ${desktopIndicator.width}px)`,
                  }}
                  style={{ left: "calc(-50vw + 50%)" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

                {/* The animated dot (stays perfectly aligned with text tabs inside the container) */}
                <motion.div
                  className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                  animate={{ left: desktopIndicator.left }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            </SiteContainer>
          </div>

          {/* CONTENT */}
          <SiteContainer className="flex flex-1 items-center">
            <div className="grid w-full items-center gap-16 lg:grid-cols-2 mt-12">
              {/* IMAGE */}
              <motion.div
                key={values[active].image}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="max-w-[480px] overflow-hidden"
              >
                <img
                  src={values[active].image}
                  className="h-auto w-full"
                  alt={values[active].title}
                />
              </motion.div>

              {/* TEXT */}
              <motion.div
                key={values[active].title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <h3 className="body-large mb-6">{values[active].title}</h3>

                <p className="body-small max-w-[500px]">
                  {values[active].description}
                </p>
              </motion.div>
            </div>
          </SiteContainer>
        </div>
      </section>
    </>
  );
}
