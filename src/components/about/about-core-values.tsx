"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import RotatingDots from "@/components/ui/rotating-dots";

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
  const sectionRef = useRef<HTMLElement | null>(null);
  const isAnimating = useRef(false);
  // Track whether this section has been "entered" — i.e. scrolled into view
  const isLocked = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const handleWheel = (e: WheelEvent) => {
      const rect = section.getBoundingClientRect();

      // Section is considered "in view" when its top edge is at or above viewport top
      // and its bottom edge is still below the viewport bottom
      const sectionInView = rect.top <= 0 && rect.bottom >= window.innerHeight;

      if (!sectionInView) {
        isLocked.current = false;
        return;
      }

      // Section is in view — lock scrolling
      isLocked.current = true;

      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0) {
        // Scroll DOWN
        if (active < values.length - 1) {
          e.preventDefault();
          isAnimating.current = true;
          setActive((prev) => prev + 1);
          setTimeout(() => {
            isAnimating.current = false;
          }, 700);
        }
        // Last value reached — allow natural scroll to continue (don't preventDefault)
      } else if (e.deltaY < 0) {
        // Scroll UP
        if (active > 0) {
          e.preventDefault();
          isAnimating.current = true;
          setActive((prev) => prev - 1);
          setTimeout(() => {
            isAnimating.current = false;
          }, 700);
        }
        // First value reached — allow natural scroll upward
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [active]);

  return (
    <section
      ref={sectionRef}
      // h-[300vh] gives enough scroll distance to cover all 4 values
      className="relative h-[300vh] text-white"
    >
      {/* Sticky panel — stays in view while parent scrolls */}
      <div className="sticky top-0 flex h-screen w-full flex-col py-12 overflow-hidden">
        {/* HEADER */}
        <div className="max-w-[1400px] mx-auto w-full px-6 lg:px-20">
          <div className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <RotatingDots />
              <span className="body-small">Our Core Values</span>
            </div>
            <h2 className="heading-2 max-w-[700px]">
              Driving Excellence through Strong Values and Purpose
            </h2>
          </div>
        </div>

        {/* FULL WIDTH TOP LINE */}
        <div className="w-full h-[2px] bg-white/30" />

        {/* TABS */}
        <div className="w-full">
          {/* LABELS — py-5 gives equal space above and below relative to both lines */}
          <div className="w-full px-6 lg:px-20">
            <div className="body-medium flex justify-between py-5">
              {values.map((item, i) => (
                <button
                  key={i}
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
          </div>

          {/* PROGRESS LINE + DOT
           * One full-width track. A single white bar grows from the left
           * edge to the centre of the active tab label. The dot sits at
           * the tip of that bar — both driven by the same `targetPct` value.
           *
           * Each tab occupies 25% of the width; its centre is at:
           *   i * 25 + 12.5  (%)
           */}
          <div className="relative w-full h-[2px] bg-white/30">
            {/* Growing white highlight */}
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              animate={{ width: `${active * 25 + 12.5}%` }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
            {/* Dot — rides the tip of the highlight */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white z-10"
              animate={{ left: `${active * 25 + 12.5}%` }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="max-w-[1440px] mx-auto w-full px-6 lg:px-20 flex-1 flex items-center">
          <div className="grid lg:grid-cols-2 gap-6 items-center w-full pt-10">
            {/* IMAGE */}
            <motion.div
              key={values[active].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden max-w-[480px]"
            >
              <img
                src={values[active].image}
                className="w-full h-auto"
                alt={values[active].title}
              />
            </motion.div>

            {/* TEXT */}
            <motion.div
              key={values[active].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <h3 className="body-large mb-6">{values[active].title}</h3>
              <p className="body-small max-w-[500px]">
                {values[active].description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
