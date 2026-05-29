"use client";

import { motion } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";

export default function PricingHero() {
  return (
    <section className="relative min-h-screen overflow-hidden text-white">
      <SiteContainer className="flex min-h-screen flex-col justify-end pt-28 pb-16 lg:pt-36 lg:pb-20">
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-14 h-px w-full origin-left bg-white/55 lg:mb-20"
        />

        <div className="flex w-full flex-col items-start justify-between gap-3 md:gap-8 lg:flex-row lg:items-end">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-[980px]"
          >
            <h1 className="inner-hero">
              Transparent Pricing for
              <br />
              Every Digital Solution
            </h1>

            <div className="mt-4 flex max-w-[760px] flex-col items-start gap-6 sm:flex-row sm:items-end sm:gap-10 md:mt-[clamp(24px,4vw,32px)]">
              <p className="heading-4 hidden max-w-[720px] md:block">
                Our transparent pricing and tailored service plans ensure
                businesses get maximum value, combining quality, innovation, and
                measurable results.
              </p>
            </div>
          </motion.div>

          {/* BUTTON WRAPPER */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="mt-2 lg:mt-0 lg:pb-2"
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
      </SiteContainer>
    </section>
  );
}
