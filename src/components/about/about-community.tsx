"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useMotionValue } from "framer-motion";
import RotatingDots from "../ui/rotating-dots";

// ─── Data ─────────────────────────────────────────────────────────────────────

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

// ─── Main Component ───────────────────────────────────────────────────────────

export default function OutGreaterCommunity() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // ROW_HEIGHT in px — the height of one initiative row in the left panel
  const ROW_HEIGHT = 160;

  // activeIndex: which item sits at the TOP of the 2-row window (0-based)
  // Valid: 0 .. initiatives.length - 2
  const maxIndex = initiatives.length - 2; // = 2
  const totalSteps = initiatives.length - 1; // 3 scroll steps (4 snaps)

  // Motion values for smooth scroll-linked translation
  const rawProgress = useMotionValue(0);
  const springProgress = useSpring(rawProgress, { stiffness: 180, damping: 28 });

  // The full row stack translates up by (activeIndex + progress) * ROW_HEIGHT
  const [activeIndex, setActiveIndex] = useState(0);
  const translateY = useTransform(
    springProgress,
    (p) => -(activeIndex * ROW_HEIGHT) - p * ROW_HEIGHT
  );

  // Image state: current pair + next pair + crossfade amount
  const [imgs, setImgs] = useState({
    topCurr: initiatives[0].image,
    botCurr: initiatives[1].image,
    topNext: null as string | null,
    botNext: null as string | null,
    fade: 0,
  });

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const stepH = el.clientHeight;

    const handleScroll = () => {
      const s = el.scrollTop;
      const stepFloat = s / stepH;
      const stepFloor = Math.floor(stepFloat);
      const frac = stepFloat - stepFloor;

      // Clamp active index to valid range for the rows window
      const clampedIndex = Math.max(0, Math.min(maxIndex, stepFloor));

      setActiveIndex(clampedIndex);

      // Progress within current step (0→1), but clamp at last valid step
      const canScrollMore = stepFloor < maxIndex;
      rawProgress.set(canScrollMore ? frac : 0);

      // Cross-fade images after 40% of the scroll step
      if (frac > 0.4 && stepFloor < maxIndex) {
        const nextIdx = stepFloor + 1;
        setImgs({
          topCurr: initiatives[stepFloor].image,
          botCurr: initiatives[stepFloor + 1]?.image ?? null,
          topNext: initiatives[nextIdx].image,
          botNext: initiatives[nextIdx + 1]?.image ?? null,
          fade: Math.min(1, (frac - 0.4) / 0.6),
        });
      } else {
        setImgs({
          topCurr: initiatives[clampedIndex].image,
          botCurr: initiatives[clampedIndex + 1]?.image ?? null,
          topNext: null,
          botNext: null,
          fade: 0,
        });
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [rawProgress, maxIndex]);

  return (
    <div
      ref={scrollRef}
      style={{ height: "100vh", overflowY: "scroll", scrollSnapType: "y mandatory" }}
    >
      {/* Invisible snap-point spacers */}
      {Array.from({ length: totalSteps + 1 }).map((_, i) => (
        <div key={i} style={{ height: "100vh", scrollSnapAlign: "start" }} />
      ))}

      {/* Sticky full-screen layout */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden bg-white flex flex-col"
        style={{ marginTop: `calc(-${(totalSteps + 1) * 100}vh)` }}
      >
        {/* ── HEADER ────────────────────────────────────────────────────── */}
        <div
          className="w-full flex-shrink-0"
          style={{
            background: "linear-gradient(135deg, #0b2a5b 0%, #1a3fa0 55%, #2f5fbf 100%)",
            padding: "32px 64px 40px",
          }}
        >
          <div className="flex items-center gap-2 mb-5">
            <RotatingDots />
            <span className="text-white text-[13px] tracking-wide font-medium">
              Out Greater Community
            </span>
          </div>
          <h1
            className="text-white font-semibold leading-[1.2] max-w-[820px]"
            style={{ fontSize: "clamp(26px, 3.2vw, 34px)" }}
          >
            Beyond business, we strive to make a difference
            <br />
            through care, responsibility, and meaningful impact.
          </h1>
        </div>

        {/* ── BODY ──────────────────────────────────────────────────────── */}
        <div className="flex flex-1 min-h-0">

          {/* LEFT: clipped 2-row window with sliding stack */}
          <div
            style={{
              flex: "0 0 57%",
              paddingLeft: 64,
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* The visible window — exactly 2 rows tall */}
            <div
              style={{
                height: ROW_HEIGHT * 2,
                overflow: "hidden",
                position: "relative",
              }}
            >
              {/* The full 4-row stack, translated by scroll progress */}
              <motion.div
                style={{
                  translateY,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                }}
              >
                {initiatives.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      height: ROW_HEIGHT,
                      display: "flex",
                      alignItems: "flex-start",
                      borderTop: "1px solid #e5e7eb",
                      paddingTop: 28,
                      paddingRight: 48,
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Title column */}
                    <div style={{ width: 240, flexShrink: 0 }}>
                      <span
                        style={{
                          fontSize: 17,
                          fontWeight: 600,
                          color: "#111827",
                          lineHeight: 1.35,
                        }}
                      >
                        {item.title}
                      </span>
                    </div>
                    {/* Description column */}
                    <div style={{ flex: 1, maxWidth: 360 }}>
                      <p
                        style={{
                          fontSize: 14,
                          color: "#6b7280",
                          lineHeight: 1.75,
                          margin: 0,
                        }}
                      >
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* RIGHT: stacked images with crossfade */}
          <div className="flex-1 min-h-0 overflow-hidden relative">
            {/* Current image pair */}
            <div
              className="absolute inset-0 flex flex-col"
              style={{ opacity: 1 - imgs.fade, transition: "none" }}
            >
              <div className="flex-1 overflow-hidden">
                <img
                  src={imgs.topCurr}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              {imgs.botCurr && (
                <div className="flex-1 overflow-hidden">
                  <img
                    src={imgs.botCurr}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ filter: "grayscale(100%)" }}
                  />
                </div>
              )}
            </div>

            {/* Next image pair (fades in during transition) */}
            {imgs.topNext && (
              <div
                className="absolute inset-0 flex flex-col"
                style={{ opacity: imgs.fade, transition: "none" }}
              >
                <div className="flex-1 overflow-hidden">
                  <img
                    src={imgs.topNext}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                {imgs.botNext && (
                  <div className="flex-1 overflow-hidden">
                    <img
                      src={imgs.botNext}
                      alt=""
                      className="w-full h-full object-cover"
                      style={{ filter: "grayscale(100%)" }}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}