import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import { ServiceCategoryData } from "@/data/service-categories";

export default function ServicesIntroSection({ data }: { data: ServiceCategoryData["intro"] }) {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 80, 
    damping: 40, 
    mass: 0.6 
  });

  // 1. CURTAINS (Full Span - No Dead Zones)
  // Reaching all the way to 1.0 means the right column (col3) will IMMEDIATELY 
  // start dropping the split second you scroll upwards.
  const col1Y = useTransform(smoothProgress, [0.0, 0.8], ["120%", "0%"]);
  const col2Y = useTransform(smoothProgress, [0.1, 0.9], ["120%", "0%"]);
  const col3Y = useTransform(smoothProgress, [0.2, 1.0], ["120%", "0%"]);

  // 2. MAIN TEXT (Top Left)
  // FIXED: We added a 150px Y-drop. When scrolling UP, this text now physically falls 
  // downwards as it fades out, ensuring it never peeks over the top edge of the dropping columns!
  const content1Opacity = useTransform(smoothProgress, [0.6, 0.9], [0, 1]);
  const content1Y = useTransform(smoothProgress, [0.6, 0.9], [150, 0]);

  // 3. DIVIDER
  const content2Opacity = useTransform(smoothProgress, [0.65, 0.95], [0, 1]);
  const content2Y = useTransform(smoothProgress, [0.65, 0.95], [150, 0]);

  // 4. BOTTOM TEXT & IMAGE BOX
  const content3Opacity = useTransform(smoothProgress, [0.7, 1.0], [0, 1]);
  const content3Y = useTransform(smoothProgress, [0.7, 1.0], [150, 0]);
  
  const boxOpacity = useTransform(smoothProgress, [0.7, 1.0], [0, 1]);
  const boxY = useTransform(smoothProgress, [0.7, 1.0], [400, 0]);
  const ringImageY = useTransform(smoothProgress, [0.7, 1.0], [150, 0]);
  
  return (
    <section
      ref={containerRef}
      className="relative z-30 isolate w-full max-w-full h-[100vh] flex flex-col justify-center overflow-hidden snap-start"
    >
      {/* --- COLUMNS --- */}
      {/* Made them h-[120vh] instead of h-full so they have extra height extending past the screen */}
      <div className="absolute inset-0 flex w-full h-[120vh] pointer-events-none">
        <motion.div style={{ y: col1Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col2Y }} className="w-1/3 h-full bg-white" />
        <motion.div style={{ y: col3Y }} className="w-1/3 h-full bg-white" />
      </div>

      <SiteContainer className="relative flex flex-col justify-center py-6 lg:py-10 h-full max-h-[950px]">
        
        {/* --- MAIN TEXT --- */}
        <motion.div
          style={{ opacity: content1Opacity, y: content1Y }}
          className="w-full max-w-[1100px]"
        >
          <p 
            className="heading-2 !text-[#01030B]" 
            dangerouslySetInnerHTML={{ __html: data.mainText }} 
          />
        </motion.div>

        {/* --- DIVIDER --- */}
        <motion.div
          style={{ opacity: content2Opacity, y: content2Y }}
          className="w-full h-[1px] bg-gray-200 my-5 lg:my-8 origin-left"
        />

        <div className="grid grid-cols-1 lg:grid-cols-[3.5fr_6.5fr] gap-8 lg:gap-16 items-start w-full">
          
          {/* --- IMAGE BOX --- */}
          <motion.div
            // FIXED: Changed 'content2Opacity' to 'boxOpacity'
            style={{ opacity: boxOpacity, y: boxY }}
            className="relative w-full aspect-[4/5] max-w-[300px] lg:max-w-[420px] mx-auto lg:mx-0 overflow-hidden bg-animated-gradient"
          >
            <motion.div
              style={{ y: ringImageY }}
              className="absolute inset-6 lg:inset-8 z-10 overflow-hidden"
            >
              <Image
                src={data.image}
                alt="Section Image"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain" 
              />
            </motion.div>
          </motion.div>
          
          {/* --- SUB TEXT CONTENT --- */}
          <motion.div
            style={{ opacity: content3Opacity, y: content3Y }}
            className="flex flex-col w-full mt-8 lg:mt-16"
          >
            <p className="heading-3" style={{ color: "#01030B" }}>
              {data.heading}
            </p>

            {/* FIXED: Changed max-w-2xl to max-w-4xl (or w-full) so the grid can stretch further right! */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-16 mt-8 lg:mt-12 max-w-4xl">
              <p className="body-small pr-2 lg:pr-0" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
                {data.p1}
              </p>
              <p className="body-small pr-2 lg:pr-0" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
                {data.p2}
              </p>
            </div>
          </motion.div>
        </div>
      </SiteContainer>
    </section>
  );
}