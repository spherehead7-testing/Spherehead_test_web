"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
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
  // REFS
  // =========================
  const sectionRef = useRef<HTMLElement | null>(null);
  const isAnimating = useRef(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Indicator tracking for perfect centering under text
  const mobileTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const desktopTabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  
  const [mobileIndicator, setMobileIndicator] = useState({ width: 0, left: 0 });
  const [desktopIndicator, setDesktopIndicator] = useState({ width: 0, left: 0 });

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
      
      const centerPos = tab.offsetLeft + tab.offsetWidth / 2;
      setMobileIndicator({ width: centerPos, left: centerPos });

      const scrollTarget = centerPos - container.clientWidth / 2;
      container.scrollTo({ left: scrollTarget, behavior: "smooth" });
    }

    // 2. Align Desktop Progress Bar
    if (desktopTabRefs.current[active]) {
      const tab = desktopTabRefs.current[active];
      const centerPos = tab.offsetLeft + tab.offsetWidth / 2;
      setDesktopIndicator({ width: centerPos, left: centerPos });
    }
  }, [active]);

  // =========================
  // DESKTOP WHEEL ANIMATION
  // =========================
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const section = sectionRef.current;
    if (!section) return;

    let accumulated = 0;
    const THRESHOLD = 60;
    const COOLDOWN_MS = 850;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();
      const sectionInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!sectionInView) {
        accumulated = 0;
        return;
      }

      if (isAnimating.current) {
        e.preventDefault();
        accumulated = 0;
        return;
      }

      accumulated += e.deltaY;

      if (Math.abs(accumulated) < THRESHOLD) {
        e.preventDefault();
        return;
      }

      const direction = accumulated > 0 ? "down" : "up";
      accumulated = 0;

      if (direction === "down" && active < values.length - 1) {
        e.preventDefault();
        isAnimating.current = true;
        setActive((prev) => prev + 1);
        setTimeout(() => (isAnimating.current = false), COOLDOWN_MS);
      } else if (direction === "up" && active > 0) {
        e.preventDefault();
        isAnimating.current = true;
        setActive((prev) => prev - 1);
        setTimeout(() => (isAnimating.current = false), COOLDOWN_MS);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [active]);

  return (
    <>
      {/* ========================= */}
      {/* MOBILE */}
      {/* ========================= */}
      {/* REMOVED h-[400vh] to allow natural tight padding */}
      <section className="relative bg-[#0A2C82] text-white md:hidden py-16">
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
            
            {/* TOP LINE */}
            <div className="h-[1px] w-full shrink-0 bg-white/30" />
          </SiteContainer>

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
                    ref={(el) => { mobileTabRefs.current[i] = el; }}
                    onClick={() => setActive(i)}
                    className={`transition-opacity duration-300 ${
                      active === i ? "opacity-100" : "opacity-50"
                    }`}
                  >
                    {item.title}
                  </button>
                ))}
              </div>

              {/* Progress Container */}
              <div className="relative h-4 w-full mt-2">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/20" />
                
                <motion.div
                  className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-white"
                  animate={{ width: mobileIndicator.width }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />

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
                      <p className="body-small max-w-[320px] text-white/95">
                        {item.description}
                      </p>
                    </div>

                  </SiteContainer>
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </section>

      {/* ========================= */}
      {/* DESKTOP*/}
      {/* ========================= */}
      <section
        ref={sectionRef}
        className="relative hidden h-[300vh] text-white md:block"
      >
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden py-12">
          
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
                    ref={(el) => { desktopTabRefs.current[i] = el; }}
                    onClick={() => setActive(i)}
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

              {/* Progress Container */}
              <div className="absolute bottom-0 left-4 right-4 h-4">
                <div className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-white/20" />
                
                <motion.div
                  className="absolute top-1/2 left-0 h-[2px] -translate-y-1/2 bg-white"
                  animate={{ width: desktopIndicator.width }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />

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