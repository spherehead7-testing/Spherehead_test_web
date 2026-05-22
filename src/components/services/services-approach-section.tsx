import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { useIsMobile } from "@/hooks/use-is-mobile";

const approaches = [
  {
    num: "01",
    title: "Expertise in Latest\nTech Stacks",
    desc: "Harnessing the power of the latest technologies to create future-ready solutions that elevate your business.",
  },
  {
    num: "02",
    title: "Agile and Rapid\nDevelopment",
    desc: "Delivering faster, adaptable solutions that evolve with your needs, ensuring quick turnarounds without sacrificing quality.",
  },
  {
    num: "03",
    title: "Seamless\nIntegration",
    desc: "Ensuring smooth integration with your existing systems for efficient workflows and uninterrupted operations.",
  },
  {
    num: "04",
    title: "Human-Centered\nInnovation",
    desc: "Focusing on user experience to design solutions that are intuitive, impactful, and designed with real people in mind.",
  },
  {
    num: "05",
    title: "Reliable & Secure\nDevelopment",
    desc: "Building dependable, secure solutions that safeguard your business and provide peace of mind.",
  },
  {
    num: "06",
    title: "Code Quality and\nVersion Control",
    desc: "Maintaining code quality with robust version control to ensure scalability, reliability, and smooth collaboration.",
  },
];

