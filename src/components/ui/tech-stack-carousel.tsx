"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useAnimation } from "framer-motion";

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

  // We track the scroll position manually now
  const x = useMotionValue(0);

  // Adds a smooth, fluid glide to the mouse wheel movement
  const smoothX = useSpring(x, { damping: 40, stiffness: 200 });

  // Auto-scroll effect
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
      
      const deltaTime = (timestamp - lastTimeRef.current) / 1000; // convert to seconds
      lastTimeRef.current = timestamp;

      if (!isHovered) {
        const currentX = x.get();
        let newX = currentX - (autoScrollSpeed * deltaTime);

        // Loop back to start when reaching the end
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

  // Reset lastTimeRef when hover state changes
  useEffect(() => {
    if (!isHovered) {
      lastTimeRef.current = 0;
    }
  }, [isHovered]);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const handleWheel = (e: WheelEvent) => {
      const containerWidth = container.offsetWidth;
      const trackWidth = track.scrollWidth;

      // Calculate how far the logos are allowed to scroll
      const maxScroll = trackWidth - containerWidth;
      if (maxScroll <= 0) return;

      // Detect if user is swiping horizontally (trackpad) or scrolling vertically (mouse wheel)
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY);

      // Multiply by 1.5 to make the scroll speed feel responsive and natural
      const scrollAmount = (isHorizontal ? e.deltaX : e.deltaY) * 1.5;

      const currentX = x.get();
      let newX = currentX - scrollAmount;

      let hitEdge = false;

      // Prevent scrolling past the left edge
      if (newX > 0) {
        newX = 0;
        hitEdge = true;
      }
      // Prevent scrolling past the right edge
      else if (newX < -maxScroll) {
        newX = -maxScroll;
        hitEdge = true;
      }

      x.set(newX);

      // IMPORTANT: Prevent the page from scrolling vertically UNLESS
      // the user has reached the end of the logos. This prevents getting "trapped".
      if (!hitEdge && !isHorizontal) {
        e.preventDefault();
      }
    };

    // `passive: false` is required so we can safely cancel the page scroll when needed
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, [x]);

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
          // The CSS Mask that fades the left and right edges
          maskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)",
        }}
      >
        <motion.div
          ref={trackRef}
          style={{ x: smoothX }} // Controlled strictly by the mouse scroll now!
          className="flex items-center gap-16 md:gap-24 px-8 w-max"
        >
          {/* Render the array twice so it overflows enough to allow scrolling */}
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
                // Added pointer-events-none to prevent ghost dragging issues
                className="object-contain h-[50px] w-auto md:h-[60px] pointer-events-none"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}