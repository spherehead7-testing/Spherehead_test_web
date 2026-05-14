"use client";

import { motion } from "framer-motion";
import CyclicButton from "@/components/ui/cyclic-button";
import SiteContainer from "../layout/site-container";

export default function IndustriesHero() {
  return (
    <section className="relative z-10 flex min-h-screen items-end overflow-visible text-white">
      <SiteContainer>
        <div className="pb-24">
          {/* Top line */}
          <div className="h-[1px] bg-white/40 mb-12" />

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
                  onClick={() => console.log("Start Project Clicked!")}
                >
                  Start a Project
                </CyclicButton>
              </motion.div>
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
