"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue } from "motion/react";

export interface TechItem {
  name: string;
  icon: string;
}

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
  className = "w-full pt-4 flex justify-center overflow-hidden bg-transparent",
}: TechStackCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);

  const x = useMotionValue(0);

  const reducedTrackPadding = "px-2 md:px-3";

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

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
        className="relative w-full flex items-center"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 5%, black 95%, transparent 100%)",
        }}
      >
        <motion.div
          ref={trackRef}
          style={{ x }}
          className={`flex items-center gap-10 md:gap-14 ${reducedTrackPadding} w-max`}

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
                className="object-contain h-[65px] w-auto md:h-[75px] pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}