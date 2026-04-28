"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function StartProjectButton() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-center gap-4 cursor-pointer select-none"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* DOT ANIMATION */}
      <motion.div
        animate={hovered ? "hover" : "initial"}
        variants={{
          initial: { rotate: 0 },
          hover: { rotate: 360 },
        }}
        transition={{
          duration: 2.5,
          ease: "linear",
          repeat: hovered ? Infinity : 0,
        }}
        className="relative w-6 h-6"
      >
        {/* center dot */}
        <motion.span
          className="absolute w-3 h-3 bg-white rounded-full top-1.5 left-1.5"
          variants={{
            initial: { scale: 1, opacity: 1 },
            hover: { scale: 0, opacity: 0 },
          }}
        />

        {/* 3 dots */}
        {[0, 1, 2].map((i) => {
          const positions = [
            { x: 0, y: -10 },
            { x: -10, y: 10 },
            { x: 10, y: 10 },
          ];

          return (
            <motion.span
              key={i}
              className="absolute w-3 h-3 bg-white rounded-full top-1.5 left-1.5"
              variants={{
                initial: { scale: 0, opacity: 0, x: 0, y: 0 },
                hover: {
                  scale: 1,
                  opacity: 1,
                  x: positions[i].x,
                  y: positions[i].y,
                },
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.05,
              }}
            />
          );
        })}
      </motion.div>

      {/* TEXT SLIDE */}
      <div className="relative h-[32px] overflow-hidden">
        <motion.div
          className="flex flex-col"
          animate={hovered ? { y: "-32px" } : { y: "0px" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <span className="h-[32px] leading-[32px] text-white text-2xl">
            Start a Project
          </span>
          <span className="h-[32px] leading-[32px] text-white text-2xl">
            Start a Project
          </span>
        </motion.div>
      </div>
    </div>
  );
}
