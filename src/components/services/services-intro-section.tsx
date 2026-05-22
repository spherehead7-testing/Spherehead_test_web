import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import SiteContainer from "@/components/layout/site-container";
import { ServiceCategoryData } from "@/data/service-categories";
import { useIsMobile } from "@/hooks/use-is-mobile";

export default function ServicesIntroSection({
  data,
}: {
  data: ServiceCategoryData["intro"];
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <ServicesIntroMobile data={data} />;
  }

  return <ServicesIntroDesktop data={data} />;
}

function ServicesIntroMobile({ data }: { data: ServiceCategoryData["intro"] }) {
  return (
    <section className="relative z-30 w-full bg-white py-10 rounded-[6px]">
      <SiteContainer>
        <div className="w-full">
          <p
            className="!text-[#01030B]"
            style={{ fontFamily: "var(--font-archivo)", fontSize: "24px" }}
            dangerouslySetInnerHTML={{ __html: data.mainText }}
          />
        </div>
        <p className="body-small mt-6" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
          {data.p1}
        </p>
        <div className="relative mt-8 aspect-[4/3] w-full max-w-[280px] overflow-hidden rounded-[4px] bg-animated-gradient">
          <div className="absolute inset-5 z-10 overflow-hidden rounded-xl">
            <Image src={data.image} alt="Section Image" fill sizes="280px" className="object-contain" />
          </div>
        </div>
        <p className="body-small mt-8 italic" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
          {data.heading}
        </p>
        <p className="body-small mt-6" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
          {data.p2}
        </p>
      </SiteContainer>
    </section>
  );
}

/**
 * Desktop intro with parallax columns and scroll-controlled navigation.
 *
 * Scroll flow (managed entirely via wheel preventDefault + programmatic scrollTo):
 * 1. Hero zone → animate to intro top, STOP here
 * 2. From intro → next intentional scroll down → animate to approach section
 * 3. From intro → intentional scroll up → animate back to hero (scrollY = 0)
 */
