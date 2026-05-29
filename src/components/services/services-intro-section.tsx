import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
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
    <section className="relative z-30 w-full bg-white py-20 rounded-[6px]">
      <SiteContainer>
        {/* Main headline with blue highlights */}
        <div className="w-full">
          <p
            className="heading-2 !text-[#01030B]"
            dangerouslySetInnerHTML={{ __html: data.mainText }}
          />
        </div>

        {/* Heading paragraph */}
        <p className="body-medium mt-6 !text-black">
          {data.heading}
        </p>
        <div className="relative mt-8 w-[65%] aspect-[3/4] overflow-hidden rounded-[4px] bg-animated-gradient">
          <div className="absolute inset-5 z-10 overflow-hidden rounded-xl">
            <Image src={data.image} alt="Section Image" fill sizes="65vw" className="object-contain" />
          </div>
        </div>

        {/* p1 and p2 below image */}
        <p className="body-small mt-8 !text-[#8A8B8F]">
          {data.p1}
        </p>
        <p className="body-small mt-6 !text-[#8A8B8F]">
          {data.p2}
        </p>
      </SiteContainer>
    </section>
  );
}

function ServicesIntroDesktop({ data }: { data: ServiceCategoryData["intro"] }) {
  const containerRef = useRef<HTMLElement>(null);
  const colContainerRef = useRef<HTMLDivElement>(null);
  const contentWrapRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "start start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 22,
    mass: 1.2,
  });

  const scrollDirMV = useMotionValue("down");

  const col1Y = useTransform(smoothProgress, (p) => {
    if (scrollDirMV.get() === "down") return "0%";
    if (p >= 0.6) return "0vh";
    if (p <= 0) return "120vh";
    const t = p / 0.6;
    return `${120 * (1 - t)}vh`;
  });

  const col2Y = useTransform(smoothProgress, (p) => {
    if (scrollDirMV.get() === "down") {
      return `${55 * (1 - p)}%`;
    }
    if (p >= 0.8) return "0vh";
    if (p <= 0.2) return "120vh";
    const t = (p - 0.2) / 0.6;
    return `${120 * (1 - t)}vh`;
  });

  const col3Y = useTransform(smoothProgress, (p) => {
    if (scrollDirMV.get() === "down") {
      return `${80 * (1 - p)}%`;
    }
    if (p >= 1) return "0vh";
    if (p <= 0.4) return "120vh";
    const t = (p - 0.4) / 0.6;
    return `${120 * (1 - t)}vh`;
  });

  const contentY = useTransform(smoothProgress, (p) => {
    if (scrollDirMV.get() === "down") {
      return `${75 * (1 - p)}vh`;
    }
    if (p >= 0.8) return "0vh";
    if (p <= 0.2) return "120vh";
    const t = (p - 0.2) / 0.6;
    return `${120 * (1 - t)}vh`;
  });

  const contentOpacity = useTransform(smoothProgress, (p) => {
    return 1;
  });

  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const html = document.documentElement;
    html.style.scrollBehavior = "auto";

    type State = "idle" | "atHero" | "atIntro" | "animating";
    let state: State = window.scrollY < 50 ? "atHero" : "idle";

    let lastWheelTime = 0;
    let accumulator = 0;
    let eventCount = 0;
    let lastDirection: "up" | "down" | null = null;
    const ACCUMULATOR_THRESHOLD = 120;
    const EVENT_COUNT_THRESHOLD = 10;
    const INTENT_GAP_MS = 400;
    let atIntroSince = 0;
    const INTRO_COOLDOWN_MS = 800;
    const APPROACH_SNAP_COOLDOWN_MS = 1200;
    let activeCooldownMs = INTRO_COOLDOWN_MS;
    let resetTimeoutId: NodeJS.Timeout | null = null;
    let arrivedFromApproach = false;
    let momentumSettled = false;
    let hadDirectionChange = false;
    let lastApproachEventTime = 0;

    const getIntroTop = () => section.offsetTop;

    const handleApproachSnap = () => {
      state = "atIntro";
      atIntroSince = Date.now();
      lastWheelTime = Date.now();
      accumulator = 0;
      eventCount = 0;
      lastDirection = null;
      activeCooldownMs = APPROACH_SNAP_COOLDOWN_MS;
      arrivedFromApproach = true;
      momentumSettled = false;
      hadDirectionChange = false;
    };
    window.addEventListener("approach-snap-to-intro", handleApproachSnap);

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

      if (state === "animating") {
        e.preventDefault();
        return;
      }

      if (state === "idle") {
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

      if (state === "atHero") {
        e.preventDefault();
        if (isDown) {
          if (resetTimeoutId) {
            clearTimeout(resetTimeoutId);
            resetTimeoutId = null;
          }
          if (colContainerRef.current) {
            const c = colContainerRef.current;
            c.style.position = "";
            c.style.top = "";
            c.style.left = "";
            c.style.width = "";
            c.style.zIndex = "";
          }
          if (contentWrapRef.current) {
            const cw = contentWrapRef.current;
            cw.style.position = "";
            cw.style.top = "";
            cw.style.left = "";
            cw.style.width = "";
            cw.style.height = "";
            cw.style.zIndex = "";
            cw.style.display = "";
            cw.style.alignItems = "";
          }
          scrollDirMV.set("down");
          animateScrollTo(introTop, 1000, () => {
            state = "atIntro";
            atIntroSince = Date.now();
            lastWheelTime = Date.now();
            accumulator = 0;
            eventCount = 0;
            lastDirection = null;
            activeCooldownMs = INTRO_COOLDOWN_MS;
          });
        }
        return;
      }

      if (state === "atIntro") {
        e.preventDefault();

        if (isDown && now - atIntroSince < activeCooldownMs) {
          accumulator = 0;
          eventCount = 0;
          if (arrivedFromApproach && !momentumSettled) {
            hadDirectionChange = true;
          }
          return;
        }

        if (isUp && arrivedFromApproach && !momentumSettled) {
          const timeSinceArrival = now - atIntroSince;
          if (hadDirectionChange) {
            momentumSettled = true;
          } else if (timeSinceArrival > 1500) {
            momentumSettled = true;
          } else {
            const eventGap = now - lastApproachEventTime;
            lastApproachEventTime = now;
            if (eventGap > 120 && timeSinceArrival > 300) {
              momentumSettled = true;
            } else {
              accumulator = 0;
              eventCount = 0;
              return;
            }
          }
        }

        if (arrivedFromApproach && !momentumSettled) {
          lastApproachEventTime = now;
        }

        const gap = now - lastWheelTime;
        lastWheelTime = now;

        const currentDir = isDown ? "down" : "up";

        if (isDown && arrivedFromApproach && !momentumSettled) {
          hadDirectionChange = true;
        }

        if (gap > INTENT_GAP_MS || currentDir !== lastDirection) {
          accumulator = 0;
          eventCount = 0;
        }
        lastDirection = currentDir;

        accumulator += Math.abs(e.deltaY);
        eventCount += 1;

        const hasIntent = accumulator >= ACCUMULATOR_THRESHOLD || eventCount >= EVENT_COUNT_THRESHOLD;

        if (!hasIntent) {
          return;
        }

        if (isDown) {
          accumulator = 0;
          eventCount = 0;
          if (resetTimeoutId) {
            clearTimeout(resetTimeoutId);
            resetTimeoutId = null;
          }
          if (colContainerRef.current) {
            const c = colContainerRef.current;
            c.style.position = "";
            c.style.top = "";
            c.style.left = "";
            c.style.width = "";
            c.style.zIndex = "";
          }
          if (contentWrapRef.current) {
            const cw = contentWrapRef.current;
            cw.style.position = "";
            cw.style.top = "";
            cw.style.left = "";
            cw.style.width = "";
            cw.style.height = "";
            cw.style.zIndex = "";
            cw.style.display = "";
            cw.style.alignItems = "";
          }
          scrollDirMV.set("down");
          const approach = document.getElementById("services-approach");
          if (approach) {
            const approachY = approach.getBoundingClientRect().top + scrollY;
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
          scrollDirMV.set("up");
          if (resetTimeoutId) {
            clearTimeout(resetTimeoutId);
            resetTimeoutId = null;
          }
          if (colContainerRef.current) {
            const c = colContainerRef.current;
            c.style.position = "fixed";
            c.style.top = "0";
            c.style.left = "0";
            c.style.width = "100%";
            c.style.zIndex = "35";
          }
          if (contentWrapRef.current) {
            const cw = contentWrapRef.current;
            cw.style.position = "fixed";
            cw.style.top = "0";
            cw.style.left = "0";
            cw.style.width = "100%";
            cw.style.height = "100vh";
            cw.style.zIndex = "40";
            cw.style.display = "flex";
            cw.style.alignItems = "center";
          }
          animateScrollTo(0, 1000, () => {
            state = "atHero";
            resetTimeoutId = setTimeout(() => {
              if (colContainerRef.current) {
                const c = colContainerRef.current;
                c.style.position = "";
                c.style.top = "";
                c.style.left = "";
                c.style.width = "";
                c.style.zIndex = "";
              }
              if (contentWrapRef.current) {
                const cw = contentWrapRef.current;
                cw.style.position = "";
                cw.style.top = "";
                cw.style.left = "";
                cw.style.width = "";
                cw.style.height = "";
                cw.style.zIndex = "";
                cw.style.display = "";
                cw.style.alignItems = "";
              }
            }, 800);
          });
        }
        return;
      }

      if (isUp && scrollY <= introTop + 50 && scrollY > 10) {
      }
    };

    const handleScroll = () => {
      if (state === "animating") return;
      const scrollY = window.scrollY;
      const introTop = getIntroTop();

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
        activeCooldownMs = INTRO_COOLDOWN_MS;
      } else if (scrollY > introTop + 50 && state === "atIntro") {
        state = "idle";
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("approach-snap-to-intro", handleApproachSnap);
      html.style.scrollBehavior = "";
    };
  }, []);

  return (
    <section
      ref={containerRef}
      data-hide-navbar
      className="relative z-30 isolate flex h-screen w-full flex-col justify-center overflow-hidden"
    >
      <div ref={colContainerRef} className="pointer-events-none absolute inset-0 flex h-[120vh] w-full">
        <motion.div style={{ y: col1Y }} className="h-full w-1/3 bg-white" />
        <motion.div style={{ y: col2Y }} className="h-full w-1/3 bg-white" />
        <motion.div style={{ y: col3Y }} className="h-full w-1/3 bg-white" />
      </div>

      <motion.div ref={contentWrapRef} style={{ y: contentY, opacity: contentOpacity }} className="relative z-40 w-full">
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
