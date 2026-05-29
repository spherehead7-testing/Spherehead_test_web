"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import RotatingDots from "../ui/rotating-dots";
import SiteContainer from "../layout/site-container";
import { cn } from "@/lib/utils";

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

/* ── Desktop constants ─────────────────────────────────────────── */
const IMG_W = 350;
const IMG_H = 450;
const NAV_H = 32;

const SIDE_CARD_COUNT = 4;
const SIDE_CARD_W = 68;
const SIDE_CARD_GAP = 8;
const SIDE_CARD_H = 450;

const MAIN_CARD_W = 650;
const BASE_DURATION = 0.7;

/* ── Mobile constants ───────────────────────────────────────────── */
const M_IMG_W = 160; // Increased width for the mobile image

type TestimonialSectionProps = {
  compactDesktop?: boolean;
  snapToScreen?: boolean;
};

type Card = (typeof testimonials)[number];

const M_SIDE_W = 44;
const M_SIDE_GAP = 8;

const initialSideStack = Array.from({ length: SIDE_CARD_COUNT }, (_, i) => ({
  uid: i,
  testimonialIndex: (i + 1) % testimonials.length,
}));

function SideCardInner({ card }: { card: Card }) {
  return (
    <>
      <span className="body-extra-small absolute top-5 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] !text-[#8A8B8F]">
        {card.role}
      </span>
      <span className="body-small absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] !text-[#01030B]">
        {card.name}
      </span>
    </>
  );
}

function MainCard({ card }: { card: Card }) {
  return (
    <div
      className="flex w-full flex-col gap-5 sm:flex-row sm:gap-0"
      style={{ maxWidth: MAIN_CARD_W, minHeight: CARD_H }}
    >
      <div className="shrink-0 relative" style={{ width: IMG_W }}>
        <div
          className="relative overflow-hidden rounded-[4px]"
          style={{ width: IMG_W, height: IMG_H }}
        >
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </div>
        <div className="absolute top-0 right-0 z-10 flex h-10 w-10 items-center justify-center !bg-[#0D54CA]">
          <Quote className="h-5 w-5 fill-white text-white" />
        </div>
      </div>
      <div className="flex min-h-[320px] flex-col justify-between pt-10 sm:min-h-0 sm:w-[288px] sm:pl-5 sm:pt-11 sm:pb-[74px]">
        <p className="body-small max-w-[238px] whitespace-pre-line !text-[#01030b] !leading-[1.4]">
          {card.quote}
        </p>
        <div>
          <h3 className="body-large !text-[#01030b]">{card.name}</h3>
          <p className="body-extra-small !text-[#01030b]">{card.role}</p>
        </div>
      </div>
    </div>
  );
}

