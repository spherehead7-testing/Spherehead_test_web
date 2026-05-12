"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CyclicButton from "@/components/ui/cyclic-button";
import SiteContainer from "../layout/site-container";

export default function AboutHero() {
  return (
    <section className="min-h-screen flex items-start pt-70">
      <SiteContainer>
        {/* TOP LINE */}
        <div className="w-full h-[1px] bg-white/40 mb-8" />

        {/* CONTENT WRAPPER */}
        {/* Everything stays BELOW the line */}
        <div className="relative z-20 flex h-full items-end pb-[50px]">
          <div className="flex w-full items-end justify-between gap-6">
            {/* LEFT CONTENT */}
            <div className="max-w-[980px]">
              {/* TITLE */}
              <h1 className="inner-hero">
                Who We Are & <br />
                What We Stand For
              </h1>

            {/* DESCRIPTION */}
            <div className="mt-6 flex items-end gap-8">
              <h4 className="heading-4 max-w-[620px]">
                We are a team driven by innovation, delivering
                meaningful digital solutions that create real impact.
              </h4>

              {/* AVATAR */}
              <Image
                src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776412629/About-Us-Hero-Avatar_kouqxe.webp"
                alt="team"
                width={110}
                height={80}
                className="object-contain shrink-0 mb-2"
              />
            </div>
          </div>

          {/* RIGHT CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute right-0 bottom-2"
          >
            <CyclicButton
              onClick={() => console.log("Start Project Clicked!")}
            >
              Start a Project
            </CyclicButton>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  );
}
