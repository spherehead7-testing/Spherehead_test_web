"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring } from "framer-motion";

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
  className = "w-full pt-8 pb-10 flex justify-center overflow-hidden bg-white",
}: TechStackCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const x = useMotionValue(0);
  const smoothX = useSpring(x, { damping: 40, stiffness: 200 });

  // Auto-scroll effect only
  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const trackWidth = track.scrollWidth;
    const containerWidth = container.offsetWidth;
    const maxScroll = trackWidth - containerWidth;

    if (maxScroll <= 0) return;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }
      
      const deltaTime = (timestamp - lastTimeRef.current) / 1000;
      lastTimeRef.current = timestamp;

      if (!isHovered) {
        const currentX = x.get();
        let newX = currentX - (autoScrollSpeed * deltaTime);

        if (newX <= -maxScroll) {
          newX = 0;
        }

        x.set(newX);
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [x, autoScrollSpeed, isHovered]);

  useEffect(() => {
    if (!isHovered) {
      lastTimeRef.current = 0;
    }
  }, [isHovered]);

  return (
    <div 
      className={className}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        ref={containerRef}
        className="relative w-full max-w-[1200px] flex items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <motion.div
          ref={trackRef}
          style={{ x: smoothX }}
          className="flex items-center gap-16 md:gap-24 px-8 w-max"
        >
          {[...items, ...items].map((tech, i) => (
            <div
              key={i}
              className="flex shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300 grayscale hover:grayscale-0 cursor-pointer"
            >
              <Image
                src={tech.icon}
                alt={tech.name}
                width={80}
                height={80}
                className="object-contain h-[50px] w-auto md:h-[60px] pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}