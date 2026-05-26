"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SiteContainer from "@/components/layout/site-container";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-is-mobile";

const CASE_STUDIES = [
  {
    id: "01",
    category: "E-commerce",
    title: "Transforming E-Commerce: From Concept to 300% Growth",
    description:
      "Our client, a growing retail business, needed a comprehensive e-commerce platform to expand their online presence and increase sales. The existing system was outdated, slow, and couldn't handle the growing customer base.",
    slug: "transforming-ecommerce",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777463708/agri_1_jdpgi6.png",
  },
  {
    id: "02",
    category: "Healthcare",
    title: "Revolutionizing Patient Care Through Integrated Healthcare Systems",
    description:
      "A leading healthcare provider approached us to modernize their patient management system. They needed a comprehensive solution to streamline operations, improve patient care, and ensure compliance with healthcare regulations.",
    slug: "revolutionizing-healthcare",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462586/medi_2_cnmr4x.png",
  },
  {
    id: "03",
    category: "Supply Chain",
    title: "Transforming Factory Operations Through IoT and Analytics",
    description:
      "A leading manufacturing company approached us to implement IoT solutions across their production facilities. They needed to modernize their manufacturing processes, improve efficiency, and reduce operational costs through smart technology integration.",
    slug: "transforming-factory-operations",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462587/fac_operations_3_k9enyp.png",
  },
];

const DURATION = 1.5;
const EASE: [number, number, number, number] = [0.76, 0, 0.24, 1];

