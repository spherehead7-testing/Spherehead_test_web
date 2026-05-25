import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";
import { ServiceCategoryData } from "@/data/service-categories";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function ServicesHeroSection({ data }: { data: ServiceCategoryData["hero"] }) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="relative w-full min-h-[80svh] flex flex-col overflow-hidden bg-animated-gradient">
        <SiteContainer className="relative z-10 flex flex-col h-full flex-grow justify-end pb-12 pt-24">
          <div className="w-full flex flex-col mt-auto">
            <div className="w-full h-[1px] bg-white/20 mb-8 origin-left" />
            <h1 className="inner-hero text-white">
              {data.title}
            </h1>
            <div className="flex items-start justify-start mt-6">
              <CyclicButton
                onClick={() => {
                  window.location.href = "/pricing#contact-pricing";
                }}
              >
                <span>Start a Project</span>
              </CyclicButton>
            </div>
          </div>
        </SiteContainer>
      </section>
    );
  }

  return (
    <section className="sticky top-0 z-0 w-full h-[100svh] flex flex-col overflow-hidden snap-start">
      <SiteContainer className="relative z-10 flex flex-col h-full flex-grow justify-end pb-12 pt-32 lg:pb-20">
        <div className="w-full flex flex-col mt-auto">

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full h-[1px] bg-white/20 mb-8 lg:mb-16 origin-left"
          />

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,820px)_1fr] lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 36 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex flex-col gap-6 lg:gap-10"
            >
              <h1 className="inner-hero text-white">
                {data.title}
              </h1>
              <p className="heading-4 text-white leading-[1.75] mt-6 max-w-[610px] font-light leading-relaxed">
                {data.description}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="flex items-start justify-start lg:justify-end lg:self-end mt-2 lg:mt-0 lg:pb-2"
            >
              <CyclicButton
                onClick={() => {
                  document
                    .getElementById("contact-pricing")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <span className="body-medium">Start a Project</span>
              </CyclicButton>
            </motion.div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}