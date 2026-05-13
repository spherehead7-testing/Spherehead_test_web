import Head from "next/head";
import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
} from "motion/react";
import BlogsHero from "@/components/blogs/blogs-hero";
import BlogsContent from "@/components/blogs/blogs-content";
import BlogsTransitionPanel from "@/components/blogs/blogs-transition-panel";

// Spring config for smooth, buttery scroll-driven transitions
const springConfig = { stiffness: 60, damping: 20, mass: 0.8 };

export default function BlogsPage() {
  const scrollContainerRef = useRef<HTMLElement | null>(null);
  const sceneRef = useRef<HTMLElement | null>(null);
  const heroAsideRef = useRef<HTMLElement | null>(null);

  const [viewportHeight, setViewportHeight] = useState(0);
  const [viewportWidth, setViewportWidth] = useState(0);

  // Dynamically measure the hero aside's left edge position (in vw)
  const [asideLeftVw, setAsideLeftVw] = useState(66);

  const measureAside = useCallback(() => {
    const vw = window.innerWidth;
    setViewportHeight(window.innerHeight);
    setViewportWidth(vw);

    // Find the hero aside element
    const aside = heroAsideRef.current;
    if (aside && vw > 0) {
      const rect = aside.getBoundingClientRect();
      setAsideLeftVw((rect.left / vw) * 100);
    }
  }, []);

  useEffect(() => {
    measureAside();
    window.addEventListener("resize", measureAside);
    return () => window.removeEventListener("resize", measureAside);
  }, [measureAside]);

  // Also observe the hero aside for layout changes
  useEffect(() => {
    const aside = heroAsideRef.current;
    if (!aside) return;
    const observer = new ResizeObserver(measureAside);
    observer.observe(aside);
    return () => observer.disconnect();
  }, [measureAside]);

  const { scrollYProgress } = useScroll({
    target: sceneRef,
    container: scrollContainerRef,
    offset: ["start start", "end end"],
  });

  // Numeric scroll-linked transforms (useSpring only works with numbers)
  // Panel starts aligned with the hero aside, then expands to fill the screen
  const rawLeft = useTransform(
    scrollYProgress,
    [0, 0.2, 0.74, 1],
    [asideLeftVw, 50, 12, 0],
  );
  const rawTop = useTransform(
    scrollYProgress,
    [0, 0.18, 0.72, 1],
    [104, 64, 24, 0],
  );
  const rawHeightOffset = useTransform(
    scrollYProgress,
    [0, 0.18, 0.72, 1],
    [104, 64, 24, 0],
  );

  // Smooth spring wrappers for buttery transitions
  const smoothLeft = useSpring(rawLeft, springConfig);
  const smoothTop = useSpring(rawTop, springConfig);
  const smoothHeightOffset = useSpring(rawHeightOffset, springConfig);

  // Reconstruct CSS string values from sprung numbers
  const panelLeft = useMotionTemplate`${smoothLeft}vw`;
  const panelTop = useMotionTemplate`${smoothTop}px`;
  const panelHeight = useMotionTemplate`calc(100vh - ${smoothHeightOffset}px)`;

  // Snap-scroll engine for the transition zone
  useBlogsSnapScroll(scrollContainerRef, viewportHeight);

  return (
    <>
      <Head>
        <title>Blogs | Spherehead Technologies</title>
        <meta
          name="description"
          content="Technology, innovation, design, and tech stack insights from Spherehead Technologies."
        />
      </Head>

      <main
        ref={scrollContainerRef}
        className="h-screen w-full overflow-y-auto overflow-x-hidden bg-white text-[#01030B]"
      >
        <section
          ref={sceneRef}
          className="relative min-h-[220vh] overflow-clip bg-gradient-to-r from-[#06142E] via-[#0A2F76] to-[#2666D2]"
        >
          <div className="sticky top-0 h-screen overflow-hidden">
            <BlogsHero asideRef={heroAsideRef} />

            <motion.div
              style={{
                left: panelLeft,
                top: panelTop,
                height: panelHeight,
              }}
              className="pointer-events-none absolute right-0 z-20 overflow-hidden bg-white shadow-[0_0_80px_rgba(0,0,0,0.08)]"
            >
              <BlogsTransitionPanel />
            </motion.div>
          </div>
        </section>

        <BlogsContent />
      </main>
    </>
  );
}


/**
 * Snap-scroll engine for the blogs page.
 * Within the hero → panel transition zone, a single wheel scroll triggers
 * a smooth animated snap to the next state (hero ↔ panel fully expanded).
 * Past the transition zone, free scrolling resumes for the blog list content.
 */
function useBlogsSnapScroll(
  scrollContainerRef: React.RefObject<HTMLElement | null>,
  viewportHeight: number,
) {
  const isAutoScrollingRef = useRef(false);
  const autoScrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container || !viewportHeight) return;

    // Scene section is 220vh tall. scrollYProgress goes 0→1 over
    // the scroll distance of (220vh - 100vh) = 120vh
    const sceneScrollEnd = viewportHeight * 1.2;

    // Two snap states: hero (0) and panel fully expanded (sceneScrollEnd)
    const snapPoints = [0, sceneScrollEnd];

    const easeInOutQuart = (t: number) =>
      t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

    const animateTo = (target: number) => {
      isAutoScrollingRef.current = true;
      if (autoScrollRafRef.current) cancelAnimationFrame(autoScrollRafRef.current);

      const startY = container.scrollTop;
      const distance = target - startY;
      const duration = 1100;
      const startTime = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeInOutQuart(progress);
        container.scrollTo(0, startY + distance * eased);

        if (progress < 1) {
          autoScrollRafRef.current = requestAnimationFrame(step);
        } else {
          container.scrollTo(0, target);
          setTimeout(() => {
            isAutoScrollingRef.current = false;
          }, 50);
        }
      };

      autoScrollRafRef.current = requestAnimationFrame(step);
    };

    const handleWheel = (e: WheelEvent) => {
      // Block input during auto-scroll animation
      if (isAutoScrollingRef.current) {
        e.preventDefault();
        return;
      }

      // Ignore tiny scroll movements (trackpad noise)
      if (Math.abs(e.deltaY) < 15) return;

      const currentY = container.scrollTop;
      const direction = e.deltaY > 0 ? 1 : -1;

      // Within the transition zone: snap to hero or panel-expanded
      if (currentY < sceneScrollEnd - 10) {
        e.preventDefault();

        // Find the nearest snap point
        let currentIndex = 0;
        let minDiff = Infinity;
        snapPoints.forEach((p, i) => {
          const diff = Math.abs(currentY - p);
          if (diff < minDiff) {
            minDiff = diff;
            currentIndex = i;
          }
        });

        const nextIndex = Math.max(
          0,
          Math.min(currentIndex + direction, snapPoints.length - 1),
        );

        if (nextIndex !== currentIndex) {
          animateTo(snapPoints[nextIndex]);
        }
      }
      // At the panel-expanded boundary scrolling up → snap back to hero
      else if (direction === -1 && currentY <= sceneScrollEnd + 10) {
        e.preventDefault();
        animateTo(0);
      }
      // Past the transition zone: allow free scroll for blog content
    };

    container.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      container.removeEventListener("wheel", handleWheel);
      if (autoScrollRafRef.current) cancelAnimationFrame(autoScrollRafRef.current);
    };
  }, [viewportHeight, scrollContainerRef]);
}
