import Image from "next/image";
import { useEffect, useRef, useState } from "react";
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
    name: "Alice Carlton",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777012166/About-Us-Testimonial_CEO_2_gxydel.webp",
    quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
  },
  {
    role: "CEO Clara Agencies",
    name: "Goseph Queen",
    image:
      "https://res.cloudinary.com/dku9in8sb/image/upload/v1777009346/About-Us-Testimonial_CEO_jwwwgy.webp",
    quote: `It's rare to find companies that share our philosophy of making things happen.\nOur Operations runs smoothly than ever before.`,
  },
];

// ── Dimensions — matched to expected screenshot ───────────────────────────
const IMG_W = 270; // image column width
const IMG_H = 360; // image height
const NAV_H = 64; // nav bar height below image
const CARD_H = IMG_H + NAV_H; // 424px total card height

const SIDE_CARD_COUNT = 4;
const SIDE_CARD_W = 68;
const SIDE_CARD_GAP = 14;
const SIDE_CARD_STEP = SIDE_CARD_W + SIDE_CARD_GAP;
const SIDE_CONTAINER_W =
  SIDE_CARD_COUNT * SIDE_CARD_W + (SIDE_CARD_COUNT - 1) * SIDE_CARD_GAP;

const MAIN_CARD_W = 560; // total width of main card (image + text)

const STRIP_MOVE_DURATION = 980;
const INCOMING_MAIN_CARD_SPEED_PX_PER_SEC = 800;
const OUTGOING_MAIN_CARD_SPEED_PX_PER_SEC = 1000;
const SHIFT_DURATION = 420;
const SHIFT_STAGGER = 90;

type Direction = "forward" | "backward" | null;
type Phase = "idle" | "moving" | "shifting";

