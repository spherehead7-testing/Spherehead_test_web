"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import RotatingDots from "../ui/rotating-dots";

const initiatives = [
  {
    title: "Hope Foundation",
    description:
      "Supporting underprivileged communities by providing education, essential resources, and opportunities for a better future.",
        image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
  },
  {
    title: "Bright Future Initiative",
    description:
      "Focused on empowering children through access to education, mentorship, and skill development programs.",
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  },
  {
    title: "Care & Share Trust",
    description:
      "Dedicated to helping families in need by offering food, shelter, and basic necessities with compassion.",
        image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
  },
  {
    title: "Green Earth Project",
    description:
      "Committed to environmental sustainability through tree planting, waste reduction, and awareness programs.",
        image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
];

const VISIBLE_ROWS = 2;
const MAX_INDEX = initiatives.length - VISIBLE_ROWS;
const HEADER_HEIGHT = 220;

function getCardHeight(progress: number, index: number) {
  const visibleStart = Math.max(progress, index);
  const visibleEnd = Math.min(progress + VISIBLE_ROWS, index + 1);
  const visibleAmount = Math.max(0, visibleEnd - visibleStart);

  return visibleAmount * 50;
}

function CollapsingCommunityRow({
  item,
  index,
  progress,
}: {
  item: (typeof initiatives)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const height = useTransform(progress, (latest) => {
    const h = getCardHeight(latest, index);
    return `${h}%`;
  });

  const opacity = useTransform(progress, (latest) => {
    const h = getCardHeight(latest, index);
    return h > 5 ? 1 : 0;
  });

  return (
    <motion.div
      className="grid grid-cols-[minmax(170px,250px)_minmax(230px,320px)] overflow-hidden border-b border-[#d9d9d9] rounded-t-3xl"
      style={{ height, opacity }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        mass: 1,
      }}
    >
      <h2 className="heading-3 pt-12 !text-[#01030B]">{item.title}</h2>

      <p className="body-small m-0 max-w-[300px] pt-9 text-[#01030B]">
        {item.description}
      </p>
    </motion.div>
  );
}

function CollapsingCommunityImage({
  item,
  index,
  progress,
}: {
  item: (typeof initiatives)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const height = useTransform(progress, (latest) => {
    const h = getCardHeight(latest, index);
    return `${h}%`;
  });

  const opacity = useTransform(progress, (latest) => {
    const h = getCardHeight(latest, index);
    return h > 5 ? 1 : 0;
  });

  return (
    <motion.div
      className="overflow-hidden"
      style={{ height, opacity }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 40,
        mass: 1,
      }}
    >
      <img
        src={item.image}
        alt=""
        className="h-full w-full object-cover"
        style={index % 2 === 1 ? { filter: "grayscale(100%)" } : undefined}
      />
    </motion.div>
  );
}

export default function OutGreaterCommunity() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    mass: 0.5,
  });

  const timelineProgress = useTransform(smoothProgress, (progress) =>
    Math.min(progress * MAX_INDEX, MAX_INDEX),
  );

  return (
    <section ref={sectionRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen w-full flex-col bg-white">
        {/* STATIC HEADER - Never animates */}
        <div
          className="bg-animated-gradient w-full px-6 pt-8 sm:px-10 lg:px-16"
          style={{
            height: HEADER_HEIGHT,
            flex: `0 0 ${HEADER_HEIGHT}px`,
          }}
        >
          <div className="mb-6 flex items-center gap-2">
            <RotatingDots />
            <span className="body-medium text-white">
              Our Greater Community
            </span>
          </div>

          <h1 className="heading-2 max-w-[950px] text-white">
            Beyond business, we strive to make a difference
            <br />
            through care, responsibility, and meaningful impact.
          </h1>
        </div>

        {/* ANIMATED CARDS SECTION */}
        <div className="flex-1 overflow-hidden rounded-t-[4px] bg-white  rounded-t-3xl">
          <div className="grid h-full grid-cols-[minmax(170px,250px)_minmax(230px,320px)_minmax(320px,1fr)] px-6 sm:px-10 lg:px-16">
            <div className="relative col-span-2 h-full overflow-hidden">
              <div className="flex h-full flex-col">
                {initiatives.map((item, index) => (
                  <CollapsingCommunityRow
                    key={item.title}
                    item={item}
                    index={index}
                    progress={timelineProgress}
                  />
                ))}
              </div>
            </div>

            <div className="relative hidden h-full overflow-hidden md:block">
              <div className="flex h-full flex-col">
                {initiatives.map((item, index) => (
                  <CollapsingCommunityImage
                    key={item.image}
                    item={item}
                    index={index}
                    progress={timelineProgress}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