function ServicesIntroDesktop({ data }: { data: ServiceCategoryData["intro"] }) {
  const containerRef = useRef<HTMLElement>(null);

  // Framer Motion parallax for the white column curtain
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 22,
    mass: 1.2,
  });

  const [scrollDir, setScrollDir] = React.useState<"down" | "up">("down");

  const col1Y = useTransform(smoothProgress, [0, 1], [scrollDir === "down" ? "0%" : "30%", "0%"]);
  const col2Y = useTransform(smoothProgress, [0, 1], [scrollDir === "down" ? "55%" : "110%", "0%"]);
  const col3Y = useTransform(smoothProgress, [0, 1], [scrollDir === "down" ? "80%" : "180%", "0%"]);
  const contentY = useTransform(smoothProgress, [0, 1], [scrollDir === "down" ? "75vh" : "180vh", "0vh"]);

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    // Disable CSS scroll-behavior: smooth so our programmatic scroll isn't sluggish
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";

    // --- State machine ---
    // "idle"       = not controlling scroll (e.g., further down the page)
    // "atHero"     = user is at the hero, next down-scroll snaps to intro
    // "atIntro"    = user is at intro, stopped. Next down → approach, next up → hero
    // "animating"  = a programmatic scroll is in progress, block everything
    type State = "idle" | "atHero" | "atIntro" | "animating";
    let state: State = window.scrollY < 50 ? "atHero" : "idle";

    // Track last wheel time for intent detection
    let lastWheelTime = 0;
    let accumulator = 0;
    let eventCount = 0; // count consecutive same-direction events for Safari trackpad
    let lastDirection: "up" | "down" | null = null;
    const ACCUMULATOR_THRESHOLD = 50;
    const EVENT_COUNT_THRESHOLD = 6; // Safari fires many small-delta events; 6 in a row = intent
    const INTENT_GAP_MS = 400; // increased for Safari's slower event cadence
    let atIntroSince = 0; // when we entered atIntro state
    const INTRO_COOLDOWN_MS = 400; // ignore input for this long after arriving at intro

    const getIntroTop = () => section.offsetTop;

    // Programmatic smooth scroll using requestAnimationFrame
    const animateScrollTo = (targetY: number, duration: number, cb?: () => void) => {
      state = "animating";
      const startY = window.scrollY;
      const distance = targetY - startY;
      if (Math.abs(distance) < 2) {
        window.scrollTo({ top: targetY, behavior: "instant" as ScrollBehavior });
        cb?.();
        return;
      }
      const t0 = performance.now();

      const step = (ts: number) => {
        const elapsed = ts - t0;
        const t = Math.min(elapsed / duration, 1);
        const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
        window.scrollTo({
          top: Math.round(startY + distance * ease),
          behavior: "instant" as ScrollBehavior,
        });
        if (t < 1) {
          requestAnimationFrame(step);
        } else {
          cb?.();
        }
      };
      requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      const scrollY = window.scrollY;
      const introTop = getIntroTop();
      const isDown = e.deltaY > 0;
      const isUp = e.deltaY < 0;

      // --- While animating, block everything ---
      if (state === "animating") {
        e.preventDefault();
        return;
      }

      // --- Determine current state from scroll position if needed ---
      if (state === "idle") {
        // Don't engage when far below the intro zone
        if (scrollY > introTop + window.innerHeight) return;

        if (scrollY < 50) {
          state = "atHero";
        } else if (Math.abs(scrollY - introTop) < 20) {
          state = "atIntro";
          atIntroSince = now;
          lastWheelTime = now;
          accumulator = 0;
        }
      }

      // --- At Hero: block all wheel, snap to intro on scroll down ---
      if (state === "atHero") {
        e.preventDefault();
        if (isDown) {
          setScrollDir("down");
          animateScrollTo(introTop, 1000, () => {
            state = "atIntro";
            atIntroSince = Date.now();
            lastWheelTime = Date.now();
            accumulator = 0;
          });
        }
        return;
      }

      // --- At Intro: block all wheel, detect intent for next snap ---
      if (state === "atIntro") {
        e.preventDefault();

        // Cooldown: ignore input right after arriving at intro
        if (now - atIntroSince < INTRO_COOLDOWN_MS) {
          accumulator = 0;
          eventCount = 0;
          return;
        }

        const gap = now - lastWheelTime;
        lastWheelTime = now;

        // Determine current direction
        const currentDir = isDown ? "down" : "up";

        // Reset accumulator if there's been a long gap (new gesture) or direction changed
        if (gap > INTENT_GAP_MS || currentDir !== lastDirection) {
          accumulator = 0;
          eventCount = 0;
        }
        lastDirection = currentDir;

        accumulator += Math.abs(e.deltaY);
        eventCount += 1;

        // Intent detected via delta accumulation OR event count (Safari trackpad fallback)
        const hasIntent = accumulator >= ACCUMULATOR_THRESHOLD || eventCount >= EVENT_COUNT_THRESHOLD;

        if (!hasIntent) {
          return; // Not enough intent yet
        }

        // Enough intent detected — determine direction
        if (isDown) {
          accumulator = 0;
          eventCount = 0;
          setScrollDir("down");
          const approach = document.getElementById("services-approach");
          if (approach) {
            const approachY = approach.getBoundingClientRect().top + scrollY;
            // Notify approach section that a snap is incoming
            window.dispatchEvent(new CustomEvent("intro-snap-to-approach"));
            animateScrollTo(approachY, 600, () => {
              state = "idle";
            });
          } else {
            state = "idle";
          }
        } else if (isUp) {
          accumulator = 0;
          eventCount = 0;
          setScrollDir("up");
          animateScrollTo(0, 600, () => {
            state = "atHero";
          });
        }
        return;
      }

      // --- Below intro (approach/list/etc): let scroll happen naturally ---
      // But if user scrolls back up to intro zone, catch them
      if (isUp && scrollY <= introTop + 50 && scrollY > 10) {
        // They're scrolling up right at the intro boundary — don't interfere,
        // let the approach section's handler manage this
      }
    };

    // Detect when user ends up at intro via other means (e.g. approach snapping up to intro)
    const handleScroll = () => {
      if (state === "animating") return;
      const scrollY = window.scrollY;
      const introTop = getIntroTop();

      // Only manage state when in the hero/intro zone
      // Don't interfere when user is far below (e.g. at footer)
      if (scrollY > introTop + window.innerHeight) {
        if (state !== "idle") state = "idle";
        return;
      }

      if (scrollY < 50 && state !== "atHero") {
        state = "atHero";
      } else if (Math.abs(scrollY - introTop) < 20 && state === "idle") {
        state = "atIntro";
        atIntroSince = Date.now();
        lastWheelTime = Date.now();
        accumulator = 0;
      } else if (scrollY > introTop + 50 && state === "atIntro") {
        state = "idle";
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-hide-navbar
      className="relative z-30 isolate flex h-screen w-full flex-col justify-center overflow-hidden"
    >
      {/* Parallax white columns (curtain reveal) */}
      <div className="pointer-events-none absolute inset-0 flex h-[120vh] w-full">
        <motion.div style={{ y: col1Y }} className="h-full w-1/3 bg-white" />
        <motion.div style={{ y: col2Y }} className="h-full w-1/3 bg-white" />
        <motion.div style={{ y: col3Y }} className="h-full w-1/3 bg-white" />
      </div>

      {/* Content */}
      <motion.div style={{ y: contentY }} className="relative w-full">
        <SiteContainer className="relative flex h-full max-h-[950px] flex-col justify-center py-6 lg:py-10">
          <div className="w-full max-w-[1100px]">
            <p
              className="heading-2 !text-[#01030B]"
              dangerouslySetInnerHTML={{ __html: data.mainText }}
            />
          </div>

          <div className="my-5 h-[1px] w-full bg-gray-200 lg:my-8" />

          <div className="grid w-full grid-cols-1 items-start gap-8 lg:grid-cols-[3.5fr_6.5fr] lg:gap-16">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-[4px] bg-animated-gradient lg:mx-0 lg:max-w-[360px]">
              <div className="absolute inset-6 z-10 overflow-hidden rounded-2xl lg:inset-8">
                <Image
                  src={data.image}
                  alt="Section Image"
                  fill
                  sizes="(max-width: 768px) 260px, 360px"
                  className="object-contain"
                />
              </div>
            </div>

            <div className="mt-8 flex w-full flex-col lg:mt-16">
              <p className="heading-3" style={{ color: "#01030B" }}>
                {data.heading}
              </p>
              <div className="mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-12 lg:gap-16">
                <p className="body-small" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
                  {data.p1}
                </p>
                <p className="body-small" style={{ color: "#8A8B8F", lineHeight: "1.6" }}>
                  {data.p2}
                </p>
              </div>
            </div>
          </div>
        </SiteContainer>
      </motion.div>
    </section>
  );
}
