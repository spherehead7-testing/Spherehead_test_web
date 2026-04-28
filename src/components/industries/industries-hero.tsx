"use client";

import { motion } from "framer-motion";
import CyclicButton from "@/components/ui/cyclic-button";

export default function IndustriesHero() {
  return (
    <section className="relative w-full h-[100vh] text-white flex items-end overflow-hidden">

      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12 pb-32">

        {/* Top line */}
        <div className="w-full h-[1px] bg-white/40 mb-12" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">

          {/* LEFT CONTENT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-[42px] sm:text-[46px] lg:text-[54px] tracking-tight"
            >
              Empowering Industries <br />
              with Technology
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-white/80 max-w-md text-base sm:text-[8px] lg:text-[16px] mt-6"
            >
              We combine industry expertise and advanced technologies to
              deliver innovative solutions tailored for real business needs.
            </motion.p>
          </div>

          {/* RIGHT CTA */}
          <div className="flex justify-start lg:justify-end items-end">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 text-white/90 hover:text-white transition"
            >
              <CyclicButton onClick={() => console.log("Start Project Clicked!")}>
                Start a Project
              </CyclicButton>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}