"use client";

import Image from "next/image";
import { motion } from "motion/react";


const industryCards = [
  {
    title: "Real Estate",
    description: "Smart solutions for efficient, data-driven growth.",
    image: "/images/landingPage/industry5.svg",
  },
  {
    title: "Healthcare",
    description: "Smart solutions for efficient, data-driven growth.",
    image: "/images/landingPage/industry4.svg",
  },
  {
    title: "Agriculture",
    description: "Smart solutions for efficient, data-driven growth.",
    image: "/images/landingPage/industry3.svg",
  },
  {
    title: "Education",
    description: "Smart solutions for efficient, data-driven growth.",
    image: "/images/landingPage/industry1.svg",
  },
  {
    title: "Retail",
    description: "Smart solutions for efficient, data-driven growth.",
    image: "/images/landingPage/industry2.svg",
  },
];

const loopCards = [...industryCards, ...industryCards];

export default function IndustryCarouselLanding() {
  return (
    <div className="relative left-1/2 mt-12 w-screen -translate-x-1/2 overflow-hidden lg:mt-14">
      <motion.div
        className="flex w-max gap-4 px-6 lg:px-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loopCards.map((card, index) => (
          <div
            key={`${card.title}-${index}`}
            className="w-[288px] flex-none rounded-[6px] bg-[#EAEAEA] p-[14px]"
          >
            <div className="relative h-[126px] w-full overflow-hidden rounded-[4px]">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>

            <h3 className="heading-3 mt-4 ">
              {card.title}
            </h3>

            <p className="body-extra-small mt-2">
              {card.description}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}