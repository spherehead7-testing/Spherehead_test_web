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
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777009346/About-Us-Testimonial_CEO_jwwwgy.webp",
        quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
    },
    {
        role: "CEO Clara Agencies",
        name: "Alice Carlton",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777012166/About-Us-Testimonial_CEO_2_gxydel.webp",
        quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
    },
    {
        role: "CTO Clara Agencies",
        name: "Stephen Hanah",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777009346/About-Us-Testimonial_CEO_jwwwgy.webp",
        quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
    },
    {
        role: "CEO Clara Agencies",
        name: "Henrick Dorsin",
        image: "https://res.cloudinary.com/dku9in8sb/image/upload/v1777012166/About-Us-Testimonial_CEO_2_gxydel.webp",
        quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
    },
];

const IMG_W = 350;
const IMG_H = 450;
const NAV_H = 32;
const CARD_H = IMG_H + NAV_H;

const SIDE_CARD_COUNT = 4;
const SIDE_CARD_W = 68;
const SIDE_CARD_GAP = 8;
const SIDE_CARD_STEP = SIDE_CARD_W + SIDE_CARD_GAP;
const SIDE_CARD_H = 450;

const SIDE_CONTAINER_W =
    SIDE_CARD_COUNT * SIDE_CARD_W + (SIDE_CARD_COUNT - 1) * SIDE_CARD_GAP;

const MAIN_CARD_W = 650;

const BASE_DURATION = 0.7;

type TestimonialSectionProps = {
    snapToScreen?: boolean;
};

const initialSideStack = Array.from({ length: SIDE_CARD_COUNT }, (_, i) => ({
    uid: i,
    testimonialIndex: (i + 1) % testimonials.length,
}));

