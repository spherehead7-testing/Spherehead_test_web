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

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

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

        setTimeout(() => {
          isAnimating.current = false;
        }, COOLDOWN_MS);
      } else if (direction === "up" && active > 0) {
        e.preventDefault();

        isAnimating.current = true;

        setActive((prev) => prev - 1);

        setTimeout(() => {
          isAnimating.current = false;
        }, COOLDOWN_MS);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [active]);

  // =========================
  // MOBILE SWIPE
  // =========================
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;

    const deltaX = touchStartX.current - touchEndX.current;

    if (Math.abs(deltaX) < 50) return;

    // swipe left
    if (deltaX > 0 && active < values.length - 1) {
      setActive((prev) => prev + 1);
    }

    // swipe right
    if (deltaX < 0 && active > 0) {
      setActive((prev) => prev - 1);
    }
  };

  return (
    <>
      {/* ========================= */}
      {/* MOBILE */}
      {/* ========================= */}
      <section className="overflow-hidden bg-[#0A2C82] text-white md:hidden">
        <div
          className="px-6 py-14"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* HEADER */}
          <div className="mb-10">
            <div className="mb-3 flex items-center gap-3">
              <RotatingDots />
              <span className="body-small">Our Core Values</span>
            </div>

            <h2 className="heading-2 max-w-[320px]">
              Driving Excellence through Strong Values and Purpose
            </h2>
          </div>

          {/* TOP LINE */}
          <div className="h-px w-full bg-white/30" />

          {/* TABS */}
          <div className="overflow-x-auto">
            <div className="body-small flex min-w-max gap-10 py-5 whitespace-nowrap">
              {values.map((item, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`transition-opacity duration-300 ${
                    active === i ? "opacity-100" : "opacity-50"
                  }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
          </div>

          {/* PROGRESS */}
          <div className="relative h-[2px] w-full bg-white/20">
            <motion.div
              className="absolute left-0 top-0 h-full bg-white"
              animate={{
                width: `${((active + 1) / values.length) * 100}%`,
              }}
              transition={{
                duration: 0.35,
              }}
            />

            <motion.div
              className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              animate={{
                left: `${((active + 1) / values.length) * 100}%`,
              }}
              transition={{
                duration: 0.35,
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="pt-10">
            <motion.div
              key={values[active].image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="mb-6 overflow-hidden"
            >
              <img
                src={values[active].image}
                alt={values[active].title}
                className="w-full object-cover"
              />
            </motion.div>

            <motion.div
              key={values[active].title}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <p className="body-small max-w-[320px] text-white/95">
                {values[active].description}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ========================= */}
      {/* DESKTOP */}
      {/* ========================= */}
      <section
        ref={sectionRef}
        className="relative hidden h-[300vh] text-white md:block"
      >
        <div className="sticky top-0 flex h-screen w-full flex-col overflow-hidden py-12">
          {/* HEADER */}
          <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-20">
            <div className="mb-10">
              <div className="mb-2 flex items-center gap-3">
                <RotatingDots />
                <span className="body-small">Our Core Values</span>
              </div>

              <h2 className="heading-2 max-w-[700px]">
                Driving Excellence through Strong Values and Purpose
              </h2>
            </div>
          </div>

          {/* LINE */}
          <div className="h-[2px] w-full bg-white/30" />

          {/* TABS */}
          <div className="w-full">
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

            {/* PROGRESS */}
            <div className="relative h-[3px] w-full bg-white/25">
              <motion.div
                className="absolute left-0 top-0 h-full bg-white"
                animate={{
                  width: `${active * 25 + 12.5}%`,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                animate={{
                  left: `${active * 25 + 12.5}%`,
                }}
                transition={{
                  duration: 0.45,
                  ease: "easeInOut",
                }}
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="mx-auto flex w-full max-w-[1440px] flex-1 items-center px-6 lg:px-20">
            <div className="grid w-full items-center gap-16 lg:grid-cols-2">
              {/* IMAGE */}
              <motion.div
                key={values[active].image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
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
    </>
  );
}
