"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useIsMobile } from "@/hooks/use-is-mobile";
import { useEffect, useMemo, useState } from "react";

const industryCards = [
    {
        title: "Real Estate",
        description: "Smart solutions for efficient, data-driven growth.",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778140210/industries_1_ed7muh.png",
    },
    {
        title: "Healthcare",
        description: "Smart solutions for efficient, data-driven growth.",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778140210/industries_2_zgqxp9.png",
    },
    {
        title: "Agriculture",
        description: "Smart solutions for efficient, data-driven growth.",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778140210/industries_3_oopepz.png",
    },
    {
        title: "Education",
        description: "Smart solutions for efficient, data-driven growth.",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778140210/industries_4_yxfffp.png",
    },
    {
        title: "Retail",
        description: "Smart solutions for efficient, data-driven growth.",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1778140210/industries_6_isaufd.png",
    },
];

const loopCards = [...industryCards, ...industryCards];

export default function LandingIndustryCarousel() {
    const isMobile = useIsMobile();
    const [isUserInteracting, setIsUserInteracting] = useState(false);

    // When user starts interacting (scrolling horizontally), pause the auto-rotation.
    useEffect(() => {
        if (!isMobile) return;
        if (isUserInteracting) {
            const t = window.setTimeout(() => setIsUserInteracting(false), 800);
            return () => window.clearTimeout(t);
        }
    }, [isMobile, isUserInteracting]);

    const shouldAutoScroll = !isMobile || !isUserInteracting;

    // Width container for both desktop and mobile now breaks out of parent padding
    // to touch the absolute edges of the screen.
    const outerClassName = useMemo(() => {
        if (isMobile) {
            return "relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-x-auto overflow-y-hidden scroll-smooth lg:mt-10";
        }
        return "relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden lg:mt-10";
    }, [isMobile]);

    return (
        <div className={outerClassName}>
            <motion.div
                // Removed px-6 lg:px-10 so the cards flow directly from the 0px edge
                className={`flex w-max gap-4 ${isMobile ? "py-2" : ""}`}
                animate={
                    shouldAutoScroll
                        ? { x: ["0%", "-50%"] }
                        : undefined
                }
                transition={
                    shouldAutoScroll
                        ? { duration: 35, repeat: Infinity, ease: "linear" }
                        : undefined
                }
                // Mobile: detect user gesture and pause marquee.
                onPointerDown={() => {
                    if (!isMobile) return;
                    setIsUserInteracting(true);
                }}
                onTouchStart={() => {
                    if (!isMobile) return;
                    setIsUserInteracting(true);
                }}
            >
                {loopCards.map((card, index) => (
                    <div
                        key={`${card.title}-${index}`}
                        className="w-[clamp(19rem,29vw,28rem)] flex-none rounded-[8px] bg-[#EAEAEA] p-[15px]"
                    >
                        <div className="relative h-[clamp(9rem,12vw,10rem)] w-full overflow-hidden rounded-[6px]">
                            <Image
                                src={card.image}
                                alt={card.title}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <h3 className="heading-3 !text-[#01030B] mt-3">
                            {card.title}
                        </h3>
                        <p className="body-small !text-[#01030B] opacity-70">
                            {card.description}
                        </p>
                    </div>
                ))}
            </motion.div>
        </div>
    );
}