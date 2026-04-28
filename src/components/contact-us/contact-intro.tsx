"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

export default function ContactIntro() {
  return (
    // THE FIX: Changed pt-20 lg:pt-32 to pt-12 lg:pt-16 for a tighter gap between the blue background and the text
    <section className="w-full bg-white pt-12 lg:pt-16 pb-16 lg:pb-24 snap-start">
      <SiteContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-6 flex flex-col gap-6"
          >
            <div className="flex items-center gap-4 inter-tight text-[#0D54CA]">
              <RotatingDots variant="light" />
              <span className="tracking-[0.1em] uppercase font-semibold">About Us</span>
            </div>
            
            <h2 className="heading-2 !text-[#01030B] max-w-lg">
              Located in the Heart of <span className="text-[#0D54CA]">Delaware USA</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-5 lg:col-start-8 flex items-center h-full"
          >
            <p className="body-small text-[#6B6B6B] leading-[1.8]">
              Based in Delaware, USA, our company is committed to delivering innovative 
              and reliable solutions tailored to meet modern business needs. With a strong 
              focus on quality, integrity, and customer satisfaction, we strive to create 
              lasting value and build meaningful partnerships across industries.
            </p>
          </motion.div>

        </div>
      </SiteContainer>
    </section>
  );
}