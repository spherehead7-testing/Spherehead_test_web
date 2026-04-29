"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import SiteContainer from "@/components/layout/site-container";

// Mock Data - Replace with your actual case study data/images
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
    description: "A leading healthcare provider wanted to streamline operations and improve patient outcomes by integrating their fragmented IT systems into a cohesive, secure, and lightning-fast platform.",
    slug: "revolutionizing-healthcare",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462586/medi_2_cnmr4x.png", 
  },
  {
    id: "03",
    category: "Supply Chain",
    title: "Transforming Factory Operations Through IoT and Analytics",
    description: "By implementing a network of IoT sensors and real-time data analytics, we helped a global manufacturer reduce machinery downtime by 45% and optimize their entire supply chain.",
    slug: "transforming-factory-operations",
    image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777462587/fac_operations_3_k9enyp.png", 
  },
];

export default function CaseStudiesSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalSlides = CASE_STUDIES.length;
  const activeStudy = CASE_STUDIES[currentIndex];
  
  // Calculate the next slide index for the right-side preview image
  const nextIndex = (currentIndex + 1) % totalSlides;
  const nextStudy = CASE_STUDIES[nextIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  return (
    <SiteContainer>
      <div className="w-full flex flex-col gap-8 pb-12">
        
        {/* Section Title */}
        <h3 className="heading-3 text-[#4A4A4A] mb-4">Case studies</h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: ACTIVE SLIDE (Takes up 8 columns) */}
          <div className="lg:col-span-8 flex flex-col overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStudy.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="flex flex-col w-full"
              >
                {/* Main Active Image */}
                <div className="w-full h-[250px] sm:h-[350px] lg:h-[450px] bg-gray-200 overflow-hidden relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src={activeStudy.image} 
                    alt={activeStudy.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Controls & Category Bar */}
                <div className="flex items-center justify-between w-full mt-6 mb-4">
                  <span className="px-3 py-1 bg-blue-50 text-[#0D54CA] text-xs font-semibold uppercase tracking-wider rounded-sm">
                    {activeStudy.category}
                  </span>
                  
                  {/* Mobile-friendly arrows */}
                  <div className="flex items-center gap-4 text-gray-500">
                    <button onClick={handlePrev} className="hover:text-[#0D54CA] transition-colors p-1">
                      <FiChevronLeft className="w-6 h-6" />
                    </button>
                    <button onClick={handleNext} className="hover:text-[#0D54CA] transition-colors p-1">
                      <FiChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                {/* Text Content */}
                <h2 className="text-3xl lg:text-[40px] leading-tight font-light text-[#01030B] mb-6">
                  {activeStudy.title}
                </h2>
                
                <p className="body-large text-[#8A8B8F] leading-[1.6] max-w-3xl mb-8">
                  {activeStudy.description}
                </p>

                {/* IMPORTANT: Dynamic link routing to the detailed page */}
                <Link href={`/case-studies/${activeStudy.slug}`} className="w-fit">
                  <button className="border border-[#0D54CA] text-[#0D54CA] px-6 py-2.5 text-sm font-medium hover:bg-[#0D54CA] hover:text-white transition-colors">
                    View Full Case Study
                  </button>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>


          {/* RIGHT COLUMN: PREVIEW NEXT SLIDE & COUNTER (Takes up 4 columns) */}
          <div className="hidden lg:flex lg:col-span-4 flex-col border-l border-gray-200 pl-12 h-full">
            
            {/* Grayscale Preview of Next Image */}
            <div className="w-full h-[220px] bg-gray-100 overflow-hidden relative opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src={nextStudy.image} 
                alt="Next Case Study Preview"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Giant Number Indicator */}
            <div className="mt-12 flex items-baseline gap-1">
              <AnimatePresence mode="wait">
                <motion.span 
                  key={activeStudy.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-7xl font-light text-[#0D54CA] leading-none"
                >
                  {activeStudy.id}
                </motion.span>
              </AnimatePresence>
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