export default function TestimonialSection({
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

    useEffect(() => {
        const measureDistance = () => {
            if (mainContainerRef.current && sideContainerRef.current) {
                const mainLeft =
                    mainContainerRef.current.getBoundingClientRect().left;
                const sideLeft =
                    sideContainerRef.current.getBoundingClientRect().left;
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
            if (snapTimerRef.current) {
                clearTimeout(snapTimerRef.current);
            }

            snapTimerRef.current = setTimeout(() => {
                const rect = section.getBoundingClientRect();
                const viewportHeight = window.innerHeight;
                const shouldLock =
                    rect.top < viewportHeight * 0.38 && rect.top > 8;

                if (shouldLock) {
                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                    });
                }
            }, 120);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            if (snapTimerRef.current) {
                clearTimeout(snapTimerRef.current);
            }
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
                (leadItem.testimonialIndex + SIDE_CARD_COUNT) %
                testimonials.length,
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

        const newHead = {
            uid: uidRef.current++,
            testimonialIndex: activeIndex,
        };

        setPrevActiveIndex(activeIndex);
        setSideStack((prev) => [
            newHead,
            ...prev.slice(0, SIDE_CARD_COUNT - 1),
        ]);
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

    const SideCardInner = ({
        card,
    }: {
        card: (typeof testimonials)[number];
    }) => (
        <>
            <span className="body-extra-small absolute top-5 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[#8A8B8F]">
                {card.role}
            </span>

            <span className="body-small absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[#01030B]">
                {card.name}
            </span>
        </>
    );

    const MainCard = ({
        card,
        showControls = false,
    }: {
        card: (typeof testimonials)[number];
        showControls?: boolean;
    }) => (
        <div
            className="flex w-full flex-col gap-5 sm:flex-row sm:gap-0"
            style={{ maxWidth: MAIN_CARD_W, minHeight: CARD_H }}
        >
            <div className="shrink-0 relative" style={{ width: IMG_W }}>
                <div
                    className="relative overflow-hidden rounded-[6px] rounded-br-[18px]"
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
                {/* Quote Icon Box moved outside the rounded container */}
                <div className="absolute top-0 right-0 z-10 flex h-10 w-10 items-center justify-center bg-[#0D54CA]">
                    <Quote className="h-5 w-5 fill-white text-white" />
                </div>
            </div>

            <div className="flex min-h-[320px] flex-col justify-between pt-10 sm:min-h-0 sm:w-[288px] sm:pl-5 sm:pt-11 sm:pb-[74px]">
                <p className="body-small max-w-[238px] whitespace-pre-line text-[#01030b] !text-[16px] !leading-[1.4]">
                    {card.quote}
                </p>
                <div>
                    <h3 className="heading-2 !text-[#01030b] !text-[32px]">
                        {card.name}
                    </h3>
                    <p className="body-medium mt-[-10px] text-[#01030b]">
                        {card.role}
                    </p>
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
                    : "py-16 sm:py-[62px]",
            )}
        >
            <SiteContainer>
                <div className="mb-4 flex items-center gap-3">
                    <RotatingDots variant="light" />
                    <p className="body-small text-[#01030B]">Testimonials</p>
                </div>

                <h2 className={cn("heading-2 !text-[#0A0D0F]", snapToScreen)}>
                    Building Lasting Relationships
                    <br />
                    Through Results Our Clients Value
                </h2>

                <div
                    className={cn(
                        "flex items-start justify-between gap-12",
                        snapToScreen ? "mt-8 lg:mt-10" : "mt-16 lg:mt-[76px]",
                    )}
                >
                    <div
                        ref={mainContainerRef}
                        className="relative w-full sm:mt-[27px]"
                        style={{ maxWidth: MAIN_CARD_W, minHeight: CARD_H }}
                    >
                        {/* FIX: PERSISTENT ARROWS. Positioned perfectly on the left and right edges under the image */}
                        <div
                            className="absolute left-0 z-40 flex items-center justify-between bg-white"
                            style={{
                                width: IMG_W,
                                top: IMG_H,
                                height: NAV_H,
                            }}
                        >
                            {/* LEFT BUTTON */}
                            <button
                                type="button"
                                aria-label="Previous testimonial"
                                onClick={handlePrev}
                                // 👇 Add -ml-2 to the left button
                                className="flex h-8 w-8 items-center justify-center -ml-2 text-[#01030b] transition hover:text-[#0D54CA]"
                            >
                                <ChevronLeft
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                />
                            </button>

                            {/* RIGHT BUTTON */}
                            <button
                                type="button"
                                aria-label="Next testimonial"
                                onClick={handleNext}
                                // 👇 Add -mr-2 to the right button
                                className="flex h-8 w-8 items-center justify-center -mr-2 text-[#01030b] transition hover:text-[#0D54CA]"
                            >
                                <ChevronRight
                                    aria-hidden="true"
                                    className="h-5 w-5"
                                />
                            </button>
                        </div>

                        {/* 1. Base Static Card */}
                        <div
                            className={
                                phase === "moving" ? "opacity-0" : "opacity-100"
                            }
                        >
                            <MainCard card={activeCard} />
                        </div>

                        {/* 2. Incoming Main Card */}
                        {phase === "moving" && (
                            <motion.div
                                // FIX: Increased to 800 and -800 so it visibly flies in from far away
                                initial={{
                                    x: direction === "next" ? 800 : -800,
                                    opacity: 0,
                                }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{
                                    duration: BASE_DURATION * 1.2, // Slightly slower smooth entrance
                                    ease: "easeOut",
                                }}
                                className="absolute top-0 left-0 z-10 bg-white"
                                style={{ width: "100%" }}
                            >
                                <MainCard card={activeCard} />
                            </motion.div>
                        )}

                        {/* 3. Outgoing Main Card */}
                        {phase === "moving" && (
                            <motion.div
                                initial={{ x: 0, opacity: 1 }}
                                animate={
                                    direction === "next"
                                        ? { x: -1500, opacity: [1, 1, 0] }
                                        : {
                                              x: Math.abs(travelX) + 800,
                                              opacity: 0,
                                          }
                                }
                                transition={{
                                    // Total movement takes BASE_DURATION * 1.2
                                    duration: BASE_DURATION * 2,
                                    ease: "easeInOut",
                                    opacity: {
                                        duration:
                                            direction === "prev"
                                                ? BASE_DURATION * 0.9
                                                : BASE_DURATION * 1.2,
                                        ease: "easeOut",
                                    },
                                }}
                                className="absolute top-0 left-0 pointer-events-none origin-center"
                                style={{
                                    width: "100%",
                                    zIndex: direction === "prev" ? 30 : 0,
                                }}
                            >
                                <MainCard
                                    card={testimonials[prevActiveIndex]}
                                    showControls={false}
                                />
                            </motion.div>
                        )}
                    </div>

                    <div className="hidden shrink-0 lg:flex mt-[27px]">
                        <div
                            ref={sideContainerRef}
                            className="relative"
                            style={{
                                width: SIDE_CONTAINER_W,
                                height: SIDE_CARD_H,
                            }}
                        >
                            {sideStack.map((item, index) => {
                                const card =
                                    testimonials[item.testimonialIndex];
                                const isIncoming = incomingUid === item.uid;
                                const isIncomingPrev =
                                    isIncoming && direction === "prev";

                                let initialAnim: any = false;

                                if (isIncoming) {
                                    initialAnim =
                                        direction === "next"
                                            ? {
                                                  x: SIDE_CONTAINER_W,
                                                  opacity: 0,
                                              }
                                            : { x: travelX, opacity: 0 };
                                }

                                return (
                                    <motion.div
                                        key={item.uid}
                                        initial={initialAnim}
                                        animate={{
                                            x: index * SIDE_CARD_STEP,
                                            opacity: isIncomingPrev
                                                ? [0, 0, 1]
                                                : 1,
                                            scale: 1,
                                        }}
                                        transition={{
                                            duration: BASE_DURATION,
                                            ease: "easeInOut",
                                            opacity: isIncomingPrev
                                                ? { times: [0, 0.75, 1] }
                                                : undefined,
                                        }}
                                        className="absolute top-0 rounded bg-[#f1f1f1]"
                                        style={{
                                            width: SIDE_CARD_W,
                                            height: SIDE_CARD_H,
                                        }}
                                    >
                                        <SideCardInner card={card} />
                                    </motion.div>
                                );
                            })}

                            {/* OUTGOING SIDE CARD: The grey vertical card that lands on the left image */}
                            {phase === "moving" &&
                                movingItem &&
                                direction === "next" && (
                                    <motion.div
                                        initial={{
                                            x: 0,
                                            y: 0,
                                            opacity: 1,
                                            scale: 1,
                                        }}
                                        animate={{
                                            x: [
                                                0,
                                                travelX,
                                                travelX,
                                                travelX - 1500,
                                            ],
                                            y: [0, 0, 0, -50],
                                            opacity: [1, 1, 1, 1],
                                            scale: [1, 1, 1, 0.8],
                                        }}
                                        transition={{
                                            duration: BASE_DURATION * 2,

                                            // 👇 FIX: Arrives at 30%, stays paused until 85%, then flies out
                                            times: [0, 0.3, 0.85, 1],
                                            ease: "easeInOut",
                                        }}
                                        className="absolute top-0 z-50 bg-[#e9e9e9] shadow-lg"
                                        style={{
                                            width: SIDE_CARD_W,
                                            height: SIDE_CARD_H,
                                        }}
                                    >
                                        <SideCardInner
                                            card={
                                                testimonials[
                                                    movingItem.testimonialIndex
                                                ]
                                            }
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