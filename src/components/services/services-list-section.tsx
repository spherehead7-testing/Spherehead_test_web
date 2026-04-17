import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";

interface Service { id: string; title: string; desc: string; image: string; }

const servicesData: Service[] = [
  { id: "01", title: "IT Consultations", desc: "Strategic guidance to align technology with your business goals.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "02", title: "Software Product Development", desc: "End-to-end product engineering from ideation to market entry.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "03", title: "IoT Development", desc: "Connecting devices to create smart, data-driven ecosystems.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "04", title: "Custom Web Development", desc: "We build custom software products that align with your vision, delivering innovation, scalability, and long-term value.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "05", title: "Robotics & Electronics", desc: "Advanced hardware solutions and automation engineering.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "06", title: "Quality Assurance & Testing", desc: "Rigorous testing protocols to ensure high performance.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "07", title: "Maintenance & Support", desc: "Continuous monitoring, security updates, and performance tuning.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "08", title: "Backend Development", desc: "Robust, scalable server-side architectures and database management.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
  { id: "09", title: "Website Audit & Optimization", desc: "Comprehensive analysis and performance enhancements for your digital presence.", image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776399464/services_list_ny50qm.png" },
];

export default function ServicesListSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const toggleAccordion = (index: number) => setActiveIndex(activeIndex === index ? null : index);

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
        if (edgeAccumulator > EDGE_THRESHOLD) {
          window.scrollBy(0, e.deltaY);
          edgeAccumulator = 0;
        } else {
          e.preventDefault(); 
        }
        return;
      }

      if (e.deltaY > 0 && isAtBottom) {
        edgeAccumulator += Math.abs(e.deltaY);
        if (edgeAccumulator > EDGE_THRESHOLD) {
          window.scrollBy(0, e.deltaY);
          edgeAccumulator = 0;
        } else {
          e.preventDefault(); 
        }
        return;
      }

      edgeAccumulator = 0;
    };

    list.addEventListener("wheel", handleWheel, { passive: false });
    return () => list.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <section className="relative z-30 w-full min-h-[100vh] h-auto bg-transparent flex flex-col justify-start pt-[80px] lg:pt-[100px]">
      
      <div className="w-full bg-white rounded-t-[12px] overflow-hidden flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.25)]">
        
        <div className="w-full min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-100px)] flex flex-col pt-10 lg:pt-16 pb-10">
          <SiteContainer className="flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-12 lg:gap-24 items-start h-full">
              
              <div className="hidden lg:flex flex-col sticky top-0">
                <div className="flex items-center gap-3 mb-4">
                  <RotatingDots />
                  <p className="inter-tight text-[#2666d2] font-semibold tracking-wider uppercase text-sm">Digital Services</p>
                </div>
                <h2 className="text-[42px] leading-[1.1] font-light text-[#01030B] mb-2 max-w-md">
                  Driving Enterprise Value Through Scalable Tech Innovation
                </h2>
                
                <AnimatePresence>
                  {activeIndex !== null && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: "auto", marginTop: "2rem" }}
                      exit={{ opacity: 0, height: 0, marginTop: 0 }}
                      transition={{ duration: 0.8, ease: "easeInOut" }}
                      className="relative w-full max-w-[360px] aspect-[4/3] rounded-[24px] overflow-hidden bg-[#F8F9FA]"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={servicesData[activeIndex].image}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.8, ease: "easeInOut" }} 
                          className="absolute inset-0 p-6"
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div 
                ref={listRef} 
                className="flex flex-col overflow-y-auto max-h-[60vh] lg:max-h-[70vh] pr-2 lg:pr-6 pb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                style={{
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
                }}
              >
                <div className="h-4 lg:h-8 shrink-0" />
                
                {servicesData.map((service, index) => (
                  <div key={service.id} className="group border-b border-gray-100 py-5 lg:py-6 transition-colors duration-300">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 lg:gap-10">
                        <span className={`text-lg font-medium transition-colors duration-300 ${activeIndex === index ? 'text-[#2666d2]' : 'text-gray-400'}`}>
                          {service.id}
                        </span>
                        <h3 className={`text-xl lg:text-2xl font-light transition-colors duration-300 ${activeIndex === index ? 'text-[#01030B]' : 'text-gray-500'}`}>
                          {service.id === "04" && index === activeIndex ? "Custom Web Development" : service.title}
                        </h3>
                      </div>
                      
                      <button onClick={() => toggleAccordion(index)} className="p-2 -mr-2 cursor-pointer focus:outline-none">
                        {activeIndex === index ? <Minus className="w-5 h-5 text-[#FD7624] transition-all duration-300" /> : <Plus className="w-5 h-5 text-[#2666d2] transition-all duration-300" />}
                      </button>
                    </div>

                    <motion.div
                      initial={false}
                      animate={{ height: activeIndex === index ? "auto" : 0, opacity: activeIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 pb-2 text-gray-500 text-sm lg:text-base leading-relaxed max-w-lg ml-16 lg:ml-20">
                        {service.desc}
                      </p>
                    </motion.div>
                  </div>
                ))}
                <div className="h-10 lg:h-16 shrink-0" />
              </div>
            </div>
          </SiteContainer>
        </div>

        {/* BOTTOM HALF: The Line-Free, Scroll-Driven Tech Stack Carousel */}
        <TechStackCarousel />

      </div>
    </section>
  );
}