"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

interface Service {
  id: string;
  title: string;
  desc: string;
  image: string;
}

const servicesData: Service[] = [
  { id: "01", title: "IT Consultations", desc: "Strategic guidance to align technology with your business goals.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "02", title: "Software Product Development", desc: "End-to-end product engineering from ideation to market entry.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744960/Services_list_img6_twlcre.png" },
  { id: "03", title: "IoT Development", desc: "Connecting devices to create smart, data-driven ecosystems.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744960/Services_list_img2_ncxxv8.png" },
  { id: "04", title: "Custom Web Development", desc: "We build custom software products that align with your vision, delivering innovation, scalability, and long-term value.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img4_ls76el.png" },
  { id: "05", title: "Robotics & Electronics", desc: "Advanced hardware solutions and automation engineering.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img7_aazspt.png" },
  { id: "06", title: "Quality Assurance & Testing", desc: "Rigorous testing protocols to ensure high performance.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img9_hqz8tk.png" },
  { id: "07", title: "Maintenance & Support", desc: "Continuous monitoring, security updates, and performance tuning.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img8_yeejer.png" },
  { id: "08", title: "Backend Development", desc: "Robust, scalable server-side architectures and database management.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img5_xraozk.png" },
  { id: "09", title: "Website Audit & Optimization", desc: "Comprehensive analysis and performance enhancements for your digital presence.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776744959/Services_list_img3_ylhhjb.png" },
];

const plusIconColors = ["text-[#FD7624]", "text-[#0D54CA]", "text-[#92D9FF]"];

export default function ServicesListSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) =>
    setActiveIndex((prev) => (prev === index ? null : index));

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let edgeAccumulator = 0;
    const EDGE_THRESHOLD = 150;
    const handleWheel = (e: WheelEvent) => {
      const isAtTop = list.scrollTop <= 0;
      const isAtBottom = Math.ceil(list.scrollTop + list.clientHeight) >= list.scrollHeight - 1;
      if (e.deltaY < 0 && isAtTop) {
        edgeAccumulator += Math.abs(e.deltaY);
        if (edgeAccumulator > EDGE_THRESHOLD) { window.scrollBy(0, e.deltaY); edgeAccumulator = 0; }
        else e.preventDefault();
        return;
      }
      if (e.deltaY > 0 && isAtBottom) {
        edgeAccumulator += Math.abs(e.deltaY);
        if (edgeAccumulator > EDGE_THRESHOLD) { window.scrollBy(0, e.deltaY); edgeAccumulator = 0; }
        else e.preventDefault();
        return;
      }
      edgeAccumulator = 0;
    };
    list.addEventListener("wheel", handleWheel, { passive: false });
    return () => list.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="relative z-30 w-full min-h-[100vh] bg-transparent flex flex-col justify-start pt-[80px] lg:pt-[100px] snap-start">
      <div
        className="relative z-20 w-full rounded-t-[12px] flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: "white" }}
      >
        <div className="w-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)] flex flex-col pt-10 lg:pt-16 pb-10">
          <SiteContainer className="flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-12 lg:gap-24 items-start h-full">

              {/* LEFT COLUMN */}
              <div className="hidden lg:flex flex-col sticky top-0">
                <div className="flex items-center gap-4 mb-6">
                  <RotatingDots variant="light" />
                  <span className="body-small tracking-[0.1em] text-[#0D54CA] uppercase font-bold">
                    Digital Services
                  </span>
                </div>

                <h2 className="heading-2 !text-[#01030B] !leading-[1.1] mb-2 max-w-md">
                  Driving Enterprise Value Through Scalable Tech Innovation
                </h2>

                {/* Image box with gradient background matching the global site background */}
                <AnimatePresence>
                  {activeIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: "2rem" }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.6, ease: "easeInOut" }}
                      className="bg-animated-gradient !relative w-full max-w-[360px] overflow-hidden rounded-none"
                    >
                      <div className="relative w-full aspect-[4/3]">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                            className="absolute inset-0"
                          >
                            <Image
                              src={servicesData[activeIndex].image}
                              alt={servicesData[activeIndex].title}
                              fill
                              sizes="360px"
                              className="object-contain p-4"
                            />
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* RIGHT: accordion list */}
              <div
                ref={listRef}
                className="flex flex-col overflow-y-auto max-h-[60vh] lg:max-h-[70vh] pr-2 lg:pr-6 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 15%, black 100%)",
                }}
              >
                <div className="h-4 lg:h-8 shrink-0" />

                {servicesData.map((service, index) => {
                  const isActive = activeIndex === index;
                  const currentPlusColor = plusIconColors[index % 3];
                  return (
                    <div key={service.id} className="border-b border-[#e8e8e8] py-5 lg:py-6 transition-colors duration-300">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => toggleAccordion(index)}
                      >
                        <div className="flex items-center gap-6 lg:gap-10">
                          <span className="body-large text-[#0D54CA]">{service.id}</span>
                          <h3 className="body-large text-[#01030B]">{service.title}</h3>
                        </div>
                        <button className="p-2 -mr-2 cursor-pointer focus:outline-none">
                          <Plus className={`w-6 h-6 ${currentPlusColor}`} />
                        </button>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{ height: isActive ? "auto" : 0, opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.2, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <p className="body-small text-[#55565C] pt-4 pb-2 leading-relaxed max-w-lg ml-16 lg:ml-20">
                          {service.desc}
                        </p>
                      </motion.div>
                    </div>
                  );
                })}

                <div className="h-10 lg:h-16 shrink-0" />
              </div>
            </div>
          </SiteContainer>
        </div>

        <TechStackCarousel />
      </div>
    </section>
  );
}