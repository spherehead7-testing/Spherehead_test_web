"use client";

import React from "react";
import { motion } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";

export default function StayConnected() {
  return (
    <section className="relative w-full flex flex-col items-center justify-center overflow-hidden snap-start" id="stay-connected">
      {/* THE FIX: Solid white bar to restore the white gap above the blue section! */}
      <div className="hidden lg:block w-full h-32 bg-white shrink-0" />

      <div className="w-full pt-16 pb-16 lg:py-24 flex justify-center items-center px-4 md:px-8">

        <motion.div
          initial={{ scale: 0.98, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[1100px] h-[200px] lg:h-[480px] bg-white rounded-sm md:rounded-xl relative overflow-hidden flex flex-col items-center justify-center text-center shadow-lg"
        >

          {/* Typography */}
          <div className="relative z-10 flex flex-col items-center px-6 w-full">
            <h2 className="heading-2 !text-[#3F3F3F] !text-center">
              Come back later and <br />
              <span className="text-[#0D54CA]">stay connected!</span>
            </h2>
            <p className="body-medium text-[#0A0D0F] mt-4 max-w-[600px] !text-center">
              We're not hiring at the moment, but new positions may open soon.
            </p>
          </div>

          {/* Left Graphic: Socket — cable enters from top-left, plug head sits at vertical center */}
          <div className="absolute left-0 top-0 h-[50%] w-[85px] md:w-[180px] lg:w-[260px]">
            <img
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777269546/connect_Icon2_nxbt0n.png"
              alt="Socket graphic"
              className="w-full h-full object-contain object-left-bottom"
            />
          </div>

          {/* Right Graphic: Plug — plug head sits at vertical center, cable exits bottom-right */}
          <div className="absolute right-0 bottom-0 h-[65%] w-[80px] md:w-[180px] lg:w-[260px]">
            <img
              src="https://res.cloudinary.com/dku9in8sb/image/upload/v1777269546/connect_Icon1_nyua2x.png"
              alt="Plug graphic"
              className="w-full h-full object-contain object-right-top"
            />
          </div>

        </motion.div>
      </div>
    </section>
  );
}