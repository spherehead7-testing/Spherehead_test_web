"use client";

import { motion } from "framer-motion";
import CyclicButton from "@/components/ui/cyclic-button";
import SiteContainer from "../layout/site-container";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function IndustriesHero() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <section className="w-full min-h-[80svh] flex flex-col overflow-hidden bg-animated-gradient">
        <SiteContainer className="flex flex-col flex-grow justify-end pb-12 pt-24">
          <div className="flex flex-col mt-auto">
            <div className="w-full h-[1px] bg-white/20 mb-8" />
            <h1 className="inner-hero">
              Empowering<br />Industries<br />with<br />Technology
            </h1>
            <div className="mt-6">
              <CyclicButton
                onClick={() => console.log("Start Project Clicked!")}
              >
                Start A Project
              </CyclicButton>
            </div>
          </div>
        </SiteContainer>
      </section>
    );
  }

  return (
    <section className="relative z-10 flex min-h-screen items-end overflow-visible text-white">
      <SiteContainer>
        <div className="pb-24">
          {/* Top line */}
          <div className="h-[1px] bg-white mb-12" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            {/* LEFT CONTENT */}
            <div>
              <h1 className="inner-hero max-w-none">
                <span className="whitespace-nowrap">Empowering Industries</span>
                <br />
                with Technology
              </h1>

              <p className="heading-4 mt-3">
                We combine industry expertise and advanced technologies to
                deliver innovative solutions tailored for real business needs.
              </p>
            </div>

            {/* RIGHT CTA */}
            <div className="flex justify-start lg:justify-end items-end">
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="flex items-center gap-4 text-white/90 hover:text-white transition"
              >
                <CyclicButton
                  onClick={() => {
                    window.location.href = "/pricing#contact-pricing";
                  }}
                >
                  <span>Start a Project</span>
                </CyclicButton>
              </motion.div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
