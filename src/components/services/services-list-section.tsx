"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";
import { ServiceCategoryData } from "@/data/service-categories";
import { useIsMobile } from "@/hooks/use-is-mobile";

const plusIconColors = ["text-[#FD7624]", "text-[#0D54CA]", "text-[#92D9FF]"];

export default function ServicesListSection({ data }: { data: ServiceCategoryData }) {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const leftColumnRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const router = useRouter();

  const toggleAccordion = (index: number) =>
    setActiveIndex((prev) => (prev === index ? null : index));

  useEffect(() => {
    const openServiceFromHash = () => {
      const hash = window.location.hash;
      if (!hash) return;
      const slug = hash.replace("#service-", "");
      const targetIndex = data.items.findIndex((s) => s.slug === slug);
      if (targetIndex === -1) return;
      setActiveIndex(targetIndex);

      setTimeout(() => {
        if (!listRef.current || !sectionRef.current) return;

        const sectionRect = sectionRef.current.getBoundingClientRect();
        if (sectionRect.top > 0 || sectionRect.top < -10) {
          const targetPageScroll = window.scrollY + sectionRect.top;
          window.scrollTo({ top: targetPageScroll, behavior: "instant" as ScrollBehavior });
        }

        const targetEl = document.getElementById(`service-${slug}`);
        if (!targetEl) return;
        const listEl = listRef.current;
        const targetOffset = targetEl.offsetTop - listEl.offsetTop;
        listEl.scrollTop = Math.max(0, targetOffset - 10);
      }, 150);
    };

    if (window.location.hash) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }

    openServiceFromHash();
    router.events.on("hashChangeComplete", openServiceFromHash);
    window.addEventListener("hashchange", openServiceFromHash);
    return () => {
      router.events.off("hashChangeComplete", openServiceFromHash);
      window.removeEventListener("hashchange", openServiceFromHash);
    };
  }, [data.items, router]);

  useEffect(() => {
    if (isMobile) return;
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return;

    let isSnapping = false;
    let lockedUntil = 0;
    let softLandUntil = 0;

    const handleSnapEvent = () => {
      lockedUntil = Date.now() + 1200;
      softLandUntil = Date.now() + 2000;
      if (listRef.current) {
        listRef.current.scrollTop = 0;
      }
    };
    window.addEventListener("approach-snap-to-list", handleSnapEvent);

    const isStickyEngaged = () => {
      const rect = section.getBoundingClientRect();
      return rect.top <= 80 && rect.bottom > 0;
    };

    const handleWheel = (e: WheelEvent) => {
      if (Date.now() < lockedUntil) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      if (Date.now() < softLandUntil && isStickyEngaged()) {
        e.preventDefault();
        e.stopPropagation();
        if (e.deltaY > 0 && listRef.current) {
          listRef.current.scrollTop += e.deltaY;
        }
        return;
      }

      if (!isStickyEngaged()) return;

      const isUp = e.deltaY < 0;
      const isDown = e.deltaY > 0;
      const list = listRef.current;

      if (isDown && list) {
        const atBottom = list.scrollTop + list.clientHeight >= list.scrollHeight - 2;
        if (!atBottom) {
          e.stopPropagation();
          return;
        }
        return;
      }

      if (isUp && list) {
        if (list.scrollTop > 0) {
          e.stopPropagation();
          return;
        }

        const rect = section.getBoundingClientRect();
        if (rect.top > -50 && rect.top <= 80 && !isSnapping) {
          e.preventDefault();
          e.stopPropagation();
          isSnapping = true;
          window.dispatchEvent(new CustomEvent("list-snap-to-approach"));
          const approachSection = document.getElementById("services-approach");
          if (approachSection) {
            const targetY = window.scrollY + approachSection.getBoundingClientRect().top;
            const startY = window.scrollY;
            const distance = targetY - startY;
            const t0 = performance.now();
            const step = (ts: number) => {
              const elapsed = ts - t0;
              const t = Math.min(elapsed / 400, 1);
              const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
              window.scrollTo({
                top: Math.round(startY + distance * ease),
                behavior: "instant" as ScrollBehavior,
              });
              if (t < 1) {
                requestAnimationFrame(step);
              } else {
                isSnapping = false;
              }
            };
            requestAnimationFrame(step);
          } else {
            isSnapping = false;
          }
          return;
        }

        if (isSnapping) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("approach-snap-to-list", handleSnapEvent);
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <section className="relative w-full">
        <div className="relative z-20 w-full rounded-[6px] flex flex-col bg-white pt-10 pb-10">
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
    <section ref={sectionRef} className="relative w-full h-screen">
      <div
        ref={stickyRef}
        className="h-screen w-full overflow-hidden flex flex-col justify-start pt-[60px] lg:pt-[80px]"
      >
        <div className="relative z-20 w-full h-full rounded-t-[12px] lg:rounded-t-[12px] flex flex-col bg-white shadow-[0_-20px_50px_rgba(0,0,0,0.25)]">
          <div className="w-full flex flex-col pt-10 lg:pt-16 pb-10 overflow-hidden h-full">
            <SiteContainer className="flex-grow h-full">
              <div className="grid grid-cols-1 lg:grid-cols-[4.5fr_5.5fr] gap-12 lg:gap-24 items-start h-full">
                <div
                  ref={leftColumnRef}
                  className="hidden lg:flex flex-col h-fit lg:mt-[20px]"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <RotatingDots variant="light" />
                    <span className="body-small tracking-[0.1em] text-[#0D54CA] font-bold">
                      {data.metaTitle}
                    </span>
                  </div>
                  <h2 className="heading-2 !text-[#01030B] mb-2 max-w-md">
                    {data.listTitle}
                  </h2>
                  <div className="mt-8 bg-animated-gradient w-full max-w-[360px] overflow-hidden">
                    <div className="relative w-full aspect-[4/3]">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeIndex ?? "default"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="absolute inset-0"
                        >
                          <Image
                            src={
                              activeIndex !== null
                                ? data.items[activeIndex].image
                                : data.items[0].image
                            }
                            alt={
                              activeIndex !== null
                                ? data.items[activeIndex].title
                                : data.items[0].title
                            }
                            fill
                            sizes="360px"
                            className="object-contain p-4"
                          />
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </div>
                </div>

                <div className="relative flex flex-col pr-2 lg:pr-6 h-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 w-full h-[80px] z-30 pointer-events-none"
                    style={{ background: "linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 40%, rgba(255,255,255,0) 100%)" }}
                  />
                  <div
                    ref={listRef}
                    className="flex flex-col pt-[80px] overflow-y-auto h-full services-list-scroll"
                  >
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
                    <div className="h-12 shrink-0" />
                  </div>
                </div>
              </div>
            </SiteContainer>
          </div>
        </div>
      </div>
    </section>
  );
}

function ServiceListItem({
  service,
  index,
  isActive,
  toggleAccordion,
  currentPlusColor,
}: any) {
  return (
    <div
      id={`service-${service.slug}`}
      className="border-b border-[#e8e8e8] py-5 lg:py-6"
    >
      <div
        className="flex items-center justify-between cursor-pointer group"
        onClick={() => toggleAccordion(index)}
      >
        <div className="flex items-center gap-4 lg:gap-6">
          <span className="body-large text-[#0D54CA]">{service.id}</span>
          <h3 className="body-large text-[#01030B] group-hover:!text-[#0D54CA] transition-colors">
            {service.title}
          </h3>
        </div>
        <button className="p-2 -mr-2 cursor-pointer focus:outline-none">
          {isActive ? (
            <Minus className={`w-6 h-6 ${currentPlusColor}`} />
          ) : (
            <Plus className={`w-6 h-6 ${currentPlusColor}`} />
          )}
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
