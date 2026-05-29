"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useScrollContainerContext } from "@/context/ScrollContainerContext";
import RotatingDots from "../ui/rotating-dots";
import SiteContainer from "../layout/site-container";

const initiatives = [
  {
    title: "Hope Foundation",
    description:
      "Supporting underprivileged communities by providing education, essential resources, and opportunities for a better future.",
    image:
      "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800&q=80",
  },
  {
    title: "Bright Future Initiative",
    description:
      "Focused on empowering children through access to education, mentorship, and skill development programs.",
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
  },
  {
    title: "Care & Share Trust",
    description:
      "Dedicated to helping families in need by offering food, shelter, and basic necessities with compassion.",
    image:
      "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=800&q=80",
  },
  {
    title: "Green Earth Project",
    description:
      "Committed to environmental sustainability through tree planting, waste reduction, and awareness programs.",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
];

const HEADER_HEIGHT = 220;

// Render exactly ONE item. Height is now managed by the parent (50% of container)
function ItemRow({
  item,
  index,
}: {
  item: (typeof initiatives)[0];
  index: number;
}) {
  return (
    <div
      className={`flex h-full w-full bg-white ${
        index > 1 ? "border-t border-[#e5e5e5]" : "" // Full-width line for scrolling items 3 and 4
      }`}
    >
      {/* Left Column: Text Content */}
      <div
        className={`flex w-1/2 items-center pr-8 lg:pr-16 ${
          index === 0 ? "border-b border-[#e5e5e5]" : "" // Only the first text block needs a bottom border now
        }`}
      >
        <div className="w-[45%] pr-4">
          <h2 className="heading-3 !text-[#01030B]">{item.title}</h2>
        </div>
        <div className="w-[55%]">
          <p className="body-small m-0 !text-[#333]">{item.description}</p>
        </div>
      </div>

      {/* Right Column: Attached Images */}
      <div className="hidden h-full w-1/2 md:block overflow-hidden bg-black/5">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover block m-0 p-0"
          style={index % 2 === 1 ? { filter: "grayscale(100%)" } : undefined}
        />
      </div>
    </div>
  );
}

export default function OutGreaterCommunity() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollContainerRef } = useScrollContainerContext();

  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll(
    mounted
      ? {
          target: sectionRef,
          container: scrollContainerRef ?? undefined,
          offset: ["start start", "end end"],
        }
      : undefined,
  );

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    mass: 0.5,
  });

  // ==========================================
  // SCROLL ANIMATION LOGIC (WITH READING PAUSES)
  // ==========================================
  // Timeline breakdown (0 to 1):
  // 0.00 -> 0.15: Pause 1 (Read Item 1 & 2)
  // 0.15 -> 0.40: Transition 1 (Slide Item 3 & 4 up)
  // 0.40 -> 0.60: Pause 2 (Read Item 2 & 3)
  // 0.60 -> 0.85: Transition 2 (Slide Item 4 into top spot)
  // 0.85 -> 1.00: Pause 3 (Read Item 3 & 4 before leaving section)

  const block1Y = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.85, 1],
    ["100%", "100%", "0%", "0%", "0%", "0%"],
  );

  const block2Y = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.85, 1],
    ["200%", "200%", "100%", "100%", "0%", "0%"],
  );

  const block3Y = useTransform(
    smoothProgress,
    [0, 0.15, 0.4, 0.6, 0.85, 1],
    ["300%", "300%", "200%", "200%", "100%", "100%"],
  );

  return (
    <>
      {/* MOBILE VIEW */}
      <section className="bg-transparent pt-14 md:hidden">
        <div className="w-full bg-white rounded-lg pt-12 pb-16">
          <SiteContainer>
            <div className="mb-6 flex items-center gap-2">
              <RotatingDots variant="light" />
              <span className="body-small">Our Greater Community</span>
            </div>

            <h1 className="heading-2 mb-10 !text-[#01030B]">
              Beyond business, we strive to make a difference through care,
              responsibility, and meaningful impact.
            </h1>

            <div className="space-y-12">
              {initiatives.map((item) => (
                <article key={item.title} className="flex flex-col">
                  <img
                    src={item.image}
                    alt=""
                    className="mb-6 aspect-[16/9] w-full object-cover"
                  />
                  <h2 className="heading-3 mb-3 !text-[#01030B]">
                    {item.title}
                  </h2>
                  <p className="body-small !text-[#333]">{item.description}</p>
                </article>
              ))}
            </div>
          </SiteContainer>
        </div>
      </section>

      {/* WEB VIEW */}
      <section
        ref={sectionRef}
        className="relative hidden h-[300vh] bg-transparent md:block pt-0"
      >
        <div className="sticky top-0 flex h-screen w-full flex-col bg-transparent">
          {/* HEADER */}
          <div
            className="w-full pt-8 pb-4"
            style={{ height: HEADER_HEIGHT, flex: `0 0 ${HEADER_HEIGHT}px` }}
          >
            <SiteContainer>
              <div className="mb-6 flex items-center gap-2">
                <RotatingDots />
                <span className="body-small text-white">
                  Our Greater Community
                </span>
              </div>

              <h1 className="heading-2 max-w-[950px] text-white">
                Beyond business, we strive to make a difference
                <br />
                through care, responsibility, and meaningful impact.
              </h1>
            </SiteContainer>
          </div>

          {/* FULL WIDTH WHITE SECTION */}
          <div className="relative flex-1 w-full bg-white rounded-xl overflow-hidden pt-8 lg:pt-12">
            <SiteContainer className="h-full">
              <div className="relative h-full w-full overflow-hidden">
                {/* Item 1 (Base Layer) */}
                <motion.div className="absolute top-0 left-0 w-full h-[50%] z-0">
                  <ItemRow item={initiatives[0]} index={0} />
                </motion.div>

                {/* Item 2 */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[50%] z-10"
                  style={{ y: block1Y }}
                >
                  <ItemRow item={initiatives[1]} index={1} />
                </motion.div>

                {/* Item 3 */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[50%] z-20"
                  style={{ y: block2Y }}
                >
                  <ItemRow item={initiatives[2]} index={2} />
                </motion.div>

                {/* Item 4 */}
                <motion.div
                  className="absolute top-0 left-0 w-full h-[50%] z-30"
                  style={{ y: block3Y }}
                >
                  <ItemRow item={initiatives[3]} index={3} />
                </motion.div>
              </div>
            </SiteContainer>
          </div>
        </div>
      </section>
    </>
  );
}
