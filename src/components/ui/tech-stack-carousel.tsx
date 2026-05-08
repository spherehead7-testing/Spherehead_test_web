"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "framer-motion";

export interface TechItem {
  name: string;
  icon: string;
}

// Your default data
const defaultTechStack: TechItem[] = [
  {
    name: "PowerBI",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/Power_BI_d7qpl4.png",
  },
  {
    name: "Vector",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/Vector_thntzz.png",
  },
  {
    name: "AWS",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/aws_vz0zaq.png",
  },
  {
    name: "Docker",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418102/docker_wbuxim.png",
  },
  {
    name: "Java",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/java_enf1rj.png",
  },
  {
    name: "Kubernetes",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/kubernetes_u3fzkn.png",
  },
  {
    name: "Azure",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/microsoft_azure_ktcrkr.png",
  },
  {
    name: "Python",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418102/Python_r3ng6w.png",
  },
  {
    name: "PyTorch",
    icon: "https://res.cloudinary.com/dku9in8sb/image/upload/v1776418103/pytorch_psxu4f.png",
  },
];

interface TechStackCarouselProps {
  items?: TechItem[];
  className?: string;
  autoScrollSpeed?: number;
}

export default function TechStackCarousel({
  items = defaultTechStack,
  autoScrollSpeed = 40,
  className = "w-full pt-8 pb-10 flex justify-center overflow-hidden bg-transparent",
}: TechStackCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  // Removed useSpring to fix the "rewind" reverse loop bug
  const x = useMotionValue(0);

  // Auto-scroll effect only (No pause on hover)
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    // By duplicating the array, half the track width is the perfect seamless loop point
    const trackWidth = track.scrollWidth;
    const maxScroll = trackWidth / 2;

    if (maxScroll <= 0) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      const currentX = x.get();
      let newX = currentX - (autoScrollSpeed * deltaTime);

      // Loop back seamlessly when half the track is scrolled
      if (newX <= -maxScroll) {
        newX += maxScroll; 
      }

      x.set(newX);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [x, autoScrollSpeed]);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        // Removed max-w-[1200px] to stretch fully side-to-side
        className="relative w-full flex items-center"
        style={{
          // Changed from 15% to 5% to reduce the blank padding on the left/right edges
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <motion.div
          ref={trackRef}
          // Use raw 'x' value without the spring physics
          style={{ x }}
          className="flex items-center gap-10 md:gap-14 px-4 w-max"
        >
          {[...items, ...items].map((tech, i) => (
            <div
              key={i}
              className="flex shrink-0 cursor-default"
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={120}
                height={120}
                // Reduced sizes from h-70/90 to h-55/75
                className="object-contain h-[55px] w-auto md:h-[75px] pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}