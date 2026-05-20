"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CyclicButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function CyclicButton({
  onClick,
  children,
  className = "",
}: CyclicButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if the user is on a mobile/tablet screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Force active state if hovered OR if on mobile
  const isActive = isHovered || isMobile;

  return (
    <button
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className={`flex items-center gap-4 text-white transition-opacity hover:opacity-90 cursor-pointer ${className}`}
    >
      <motion.div
        className="relative flex items-center justify-center w-10 h-10"
        animate={isActive ? "hover" : "initial"}
        variants={{
          initial: { rotate: 0 },
          hover: {
            rotate: 360,
            transition: { duration: 2.5, repeat: Infinity, ease: "linear" },
          },
        }}
      >
        <motion.div
          className="absolute w-4 h-4 rounded-full"
          style={{ backgroundColor: "#92D9FF" }}
          variants={{
            initial: { x: 0, y: 0, opacity: 0, scale: 0.5 },
            hover: { x: -6, y: -10.4, opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        <motion.div
          className="absolute w-4 h-4 rounded-full"
          style={{ backgroundColor: "#FD7624" }}
          variants={{
            initial: { x: 0, y: 0, opacity: 0, scale: 0.5 },
            hover: { x: -6, y: 10.4, opacity: 1, scale: 1 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />

        <motion.div
          className="absolute z-10 w-4 h-4 rounded-full"
          style={{ backgroundColor: "#FFFFFF" }}
          variants={{
            initial: { x: 0, y: 0 },
            hover: { x: 12, y: 0 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.div>

      <div className="relative overflow-hidden h-[28px]">
        <motion.div
          className="flex flex-col"
          animate={isActive ? { y: "-50%" } : { y: "0%" }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
        >
          <span className="flex items-center h-[28px] inter-tight-button">
            {children}
          </span>
          <span className="flex items-center h-[28px] inter-tight-button">
            {children}
          </span>
        </motion.div>
      </div>
    </button>
  );
}