export default function TestimonialSection() {
  const uidRef = useRef(0);
  const moveTimeoutRef = useRef<number | null>(null);
  const shiftTimeoutRef = useRef<number | null>(null);
  const mainContentRef = useRef<HTMLDivElement | null>(null);
  const sideContainerRef = useRef<HTMLDivElement | null>(null);

  const buildSideStack = (startIndex: number) =>
    Array.from({ length: SIDE_CARD_COUNT }, (_, i) => ({
      uid: uidRef.current++,
      testimonialIndex: (startIndex + i + 1) % testimonials.length,
    }));

  const [activeIndex, setActiveIndex] = useState(0);
  const [sideStack, setSideStack] = useState(() => buildSideStack(0));
  const [phase, setPhase] = useState<Phase>("idle");
  const [direction, setDirection] = useState<Direction>(null);
  const [movingItem, setMovingItem] = useState<{
    uid: number;
    testimonialIndex: number;
  } | null>(null);
  const [incomingUid, setIncomingUid] = useState<number | null>(null);

  const [targetX, setTargetX] = useState(-420);
  const [mainCardFrame, setMainCardFrame] = useState({
    width: MAIN_CARD_W,
    height: CARD_H,
  });
  const [mainExitX, setMainExitX] = useState(1600);
  const [mainIncomingStartX, setMainIncomingStartX] = useState(-40);
  const [mainBackwardIncomingStartX, setMainBackwardIncomingStartX] =
    useState(-900);
  const [mainIncomingDuration, setMainIncomingDuration] = useState(800);
  const [mainOutgoingDuration, setMainOutgoingDuration] = useState(1000);
  const [stripExitX, setStripExitX] = useState(-1200);
  const [stripForwardDuration, setStripForwardDuration] = useState(1400);

  const activeCard = testimonials[activeIndex];
  const previousIndex =
    activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;

  const clearTimers = () => {
    if (moveTimeoutRef.current) window.clearTimeout(moveTimeoutRef.current);
    if (shiftTimeoutRef.current) window.clearTimeout(shiftTimeoutRef.current);
  };

  // ── Measurements ──────────────────────────────────────────────────────────
  const measureTargetX = () => {
    if (!mainContentRef.current || !sideContainerRef.current) return -420;
    return (
      mainContentRef.current.getBoundingClientRect().left -
      sideContainerRef.current.getBoundingClientRect().left
    );
  };
  const measureFrame = () =>
    mainContentRef.current
      ? {
          width: mainContentRef.current.offsetWidth,
          height: mainContentRef.current.offsetHeight,
        }
      : { width: MAIN_CARD_W, height: CARD_H };
  const measureExitX = () =>
    typeof window !== "undefined"
      ? window.innerWidth + (mainContentRef.current?.offsetWidth ?? 600) + 120
      : 1600;
  const measureStripExitX = () =>
    sideContainerRef.current
      ? -sideContainerRef.current.getBoundingClientRect().left -
        SIDE_CARD_W -
        120
      : -1200;

  const inDur = (d: number) =>
    (Math.abs(d) / INCOMING_MAIN_CARD_SPEED_PX_PER_SEC) * 1000;
  const outDur = (d: number) =>
    (Math.abs(d) / OUTGOING_MAIN_CARD_SPEED_PX_PER_SEC) * 1000;
  const stripDur = (tx: number, exitX: number) =>
    (Math.abs(exitX) / Math.max(Math.abs(tx), 1)) * STRIP_MOVE_DURATION;

  const remeasure = () => {
    const tx = measureTargetX();
    const frame = measureFrame();
    const exitX = measureExitX();
    const inStart = tx + frame.width;
    const backStart = tx - frame.width;
    const stripExit = measureStripExitX();
    setTargetX(tx);
    setMainCardFrame(frame);
    setMainExitX(exitX);
    setMainIncomingStartX(inStart);
    setMainBackwardIncomingStartX(backStart);
    setMainIncomingDuration(inDur(inStart - tx));
    setMainOutgoingDuration(outDur(exitX));
    setStripExitX(stripExit);
    setStripForwardDuration(stripDur(tx, stripExit));
  };

  useEffect(() => {
    remeasure();
    window.addEventListener("resize", remeasure);
    return () => {
      window.removeEventListener("resize", remeasure);
      clearTimers();
    };
  }, []);

  const finishAnimation = () => {
    setPhase("idle");
    setDirection(null);
    setMovingItem(null);
    setIncomingUid(null);
  };

  // ── Navigation ───────────────────────────────────────────────────────────
  const handleNext = () => {
    if (phase !== "idle" || !sideStack.length) return;
    clearTimers();
    const leadItem = sideStack[0];
    const tx = measureTargetX();
    const frame = measureFrame();
    const exitX = measureExitX();
    const inStart = tx + frame.width;
    const backStart = tx - frame.width;
    const stripExit = measureStripExitX();
    const iDur = inDur(inStart - tx);
    const oDur = outDur(exitX);
    const sDur = stripDur(tx, stripExit);
    const total = Math.max(sDur, iDur, oDur);

    setTargetX(tx);
    setMainCardFrame(frame);
    setMainExitX(exitX);
    setMainIncomingStartX(inStart);
    setMainBackwardIncomingStartX(backStart);
    setMainIncomingDuration(iDur);
    setMainOutgoingDuration(oDur);
    setStripExitX(stripExit);
    setStripForwardDuration(sDur);
    setDirection("forward");
    setMovingItem(leadItem);
    setIncomingUid(null);
    setPhase("moving");

    moveTimeoutRef.current = window.setTimeout(() => {
      const nextTail = {
        uid: uidRef.current++,
        testimonialIndex:
          (leadItem.testimonialIndex + SIDE_CARD_COUNT) % testimonials.length,
      };
      setActiveIndex(leadItem.testimonialIndex);
      setIncomingUid(nextTail.uid);
      setSideStack((prev) => [...prev.slice(1), nextTail]);
      setPhase("shifting");
      shiftTimeoutRef.current = window.setTimeout(
        finishAnimation,
        SHIFT_DURATION + SHIFT_STAGGER * (SIDE_CARD_COUNT - 1) + 80,
      );
    }, total);
  };

  const handlePrev = () => {
    if (phase !== "idle") return;
    clearTimers();
    const prevIdx =
      activeIndex === 0 ? testimonials.length - 1 : activeIndex - 1;
    const outStrip = { uid: uidRef.current++, testimonialIndex: activeIndex };
    const tx = measureTargetX();
    const frame = measureFrame();
    const exitX = measureExitX();
    const inStart = tx + frame.width;
    const backStart = tx - frame.width;
    const stripExit = measureStripExitX();
    const iDur = inDur(tx - backStart);
    const oDur = outDur(exitX);
    const sDur = stripDur(tx, stripExit);
    const total = Math.max(sDur, iDur, oDur);

    setTargetX(tx);
    setMainCardFrame(frame);
    setMainExitX(exitX);
    setMainIncomingStartX(inStart);
    setMainBackwardIncomingStartX(backStart);
    setMainIncomingDuration(iDur);
    setMainOutgoingDuration(oDur);
    setStripExitX(stripExit);
    setStripForwardDuration(sDur);
    setDirection("backward");
    setMovingItem(outStrip);
    setIncomingUid(null);
    setPhase("moving");

    moveTimeoutRef.current = window.setTimeout(() => {
      const newHead = { uid: uidRef.current++, testimonialIndex: activeIndex };
      setActiveIndex(prevIdx);
      setIncomingUid(newHead.uid);
      setSideStack((prev) => [newHead, ...prev.slice(0, SIDE_CARD_COUNT - 1)]);
      setPhase("shifting");
      shiftTimeoutRef.current = window.setTimeout(
        finishAnimation,
        SHIFT_DURATION + SHIFT_STAGGER * (SIDE_CARD_COUNT - 1) + 80,
      );
    }, total);
  };

  const fwdStop = Math.min(
    Math.max(Math.abs(targetX) / Math.max(Math.abs(stripExitX), 1), 0),
    0.95,
  );
  const bwdStop = Math.min(
    Math.max(
      Math.abs(stripExitX - targetX) / Math.max(Math.abs(stripExitX), 1),
      0,
    ),
    0.8,
  );

  // ── Sub-components ────────────────────────────────────────────────────────
  const SideCardInner = ({ card }: { card: (typeof testimonials)[number] }) => (
    <>
      <span className="absolute top-5 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[11px] text-[#9a9a9a] select-none tracking-wide">
        {card.role}
      </span>
      <span
        className="absolute bottom-6 left-1/2 [writing-mode:vertical-rl] [transform:translateX(-50%)_rotate(180deg)] text-[16px] font-[500] leading-none text-[#111] select-none"
        style={{ fontFamily: "var(--font-archivo), Arial, sans-serif" }}
      >
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
    // Exact layout from expected screenshot:
    // image (no gap below) → nav bar flush → text column to the right
    <div
      className="flex items-start"
      style={{ width: MAIN_CARD_W, height: CARD_H }}
    >
      {/* LEFT: image + nav stacked with zero gap */}
      <div className="shrink-0 flex flex-col" style={{ width: IMG_W }}>
        {/* Image — fills IMG_H */}
        <div
          className="relative overflow-hidden bg-[#e8e8e8]"
          style={{ width: IMG_W, height: IMG_H }}
        >
          <Image
            src={card.image}
            alt={card.name}
            fill
            className="object-cover object-top"
            sizes={`${IMG_W}px`}
            unoptimized
          />
          {/* Double-quote badge — top-right corner */}
          <div
            className="absolute right-0 top-0 z-10 flex items-center justify-center bg-[#2666D2] text-white select-none"
            style={{
              width: 40,
              height: 40,
              fontSize: 22,
              lineHeight: 1,
              paddingTop: 4,
            }}
          >
            "
          </div>
        </div>

        {/* Nav — flush below image, same width */}
        {showControls ? (
          <div
            className="flex items-center justify-between bg-white"
            style={{
              width: IMG_W,
              height: NAV_H,
              paddingLeft: 28,
              paddingRight: 28,
            }}
          >
            <button
              onClick={handlePrev}
              className="text-[30px] font-light leading-none text-[#111] hover:text-[#2666D2] transition-colors"
              aria-label="Previous"
            >
              ‹
            </button>
            <button
              onClick={handleNext}
              className="text-[30px] font-light leading-none text-[#111] hover:text-[#2666D2] transition-colors"
              aria-label="Next"
            >
              ›
            </button>
          </div>
        ) : (
          <div className="bg-white" style={{ width: IMG_W, height: NAV_H }} />
        )}
      </div>

      {/* RIGHT: quote + name/role — vertically spread */}
      <div
        className="flex flex-col justify-between"
        style={{
          flex: 1,
          minWidth: 0,
          height: CARD_H,
          paddingLeft: 32,
          paddingTop: 8,
          paddingBottom: 16,
        }}
      >
        {/* Quote text */}
        <p
          className="text-[#111] text-[15px] leading-[1.65]"
          style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
        >
          {card.quote.split("\n").map((line, i) => (
            <span key={i}>
              {line}
              {i < card.quote.split("\n").length - 1 && <br />}
            </span>
          ))}
        </p>

        {/* Name + role at bottom */}
        <div>
          <h3
            className="text-[20px] font-[600] leading-[1.2] text-[#111]"
            style={{ fontFamily: "var(--font-archivo), Arial, sans-serif" }}
          >
            {card.name}
          </h3>
          <p
            className="mt-[6px] text-[13px] text-[#666]"
            style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
          >
            {card.role}
          </p>
        </div>
      </div>
    </div>
  );

  // ── Shared motion transition for side cards ───────────────────────────────
  const sideTransition = (index: number) =>
    phase === "shifting"
      ? {
          duration: SHIFT_DURATION / 1000,
          delay:
            direction === "forward"
              ? index * (SHIFT_STAGGER / 1000)
              : Math.max(index - 1, 0) * (SHIFT_STAGGER / 1000),
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }
      : { duration: 0.2, ease: "easeOut" as const };

  return (
    <section className="w-screen relative left-1/2 -translate-x-1/2 py-16 lg:py-20 bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16">
        {/* ── Header ── */}
        <div className="mb-5 flex items-center gap-4">
          <RotatingDots />
          <p
            className="text-[#01030B] text-[13px] tracking-wide"
            style={{ fontFamily: "var(--font-inter-tight), sans-serif" }}
          >
            Testimonials
          </p>
        </div>

        <h2
          className="text-[#01030B] text-[38px] lg:text-[52px] font-[500] leading-[1.1] tracking-tight max-w-[820px]"
          style={{ fontFamily: "var(--font-archivo), Arial, sans-serif" }}
        >
          Building Lasting Relationships
          <br />
          Through Results Our Clients Value
        </h2>

        {/* ── Card row ── */}
        <div className="mt-14 lg:mt-16 flex flex-col lg:flex-row lg:items-start lg:justify-between">
          {/* Main card */}
          <div
            ref={mainContentRef}
            className="relative shrink-0"
            style={{ width: MAIN_CARD_W, height: CARD_H }}
          >
            <div className={phase === "moving" ? "opacity-0" : "opacity-100"}>
              <MainCard card={activeCard} showControls />
            </div>

            {/* Exiting overlay */}
            {phase === "moving" && (
              <motion.div
                initial={{ x: 0, opacity: 1 }}
                animate={{
                  x: direction === "forward" ? -mainExitX : mainCardFrame.width,
                  opacity: direction === "forward" ? 0.18 : 0.12,
                }}
                transition={{
                  x: {
                    duration:
                      (direction === "forward"
                        ? mainOutgoingDuration
                        : mainIncomingDuration) / 1000,
                    ease: "linear",
                  },
                  opacity: {
                    duration:
                      (direction === "forward"
                        ? mainOutgoingDuration
                        : mainIncomingDuration) / 1000,
                    ease: "linear",
                  },
                }}
                className="absolute inset-0 z-20 pointer-events-none"
              >
                <MainCard card={activeCard} showControls />
              </motion.div>
            )}
          </div>

          {/* ── Side stack — desktop ── */}
          <div className="hidden lg:flex flex-1 justify-end items-start">
            <div
              ref={sideContainerRef}
              className="relative shrink-0"
              style={{ width: SIDE_CONTAINER_W, height: CARD_H }}
            >
              {/* Static side cards */}
              {sideStack.map((item, index) => {
                const card = testimonials[item.testimonialIndex];
                const isLeadHidden =
                  direction === "forward" &&
                  phase === "moving" &&
                  movingItem?.uid === item.uid;
                const isIncoming =
                  direction === "forward" && incomingUid === item.uid;

                return (
                  <motion.div
                    key={item.uid}
                    initial={
                      isIncoming
                        ? { x: SIDE_CARD_COUNT * SIDE_CARD_STEP, opacity: 0 }
                        : false
                    }
                    animate={{
                      x: index * SIDE_CARD_STEP,
                      opacity: isLeadHidden ? 0 : 1,
                    }}
                    transition={sideTransition(index)}
                    className="absolute top-0 rounded-[6px] bg-[#F0F0F0]"
                    style={{ width: SIDE_CARD_W, height: CARD_H }}
                  >
                    <SideCardInner card={card} />
                  </motion.div>
                );
              })}

              {/* Forward: incoming main card sliding in */}
              {phase === "moving" && movingItem && direction === "forward" && (
                <motion.div
                  initial={{ x: mainIncomingStartX, opacity: 0.12 }}
                  animate={{ x: targetX, opacity: 1 }}
                  transition={{
                    x: {
                      duration: mainIncomingDuration / 1000,
                      ease: "linear",
                    },
                    opacity: {
                      duration: mainIncomingDuration / 1000,
                      ease: "linear",
                    },
                  }}
                  className="absolute top-0 left-0 z-10 pointer-events-none"
                  style={{
                    width: mainCardFrame.width,
                    height: mainCardFrame.height,
                  }}
                >
                  <MainCard
                    card={testimonials[movingItem.testimonialIndex]}
                    showControls={false}
                  />
                </motion.div>
              )}

              {/* Backward: incoming main card from left */}
              {phase === "moving" && direction === "backward" && (
                <motion.div
                  initial={{ x: mainBackwardIncomingStartX, opacity: 0.12 }}
                  animate={{ x: targetX, opacity: 1 }}
                  transition={{
                    x: {
                      duration: mainIncomingDuration / 1000,
                      ease: "linear",
                    },
                    opacity: {
                      duration: mainIncomingDuration / 1000,
                      ease: "linear",
                    },
                  }}
                  className="absolute top-0 left-0 z-10 pointer-events-none"
                  style={{
                    width: mainCardFrame.width,
                    height: mainCardFrame.height,
                  }}
                >
                  <MainCard
                    card={testimonials[previousIndex]}
                    showControls={false}
                  />
                </motion.div>
              )}

              {/* Moving strip card */}
              {phase === "moving" && movingItem && (
                <motion.div
                  initial={
                    direction === "forward"
                      ? { x: 0, opacity: 0.3 }
                      : { x: stripExitX, opacity: 1 }
                  }
                  animate={
                    direction === "forward"
                      ? { x: [0, targetX, stripExitX], opacity: [0.3, 1, 1] }
                      : {
                          x: [stripExitX, targetX, 0, 0],
                          opacity: [1, 1, 1, 0],
                        }
                  }
                  transition={{
                    x:
                      direction === "forward"
                        ? {
                            duration: stripForwardDuration / 1000,
                            times: [0, fwdStop, 1],
                            ease: [[0.22, 1, 0.36, 1], "linear"],
                          }
                        : {
                            duration: stripForwardDuration / 1000,
                            times: [0, bwdStop, 0.9, 1],
                            ease: ["linear", [0.22, 1, 0.36, 1], "linear"],
                          },
                    opacity:
                      direction === "forward"
                        ? {
                            duration: stripForwardDuration / 1000,
                            times: [0, fwdStop, 1],
                            ease: ["linear", "linear"],
                          }
                        : {
                            duration: stripForwardDuration / 1000,
                            times: [0, bwdStop, 0.9, 1],
                            ease: ["linear", "linear", "linear"],
                          },
                  }}
                  className="absolute top-0 left-0 z-30 rounded-[6px] bg-[#F0F0F0] shadow-[0_16px_48px_rgba(0,0,0,0.10)]"
                  style={{ width: SIDE_CARD_W, height: CARD_H }}
                >
                  <SideCardInner
                    card={testimonials[movingItem.testimonialIndex]}
                  />
                </motion.div>
              )}
            </div>
          </div>
          {/* end flex-1 justify-end wrapper */}

          {/* ── Side stack — mobile (static) ── */}
          <div className="flex gap-3 lg:hidden">
            {sideStack.map((item) => {
              const card = testimonials[item.testimonialIndex];
              return (
                <div
                  key={item.uid}
                  className="relative shrink-0 rounded-[6px] bg-[#F0F0F0]"
                  style={{ width: 62, height: CARD_H }}
                >
                  <SideCardInner card={card} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
