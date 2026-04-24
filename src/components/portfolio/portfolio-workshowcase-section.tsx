"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import { ProjectListItemHeader, ProjectDetailView } from "./portfolio-accordion-section";
import { projects } from "./data";
import RotatingDots from "@/components/ui/rotating-dots";
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

  const wheelAcc = useRef(0);
  const wheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const WHEEL_THRESHOLD = 20;
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
      snapTimer.current = setTimeout(() => {
        container.scrollTo({ top: 0, behavior: "smooth" });
      }, 50);
      return;
    }

    setIntroHidden(true);

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
    }, 600);
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

  // ── Wheel Handler ──────────────────────────────────────────
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container || !isVisible) return;

    const handleWheel = (e: WheelEvent) => {
      const lastIndex = projects.length - 1;
      const lastItemEl =
        projects.length > 0 ? itemRefs.current[projects[lastIndex].id] : null;

      // 1. Eat leftover momentum if we are currently locked
      if (stepLockRef.current) {
        e.preventDefault();
        e.stopPropagation();
        wheelAcc.current = 0;
        return;
      }

      // 2. Allow native scroll up to hero section
      if (activeIndex === -1 && e.deltaY < 0) return;

      e.stopPropagation();

      if (activeIndex === lastIndex) {
        if (e.deltaY > 0) return;
        if (
          e.deltaY < 0 &&
          lastItemEl &&
          container.scrollTop > lastItemEl.offsetTop + 5
        ) {
          return;
        }
      }

      e.preventDefault();
      wheelAcc.current += e.deltaY;

      if (wheelTimer.current) clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => {
        wheelAcc.current = 0;
      }, 400);

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

  // ── Touch (Fixed) ──────────────────────────────────────────
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
      const lastItemEl =
        projects.length > 0 ? itemRefs.current[projects[lastIndex].id] : null;

      // 1. Eat leftover momentum on mobile swipes
      if (stepLockRef.current) {
        e.stopPropagation();
        return;
      }

      // 2. Allow native scroll up to hero
      if (activeIndex === -1 && deltaY < 0) return;

      e.stopPropagation();

      if (activeIndex === lastIndex) {
        if (deltaY > 0) return;
        if (
          deltaY < 0 &&
          lastItemEl &&
          container.scrollTop > lastItemEl.offsetTop + 5
        )
          return;
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

  // ── Momentum Clamp ──────────────────
  useEffect(() => {
    const container = showcaseRef.current;
    if (!container || !isVisible) return;

    const handleScroll = () => {
      if (stepLockRef.current) return;

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

  // ── Reveal / Dismiss ─────────────────────────────────────
  const showShowcase = useCallback(() => {
    if (isAnimating || isVisible) return;
    setIsAnimating(true);
    setIsVisible(true);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, isVisible]);

  const hideShowcase = useCallback(() => {
    if (isAnimating || !isVisible) return;
    setIsAnimating(true);
    setIsVisible(false);
    setTimeout(() => setIsAnimating(false), 450);
  }, [isAnimating, isVisible]);

  // Inline scroll detection (replaces useCurtainRevealScroll)
  const revealThreshold = 200;
  const touchRevealThreshold = 100;
  const revealWheelAcc = useRef(0);
  const revealWheelTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTouchStartY = useRef(0);
  const revealScrollStartTop = useRef(0);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isAnimating) return;
      const scrollTop = showcaseRef.current?.scrollTop ?? 0;
      const isScrollingUp = e.deltaY < 0;

      if (revealWheelAcc.current === 0) {
        revealScrollStartTop.current = scrollTop;
      }

      if (!isVisible) {
        e.preventDefault();
      } else if (isVisible && scrollTop <= 2 && isScrollingUp) {
        e.preventDefault();
      }

      revealWheelAcc.current += e.deltaY;

      if (revealWheelTimer.current) clearTimeout(revealWheelTimer.current);
      revealWheelTimer.current = setTimeout(() => {
        revealWheelAcc.current = 0;
      }, 400);

      if (!isVisible && revealWheelAcc.current > revealThreshold) {
        revealWheelAcc.current = 0;
        showShowcase();
        return;
      }

      if (isVisible && scrollTop <= 2 && revealWheelAcc.current < -revealThreshold) {
        if (revealScrollStartTop.current <= 2) {
          revealWheelAcc.current = 0;
          hideShowcase();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      if (revealWheelTimer.current) clearTimeout(revealWheelTimer.current);
    };
  }, [isVisible, isAnimating, showShowcase, hideShowcase]);

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      revealTouchStartY.current = e.touches[0].clientY;
      revealScrollStartTop.current = showcaseRef.current?.scrollTop ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isAnimating) return;
      const deltaY = revealTouchStartY.current - e.touches[0].clientY;
      const scrollTop = showcaseRef.current?.scrollTop ?? 0;
      const isSwipingUpToDown = deltaY < 0;

      if (!isVisible) {
        e.preventDefault();
      } else if (isVisible && scrollTop <= 2 && isSwipingUpToDown) {
        e.preventDefault();
      }

      if (!isVisible && deltaY > touchRevealThreshold) {
        showShowcase();
        return;
      }

      if (isVisible && scrollTop <= 2 && deltaY < -touchRevealThreshold) {
        if (revealScrollStartTop.current <= 2) {
          hideShowcase();
        }
      }
    };

    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [isVisible, isAnimating, showShowcase, hideShowcase]);

  const introHtml = `With a dedicated team focused on creativity and excellence, Spherehead crafts <span class="text-[#0D54CA]">impactful projects</span> that showcase innovation, drive results, and bring <span class="text-[#0D54CA]">ideas to life</span> for our clients.`;

  return (
    <>
      <div id="work-showcase" className="absolute top-0" />

      <AnimatePresence>
        {isVisible && (
          <motion.div
            key="showcase-panel"
            initial={{ scale: 0, transformOrigin: "bottom left" }}
            animate={{
              scale: 1,
              transition: { duration: 0.8, ease: [0.32, 0.72, 0, 1] },
            }}
            exit={{
              scale: 0,
              transition: { duration: 0.7, ease: [0.32, 0.72, 0, 1] },
            }}
            className="fixed inset-0 z-20 bg-white rounded-t-[24px] shadow-[0_-8px_40px_rgba(0,0,0,0.12)]"
            style={{ willChange: "transform" }}
          >
            <div
              ref={showcaseRef}
              className="w-full h-full overflow-y-auto scroll-smooth flex flex-col [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
            >
              <div className="w-full min-h-full flex flex-col bg-white shrink-0">
                {/* Intro */}
                <AnimatePresence mode="sync">
                  {!introHidden && (
                    <motion.section
                      key="intro"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1, transition: { duration: 0.6, ease: [0.04, 0.62, 0.23, 0.98] } }}
                      exit={{ height: 0, opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
                      className="relative w-full py-8 lg:py-10 text-[#01030B] overflow-hidden shrink-0"
                    >
                      <SiteContainer className="flex flex-col gap-10 lg:gap-16 relative z-10">
                        <div className="w-full flex flex-col gap-10">
                          <div className="w-full flex flex-col gap-3 lg:gap-4 max-w-4xl">
                            <div className="flex items-center gap-4">
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

                {/* Project List */}
                <section className="relative w-full flex-1 flex flex-col text-[#01030B]">
                  <div className="w-full flex flex-col">
                    {projects.map((project, index) => {
                      const isExpanded = activeIndex === index;
                      return (
                        <div
                          key={project.id}
                          ref={(el) => {
                            itemRefs.current[project.id] = el;
                          }}
                          className="w-full"
                        >
                          <ProjectListItemHeader
                            project={project}
                            isExpanded={isExpanded}
                            onClick={() => {
                              if (!acquireLock()) return;
                              setActiveIndex((prev) =>
                                prev === index ? -1 : index
                              );
                            }}
                          />

                          <AnimatePresence mode="sync" initial={false}>
                            {isExpanded && (
                              <motion.div
                                key={project.id}
                                layout
                                initial={{ height: 0 }}
                                animate={{
                                  height: "auto",
                                  transition: {
                                    height: { duration: 0.4, ease: "easeInOut" },
                                  },
                                }}
                                exit={{
                                  height: 0,
                                  transition: {
                                    height: { duration: 0.4, ease: "easeInOut" },
                                  },
                                }}
                                className="overflow-hidden"
                                style={{ backgroundColor: project.bgColor }}
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
              </div>

              {/* Footer */}
              <div className="w-full bg-[#01030B] mt-auto shrink-0">
                <Footer />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