function MobileCard({ card }: { card: Card }) {
  return (
    <div className="flex w-full flex-row" style={{ minHeight: 260 }}>
      {/* Image column — fixed width, full height */}
      <div className="relative shrink-0" style={{ width: M_IMG_W }}>
        <div className="relative w-full h-full overflow-hidden rounded-[4px]">
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover object-top pointer-events-none"
            draggable={false}
          />
        </div>
        <div className="absolute top-0 right-0 z-10 flex h-8 w-8 items-center justify-center !bg-[#0D54CA]">
          <Quote className="h-4 w-4 fill-white text-white" />
        </div>
      </div>

      {/* Middle column — quote + name, same height */}
      <div className="flex flex-1 min-w-0 flex-col justify-between pl-3 pt-3 pb-3">
        <p className="body-small whitespace-pre-line !text-[#01030b]">
          {card.quote}
        </p>
        <div>
          <h3 className="body-large !text-[#01030b] font-semibold leading-tight">
            {card.name}
          </h3>
          <p className="body-extra-small">{card.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function TestimonialSection({
  compactDesktop = false,
  snapToScreen = false,
}: TestimonialSectionProps) {
  const uidRef = useRef(SIDE_CARD_COUNT);
  const moveTimeoutRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const snapTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const mainContainerRef = useRef<HTMLDivElement>(null);
  const sideContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [prevActiveIndex, setPrevActiveIndex] = useState(0);
  const [sideStack, setSideStack] = useState(initialSideStack);
  const [phase, setPhase] = useState<"idle" | "moving">("idle");
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [movingItem, setMovingItem] = useState<{
    uid: number;
    testimonialIndex: number;
  } | null>(null);
  const [incomingUid, setIncomingUid] = useState<number | null>(null);
  const [travelX, setTravelX] = useState(-800);

  const activeCard = testimonials[activeIndex];
  const desktopImgW = compactDesktop ? 300 : IMG_W;
  const desktopImgH = compactDesktop ? 370 : IMG_H;
  const desktopCardH = desktopImgH + NAV_H;
  const desktopMainCardW = compactDesktop ? 590 : MAIN_CARD_W;
  const sideCardW = compactDesktop ? 62 : SIDE_CARD_W;
  const sideCardStep = sideCardW + SIDE_CARD_GAP;
  const sideCardH = compactDesktop ? 370 : SIDE_CARD_H;
  const sideContainerW =
    SIDE_CARD_COUNT * sideCardW + (SIDE_CARD_COUNT - 1) * SIDE_CARD_GAP;

  useEffect(() => {
    const measureDistance = () => {
      if (mainContainerRef.current && sideContainerRef.current) {
        const mainLeft = mainContainerRef.current.getBoundingClientRect().left;
        const sideLeft = sideContainerRef.current.getBoundingClientRect().left;
        setTravelX(mainLeft - sideLeft);
      }
    };
    measureDistance();
    window.addEventListener("resize", measureDistance);
    return () => window.removeEventListener("resize", measureDistance);
  }, []);

  useEffect(() => {
    if (!snapToScreen) return;
    const section = sectionRef.current;
    if (!section) return;
    const handleScroll = () => {
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        const rect = section.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const shouldLock = rect.top < viewportHeight * 0.38 && rect.top > 8;
        if (shouldLock) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 120);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [snapToScreen]);

  const clearTimers = () => {
    if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
  };

  const finishAnimation = () => {
    setPhase("idle");
    setDirection(null);
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
    setPrevActiveIndex(activeIndex);
    setSideStack((prev) => [...prev.slice(1), nextTail]);
    setActiveIndex(leadItem.testimonialIndex);
    setMovingItem(leadItem);
    setIncomingUid(nextTail.uid);
    setDirection("next");
    setPhase("moving");
    moveTimeoutRef.current = window.setTimeout(
      finishAnimation,
      BASE_DURATION * 2000,
    );
  };

  const handlePrev = () => {
    if (phase !== "idle") return;
    clearTimers();
    const prevIdx =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    const newHead = { uid: uidRef.current++, testimonialIndex: activeIndex };
    setPrevActiveIndex(activeIndex);
    setSideStack((prev) => [newHead, ...prev.slice(0, SIDE_CARD_COUNT - 1)]);
    setActiveIndex(prevIdx);
    setMovingItem(newHead);
    setIncomingUid(newHead.uid);
    setDirection("prev");
    setPhase("moving");
    moveTimeoutRef.current = window.setTimeout(
      finishAnimation,
      BASE_DURATION * 2000,
    );
  };

  /* ── SideCardInner (shared) ─────────────────────────────────── */
  const SideCardInner = ({ card }: { card: (typeof testimonials)[number] }) => (
    <>
      <span className="body-extra-small absolute top-5 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] !text-[#8A8B8F]">
        {card.role}
      </span>
      <span className="body-small absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] !text-[#01030B]">
        {card.name}
      </span>
    </>
  );

  /* ── Desktop MainCard ───────────────────────────────────────── */
  const MainCard = ({
    card,
    showControls = false,
  }: {
    card: (typeof testimonials)[number];
    showControls?: boolean;
  }) => (
    <div
      className="flex w-full flex-col gap-5 sm:flex-row sm:gap-0"
      style={{ maxWidth: desktopMainCardW, minHeight: desktopCardH }}
    >
      <div className="shrink-0 relative" style={{ width: desktopImgW }}>
        <div
          className="relative overflow-hidden rounded-[4px]"
          style={{ width: desktopImgW, height: desktopImgH }}
        >
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover pointer-events-none"
            draggable={false}
          />
        </div>
        <div className="absolute top-0 right-0 z-10 flex h-10 w-10 items-center justify-center rounded !bg-[#0D54CA]">
          <Quote className="h-5 w-5 fill-white text-white" />
        </div>
      </div>
      <div
        className={cn(
          "flex min-h-[320px] flex-col justify-between pt-10 sm:min-h-0 sm:w-[288px] sm:pl-5",
          compactDesktop ? "sm:pt-7 sm:pb-12" : "sm:pt-11 sm:pb-[74px]",
        )}
      >
        <p className="body-small max-w-[238px] whitespace-pre-line !text-[#01030b] !leading-[1.4]">
          {card.quote}
        </p>
        <div>
          <h3 className="body-large !text-[#01030b]">{card.name}</h3>
          <p className="body-extra-small !text-[#01030b]">{card.role}</p>
        </div>
      </div>
    </div>
  );

  /* ── MobileCard ─────────────────────────────────────────────── */
  const MobileCard = ({ card }: { card: (typeof testimonials)[number] }) => (
    <div className="flex w-full flex-row" style={{ minHeight: 260 }}>
      {/* Image column — fixed width, full height */}
      <div className="relative shrink-0" style={{ width: M_IMG_W }}>
        <div className="relative w-full h-full overflow-hidden rounded-[4px]">
          <Image
            src={card.image}
            alt=""
            fill
            className="object-cover object-top pointer-events-none"
            draggable={false}
          />
        </div>
        <div className="absolute top-0 right-0 z-10 flex h-8 w-8 items-center justify-center rounded !bg-[#0D54CA]">
          <Quote className="h-4 w-4 fill-white text-white" />
        </div>
      </div>

      {/* Middle column — quote + name, same height */}
      <div className="flex flex-1 min-w-0 flex-col justify-between pl-3 pt-3 pb-3">
        <p className="body-small whitespace-pre-line !text-[#01030b]">
          {card.quote}
        </p>
        <div>
          <h3 className="body-large !text-[#01030b] font-semibold leading-tight">
            {card.name}
          </h3>
          <p className="body-extra-small">{card.role}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section
      ref={sectionRef}
      className={cn(
        "bg-white select-none",
        snapToScreen
          ? "h-[100svh] w-full snap-start overflow-hidden py-8 lg:flex lg:items-center"
          : compactDesktop
            ? "py-16 sm:py-4"
            : "py-16 sm:py-[62px]",
      )}
    >
      <SiteContainer>
        <div className="mb-4 flex items-center gap-3">
          <RotatingDots variant="light" />
          <p className="body-small !text-[#01030B]">Testimonials</p>
        </div>

        <h2 className={cn("heading-2 !text-[#0A0D0F]", snapToScreen)}>
          Building Lasting Relationships
          <br />
          Through Results Our Clients Value
        </h2>

        {/* Desktop */}
        <div
          className={cn(
            "hidden sm:flex items-start justify-between gap-12",
            snapToScreen
              ? "mt-8 lg:mt-10"
              : compactDesktop
                ? "mt-8 lg:mt-4"
                : "mt-16 lg:mt-[76px]",
          )}
        >
          <div
            ref={mainContainerRef}
            className={cn(
              "relative w-full",
              compactDesktop ? "sm:mt-2" : "sm:mt-[27px]",
            )}
            style={{ maxWidth: desktopMainCardW, minHeight: desktopCardH }}
          >
            <div
              className="absolute left-0 z-40 flex items-center justify-between bg-white px-1"
              style={{
                width: "min(100%, " + desktopImgW + "px)",
                top: desktopImgH,
                height: NAV_H,
              }}
            >
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={handlePrev}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-[#01030b] transition hover:text-[#0D54CA]"
              >
                <ChevronLeft aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={handleNext}
                className="flex h-8 w-8 shrink-0 items-center justify-center text-[#01030b] transition hover:text-[#0D54CA]"
              >
                <ChevronRight aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>

            <div className={phase === "moving" ? "opacity-0" : "opacity-100"}>
              <MainCard card={activeCard} />
            </div>

            {phase === "moving" && (
              <motion.div
                initial={{ x: direction === "next" ? 800 : -800, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: BASE_DURATION * 1.2, ease: "easeOut" }}
                className="absolute top-0 left-0 z-10 bg-white"
                style={{ width: "100%" }}
              >
                <MainCard card={activeCard} />
              </motion.div>
            )}

            {phase === "moving" && (
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={
                  direction === "next"
                    ? { x: -1500, opacity: [1, 1, 0] }
                    : { x: Math.abs(travelX) + 800, opacity: 0 }
                }
                transition={{
                  duration: BASE_DURATION * 2,
                  ease: "easeInOut",
                  opacity: {
                    duration:
                      direction === "prev" ? BASE_DURATION * 0.9 : BASE_DURATION * 1.2,
                    ease: "easeOut",
                  },
                }}
                className="absolute top-0 left-0 pointer-events-none origin-center"
                style={{ width: "100%", zIndex: direction === "prev" ? 30 : 0 }}
              >
                <MainCard card={testimonials[prevActiveIndex]} />
              </motion.div>
            )}
          </div>

          <div
            className={cn(
              "hidden shrink-0 lg:flex",
              compactDesktop ? "mt-2" : "mt-[27px]",
            )}
          >
            <div
              ref={sideContainerRef}
              className="relative"
              style={{ width: sideContainerW, height: sideCardH }}
            >
              {sideStack.map((item, index) => {
                const card = testimonials[item.testimonialIndex];
                const isIncoming = incomingUid === item.uid;
                const isIncomingPrev = isIncoming && direction === "prev";

                const initialAnim: false | { x: number; opacity: number } =
                  isIncoming
                    ? direction === "next"
                      ? { x: sideContainerW, opacity: 0 }
                      : { x: travelX, opacity: 0 }
                    : false;

                return (
                  <motion.div
                    key={item.uid}
                    initial={initialAnim}
                    animate={{
                      x: index * sideCardStep,
                      opacity: isIncomingPrev ? [0, 0, 1] : 1,
                      scale: 1,
                    }}
                    transition={{
                      duration: BASE_DURATION,
                      ease: "easeInOut",
                      opacity: isIncomingPrev ? { times: [0, 0.75, 1] } : undefined,
                    }}
                    className="absolute top-0 rounded bg-[#f1f1f1]"
                    style={{ width: sideCardW, height: sideCardH }}
                  >
                    <SideCardInner card={card} />
                  </motion.div>
                );
              })}

              {phase === "moving" && movingItem && direction === "next" && (
                <motion.div
                  initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                  animate={{
                    x: [0, travelX, travelX, travelX - 1500],
                    y: [0, 0, 0, -50],
                    opacity: [1, 1, 1, 1],
                    scale: [1, 1, 1, 0.8],
                  }}
                  transition={{
                    duration: BASE_DURATION * 2,
                    times: [0, 0.3, 0.85, 1],
                    ease: "easeInOut",
                  }}
                  className="absolute top-0 z-50 bg-[#e9e9e9] shadow-lg"
                  style={{ width: sideCardW, height: sideCardH }}
                >
                  <SideCardInner
                    card={testimonials[movingItem.testimonialIndex]}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile */}
        <div
          className={cn(
            "flex sm:hidden flex-col",
            snapToScreen ? "mt-8" : "mt-10",
          )}
        >
          <div className="relative flex flex-row gap-2" style={{ minHeight: 260 }}>
            {/* Static base */}
            <div
              className={cn(
                "absolute inset-0 flex flex-row gap-2",
                phase === "moving" ? "opacity-0" : "opacity-100",
              )}
            >
              {/* image + quote/name only */}
              <MobileCard card={activeCard} />
            </div>

            {/* Incoming */}
            {phase === "moving" && (
              <motion.div
                initial={{
                  x: direction === "next" ? "100%" : "-100%",
                  opacity: 0,
                }}
                animate={{ x: "0%", opacity: 1 }}
                transition={{ duration: BASE_DURATION * 1.2, ease: "easeOut" }}
                className="absolute inset-0 z-10 bg-white flex flex-row gap-2"
              >
                <MobileCard card={activeCard} />
              </motion.div>
            )}

            {/* Outgoing */}
            {phase === "moving" && (
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={
                  direction === "next"
                    ? { x: "-100%", opacity: 0 }
                    : { x: "100%", opacity: 0 }
                }
                transition={{
                  duration: BASE_DURATION * 1.4,
                  ease: "easeInOut",
                  opacity: { duration: BASE_DURATION * 0.9, ease: "easeOut" },
                }}
                className="absolute inset-0 pointer-events-none bg-white flex flex-row gap-2"
                style={{ zIndex: direction === "prev" ? 30 : 0 }}
              >
                <MobileCard card={testimonials[prevActiveIndex]} />
              </motion.div>
            )}
          </div>

          <div
            className="flex items-center justify-between pt-2 pb-1"
            style={{ width: M_IMG_W }}
          >
            <button
              type="button"
              aria-label="Previous testimonial"
              onClick={handlePrev}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-[#01030b] transition active:text-[#0D54CA]"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              onClick={handleNext}
              className="flex h-8 w-8 shrink-0 items-center justify-center text-[#01030b] transition active:text-[#0D54CA]"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </SiteContainer>
    </section>
  );
}

