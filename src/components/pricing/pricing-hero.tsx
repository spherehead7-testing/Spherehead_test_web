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

        <div className="grid gap-9 lg:grid-cols-[minmax(0,940px)_1fr] lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="max-w-[980px] text-[46px] font-[300] tracking-0 text-white sm:text-[34px] lg:text-[46px]">
              Transparent Pricing for
              <br />
              Every Digital Solution
            </h1>

            <p className="mt-8 max-w-[900px] text-[18px] font-[300] leading-[1.6] text-white sm:text-[22px] lg:text-[26px]">
              Our transparent pricing and tailored service plans ensure
              businesses get maximum value, combining quality, innovation, and
              measurable results.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="flex justify-start lg:justify-end lg:pb-9"
          >
            <CyclicButton onClick={() => console.log("Start Project Clicked!")}>
              Start a Project
            </CyclicButton>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  );
}
