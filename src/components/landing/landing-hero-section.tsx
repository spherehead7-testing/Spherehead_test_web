"use client";

import Link from "next/link";
import { motion, MotionValue } from "motion/react";
import SiteContainer from "@/components/layout/site-container";
import CyclicButton from "@/components/ui/cyclic-button";

type Props = {
  heroContentOpacity?: MotionValue<number>;
  subtextOpacity?: MotionValue<number>;
  isMobile?: boolean;
};

export default function LandingHeroSection({
  heroContentOpacity,
  subtextOpacity,
  isMobile,
}: Props) {
  if (isMobile) {
    return (
      // Notice pb-32 here. This gives plenty of room at the bottom for the white card
      <div className="flex min-h-[100dvh] flex-col bg-transparent px-6 pb-10 pt-28">
        <div className="mt-auto flex flex-col justify-center">
          <h1 className="heading-1 text-white">
            A Comprehensive
            <br />
            Technological
            <br />
            Sphere Crafted To
            <br />
            Fulfil Modern Digital
            <br />
            Needs
          </h1>
        </div>
        <div className="mt-8 flex items-start justify-start">
          <CyclicButton className="-ml-1 scale-95 origin-left">
            <Link href="/contact-us">
              <span className="body-large text-white">
                Get a Free Consultation
              </span>
            </Link>
          </CyclicButton>
        </div>
      </div>
    );
  }

  return (
    <motion.div style={{ opacity: heroContentOpacity }} className="h-full">
      <SiteContainer className="relative grid min-h-screen grid-cols-1 gap-10 pt-16 pb-12 -translate-y-6 lg:grid-cols-[minmax(0,820px)_1fr] lg:items-center lg:pt-20 lg:pb-16 lg:-translate-y-10">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col justify-center"
        >
          <h1 className="heading-1">
            A Comprehensive
            <br />
            Technological
            <br />
            Sphere Crafted To Fulfil
            <br />
            Modern Digital Needs
          </h1>

          <motion.p
            style={{ opacity: subtextOpacity }}
            className="heading-4 mt-6 inline-block max-w-lg whitespace-nowrap text-white"
          >
            Smart Technology Operations for smoother and hassle-free Operations
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="flex items-end justify-start lg:justify-end lg:self-end lg:pb-2"
        >
          <div className="flex justify-start lg:justify-end items-end pt-16 lg:pt-32">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex items-center gap-4 text-white/90 hover:text-white transition mb-12 mt-12 lg:mt-28"
            >
              <CyclicButton
                onClick={() => console.log("Get Free Consultation clicked!")}
              >
                <Link href="/contact-us">
                  <span className="body-large text-white inline-block whitespace-nowrap">
                    Get a Free Consultation
                  </span>
                </Link>
              </CyclicButton>
            </motion.div>
          </div>
        </motion.div>
      </SiteContainer>
    </motion.div>
  );
}
