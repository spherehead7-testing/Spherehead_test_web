"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";
import { ServiceCategoryData } from "@/data/service-categories";

const plusIconColors = ["text-[#FD7624]", "text-[#0D54CA]", "text-[#92D9FF]"];

export default function ServicesListSection({ data }: { data: ServiceCategoryData }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  // ACCORDION LOGIC: If you click the open one, it closes (null). 
  // If you click a new one, it opens the new one (index) and automatically closes the old one.
  const toggleAccordion = (index: number) =>
    setActiveIndex((prev) => (prev === index ? null : index));

  useEffect(() => {
    const openServiceFromHash = () => {
      const hash = window.location.hash;
      if (!hash) return;

      const slug = hash.replace("#service-", "");
      const targetIndex = data.items.findIndex((service) => service.slug === slug);
      
      if (targetIndex === -1) return;

      // Expand the specific item from the URL
      setActiveIndex(targetIndex);

      window.setTimeout(() => {
        document
          .getElementById(`service-${data.items[targetIndex].slug}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 250);
    };

    openServiceFromHash();
    
    router.events.on("hashChangeComplete", openServiceFromHash);
    window.addEventListener("hashchange", openServiceFromHash);

    return () => {
      router.events.off("hashChangeComplete", openServiceFromHash);
      window.removeEventListener("hashchange", openServiceFromHash);
    };
  }, [data.items, router]);

  return (
    <section className="relative z-30 w-full flex flex-col justify-start pt-[60px] lg:pt-[80px] snap-start">
      <div
        className="relative z-20 w-full rounded-t-[12px] flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.25)]"
        style={{ backgroundColor: "white" }}
      >
        <div className="w-full flex flex-col pt-10 lg:pt-16 pb-10">
          <SiteContainer className="flex-grow">
            <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-12 lg:gap-24 items-start">
              
              {/* LEFT COLUMN */}
              <div className="hidden lg:flex flex-col sticky top-32 h-fit">
                <div className="flex items-center gap-4 mb-6">
                  <RotatingDots variant="light" />
                  <span className="body-small tracking-[0.1em] text-[#0D54CA] font-bold">
                    {data.metaTitle}
                  </span>
                </div>

                <h2 className="heading-2 !text-[#01030B] mb-2 max-w-md">
                  {data.listTitle}
                </h2>

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
                              src={data.items[activeIndex].image}
                              alt={data.items[activeIndex].title}
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

              {/* RIGHT COLUMN: accordion list */}
              <div className="flex flex-col pr-2 lg:pr-6 pb-20">
                <div className="h-4 lg:h-8 shrink-0" />

                {data.items.map((service, index) => {
                  const isActive = activeIndex === index;
                  const currentPlusColor = plusIconColors[index % 3];
                  return (
                    <div
                      id={`service-${service.slug}`}
                      key={service.id}
                      className="scroll-mt-32 border-b border-[#e8e8e8] py-5 lg:py-6 transition-colors duration-300"
                    >
                      <div
                        className="flex items-center justify-between cursor-pointer group"
                        onClick={() => toggleAccordion(index)}
                      >
                        <div className="flex items-center gap-6 lg:gap-10">
                          <span className="body-large text-[#0D54CA]">
                            {service.id}
                          </span>
                          <h3 className="body-large text-[#01030B] transition-colors group-hover:text-[#0D54CA]">
                            {service.title}
                          </h3>
                        </div>
                        <button className="p-2 -mr-2 cursor-pointer focus:outline-none">
                          {/* ADDED: Smooth rotation so the + turns into an x when open! */}
                          <Plus 
                            className={`w-6 h-6 transition-transform duration-300 ${isActive ? "rotate-45" : ""} ${currentPlusColor}`} 
                          />
                        </button>
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height: isActive ? "auto" : 0,
                          opacity: isActive ? 1 : 0,
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
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