export default function ServicesApproachSection() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const [page, setPage] = useState(0);
  const pageRef = useRef(page);
  pageRef.current = page;
  const isAnimating = useRef(false);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    if (!section) return;

    // Reset page to 0 whenever the section comes into view
    let enteredAt = 0;
    const ENTRY_COOLDOWN_MS = 600; // absorb trackpad momentum when entering from intro
    let lockedUntil = 0; // Hard lock for snap-back from list section

    // Global wheel blocker during snap-back lock period
    const globalWheelBlocker = (e: WheelEvent) => {
      if (Date.now() < lockedUntil) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    // Listen for snap-back from list section (hard trackpad swipe)
    const handleSnapBack = () => {
      // Block wheel events for 1200ms (400ms animation + 800ms momentum)
      lockedUntil = Date.now() + 1200;
      // Reset upward accumulator to prevent stale momentum from triggering intro snap
      upExitAccumulator = 0;
      // Add global blocker to catch momentum events at window level
      window.addEventListener("wheel", globalWheelBlocker, { passive: false, capture: true });
      // Remove it after the lock period
      setTimeout(() => {
        window.removeEventListener("wheel", globalWheelBlocker, { capture: true });
      }, 1200);
    };
    window.addEventListener("list-snap-to-approach", handleSnapBack);

    // Listen for snap from intro section (hard trackpad swipe down)
    const handleSnapFromIntro = () => {
      // Block wheel events for 1200ms (600ms animation + 600ms momentum)
      lockedUntil = Date.now() + 1200;
      // Add global blocker
      window.addEventListener("wheel", globalWheelBlocker, { passive: false, capture: true });
      setTimeout(() => {
        window.removeEventListener("wheel", globalWheelBlocker, { capture: true });
      }, 1200);
    };
    window.addEventListener("intro-snap-to-approach", handleSnapFromIntro);

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Always reset to page 0 when section enters view
          if (pageRef.current !== 0) {
            setPage(0);
          }
          enteredAt = Date.now();
          // Reset upward accumulator so it's ready for immediate use after cooldown
          upExitAccumulator = 0;
        }
      },
      { threshold: 0.3 }
    );
    visibilityObserver.observe(section);

    const ACCUMULATOR_THRESHOLD = 120;

    let lastEventTime = 0;
    let lastUpEventTime = 0;
    let consecutiveSmallDeltas = 0;
    let upEventCount = 0; // Safari trackpad event count fallback
    let downEventCount = 0; // Safari trackpad event count fallback for page transitions
    const UP_EVENT_COUNT_THRESHOLD = 8; // Safari fires many small events; 8 in a row = intent
    const DOWN_EVENT_COUNT_THRESHOLD = 4; // Fewer needed for down (more natural direction)
    const isTouchpad = () => consecutiveSmallDeltas > 3;

    // Upward exit state
    let upExitAccumulator = 0;

    const animateScrollTo = (targetY: number, duration: number, cb?: () => void) => {
      isAnimating.current = true;
      const startY = window.scrollY;
      const distance = targetY - startY;
      const t0 = performance.now();

      const step = (ts: number) => {
        const elapsed = ts - t0;
        const t = Math.min(elapsed / duration, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo({
          top: Math.round(startY + distance * ease),
          behavior: "instant" as ScrollBehavior,
        });
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          isAnimating.current = false;
          cb?.();
        }
      };
      requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const timeSinceLast = now - lastEventTime;
      lastEventTime = now;

      // Hard lock: block ALL wheel events during snap-back from list section
      if (now < lockedUntil) {
        e.preventDefault();
        return;
      }

      // Ignore wheel events during the entry cooldown period
      if (now - enteredAt < ENTRY_COOLDOWN_MS) {
        e.preventDefault();
        return;
      }

      // Touchpad detection
      if (Math.abs(e.deltaY) < 50 && timeSinceLast < 80) {
        consecutiveSmallDeltas = Math.min(consecutiveSmallDeltas + 1, 10);
      } else if (timeSinceLast > 200) {
        consecutiveSmallDeltas = 0;
      }

      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;

      // Filter out micro-movements (use lower threshold for trackpads on Safari)
      const minDelta = isTouchpad() ? 2 : 1;
      if (Math.abs(e.deltaY) < minDelta) {
        e.preventDefault();
        return;
      }

      // --- Scrolling Down ---
      if (isDown) {
        // Reset upward state
        upExitAccumulator = 0;
        upEventCount = 0;
        downEventCount += 1;

        if (pageRef.current === 0) {
          // Slide to page 1 (use event count fallback for Safari trackpads)
          e.preventDefault();
          if (downEventCount >= DOWN_EVENT_COUNT_THRESHOLD || Math.abs(e.deltaY) > 10) {
            downEventCount = 0;
            setPage(1);
            isAnimating.current = true;
            setTimeout(() => {
              isAnimating.current = false;
            }, isTouchpad() ? 1200 : 800);
          }
          return;
        }

        // On page 1, snap to the list section precisely
        e.preventDefault();
        downEventCount = 0;
        const listSection = section.nextElementSibling as HTMLElement;
        if (listSection) {
          const targetY = listSection.getBoundingClientRect().top + window.scrollY;
          isAnimating.current = true;
          // Notify list section that a snap is incoming so it ignores momentum
          window.dispatchEvent(new CustomEvent("approach-snap-to-list"));
          animateScrollTo(targetY, 600, () => {
            isAnimating.current = false;
          });
        }
        return;
      }

      // --- Scrolling Up ---
      if (isUp) {
        if (pageRef.current === 1) {
          // Shouldn't normally happen (page resets on entry), but handle it
          e.preventDefault();
          setPage(0);
          isAnimating.current = true;
          setTimeout(() => {
            isAnimating.current = false;
            upExitAccumulator = 0;
          }, 400);
          return;
        }

        // On page 0, accumulate upward scroll intent before snapping to intro
        e.preventDefault();
        // Reset downward state
        downEventCount = 0;
        // Decay accumulator if there's been a gap (momentum dying down)
        if (now - lastUpEventTime > 250) {
          upExitAccumulator = 0;
          upEventCount = 0;
        }
        lastUpEventTime = now;
        upExitAccumulator += Math.abs(e.deltaY);
        upEventCount += 1;

        // Intent detected via delta accumulation OR event count (Safari trackpad fallback)
        const hasUpIntent = upExitAccumulator >= ACCUMULATOR_THRESHOLD || upEventCount >= UP_EVENT_COUNT_THRESHOLD;
        if (!hasUpIntent) {
          return;
        }
        upExitAccumulator = 0;
        upEventCount = 0;
        const introSection = document.querySelector<HTMLElement>("[data-hide-navbar]");
        if (introSection) {
          const targetY = introSection.offsetTop;
          animateScrollTo(targetY, 500);
        }
      }
    };

    section.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      section.removeEventListener("wheel", handleWheel);
      window.removeEventListener("list-snap-to-approach", handleSnapBack);
      window.removeEventListener("intro-snap-to-approach", handleSnapFromIntro);
      window.removeEventListener("wheel", globalWheelBlocker, { capture: true });
      visibilityObserver.disconnect();
    };
  }, [isMobile]);

  const panel1 = approaches.slice(0, 3);
  const panel2 = approaches.slice(3, 6);

  const renderCard = (item: (typeof approaches)[0], idx: number) => (
    <div
      key={item.num}
      className={`flex flex-col gap-1 py-12 ${
        idx === 0
          ? "md:pr-8 lg:pr-12 md:border-r border-white/20"
          : idx === 1
            ? "md:px-8 lg:px-12 md:border-r border-white/20"
            : "md:pl-8 lg:pl-12"
      }`}
    >
      <span
        className="text-[48px] lg:text-[64px] font-light text-white/90 leading-none mb-3"
        style={{ fontFamily: "var(--font-archivo)" }}
      >
        {item.num}
      </span>
      <h3 className="body-large whitespace-pre-line text-white leading-snug">
        {item.title}
      </h3>
      <p className="body-extra-small text-white leading-[1.75] mt-12 max-w-[300px]">
        {item.desc}
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <section className="relative z-10 w-full bg-transparent text-white py-10">
        <SiteContainer className="flex flex-col gap-12 pt-8 items-center">
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-4 mb-6">
              <RotatingDots />
              <span className="body-small tracking-[0.1em] text-white/90 font-bold">
                Strategic Approach
              </span>
            </div>
            <h2 className="heading-3 !text-center max-w-[320px]">
              Powering Business Transformation through Precision Engineering
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12">
            {approaches.map((item) => (
              <div key={item.num} className="flex flex-col items-center text-center gap-2">
                <span
                  className="text-[48px] font-light text-white/90 leading-none"
                  style={{ fontFamily: "var(--font-archivo)" }}
                >
                  {item.num}
                </span>
                <h3 className="body-small text-white leading-snug">
                  {item.title.replace(/\n/g, " ")}
                </h3>
              </div>
            ))}
          </div>
        </SiteContainer>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      id="services-approach"
      className="relative z-10 w-full h-screen bg-transparent text-white flex flex-col justify-center overflow-hidden"
    >
      {/* White overlap bar from intro section */}
      <div className="absolute top-0 left-0 w-full h-[30px] md:h-[90px] bg-white rounded-b-[12px] z-30" />

      <SiteContainer className="flex flex-col gap-12 lg:gap-16 pt-32 lg:pt-30">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col"
        >
          <div className="flex items-center gap-4 mb-6">
            <RotatingDots />
            <span className="body-small tracking-[0.1em] text-white/90 font-bold">
              Strategic Approach
            </span>
          </div>
          <h2 className="heading-2 max-w-[900px]">
            Powering Business Transformation through Precision Engineering
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
          className="relative w-full overflow-hidden"
        >
          <motion.div
            animate={{ x: page === 0 ? "0%" : "-50%" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex w-[200%] will-change-transform"
          >
            <div className="w-1/2 shrink-0 grid grid-cols-1 md:grid-cols-3">
              {panel1.map(renderCard)}
            </div>
            <div className="w-1/2 shrink-0 grid grid-cols-1 md:grid-cols-3">
              {panel2.map(renderCard)}
            </div>
          </motion.div>
        </motion.div>
      </SiteContainer>
    </section>
  );
}
