"use client";

import { motion } from "framer-motion";

interface RotatingDotsProps {
  variant?: "light" | "dark";
}

export default function RotatingDots({ variant = "dark" }: RotatingDotsProps) {
  const dot2Color = "bg-[#92D9FF]";
  const dot3Color = "bg-[#FD7624]";
  const dot1Color = variant === "dark" ? "bg-[#FFFFFF]" : "bg-[#0D54CA]";

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{
        repeat: Infinity,
        duration: 6,
        ease: "linear",
      }}

      className="relative w-7 h-7 shrink-0"
    >
      {/* Dot 1 (Top) */}
      <div className="absolute inset-0 flex justify-center items-start">
        <span className={`w-2.5 h-2.5 rounded-full ${dot1Color}`} />
      </div>

      {/* Dot 2 (Bottom Right) */}
      <div 
        className="absolute inset-0 flex justify-center items-start" 
        style={{ transform: "rotate(120deg)" }}
      >
        <span className={`w-2.5 h-2.5 rounded-full ${dot2Color}`} />
      </div>

      {/* Dot 3 (Bottom Left) */}
      <div 
        className="absolute inset-0 flex justify-center items-start" 
        style={{ transform: "rotate(240deg)" }}
      >
        <span className={`w-2.5 h-2.5 rounded-full ${dot3Color}`} />
      </div>
    </motion.div>
  );
}