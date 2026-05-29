"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import RotatingDots from "@/components/ui/rotating-dots";

export default function ContactIntro() {
  return (
    <section className="w-full bg-white pt-12 lg:pt-16 pb-8 lg:pb-12 snap-start">
      <SiteContainer>
        {/* Adjusted gap to control the vertical space between Title and Paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* TITLE SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-12 flex flex-col gap-6"
          >
            <div className="hidden lg:flex items-center gap-3">
              <RotatingDots variant="light" />
              <span className="body-small font-[500] text-[#334164]">About Us</span>
            </div>
            <h2 className="heading-2 !text-[#01030B] lg:whitespace-nowrap">
              Located in the Heart of{" "}
              <span className="text-[#0D54CA]">Delaware USA</span>
            </h2>
          </motion.div>

          {/* PARAGRAPH SECTION */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-7 lg:col-start-6 flex"
          >
            <p className="body-large text-[#8A8B8F] !leading-[1.4] py-12">
              Based in Delaware, USA, our company is committed to delivering
              innovative and reliable solutions tailored to meet modern business
              needs. With a strong focus on quality, integrity, and customer
              satisfaction, we strive to create lasting value and build
              meaningful partnerships across industries.
            </p>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  );
}
