"use client";

import Image from "next/image";
import { motion } from "motion/react";

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
    return (
        <div className="relative left-1/2 mt-8 w-screen -translate-x-1/2 overflow-hidden lg:mt-10">
            <motion.div
                className="flex w-max gap-4 px-6 lg:px-10"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
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
