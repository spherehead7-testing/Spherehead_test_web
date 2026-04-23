"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";

export default function CareersHero() {
  return (
    <section className="relative w-full pt-40 pb-32 lg:pt-56 lg:pb-48 text-white overflow-hidden">
      <SiteContainer className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-10">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="heading-1 max-w-2xl"
        >
          Careers at<br />Spherehead
        </motion.h1>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 inter-tight-button text-white hover:opacity-80 transition-opacity"
        >
          <span className="w-2 h-2 rounded-full bg-white block"></span>
          Apply Now
        </motion.button>
      </SiteContainer>
    </section>
  );
}