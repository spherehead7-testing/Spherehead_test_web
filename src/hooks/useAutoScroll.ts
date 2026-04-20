import { useEffect, useRef } from "react";

export default function useAutoScroll() {
  const isAutoScrollingRef = useRef(false);
  const scrollStopTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRestingYRef = useRef(0);

  useEffect(() => {
    // Initialize to nearest full-screen section
    lastRestingYRef.current =
      Math.round(window.scrollY / window.innerHeight) * window.innerHeight;

    const animateScroll = (targetY: number) => {
      if (isAutoScrollingRef.current) return;

      const startY = window.scrollY;
      const distance = targetY - startY;

      // Skip tiny movements
      if (Math.abs(distance) < 5) {
        lastRestingYRef.current = targetY;
        return;
      }

      isAutoScrollingRef.current = true;

      const duration = 400;
      const startTime = performance.now();
      const easeOut = (t: number) => 1 - Math.pow(1 - t, 4);

      const step = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        window.scrollTo(0, startY + distance * easeOut(progress));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          // Ensure exact alignment to section
          window.scrollTo(0, targetY);
          lastRestingYRef.current = targetY;

          // Small delay before allowing next scroll
          setTimeout(() => {
            isAutoScrollingRef.current = false;
          }, 300);
        }
      };

      requestAnimationFrame(step);
    };

    const handleScroll = () => {
      if (isAutoScrollingRef.current) return;

      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }

      // Detect scroll stop
      scrollStopTimerRef.current = setTimeout(() => {
        const currentY = window.scrollY;
        const vh = window.innerHeight;
        const maxScroll = document.documentElement.scrollHeight - vh;

        const FREE_SCROLL_START_Y = 3 * vh;

        // Allow free scrolling after section 3
        if (currentY >= FREE_SCROLL_START_Y + 5) {
          // Lock reference point to section boundary
          lastRestingYRef.current = FREE_SCROLL_START_Y;

          // Snap to bottom if near footer
          if (currentY > maxScroll - vh * 0.5) {
            animateScroll(maxScroll);
          }
          return;
        }

        const distanceScrolled = currentY - lastRestingYRef.current;

        // Current section index (0 → 3)
        const currentIndex = Math.round(lastRestingYRef.current / vh);
        let targetIndex = currentIndex;

        // Detect scroll direction
        if (distanceScrolled > 20) {
          targetIndex = currentIndex + 1;
        } else if (distanceScrolled < -20) {
          targetIndex = currentIndex - 1;
        }

        // Clamp between sections 0 and 3
        targetIndex = Math.max(0, Math.min(targetIndex, 3));

        // Snap to exact section
        animateScroll(targetIndex * vh);
      }, 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollStopTimerRef.current) {
        clearTimeout(scrollStopTimerRef.current);
      }
    };
  }, []);
}
