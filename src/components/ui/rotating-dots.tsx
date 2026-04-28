"use client";

import { motion } from "framer-motion";

interface RotatingDotsProps {
  // "dark" means it sits on a dark background (uses white dot)
  // "light" means it sits on a white background (uses dark blue dot)
  variant?: "light" | "dark"; 
}

export default function RotatingDots({ variant = "dark" }: RotatingDotsProps) {
  // The Light Blue and Orange dots stay the same on both backgrounds
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
      className="relative w-6 h-6"
    >
      {/* Dot 1: Changes color based on variant */}
      <span className={`absolute top-0 left-1/2 -translate-x-1/2 w-2.5 h-2.5 ${dot1Color} rounded-full`} />

      {/* Dot 2: Light Blue */}
      <span className={`absolute bottom-0 left-0 w-2.5 h-2.5 ${dot2Color} rounded-full`} />

      {/* Dot 3: Orange */}
      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 ${dot3Color} rounded-full`} />
    </motion.div>
  );
}