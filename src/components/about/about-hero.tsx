"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CyclicButton from "@/components/ui/cyclic-button";

export default function AboutHero() {
  return (
    <section className="relative w-full min-h-screen text-white flex items-center">
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-12">
        {/* Top line */}
        <div className="w-full h-[1px] bg-white/40 mt-16 lg:mt-32" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT CONTENT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-[42px] sm:text-[56px] lg:text-[64px] leading-[1.1] font-light tracking-tight"
            >
              Who We Are & <br />
              What We Stand For
            </motion.h1>

            <div className="flex items-center gap-6 mt-6">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-white/80 max-w-md text-base sm:text-lg"
              >
                We are a team driven by innovation, delivering meaningful
                digital solutions that create real impact.
              </motion.p>

              {/* AVATAR IMAGE */}
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="flex-shrink-0"
              >
                <Image
                  src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776412629/About-Us-Hero-Avatar_kouqxe.webp"
                  alt="team"
                  width={100}
                  height={80}
                  className="rounded-lg object-cover"
                />
              </motion.div>
            </div>
          </div>

          {/* RIGHT CTA */}
          <div className="flex justify-start lg:justify-end items-end pt-16 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 text-white/90 hover:text-white transition mb-12 mt-12 lg:mt-28"
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
    </section>
  );
}
