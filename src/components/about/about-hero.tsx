"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import CyclicButton from "@/components/ui/cyclic-button";
import SiteContainer from "../layout/site-container";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      <SiteContainer className="relative h-screen">
        {/* CENTER DIVIDER LINE */}
        <div className="absolute left-0 right-0 top-1/2 z-10 h-px -translate-y-1/2 bg-white/40" />

        {/* CONTENT WRAPPER */}
        {/* Everything stays BELOW the line */}
        <div className="relative z-20 flex h-full items-end pb-[50px]">
          <div className="flex w-full items-end justify-between gap-6">
            {/* LEFT CONTENT */}
            <div className="max-w-[980px]">
              {/* TITLE */}
              <h1 className="heading-1">
                Who We Are & <br />
                What We Stand For
              </h1>

              {/* DESCRIPTION + AVATAR */}
              <div
                className="mt-12 flex items-end gap-10"
              >
                {/* DESCRIPTION */}
                <h4 className="heading-4 max-w-[720px] leading-[1.55] text-white/95">
                  We are a team driven by innovation, delivering<br/>
                  meaningful digital solutions that create real impact.
                </h4>

                {/* AVATAR */}
                <Image
                  src="https://res.cloudinary.com/dku9in8sb/image/upload/v1776412629/About-Us-Hero-Avatar_kouqxe.webp"
                  alt="team"
                  width={145}
                  height={90}
                  priority
                  className="mb-1 shrink-0 object-contain"
                />
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, x: 35 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.7 }}
              className="mb-5 shrink-0"
            >
              <CyclicButton
                onClick={() => console.log("Start Project Clicked!")}
              >
                Start a Project
              </CyclicButton>
            </motion.div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}