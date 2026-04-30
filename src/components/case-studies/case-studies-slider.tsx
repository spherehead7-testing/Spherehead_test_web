"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SiteContainer from "@/components/layout/site-container";

const CASE_STUDIES = [
  {
    id: "01",
    category: "E-commerce",
    title: "Transforming E-Commerce: From Concept to 300% Growth",
    description: "Our client, a growing retail business, needed a comprehensive e-commerce platform to expand their online presence and increase sales. The existing system was outdated, slow, and couldn't handle the growing customer base.",
    slug: "transforming-ecommerce",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777463708/agri_1_jdpgi6.png",
  },
  {
    id: "02",
    category: "Healthcare",
    title: "Revolutionizing Patient Care Through Integrated Healthcare Systems",
    description: "A leading healthcare provider approached us to modernize their patient management system. They needed a comprehensive solution to streamline operations, improve patient care, and ensure compliance with healthcare regulations.",
    slug: "revolutionizing-healthcare",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462586/medi_2_cnmr4x.png",
  },
  {
    id: "03",
    category: "Supply Chain",
    title: "Transforming Factory Operations Through IoT and Analytics",
    description: "A leading healthcare provider approached us to modernize their patient management system. They needed a comprehensive solution to streamline operations, improve patient care, and ensure compliance with healthcare regulations.",
    slug: "transforming-factory-operations",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462587/fac_operations_3_k9enyp.png",
  },
];

const DURATION = 550;

export default function CaseStudiesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const mainSlotRef = useRef<HTMLDivElement>(null);
  const previewSlotRef = useRef<HTMLDivElement>(null);
  const mainImgRef = useRef<HTMLImageElement>(null);
  const previewImgRef = useRef<HTMLImageElement>(null);

  const totalSlides = CASE_STUDIES.length;
  const activeStudy = CASE_STUDIES[currentIndex];
  const nextIndex = (currentIndex + 1) % totalSlides;
  const nextStudy = CASE_STUDIES[nextIndex];

  const handleNext = useCallback(() => {
    if (isAnimating) return;

    const mainSlot = mainSlotRef.current;
    const previewSlot = previewSlotRef.current;
    const mainImg = mainImgRef.current;
    const previewImg = previewImgRef.current;

    if (!mainSlot || !previewSlot || !mainImg || !previewImg) {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      return;
    }

    setIsAnimating(true);

    const mainRect = mainSlot.getBoundingClientRect();
    const previewRect = previewSlot.getBoundingClientRect();

    // How much the preview differs from the main slot
    const dx = previewRect.left - mainRect.left;
    const dy = previewRect.top - mainRect.top;
    const scaleX = previewRect.width / mainRect.width;
    const scaleY = previewRect.height / mainRect.height;

    // ── CLONE: starts at main slot size/position, visually offset to sit over preview ──
    const clone = document.createElement("img");
    clone.src = previewImg.src;
    clone.style.cssText = `
      position: fixed;
      left: ${mainRect.left}px;
      top: ${mainRect.top}px;
      width: ${mainRect.width}px;
      height: ${mainRect.height}px;
      object-fit: cover;
      z-index: 9999;
      pointer-events: none;
      will-change: transform, filter;
      transform-origin: top left;
      filter: grayscale(100%);
    `;
    document.body.appendChild(clone);

    // Hide originals immediately
    previewImg.style.opacity = "0";
    mainImg.style.opacity = "0";

    // Step 1: snap clone to preview position (no transition yet)
    clone.style.transform = `translate(${dx}px, ${dy}px) scale(${scaleX}, ${scaleY})`;

    // Step 2: one rAF later, add transition and fly back to main slot
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        clone.style.transition = `transform ${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1), filter ${DURATION}ms ease`;
        clone.style.transform = `translate(0px, 0px) scale(1, 1)`;
        clone.style.filter = "grayscale(0%)";
      });
    });

    // Step 3: slide out the outgoing main image to the left
    mainImg.style.transition = `transform ${DURATION}ms cubic-bezier(0.76, 0, 0.24, 1), opacity ${DURATION * 0.6}ms ease`;
    mainImg.style.transform = "translateX(-40px)";

    // Step 4: after flight, swap index, clean up
    setTimeout(() => {
      clone.remove();

      mainImg.style.transition = "";
      mainImg.style.transform = "";
      mainImg.style.opacity = "1";
      previewImg.style.opacity = "1";

      setCurrentIndex((prev) => (prev + 1) % totalSlides);
      setIsAnimating(false);
    }, DURATION + 16);

  }, [isAnimating, totalSlides]);

  const handlePrev = useCallback(() => {
    if (isAnimating) return;
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [isAnimating, totalSlides]);

  return (
    <SiteContainer>
      <div className="w-full flex flex-col gap-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* LEFT: MAIN SLOT */}
          <div className="lg:col-span-8 flex flex-col">

            {/* This div is the TARGET — we measure it */}
            <div
              ref={mainSlotRef}
              className="w-full h-[250px] sm:h-[300px] lg:h-[380px] bg-gray-200 overflow-hidden"
            >
              <img
                ref={mainImgRef}
                src={activeStudy.image}
                alt={activeStudy.title}
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>

            <div className="flex items-center justify-between w-full mt-6 mb-4">
              <span className="px-3 py-1 bg-blue-50 text-[#0D54CA] text-xs font-semibold uppercase tracking-wider rounded-sm">
                {activeStudy.category}
              </span>
              <div className="flex items-center gap-4 text-gray-500">
                <button
                  onClick={handlePrev}
                  disabled={isAnimating}
                  className="hover:text-[#0D54CA] transition-colors p-1 disabled:opacity-40"
                >
                  <FiChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  disabled={isAnimating}
                  className="hover:text-[#0D54CA] transition-colors p-1 disabled:opacity-40"
                >
                  <FiChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="max-w-lg lg:max-w-xl">
              <h2 className="heading-2 !text-[#01030B] mb-6">{activeStudy.title}</h2>
              <p className="body-small text-[#8A8B8F] leading-[1.6] mb-8">{activeStudy.description}</p>
              <Link href={`/case-studies/${activeStudy.slug}`} className="w-fit block">
                <button className="body-Extrasmall border border-[#0D54CA] text-[#0D54CA] px-6 py-2.5 hover:bg-[#0D54CA] hover:text-white transition-colors">
                  View Full Case Study
                </button>
              </Link>
            </div>
          </div>

          {/* RIGHT: PREVIEW SLOT */}
          <div className="hidden lg:flex lg:col-span-4 flex-col h-full">

            {/* This div is the SOURCE — we measure it */}
            <div className="w-full lg:mt-[80px]">
              <div
                ref={previewSlotRef}
                className="h-[300px] bg-gray-100 overflow-hidden"
                style={{ width: "calc(100% + 6rem + max(0px, (100vw - 1400px) / 2))" }}
              >
                <img
                  ref={previewImgRef}
                  src={nextStudy.image}
                  alt="Next Case Study"
                  className="w-full h-full object-cover"
                  style={{ filter: "grayscale(100%)", display: "block" }}
                />
              </div>
            </div>

            <div className="mt-12 flex items-baseline gap-1 border-l border-gray-200 pl-12 flex-grow pt-2">
              <span className="text-7xl font-light text-[#0D54CA] leading-none">
                {activeStudy.id}
              </span>
              <span className="text-2xl font-light text-gray-400">
                /0{totalSlides}
              </span>
            </div>

          </div>
        </div>
      </div>
    </SiteContainer>
  );
}