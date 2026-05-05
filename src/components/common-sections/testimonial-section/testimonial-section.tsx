import Image from "next/image";
import { useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RotatingDots from "../../ui/rotating-dots";
import SiteContainer from "../../layout/site-container";

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

const IMG_W = 286;
const IMG_H = 370;
const NAV_H = 32;
const CARD_H = IMG_H + NAV_H;

const SIDE_CARD_COUNT = 4;
const SIDE_CARD_W = 68;
const SIDE_CARD_GAP = 8;
const SIDE_CARD_STEP = SIDE_CARD_W + SIDE_CARD_GAP;
const SIDE_CARD_H = 429;

const SIDE_CONTAINER_W =
  SIDE_CARD_COUNT * SIDE_CARD_W + (SIDE_CARD_COUNT - 1) * SIDE_CARD_GAP;

const MAIN_CARD_W = 574;

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
  const [movingItem, setMovingItem] = useState<{
    uid: number;
    testimonialIndex: number;
  } | null>(null);
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

  const SideCardInner = ({ card }: { card: (typeof testimonials)[number] }) => (
    <>
      <span className="absolute top-5 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[11px] leading-none text-[#8f8f8f]">
        {card.role}
      </span>
      <span className="absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[16px] leading-none font-[500] text-[#01030b]">
        {card.name}
      </span>
    </>
  );

  const MainCard = ({
    card,
    showControls = true,
  }: {
    card: (typeof testimonials)[number];
    showControls?: boolean;
  }) => (
    <div
      className="flex w-full flex-col gap-5 sm:flex-row sm:gap-0"
      style={{ maxWidth: MAIN_CARD_W, minHeight: CARD_H }}
    >
      <div className="shrink-0" style={{ width: IMG_W }}>
        <div className="relative" style={{ width: IMG_W, height: IMG_H }}>
          <Image src={card.image} alt="" fill className="object-cover" />
        </div>

        {showControls && (
          <div
            className="flex items-center justify-between bg-white"
            style={{ height: NAV_H }}
          >
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={handlePrev}
              className="flex h-8 w-8 items-center justify-center text-[#01030b] transition hover:text-[#0D54CA]"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={handleNext}
              className="flex h-8 w-8 items-center justify-center text-[#01030b] transition hover:text-[#0D54CA]"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div className="flex min-h-[320px] flex-col justify-between pt-10 sm:min-h-0 sm:w-[288px] sm:pl-5 sm:pt-11 sm:pb-[74px]">
        <p className="max-w-[238px] whitespace-pre-line text-[14px] leading-[1.22] text-[#01030b]">
          {card.quote}
        </p>
        <div>
          <h3 className="text-[22px] leading-none font-[600] text-[#01030b]">
            {card.name}
          </h3>
          <p className="mt-2 text-[13px] leading-none text-[#01030b]">
            {card.role}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <section className="bg-white py-16 sm:py-[62px]">
      <SiteContainer>
        <div className="mb-4 flex items-center gap-3">
          <RotatingDots variant="light"/>
          <p className="text-[14px] leading-none text-[#01030b]">
            Testimonials
          </p>
        </div>

        <h2 className="heading-2 !text-[#01030B]">
          Building Lasting Relationships
          <br />
          Through Results Our Clients Value
        </h2>

        <div className="mt-16 flex items-start justify-between gap-12 lg:mt-[76px]">
          <div
            className="relative w-full sm:mt-[27px]"
            style={{ maxWidth: MAIN_CARD_W }}
          >
            <div className={phase === "moving" ? "opacity-0" : ""}>
              <MainCard card={activeCard} />
            </div>

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

          <div className="hidden shrink-0 lg:flex">
            <div
              className="relative"
              style={{ width: SIDE_CONTAINER_W, height: SIDE_CARD_H }}
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
                    className="absolute top-0 rounded bg-[#f1f1f1]"
                    style={{ width: SIDE_CARD_W, height: SIDE_CARD_H }}
                  >
                    <SideCardInner card={card} />
                  </motion.div>
                );
              })}

              {phase === "moving" && movingItem && (
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: -1000 }}
                  transition={{ duration: BASE_DURATION, ease: "linear" }}
                  className="absolute top-0 z-30 bg-[#e9e9e9]"
                  style={{ width: SIDE_CARD_W, height: SIDE_CARD_H }}
                >
                  <SideCardInner
                    card={testimonials[movingItem.testimonialIndex]}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}
