"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import { ProjectListItemHeader, ProjectDetailView } from "./AccordionComponents";
import { projects } from "./data";
import RotatingDots from "@/components/ui/rotating-dots";
import useCurtainRevealScroll from "@/hooks/useCurtainRevealScroll";
import Footer from "@/components/layout/footer";

export default function WorkShowcaseSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const showcaseRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(-1);
  const [introHidden, setIntroHidden] = useState(false);

  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const stepLockRef = useRef(false);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const snapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const finalSnapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rAFRef = useRef<number | null>(null);

  const wheelAcc = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const WHEEL_THRESHOLD = 200;
  const TOUCH_THRESHOLD = 80;
  const touchStartY = useRef(0);

  useEffect(() => {
    if (isVisible) {
      setActiveIndex(-1);
      setIntroHidden(false);
      stepLockRef.current = false;
      wheelAcc.current = 0;
    }
  }, [isVisible]);

  useEffect(() => {
    const container = showcaseRef.current;
    if (!container) return;

    if (snapTimer.current) clearTimeout(snapTimer.current);

    if (activeIndex < 0) {
      setIntroHidden(false);
      // When completely closed, smoothly scroll back to the intro
      snapTimer.current = setTimeout(() => {
        container.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
      return;
    }

    // Hide the intro as soon as any item is clicked
    setIntroHidden(true);

    // ✨ THE FIX:
    // Instead of forcing the scrollbar down to the individual element's offsetTop
    // (which pushes the headers above it out of view and fights the shrinking intro),
    // we just let the browser naturally smooth-scroll to the top of the container.
    // Because the Intro is collapsing, 'top: 0' perfectly docks the entire 
    // accordion on the screen, keeping all collapsed items beautifully visible!
    snapTimer.current = setTimeout(() => {
      container.scrollTo({ top: 0, behavior: "smooth" });
    }, 50);

    return () => { 
      if (snapTimer.current) clearTimeout(snapTimer.current); 
    };
  }, [activeIndex]);

  const acquireLock = useCallback(() => {
    if (stepLockRef.current) return false;
    stepLockRef.current = true;
    if (lockTimer.current) clearTimeout(lockTimer.current);
    lockTimer.current = setTimeout(() => {
      stepLockRef.current = false;
    }, 1400);
    return true;
  }, []);

  const stepDown = useCallback(() => {
    setActiveIndex((prev) => (prev < projects.length - 1 ? prev + 1 : prev));
  }, []);

  const stepUp = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev > 0) return prev - 1;
      if (prev === 0) return -1;
      return prev;
    });
  }, []);

  // ── Wheel (Added Momentum Protection) ────────────────────
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container || !isVisible) return;

    const handleWheel = (e: WheelEvent) => {
      const lastIndex = projects.length - 1;
      const lastItemEl = projects.length > 0 ? itemRefs.current[projects[lastIndex].id] : null;

      // 1. If at the absolute top, let it bubble so the curtain closes
      if (activeIndex === -1 && e.deltaY < 0 && container.scrollTop <= 0) return;

      // 2. Hide all other internal scrolling from the global curtain hook!
      e.stopPropagation();

      // 3. Footer Zone Rules
      if (activeIndex === lastIndex) {
        if (e.deltaY > 0) return; // Allow natural scroll down to footer
        if (e.deltaY < 0 && lastItemEl && container.scrollTop > lastItemEl.offsetTop + 5) {
          return; // Allow natural scroll up from footer
        }
      }

      // 4. Trap and step
      e.preventDefault();
      wheelAcc.current += e.deltaY;

      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => { wheelAcc.current = 0; }, 400);

      if (Math.abs(wheelAcc.current) < WHEEL_THRESHOLD) return;

      const direction = wheelAcc.current > 0 ? "down" : "up";
      wheelAcc.current = 0;

      if (!acquireLock()) return;
      if (direction === "down") stepDown();
      else stepUp();
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [isVisible, activeIndex, stepDown, stepUp, acquireLock]);

  // ── Touch (Added Momentum Protection) ────────────────────
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container || !isVisible) return;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      const lastIndex = projects.length - 1;
      const lastItemEl = projects.length > 0 ? itemRefs.current[projects[lastIndex].id] : null;

      if (activeIndex === -1 && deltaY < 0 && container.scrollTop <= 0) return;
      
      e.stopPropagation(); // Hide from global hook

      if (activeIndex === lastIndex) {
        if (deltaY > 0) return;
        if (deltaY < 0 && lastItemEl && container.scrollTop > lastItemEl.offsetTop + 5) return;
      }

      if (!acquireLock()) return;
      if (deltaY > 0) stepDown();
      else stepUp();
    };

    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isVisible, activeIndex, stepDown, stepUp, acquireLock]);

  // ── NEW: Momentum Clamp ──────────────────────────────────
  // This instantly kills native browser scrolling momentum the second 
  // you cross the top boundary of the last project, guaranteeing it never skips!
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container || !isVisible) return;

    const handleScroll = () => {
      const lastIndex = projects.length - 1;
      if (activeIndex === lastIndex) {
        const lastItemEl = itemRefs.current[projects[lastIndex].id];
        if (lastItemEl && container.scrollTop < lastItemEl.offsetTop) {
          container.scrollTop = lastItemEl.offsetTop;
        }
      }
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [isVisible, activeIndex]);

  // ── Curtain ──────────────────────────────────────────────
  const showShowcase = useCallback(() => {
    if (isAnimating || isVisible) return;
    setIsAnimating(true);
    setIsVisible(true);
    setTimeout(() => setIsAnimating(false), 900);
  }, [isAnimating, isVisible]);

  const hideShowcase = useCallback(() => {
    if (isAnimating || !isVisible) return;
    setIsAnimating(true);
    setIsVisible(false);
    setTimeout(() => setIsAnimating(false), 850);
  }, [isAnimating, isVisible]);

  useCurtainRevealScroll({
    onReveal: showShowcase,
    onDismiss: hideShowcase,
    scrollContainerRef: showcaseRef,
    isVisible,
    isAnimating,
  });

  const introHtml = `With a dedicated team focused on creativity and excellence, Spherehead crafts <span class="text-[#0D54CA]">impactful projects</span> that showcase innovation, drive results, and bring <span class="text-[#0D54CA]">ideas to life</span> for our clients.`;

  return (
    <>
      <div id="work-showcase" className="absolute top-0" />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="showcase-panel"
            initial={{ clipPath: "inset(90% 90% 0% 0%)" }}
            animate={{
              clipPath: "inset(0% 0% 0% 0%)",
              // ✨ THE FIX: Changed easing for a buttery smooth reveal
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, 
            }}
            exit={{
              clipPath: "inset(90% 90% 0% 0%)",
              // ✨ THE FIX: Changed easing for a buttery smooth exit
              transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }, 
            }}
            className="fixed inset-0 z-20 bg-white"
            style={{ willChange: "clip-path" }}
          >
            <div
              ref={showcaseRef}
              className="w-full h-full overflow-y-auto overflow-x-hidden"
            >
              {/* ── Intro ── */}
              <AnimatePresence>
                {!introHidden && (
                  <motion.section
                    key="intro"
                    exit={{ height: 0, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
                    className="relative w-full py-16 lg:py-24 bg-white text-[#01030B] overflow-hidden"
                  >
                    <SiteContainer className="flex flex-col gap-10 lg:gap-16 relative z-10">
                      <div className="w-full flex flex-col gap-10">
                        <div className="w-full flex flex-col gap-6 lg:gap-8 max-w-4xl">
                          <div className="flex items-center gap-4 mb-6">
                            <RotatingDots />
                            <span className="body-small tracking-[0.1em] text-[#01030B] uppercase font-bold">
                              Projects delivered
                            </span>
                          </div>
                          <div className="flex flex-col gap-4 lg:gap-6">
                            <h2
                              className="heading-2 !text-[#01030B] max-w-5xl leading-tight"
                              dangerouslySetInnerHTML={{ __html: introHtml }}
                            />
                          </div>
                        </div>
                      </div>
                    </SiteContainer>
                  </motion.section>
                )}
              </AnimatePresence>

              {/* ── Project List ── */}
              <section className="relative w-full min-h-[100svh] bg-white text-[#01030B]">
                <div className="w-full flex flex-col">
                  {projects.map((project, index) => {
                    const isExpanded = activeIndex === index;
                    return (
                      <div
                        key={project.id}
                        ref={(el) => { itemRefs.current[project.id] = el; }}
                        className="w-full"
                      >
                        <ProjectListItemHeader
                          project={project}
                          isExpanded={isExpanded}
                          onClick={() => {
                            if (!acquireLock()) return;
                            setActiveIndex((prev) => prev === index ? -1 : index);
                          }}
                        />

                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              key={project.id}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{
                                height: "auto",
                                opacity: 1,
                                transition: {
                                  height: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
                                  opacity: { duration: 0.6, delay: 0.15, ease: "easeOut" },
                                },
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                                transition: {
                                  height: { duration: 0.8, ease: [0.04, 0.62, 0.23, 0.98] },
                                  opacity: { duration: 0.3, ease: "easeIn" },
                                },
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <ProjectDetailView
                                project={project}
                                onClose={() => {
                                  if (!acquireLock()) return;
                                  setActiveIndex(-1);
                                }}
                              />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* ── Footer ── */}
              <div className="w-full bg-[#01030B]">
                <Footer />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}