export default function CaseStudiesSlider() {
  const [[page, direction], setPage] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("spherehead_slider_page");
      if (saved !== null) {
        return [parseInt(saved, 10), 0];
      }
    }
    return [0, 0];
  });

  const isMobile = useIsMobile();
  
  // Animation lock
  const isAnimating = React.useRef(false);

  // NEW: Mount state to prevent initial hydration fly-in animations
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    sessionStorage.setItem("spherehead_slider_page", page.toString());
  }, [page]);

  const totalSlides = CASE_STUDIES.length;
  const currentIndex = ((page % totalSlides) + totalSlides) % totalSlides;
  const nextIndex = (currentIndex + 1) % totalSlides;

  const activeStudy = CASE_STUDIES[currentIndex];
  const nextStudy = CASE_STUDIES[nextIndex];

  const handleNext = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    setPage((prev) => [prev[0] + 1, 1]);
    
    setTimeout(() => {
      isAnimating.current = false;
    }, DURATION * 1000);
  }, []);

  const handlePrev = useCallback(() => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    
    setPage((prev) => [prev[0] - 1, -1]);
    
    setTimeout(() => {
      isAnimating.current = false;
    }, DURATION * 1000);
  }, []);

  const mainVariants = {
    enter: (direction: number) => ({
      x: isMobile ? "0%" : (direction > 0 ? "0%" : "-100%"),
      opacity: direction > 0 ? 1 : 0,
      scale: isMobile ? 1 : (direction > 0 ? 1 : 0.8),
      filter: "grayscale(100%)",
      zIndex: 10,
    }),
    center: {
      zIndex: 20,
      x: "0%",
      opacity: 1,
      scale: 1,
      filter: "grayscale(0%)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: isMobile ? "0%" : (direction > 0 ? "-100%" : "0%"),
      opacity: direction > 0 ? 0 : 1,
      scale: isMobile ? 1 : (direction > 0 ? 0.8 : 1),
      filter: "grayscale(100%)",
    }),
  };

  const previewVariants = {
    enter: (direction: number) => ({
      x: isMobile ? "0%" : (direction > 0 ? "100%" : "0%"),
      opacity: direction > 0 ? 0 : 1,
      filter: direction > 0 ? "grayscale(100%)" : "grayscale(0%)",
    }),
    center: {
      zIndex: 10,
      x: "0%",
      opacity: 1,
      filter: "grayscale(100%)",
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: isMobile ? "0%" : (direction > 0 ? "0%" : "100%"),
      opacity: direction > 0 ? 1 : 0,
      filter: "grayscale(100%)",
    }),
  };

  return (
    <SiteContainer>
      <LayoutGroup>
        <div
          className="w-full flex flex-col gap-8 pb-12"
          suppressHydrationWarning
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* === LEFT: MAIN SLOT === */}
            <div className="lg:col-span-8 flex flex-col">
              {/* IMAGE ROW */}
              <div className="flex flex-row gap-4 items-start lg:items-stretch lg:block w-full relative overflow-visible">
                {/* 1. Main Image - 80% width on mobile */}
                <div className="w-[80%] lg:w-full h-[220px] sm:h-[280px] lg:h-[380px] relative overflow-visible rounded-sm shrink-0 z-10">
                  <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                      key={`main-slide-${page}`}
                      layout={isMounted} // Disabled on initial mount
                      layoutId={isMounted ? `shared-slide-${currentIndex}` : undefined} // Disabled on initial mount
                      custom={direction}
                      variants={mainVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: DURATION, ease: EASE }}
                      className="absolute inset-0 w-full h-full overflow-hidden rounded-sm shadow-sm"
                    >
                      <Link
                        href={`/case-studies/${activeStudy.slug}`}
                        className="w-full h-full block cursor-pointer"
                      >
                        <img
                          src={activeStudy.image}
                          alt={activeStudy.title}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </Link>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* 2. Mobile Preview Image */}
                <div
                  className="w-[25%] lg:hidden relative h-[160px] sm:h-[210px] overflow-hidden rounded-sm shrink-0 cursor-pointer z-0"
                  onClick={handleNext}
                >
                  <AnimatePresence custom={direction} initial={false}>
                    <motion.div
                      key={`preview-slide-mob-${page}`}
                      layoutId={isMounted && isMobile ? `shared-slide-${nextIndex}` : undefined}
                      custom={direction}
                      variants={previewVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: DURATION, ease: EASE }}
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={nextStudy.image}
                        alt="Next Case Study"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* DISSOLVING CATEGORY AND STATIC CONTROLS */}
              <div className="flex items-center w-full mt-6 mb-4 relative min-h-[32px]">
                <div className="flex items-center h-full">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={`category-${page}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="px-3 py-1 bg-blue-50 text-[#0D54CA] text-xs font-semibold uppercase tracking-wider rounded-sm whitespace-nowrap"
                    >
                      {activeStudy.category}
                    </motion.span>
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-8 text-gray-500 relative z-10 ml-auto">
                  <button
                    onClick={handlePrev}
                    className="hover:text-[#0D54CA] transition-colors p-1"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={handleNext}
                    className="hover:text-[#0D54CA] transition-colors p-1"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* TEXT BLOCK & MOBILE COUNTER ROW */}
              <div className="flex flex-row gap-4 items-stretch w-full min-h-[160px]">
                {/* Text Content */}
                <div className="w-[80%] shrink-0 lg:w-full flex flex-col justify-between pr-2 lg:pr-0">
                  <div>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={`text-${page}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        <h2 className="heading-2 !text-[#01030B] mb-6">
                          {activeStudy.title}
                        </h2>
                        <p className="body-small text-[#8A8B8F] mb-8 hidden lg:block">
                          {activeStudy.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/case-studies/${activeStudy.slug}`}
                      className="body-extra-small border border-[#0D54CA] !text-[#0D54CA] px-6 py-2.5 transition-colors w-fit block text-center"
                    >
                      View Full Case Study
                    </Link>
                  </div>
                </div>

                {/* MOBILE ONLY: Counter */}
                <div className="flex-1 lg:hidden flex flex-col justify-start pt-1">
                  <div className="flex items-baseline relative w-fit">
                    <span className="text-4xl font-light leading-none invisible pointer-events-none">
                      00
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`counter-mob-${page}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute left-0 bottom-0 text-4xl font-light text-[#0D54CA] leading-none"
                      >
                        {activeStudy.id}
                      </motion.span>
                    </AnimatePresence>
                    <span className="text-base font-light text-gray-400 ml-1">
                      /0{totalSlides}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* === RIGHT: PREVIEW SLOT & COUNTER (Desktop Only) === */}
            <div className="hidden lg:flex lg:col-span-4 flex-col h-full">
              <div className="w-full lg:h-[380px] relative overflow-visible">
                <motion.div
                  initial={{ y: 0 }}
                  whileInView={{ y: 80 }}
                  viewport={{ once: false, amount: 0.6 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-full relative"
                >
                  <div
                    className="h-[300px] cursor-pointer relative overflow-visible"
                    style={{
                      width: "calc(100% + 6rem + max(0px, (100vw - 1400px) / 2))",
                    }}
                    onClick={handleNext}
                  >
                    <AnimatePresence custom={direction} initial={false}>
                      <motion.div
                        key={`preview-slide-${page}`}
                        layoutId={isMounted && !isMobile ? `shared-slide-${nextIndex}` : undefined}
                        custom={direction}
                        variants={previewVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: DURATION, ease: EASE }}
                        className="absolute inset-0 w-full h-full overflow-hidden rounded-sm"
                      >
                        <img
                          src={nextStudy.image}
                          alt="Next Case Study"
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>

              {/* DESKTOP ONLY: Static Counter */}
              <div className="mt-12 border-l border-gray-200 flex-grow relative min-h-[90px]">
                <div className="pl-12 flex items-baseline gap-1 pt-2">
                  <div className="relative flex items-baseline">
                    <span className="text-7xl font-light leading-none invisible pointer-events-none">
                      00
                    </span>
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.span
                        key={`counter-${page}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="absolute left-0 bottom-0 text-7xl font-light text-[#0D54CA] leading-none"
                      >
                        {activeStudy.id}
                      </motion.span>
                    </AnimatePresence>
                  </div>

                  <span className="text-2xl font-light text-gray-400">
                    /0{totalSlides}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutGroup>
    </SiteContainer>
  );
}