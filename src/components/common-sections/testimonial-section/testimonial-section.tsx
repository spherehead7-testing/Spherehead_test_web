import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import RotatingDots from "../../ui/rotating-dots";

const testimonials = [
  {
    role: "CEO Clara Agencies",
    name: "Eduardo Joffroy",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777009346/About-Us-Testimonial_CEO_jwwwgy.webp",
    quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
  },
  {
    role: "CEO Clara Agencies",
    name: "Alice Carlton",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777012166/About-Us-Testimonial_CEO_2_gxydel.webp",
    quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
  },
  {
    role: "CTO Clara Agencies",
    name: "Stephen Hanah",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777009346/About-Us-Testimonial_CEO_jwwwgy.webp",
    quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
  },
  {
    role: "CEO Clara Agencies",
    name: "Henrick Dorsin",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777012166/About-Us-Testimonial_CEO_2_gxydel.webp",
    quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
  },
];

const IMG_W = 270;
const IMG_H = 360;
const NAV_H = 64;
const CARD_H = IMG_H + NAV_H;

const SIDE_CARD_COUNT = 4;
const SIDE_CARD_W = 68;
const SIDE_CARD_GAP = 14;
const SIDE_CARD_STEP = SIDE_CARD_W + SIDE_CARD_GAP;

const SIDE_CONTAINER_W =
  SIDE_CARD_COUNT * SIDE_CARD_W + (SIDE_CARD_COUNT - 1) * SIDE_CARD_GAP;

const MAIN_CARD_W = 560;

const BASE_DURATION = 0.7;

export default function TestimonialSection() {
  const uidRef = useRef(0);
  const moveTimeoutRef = useRef<number | null>(null);

  const buildSideStack = (startIndex: number) =>
    Array.from({ length: SIDE_CARD_COUNT }, (_, i) => ({
      uid: uidRef.current++,
      testimonialIndex: (startIndex + i + 1) % testimonials.length,
    }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [sideStack, setSideStack] = useState(() => buildSideStack(0));
  const [phase, setPhase] = useState<"idle" | "moving">("idle");
  const [movingItem, setMovingItem] = useState<any>(null);
  const [incomingUid, setIncomingUid] = useState<number | null>(null);

  const activeCard = testimonials[activeIndex];

  const clearTimers = () => {
    if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
  };

  const finishAnimation = () => {
    setPhase("idle");
    setMovingItem(null);
    setIncomingUid(null);
  };

  // 👉 NEXT
  const handleNext = () => {
    if (phase !== "idle") return;
    clearTimers();

    const leadItem = sideStack[0];

    const nextTail = {
      uid: uidRef.current++,
      testimonialIndex:
        (leadItem.testimonialIndex + SIDE_CARD_COUNT) % testimonials.length,
    };

    setSideStack((prev) => [...prev.slice(1), nextTail]);
    setActiveIndex(leadItem.testimonialIndex);

    setMovingItem(leadItem);
    setIncomingUid(nextTail.uid);
    setPhase("moving");

    moveTimeoutRef.current = window.setTimeout(
      finishAnimation,
      BASE_DURATION * 1000,
    );
  };

  // 👉 PREV
  const handlePrev = () => {
    if (phase !== "idle") return;
    clearTimers();

    const prevIdx =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;

    const newHead = {
      uid: uidRef.current++,
      testimonialIndex: activeIndex,
    };

    setSideStack((prev) => [newHead, ...prev.slice(0, SIDE_CARD_COUNT - 1)]);
    setActiveIndex(prevIdx);

    setMovingItem(newHead);
    setIncomingUid(newHead.uid);
    setPhase("moving");

    moveTimeoutRef.current = window.setTimeout(
      finishAnimation,
      BASE_DURATION * 1000,
    );
  };

  const SideCardInner = ({ card }: any) => (
    <>
      <span className="absolute top-5 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[11px] text-[#9a9a9a]">
        {card.role}
      </span>
      <span className="absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[16px] font-[500]">
        {card.name}
      </span>
    </>
  );

  const MainCard = ({ card, showControls = true }: any) => (
    <div className="flex" style={{ width: MAIN_CARD_W, height: CARD_H }}>
      <div className="shrink-0" style={{ width: IMG_W }}>
        <div className="relative" style={{ width: IMG_W, height: IMG_H }}>
          <Image src={card.image} alt="" fill className="object-cover" />
        </div>

        {showControls && (
          <div
            className="flex justify-between px-6 bg-white"
            style={{ height: NAV_H }}
          >
            <button onClick={handlePrev}>‹</button>
            <button onClick={handleNext}>›</button>
          </div>
        )}
      </div>

      <div className="flex flex-col justify-between p-6">
        <p>{card.quote}</p>
        <div>
          <h3>{card.name}</h3>
          <p>{card.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex gap-4 mb-6">
          <RotatingDots />
          <p>Testimonials</p>
        </div>

        <div className="flex justify-between">
          {/* MAIN */}
          <div style={{ width: MAIN_CARD_W, position: "relative" }}>
            <div className={phase === "moving" ? "opacity-0" : ""}>
              <MainCard card={activeCard} />
            </div>

            {/* 🔥 IMAGE SLIDE ANIMATION */}
            {phase === "moving" && movingItem && (
              <motion.div
                initial={{ x: 300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: BASE_DURATION, ease: "easeOut" }}
                className="absolute top-0 left-0"
              >
                <MainCard
                  card={testimonials[movingItem.testimonialIndex]}
                  showControls={false}
                />
              </motion.div>
            )}
          </div>

          {/* SIDE STACK */}
          <div className="hidden lg:flex flex-1 justify-end">
            <div
              className="relative"
              style={{ width: SIDE_CONTAINER_W, height: CARD_H }}
            >
              {sideStack.map((item, index) => {
                const card = testimonials[item.testimonialIndex];
                const isIncoming = incomingUid === item.uid;

                return (
                  <motion.div
                    key={item.uid}
                    initial={
                      isIncoming ? { x: SIDE_CONTAINER_W, opacity: 0 } : false
                    }
                    animate={{
                      x: index * SIDE_CARD_STEP,
                      opacity: 1,
                    }}
                    transition={{
                      duration: BASE_DURATION,
                      ease: "linear",
                    }}
                    className="absolute top-0 bg-gray-100 rounded"
                    style={{ width: SIDE_CARD_W, height: CARD_H }}
                  >
                    <SideCardInner card={card} />
                  </motion.div>
                );
              })}

              {/* moving strip */}
              {phase === "moving" && movingItem && (
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: -1000 }}
                  transition={{ duration: BASE_DURATION, ease: "linear" }}
                  className="absolute top-0 z-30 bg-gray-200"
                  style={{ width: SIDE_CARD_W, height: CARD_H }}
                >
                  <SideCardInner
                    card={testimonials[movingItem.testimonialIndex]}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
