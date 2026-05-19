"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Plus } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import TechStackCarousel from "@/components/ui/tech-stack-carousel";
import { ServiceCategoryData } from "@/data/service-categories";
import { useIsMobile } from "@/hooks/use-is-mobile";

const plusIconColors = ["text-[#FD7624]", "text-[#0D54CA]", "text-[#92D9FF]"];

export default function ServicesListSection({ data }: { data: ServiceCategoryData }) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const listWrapperRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
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

  // Measure how far the list can scroll before the last item aligns with the image bottom
  const measureMaxTranslate = useCallback(() => {
    const listEl = listRef.current;
    const wrapperEl = listWrapperRef.current;
    if (!listEl || !wrapperEl) return;

    const listHeight = listEl.scrollHeight;
    const wrapperHeight = wrapperEl.clientHeight;
    const overflow = listHeight - wrapperHeight;
    setMaxTranslate(overflow > 0 ? overflow : 0);
  }, []);

  useEffect(() => {
    measureMaxTranslate();
    window.addEventListener("resize", measureMaxTranslate);
    return () => window.removeEventListener("resize", measureMaxTranslate);
  }, [measureMaxTranslate, activeIndex]);

  // SCROLL PINNING LOGIC — only used on desktop
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Translate the list by exactly the overflow amount so the last item stops at the wrapper bottom
  const yPx = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  // Mobile: simple flat layout with no pinning
  if (isMobile) {
    return (
      <section className="relative w-full">
        <div className="relative z-20 w-full rounded-[6px] flex flex-col bg-white pt-10 pb-10 shadow-[0_-10px_30px_rgba(0,0,0,0.1)]">
          <SiteContainer>
            <div className="flex items-center gap-4 mb-6">
              <RotatingDots variant="light" />
              <span className="body-small tracking-[0.1em] text-[#0D54CA] font-bold">
                {data.metaTitle}
              </span>
            </div>

            <h2 className="heading-2 !text-[#01030B] mb-8 max-w-md">
              {data.listTitle}
            </h2>

            <div className="flex flex-col">
              {data.items.map((service, index) => (
                <ServiceListItem
                  key={service.id}
                  service={service}
                  index={index}
                  isActive={activeIndex === index}
                  toggleAccordion={toggleAccordion}
                  currentPlusColor="text-[#0D54CA]"
                />
              ))}
            </div>
          </SiteContainer>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      className="relative w-full"
      style={{ height: `${data.items.length * 1 + 90}vh` }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-start bg-animated-gradient pt-[60px] lg:pt-[80px]">
        <div
          className="relative z-20 w-full h-full rounded-t-[24px] lg:rounded-t-[40px] flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.25)]"
          style={{ backgroundColor: "white" }}
        >
          <div className="w-full flex flex-col pt-10 lg:pt-16 pb-10 overflow-hidden h-full">
            <SiteContainer className="flex-grow h-full">
              <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-12 lg:gap-24 items-start h-full">


                {/* LEFT COLUMN */}
                <div className="hidden lg:flex flex-col h-fit -mt-10 lg:-mt-[-20px]">
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
                        className="bg-animated-gradient !relative w-full max-w-[360px] overflow-hidden rounded-none "
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
                <div ref={listWrapperRef} className="relative flex flex-col pr-2 lg:pr-6 h-full overflow-hidden">

                  {/* SOLID BLOCK - Fully hides content scrolling behind the top area */}
                  <div
                    className="absolute top-0 left-0 w-full h-[120px] lg:h-[160px] z-30 pointer-events-none bg-white"
                  />

                  {/* FADE & BLUR OVERLAY - Creates the vanishing point effect below the block */}
                  <div
                    className="absolute top-[120px] lg:top-[160px] left-0 w-full h-[60px] z-20 pointer-events-none"
                    style={{
                      background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)",
                    }}
                  />

                  {/* Normal scrollable content shifted by pinning */}
                  <motion.div ref={listRef} style={{ y: yPx }} className="flex flex-col pt-[120px] lg:pt-[160px]">
                    {data.items.map((service, index) => (
                      <ServiceListItem
                        key={service.id}
                        service={service}
                        index={index}
                        isActive={activeIndex === index}
                        toggleAccordion={toggleAccordion}
                        currentPlusColor={plusIconColors[index % 3]}
                      />
                    ))}

                    <div className="h-12 shrink-0" /> {/* Clean bottom padding for the final item */}
                  </motion.div>
                </div>
              </div>
            </SiteContainer>
          </div>


        </div>
      </div>
    </section>
  );
}

function ServiceListItem({ service, index, isActive, toggleAccordion, currentPlusColor }: any) {
  return (
    <div
      id={`service-${service.slug}`}
      className="scroll-mt-64 border-b border-[#e8e8e8] py-5 lg:py-6 transition-colors duration-300"
    >
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => toggleAccordion(index)}
      >
        <div className="flex items-center gap-4 lg:gap-6">
          <span
            style={{ fontFamily: "var(--font-archivo)" }}
            className="body-large text-[#0D54CA] transition-colors"
          >
            {service.id}
          </span>
          <h3 className="body-large text-[#01030B] transition-colors group-hover:!text-[#0D54CA]">
            {service.title}
          </h3>
        </div>
        <button className="p-2 -mr-2 cursor-pointer focus:outline-none">
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
}